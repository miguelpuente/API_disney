const { EMAIL_ERROR_IS_REQUIRED,
        EMAIL_ERROR_IS_MAIL,
        PASSWORD_IS_REQUIRED,
        PASSWORD_REQUIREMENTS
      } = require("../constants/errors-leyenda");

exports.loginSchema = {
    email: {
      in: ['body'],
      isEmail: true,
      errorMessage: EMAIL_ERROR_IS_MAIL,
      notEmpty: true,
      errorMessage: EMAIL_ERROR_IS_REQUIRED,
    },
    password: {
      in: ['body'],
      notEmpty: true,
      errorMessage: PASSWORD_IS_REQUIRED,
      isLength: {
        errorMessage: PASSWORD_REQUIREMENTS,
        options: { min: 8 }
      }
    }
  };