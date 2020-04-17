import {
  POST_AUCTION
} from '../actions/types';

const initialState = {
  isPosted: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    // This reducing function just allows redirect to homefeed on successful posting
    case POST_AUCTION:
      return {
        ...state,
        isPosted: true
      };
    default:
      return state;
  }
}