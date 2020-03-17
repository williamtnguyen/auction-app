const Validator = require('validator'),
        isEmpty = require('is-empty');

        
/**
 * Takes in register input from client-side and checks validity
 */
function validateRegisterInput(data) {
  let errors = {}; 

  // Convert empty fields to an empty string ('validator' functions only work with strings)
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

  // Name validation
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // Email validation
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
    if(data.email.indexOf('@sjsu.edu') == -1) {
      errors.email.concat(': must be SJSU email');
    }
  }

  // Password validation
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if(Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  }

  // Setting constraints for password length
  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if(!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = 'Passwords must match';
  }

  // Return errors object as well as a boolean indicating if the client-side input is valid
  return {
    errors, 
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;