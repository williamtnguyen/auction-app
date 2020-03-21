import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Redux for state management
import { Provider } from 'react-redux';
import store from './store';

// Components to be rendered
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'

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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
