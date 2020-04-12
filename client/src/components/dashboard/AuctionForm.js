import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postAuction } from '../../actions/appActions';
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
    this.props.postAuction(newAuction);
  }


  render() {
    const errors = this.state.errors;
    return (
      
    )
  }
}