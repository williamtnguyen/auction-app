const Validator = require('validator'),
        isEmpty = require('is-empty');

/**
 * Takes in an auction-bid numerical input from client-side and checks validity
 */
function validateAuctionBid(data) {
  let errors = {}

  // Convert empty fields to an empty string ('validator' functions only work with strings)
  data.newBid = !isEmpty(data.newBid) ? data.newBid : "";

  // Validation
  if(Validator.isEmpty(data.newBid)) {
    errors.newBid = 'Bid field is required';
  } else if(!Validator.isNumeric(data.newBid)) {
    errors.newBid = 'Bid requires a numeric value';
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}

module.exports = validateAuctionBid;