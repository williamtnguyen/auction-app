import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

// Component for Register form
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    // binding 'this' context for event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // If user is already logged in and tries to access this register route, should redirect to home
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/auctions');
    }
  }

  // Called when component may receive new properties
  componentWillReceiveProps(nextProps) {
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
    // Create object from user input (will be sent to backend via Redux)
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    // console.log(newUser);
    // On submission of form, dispatch the registerUser action to Redux store
    this.props.registerUser(newUser, this.props.history);
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
                <b>Register</b> below
              </h4>
              <p className='grey-text text-darken-1'>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </div>
            {/*  REGISTER FORM */}
            <form noValidate onSubmit={this.handleSubmit}>
              {/* Name input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.name}
                  error={errors.name}
                  id='name'
                  type='text'
                  className={classnames('', {
                    invalid: errors.name,
                  })}
                />
                <label htmlFor='name'>Name</label>
                <span className='red-text'>{errors.name}</span>
              </div>
              {/* Email input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email,
                  })}
                />
                <label htmlFor='email'>Email</label>
                <span className='red-text'>{errors.email}</span>
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
                    invalid: errors.password,
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>{errors.password}</span>
              </div>
              {/* Password-Confirmation input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.confirmPassword}
                  error={errors.confirmPassword}
                  id='confirmPassword'
                  type='password'
                  className={classnames('', {
                    invalid: errors.confirmPassword,
                  })}
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <span className='red-text'>{errors.confirmPassword}</span>
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
                  Sign Up
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Getting state from redux and mapping it to props to use in components
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

// export default Register;
export default connect(
  mapStateToProps, 
  { registerUser }
) (withRouter(Register)); // withRouter allows redirect within an action