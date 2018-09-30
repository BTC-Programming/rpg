const isEmpty = require('lodash/isEmpty');
const Validator = require('validator');

module.exports = function validateCharacterData(input) {
  let errors = {};
  
  input.name = !isEmpty(input.name) ? input.name : '';
  input.descript = !isEmpty(input.descript) ? input.descript : '';
  
  if (!Validator.isLength(input.name, { min: 2, max: 12 })) {
    errors.name = "Your character's name must be between 2 and 12 characters";
  }
  
  if (!Validator.isAlpha(input.name, 'en-US')) {
    errors.name = "Your character's name must include only alphabetical characters.";
  }
  
  if (Validator.isEmpty(input.name)) {
    errors.name = 'You must name your character.';
  }
  
   if (!isEmpty(input.descript)) {
    if (!Validator.isLength(input.descript, { min: 0, max: 500 })) {
      errors.descript = "Your character's description must no more than 500 characters long.";
    }
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
