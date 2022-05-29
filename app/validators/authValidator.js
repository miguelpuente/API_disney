const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
const { EMAIL_ERROR_IS_MAIL,
        EMAIL_ERROR_IS_REQUIRED,
        PASSWORD_IS_REQUIRED } = require('../constants/errors-leyenda');
 
const validateAuth = [
    check('email')
        .not().isEmpty().withMessage(EMAIL_ERROR_IS_REQUIRED)
        .isEmail().withMessage(EMAIL_ERROR_IS_MAIL),
    check('password')
        .not().isEmpty().withMessage(PASSWORD_IS_REQUIRED),
    (req, res, next) => {
        validateResult( req, res, next )
    }
]

module.exports = { validateAuth } 