import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

// Component for Register form
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    // binding 'this' context for event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // If user is already logged in and tries to access this route, should redirect to home
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/auctions');
    }
  }

  // Called when component may receive new properties
  componentWillReceiveProps(nextProps) {
    // redirect user to home-feed when logged-in
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/auctions');
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  /* ~~~~ EVENT HANDLERS ~~~~ */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  } 

  handleSubmit(event) {
    // preventDefault stops the page from reloading when submit button is clicked
    event.preventDefault();
    // Create user object from existing user-data (will be sent to backend via Redux)
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // console.log(userData);
    // redirect is done within component, so this.props.history param is !passed
    this.props.loginUser(userData);
  }

  
  render() {
    const errors = this.state.errors;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.25px'}}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className='grey-text text-darken-1'>
                Don't have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
            
            {/*  LOGIN FORM */}
            <form noValidate onSubmit={this.handleSubmit}>
              {/* Email input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor='email'>Email</label>
                <span className='red-text'>
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              {/* Password input field */}  
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.password}
                  error={errors.password}
                  id='password'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
            
              {/* Submit Button */}
              <div className='col s12' style={{ paddingLeft: '11.25px'}}>
                <button 
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem'
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable teal lighten-1'
                >
                  Login
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// export default Login;
export default connect(
  mapStateToProps, 
  { loginUser }
) (Login);