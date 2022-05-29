const { validationResult } = require('express-validator');
const { validateError } = require('../constants/errors');

const validateResult = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  }
  return next(validateError(err.mapped()));
};

module.exports = { validateResult };