const { request, response } = require('express');
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../config/auth');
const { generarJWT } = require('../helpers/generar-jwt');
const { databaseError, apiExternalError, notFoundError } = require('../constants/errors');


const login = async( req, res = response ) => {

    console.log(req.body);

    let { email, password } = req.body;
    let idToken = '';
    let usuario = {};

    try {
        
        if ( email == process.env.AUTH_EMAIL_SYS && password == process.env.AUTH_PASSWORD_SYS ){
            usuario = {
                id: '0',
                nombre: 'AdminSystem',
                nombre_usuario: process.env.AUTH_USER_SYS,
                email: process.env.AUTH_EMAIL_SYS
            }
        } else {
            usuario = await User.scope('login').findOne({ where: { email }});
            if( !usuario )  res.status(404).json({msg: "User with this email not found."});
            if ( !bcrypt.compareSync( password, usuario.password ) ) res.status(401).json({msg: "Incorrect password."});
            usuario = {
                id: usuario.id,
                email: usuario.email
            }
        }
        
        idToken = await generarJWT( usuario.id );

        res.json({ usuario, idToken })

    } catch (error) {
        console.log('An error has occurred ', error );

        res.status(500).json({
            msg: 'Talk to the administrator - Error: '+ error.errors[0].message,
        })
    }
}

const register = async( req = request, res, next ) => {

    let password = bcrypt.hashSync( req.body.password, Number.parseInt(authConfig.rounds) );

    try {

            const usuario = new User();
            usuario.email = req.body.email;
            usuario.password = password;
            await usuario.save();

            // Send Grid Email
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: usuario.email,
                from: process.env.EMAIL_SEND,
                subject: 'Successful registration',
                text: `¡welcome to disney!
                User: ${ usuario.email }
                Password: ${ req.body.password }`,
            };
            sgMail
                .send(msg)
                .then(() => {}, error => {
                    console.error(error);

                    if (error.response) {
                    console.error(error.response.body)
                    }
                });
            // End Send Grid Email

            let idToken = await generarJWT( usuario.id )

            res.json({
                usuario,
                idToken
            })            
        
    } catch (error) {
        console.log('An error has occurred ', error );

              throw new Error('Talk to the administrator - Error:'+ error);
    }
}

module.exports = {
    login,
    register
}
