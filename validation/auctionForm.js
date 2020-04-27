const Validator = require('validator'),
        isEmpty = require('is-empty');

/**
 * Takes in auction form text inputs from client-side and checks validity
 */
function validateAuctionInput(data) {
  let errors = {};

  // Convert empty fields to an empty string ('validator' functions only work with strings)
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.startingBid = !isEmpty(data.startingBid) ? data.startingBid : "";
  data.endingDate = !isEmpty(data.endingDate) ? data.endingDate : "";
  data.endingTime = !isEmpty(data.endingTime) ? data.endingTime : "";

  // If this field is true, then we need to validate the buyItNow entry as well
  const hasBuyItNow = data.hasBuyItNow == 'true';
  if(hasBuyItNow) {
    data.buyItNow = !isEmpty(data.buyItNow) ? data.buyItNow : "";

    if(Validator.isEmpty(data.buyItNow)) { errors.buyItNow = 'Buy it now field is required' }
    else if(!Validator.isNumeric(data.buyItNow)) { errors.buyItNow = 'Price requires a numeric value' }
  }

  // Title validation
  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  // Description validation
  if(Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  // Starting bid validation
  if(Validator.isEmpty(data.startingBid)) {
    errors.startingBid = 'Starting-bid field is required';
  } else if(!Validator.isNumeric(data.startingBid)) {
    errors.startingBid = 'Price requires a numeric value';
  }

  // Ending date validation
  if(Validator.isEmpty(data.endingDate)) {
    errors.endingDate = 'Ending date field is required';
  } 

  // Ending time validation
  if(Validator.isEmpty(data.endingTime)) {
    errors.endingTime = 'Ending time field is required';
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}

module.exports = validateAuctionInput;