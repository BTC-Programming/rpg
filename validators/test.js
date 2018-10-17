const isEmpty = require('lodash/isEmpty');
const validate = require('validator');

module.exports = function validateTestData(input, edit = false) {
  let errors = {};
  let firstname = !isEmpty(input.firstname) ? input.firstname : '';
  let lastname = !isEmpty(input.lastname) ? input.lastname : '';
  let birthdate = !isEmpty(input.birthdate) ? input.birthdate : '';
  let locale = !isEmpty(input.locale) ? input.locale : '';
  let favcolor = !isEmpty(input.favcolor) ? input.favcolor : '';
  let favsong = !isEmpty(input.favsong) ? input.favsong : '';
  let favanimal = !isEmpty(input.favanimal) ? input.favanimal : '';
  
  if (!validate.isAlpha(firstname, 'en-US')) {
    errors.firstname = 'Name must only consist of letters (a-z, A-Z).';
  }
  
  if (!validate.isAlpha(lastname, 'en-US')) {
    errors.lastname = 'Name must only consist of letters (a-z, A-Z).';
  }
    
  if (!validate.isLength(firstname, { min: 1, max: 20 })) {
    errors.firstname = 'Name must be no more than 20 characters';
  }
  
  if (!validate.isLength(lastname, { min: 1, max: 20 })) {
    errors.lastname = 'Name must be no more than 20 characters';
  }
    
  if (validate.isEmpty(firstname)) {
    errors.firstname = 'You must supply a name.';
  }
  
  if (validate.isEmpty(lastname)) {
    errors.lastname = 'You must supply a name.';
  }
  
  if (!validate.isLength(locale, { min: 0, max: 60 })) {
    errors.locale = 'Location must be no longer than 60 characters.';
  }
  
  if (!validate.isLength(favcolor, { min: 0, max: 20 })) {
    errors.favcolor = 'Color name must be no longer than 20 characters.';
  }
  
  if (!validate.isLength(favsong, { min: 0, max: 50 })) {
    errors.favcolor = 'Song name must be no longer than 50 characters.';
  }
  
  if (!validate.isLength(favanimal, { min: 0, max: 20 })) {
    errors.favcolor = 'Animal name must be no longer than 20 characters.';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
