const isEmpty = require('lodash/isEmpty');
const validate = require('validator');

module.exports = function validateLoginData(input) {
  let errors = {};
  
  input.email = !isEmpty(input.email) ? input.email : '';
  input.password = !isEmpty(input.password) ? input.password : '';
  
  if (!validate.isEmail(input.email)) {
    errors.email = 'The email address you supplied is invalid.';
  }
  
  if (validate.isEmpty(input.email)) {
    errors.email = 'An email address is required to log in.';
  }
    
  if (validate.isEmpty(input.password)) {
    errors.password = 'A password is required to log in.';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
