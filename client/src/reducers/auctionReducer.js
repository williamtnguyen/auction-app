import {
  POST_AUCTION,
  PLACE_BID
} from '../actions/types';

const initialState = {
  isPosted: false,
  bidPlaced: false
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
    default:
      return state;
  }
}