const { request, response } = require('express');
const { User } = require('../models/index');


const all = async( req, res = response ) => {

    try {

        const usuarios = await User.findAll();
       
        res.json({ usuarios });

    } catch (error) {

        throw new Error(error);

    }
}

module.exports = {
    all,
}