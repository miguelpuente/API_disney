const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const authConfig = require('../../config/auth');


const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify( token, authConfig.secret );
        
        if ( uid != '0' ) {
            const usuario = await User.findByPk( uid );
            if ( !usuario ){
                return res.status(401).json({
                    msg: 'Invalid Token - User with false status'
                });
            }
            req.usuario = usuario;
        }else{
            req.usuario = {
                nombre: 'AdminSystem'
            }
        }
         
        next();  

    } catch (error) {

        console.log(error)

        res.status(401).json({
            msg: 'Invalid token.'
        });
    }

}

module.exports = {
    validarJWT
}