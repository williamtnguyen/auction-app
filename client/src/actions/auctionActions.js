import axios from 'axios';

import {
  GET_ERRORS,
  POST_AUCTION
} from './types';

// Post an auction
export const postAuction = (auctionData) => dispatch => {
  const formData = makeFormData(auctionData);
  axios
    .post('/api/auctions/', formData)
    .then(res => dispatch(redirectHome()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

// Creates a FormData object to pass to API
export const makeFormData = (auctionData) => {
  const formData = new FormData();
  const entries = Object.entries(auctionData);
  
  for(const [key, value] of entries) {
    formData.append(`${key}`, value);
  }
  return formData;
}

// This reducing function will update the state so that home feed refreshes
export const redirectHome = () => {
  return {
    type: POST_AUCTION
  };
};