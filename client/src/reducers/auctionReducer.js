import {
  UPDATE_FEED
} from '../actions/types';

const initialState = {
  isUpdated: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    // This reducing function just allows the feed to 
    // refresh when auctions are posted
    case UPDATE_FEED:
      return {
        ...state,
        isUpdated: true
      };
    default:
      return state;
  }
}