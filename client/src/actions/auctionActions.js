import axios from 'axios';

import {
  GET_ERRORS,
  UPDATE_FEED
} from './types';

// Post an auction
export const postAuction = (auctionData) => dispatch => {
  axios
    .post('/api/auctions/new', auctionData)
    .then(res => dispatch(updateFeed()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

// This reducing function will update the state so that home feed refreshes
export const updateFeed = () => {
  return {
    type: UPDATE_FEED
  };
};