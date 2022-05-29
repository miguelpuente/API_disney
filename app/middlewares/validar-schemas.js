const { validationResult, checkSchema } = require('express-validator');
const { validateError } = require('../constants/errors');

const checkValidationResult = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  }
  
  return next(validateError(err.mapped()));
};

const validateSchema = schema => checkSchema(schema);

module.exports = schema => [validateSchema(schema), checkValidationResult];