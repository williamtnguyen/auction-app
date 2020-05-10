import {
  POST_AUCTION,
  PLACE_BID,
  AUCTION_BOUGHT
} from '../actions/types';

const initialState = {
  isPosted: false,
  bidPlaced: false,
  isBought: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    // This reducing function just allows redirect to homefeed on successful posting
    case POST_AUCTION:
      return {
        ...state,
        isPosted: true
      };
    case PLACE_BID:
      return {
        ...state,
        bidPlaced: true
      };
    case AUCTION_BOUGHT:
      return {
        ...state,
        isBought: true
      };
    default:
      return state;
  }
}