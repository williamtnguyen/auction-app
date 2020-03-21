import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// combine authReducer and errorReducer to one rootReducer to be passed into createStore() in store.js
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
