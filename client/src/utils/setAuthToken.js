import axios from 'axios';

const setAuthToken = (token) => {
  if(token) {
    // Apply auth token to every request if logged in (don't need to perform a query)
    axios.defaults.headers.common['Authorization'] = token;
    
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;