const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
const { NOMBRE_ERROR_IS_REQUIRED,
        NOMBRE_ERROR_IS_UNIQUE, } = require('../constants/errors-leyenda');

const { Character } = require('../models/index');
const { request } = require('express');
const { Op } = require("sequelize");
 
const validateCharacter = [
    check('')
        .not().isEmpty().withMessage(NOMBRE_ERROR_IS_REQUIRED)
        .custom( async( name, { req = request }) => {

                if (req.method == 'POST') { //si el character es nuevo no puede tener el mismo nombre que otra
                    let character = await Character.findOne({ where: { name }});
                    if ( character ) throw new Error(`${ character }: ${ NOMBRE_ERROR_IS_UNIQUE }`);
                }else{ // si es un character no puede tener el mismo nombre que otra, pero si de si misma
                    let character = await Character.findOne({ where: { id:{ [Op.not]: req.params.id }, name }});
                    if ( character ) throw new Error(`${ name }: ${ NOMBRE_ERROR_IS_UNIQUE }`);
                }
            }),
    (req, res, next) => {
        validateResult( req, res, next )
    }
]

module.exports = { validateCharacter } 