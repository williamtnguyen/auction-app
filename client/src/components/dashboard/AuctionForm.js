import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { postAuction } from '../../actions/appActions';
import classnames from 'classnames';
import M from 'materialize-css/dist/js/materialize.min.js';


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

  componentDidMount() {
    // Character counter for description
    var inputNeedsCount = document.querySelectorAll('#description');
    M.CharacterCounter.init(inputNeedsCount);
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
          <div className='col s8 offset-s2'>
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
                  data-length='250'
                  className={classnames('materialize-textarea', {
                    invalid: errors.description
                  })}
                />
                <label htmlFor='description'>Description</label>
                <span className='red-text'>{errors.description}</span>
              </div>
              {/* starting bid input field */}
              <div className='input-field col s4'>
                <i className='material-icons prefix'>attach_money</i>
                <input 
                  id='startingBid'
                  type='number'
                  placeholder='0.00'
                  className={classnames('', {
                    invalid: errors.startingBid
                  })}
                />
                <label htmlFor='startingBid'>Starting Bid</label>
                <span className='red-text'>{errors.startingBid}</span>
              </div>
              {/* buy it now toggle */}
              <div className="switch col s4">
                <label>Buy it now: </label>
                <div>
                  <label id='buyItNow'>
                    Off
                    <input type="checkbox" />
                    <span className="lever"></span>
                    On
                  </label>
                </div>
              </div>
              {/* File upload */}
              <div className="file-field input-field col s9">
                <p >Image Upload:</p>
                <div className="btn waves-effect waves-light hoverable blue lighten-3 black-text">
                  <span>File</span>
                  <input id='imageUpload' type="file" multiple />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" placeholder="Upload one or more images " />
                </div>
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
                  className='btn btn-large waves-effect waves-light hoverable blue lighten-3 black-text'
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