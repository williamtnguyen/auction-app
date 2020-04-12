import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { postAuction } from '../../actions/appActions';
import classnames from 'classnames';

class AuctionForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      startingBid: 0.00,
      hasBuyItNow: false,
      buyItNow: 0.00,
      errors: {}
    };
    // binding 'this' context for event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* ~~~~ EVENT HANDLERS ~~~~ */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event) {
    // preventDefault stops the page from reloading when submit button is clicked
    event.preventDefault();
    // Todo: create auction object (will be sent to backend via Redux)
    const newAuction = {
      title: this.state.title,
      description: this.state.description,
      startingBid: this.state.startingBid,
      hasBuyItNow: this.state.hasBuyItNow,
      buyItNow: this.state.buyItNow
    };
    console.log(newAuction);
    // TODO: write appActions.js and the postAuction method
    // this.props.postAuction(newAuction);
  }


  render() {
    const errors = this.state.errors;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col 28 offset-s2'>
            <Link to='/home' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i>Back to dashboard
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.25px'}}>
              <h4><b>Auction</b> your item below</h4>
            </div>

            {/* Auction Form */}
            <form noValidate onSubmit={this.handleSubmit}>
              {/* Title input field */}
              <div className='input-field col s12'>
                <input 
                  onChange={this.handleChange}
                  value={this.state.email}
                  error={errors.title}
                  id='title'
                  type='text'
                  className={classnames('', {
                    invalid: errors.title
                  })}
                />
                <label htmlFor='title'>Title</label>
                <span className='red-text'>{errors.title}</span>
              </div>
              {/* Description input field */}
              <div className='input-field col s12'>
                <textarea
                  onChange={this.handleChange}
                  value={this.state.description}
                  error={errors.description}
                  id='description'
                  maxLength='250'
                  className={classnames('materialize-textarea', {
                    invalid: errors.description
                  }) }
                />
                <label htmlFor='description'>Description</label>
                <span className='red-text'>{errors.description}</span>
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
                  Post Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuctionForm;