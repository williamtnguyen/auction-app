const Validator = require('validator'),
        isEmpty = require('is-empty');


/**
 * Takes in register input from client-side and checks validity
 */
function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string ('validator' functions only work with strings)
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email validation
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Password validation
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // Return errors object as well as a boolean indicating if the client-side input is valid
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateLoginInput;