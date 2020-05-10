import axios from 'axios';

import {
  GET_ERRORS,
  POST_AUCTION,
  PLACE_BID,
  AUCTION_BOUGHT
} from './types';

/* Post an auction */
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


/* Place a bid */
export const placeBid = (auctionID, newBidData) => dispatch => {
  axios
    .put(`/api/auctions/${ auctionID }`, newBidData) 
    .then(res => {
      // console.log(res);
      dispatch(updateBidState()) 
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const updateBidState = () => {
  return {
    type: PLACE_BID
  };
};


/* buy dat thang */
export const buyItNow = (auctionID, boughtBidData) => dispatch => {
  axios
    .put(`/api/auctions/buy-it-now/${ auctionID }`, boughtBidData)
    .then(res => {
      console.log(res);
      dispatch(updateBoughtState());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const updateBoughtState = () => {
  return {
    type: AUCTION_BOUGHT
  };
};