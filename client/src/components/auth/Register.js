import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  /* ~~~~ EVENT HANDLERS ~~~~ */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }; 

  handleSubmit(event) {
    // preventDefault stops the page from reloading when submit button is clicked
    event.preventDefault();
    // Create new user from user input (will be sent to backend via Redux)
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    console.log(newUser);
  };


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
                />
                <label htmlFor='name'>Name</label>
              </div>
              {/* Email input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                />
                <label htmlFor='email'>Email</label>
              </div>
              {/* Password input field */}  
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.password}
                  error={errors.password}
                  id='password'
                  type='password'
                />
                <label htmlFor='password'>Password</label>
              </div>
              {/* Password-Confirmation input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.confirmPassword}
                  error={errors.confirmPassword}
                  id='confirmPassword'
                  type='password'
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
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
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
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

export default Register;