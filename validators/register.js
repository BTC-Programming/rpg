const isEmpty = require('lodash/isEmpty');
const validate = require('validator');

module.exports = function validateRegisterData(input) {
  let errors = {};

  input.email = !isEmpty(input.email) ? input.email : '';
  input.password = !isEmpty(input.password) ? input.password : '';
  input.confirm = !isEmpty(input.confirm) ? input.confirm : '';

  if (!validate.isEmail(input.email)) {
    errors.email = 'The supplied email address is invalid.';
  }
  
  if (validate.isEmpty(input.email)) {
    errors.email = 'A valid email address is required';
  }
  
  if (!validate.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = 'Your password must be at least 6 characters in length.';
  }
  
  if (validate.isEmpty(input.password)) {
    errors.password = 'A password is required.';
  }
  
  if (!validate.equals(input.password, input.confirm)) {
    errors.confirm = 'Your passwords do not match.';
  }
  
  if (validate.isEmpty(input.confirm)) {
    errors.confirm = 'A password confirmation is required.';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
