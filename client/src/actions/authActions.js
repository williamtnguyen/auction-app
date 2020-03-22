import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    // re-direct to login on successful register
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Login: get user token
export const loginUser = userData => dispatch => {
  axios
    .post('./api/user/login', userData)
    .then(res => {
      const token = res.data.token;
      // save to localStorage to persist user logins
      localStorage.setItem('jwtToken', token); 
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user with decoded token
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Setting current user action 
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
