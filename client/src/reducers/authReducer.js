import {
  SET_CURRENT_USER,
  USER_LOADING
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  // Switch statement: define how state should change based on actions and then return the updated state
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, // triple dot notation ex: this.props.state={a:1, b:2} --> a={this.props.a}, b={this.props.b}
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload // user object is the decoded JWT
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default: 
      return state;
  }
}