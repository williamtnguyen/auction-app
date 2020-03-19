import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'

function App() {
  return (
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
  );
}

export default App;
