import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Home extends Component {
  // quick lil logout arrow func
  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const user = this.props.auth.user;
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>Welcome back,</b> {user.name.split(" ")[0]}
              <p className='flow-text grey-text text-darken-1'>
                You are logged into a full-stack{' '}
                <span style={{ fontFamily: 'monospace' }}>MERN</span> app 😳🔥
              </p>
            </h4>
            {/* Logout button */}
            <button 
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem'
              }}
              onClick={this.onLogoutClick}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, 
  { logoutUser }
) (Home);