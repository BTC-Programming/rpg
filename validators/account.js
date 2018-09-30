const isEmpty = require('lodash/isEmpty');
const validate = require('validator');

module.exports = function validateAccountData(input, edit = false) {
  let errors = {};
  let username = !isEmpty(input.username) ? input.username : '';
  let birthdate = !isEmpty(input.birthdate) ? input.birthdate : '';
  let locale = !isEmpty(input.locale) ? input.locale : '';
  
  // These should never be modified by user input.
  if (input.user !== undefined || input.characters !== undefined
      || input.indexname !== undefined) {
    errors.unauthorized = 'Illegal entry.';
  }
  
  if (edit) {
    // These should never be modified by user input in edit mode.
    if (input.username !== undefined) {
      errors.unauthorized = 'Illegal update.';
    }
  } else {
    if (!validate.isAlphanumeric(username, 'en-US')) {
      errors.username = 'Your username must only consist of numbers (0-9) and letters (a-z, A-Z).';
    }
    
    if (!validate.isLength(username, { min: 2, max: 20 })) {
      errors.username = 'Your username must be between 2 and 20 characters';
    }
    
    if (validate.isEmpty(username)) {
      errors.username = 'You must supply a username.';
    }
  }
  
  if (validate.isEmpty(birthdate)) {
    errors.birthdate = 'You must supply a birthdate.';
  }
  
  if (!validate.isLength(locale, { min: 0, max: 60 })) {
    errors.locale = 'Your location must be no longer than 60 characters.';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
