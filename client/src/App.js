import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css'; // custom css u dig

// Redux for state management
import { Provider } from 'react-redux';
import store from './store';

// Components to be rendered
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import PrivateRoute from './components/private-route/PrivateRoute';
import Home from './components/dashboard/Home';


// Check for token in localStorage to persist user login
if(localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Redirect to login 
    window.location.href = './login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {/* This Component is static and are on the page inevitably */}
            <Navbar />
            {/* These Components are dynamic, react-router-dom is used to make the components appear without reloading page */}
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            {/* Private Route: home page */}
            <Switch>
              <PrivateRoute exact path='/home' component={Home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
