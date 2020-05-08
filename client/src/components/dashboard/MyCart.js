import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

// MyCart component aggregates UtilityNavbar component
import UtilityNavbar from './UtilityNavbar';
import PaypalButton from '../paypal/PaypalButton';

// Component to view won-bids as a buyer
class MyCart extends Component {
  constructor() {
    super();
    this.state = {
      myCart: [], // For rendering component
      myCartIDs: [], // For onApprove API call when paypal OAuth completes
      totalPrice: 0.00
    };
    // Binding 'this' context for event handlers
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    const userID = this.props.auth.user.id;
    // Making a GET request for all won bidded documents from logged in user
    axios
      .get(`/api/users/${userID}/my-cart`)
      .then(res => {
        const myCart = res.data;
        let sum       = 0,
            myCartIDs = []
        myCart.forEach(auction => {
          sum += auction.currentBid;
          myCartIDs.push(auction._id);
        });

        this.setState({ myCart: myCart, myCartIDs: myCartIDs, totalPrice: sum });
      })
      // jQuery and JS for materialize.css
      M.AutoInit();
  }

  /* ~~~~ Event Handlers ~~~~ */
  handleRemove(auctionID) {
    // TODO: will remove the auction with auctionID from the 'bids' array of user
  }

 
  render() {
    if(!this.state.myCart.length) {
      return (
        <div>
          {/* Utilitiy navbar for users only */}
          <UtilityNavbar />

          {/* UL of collapsible posted auctions */}
          <section className='row container center'>
            <h4 style={{ marginTop: '4rem' }}><b>My Cart</b></h4>
            <div className='divider'></div>

            <section style={{ paddingTop: '2rem' }}>
              <i className='material-icons' style={{ fontSize: '3rem' }}>shopping_cart</i>
              <h6>Looks like your cart is empty. Please bid on items to checkout.</h6>
            </section>
          </section>
        </div>
      );
    }
    
    return (
      <div>
        {/* Utilitiy navbar for users only */}
        <UtilityNavbar />

        {/* UL of collapsible posted auctions */}
        <section className='row container'>
          
          <h4 className='center' style={{ marginTop: '4rem' }}><b>My Cart</b></h4>
          <div className='divider'></div>
          <div style={{ paddingTop: '1rem' }} className='col m8 offset-m2'>
            <ul className='collection' style={{ borderRadius: '5px' }}>

              {this.state.myCart.slice(0).reverse().map(auction => (
                <li key={auction._id} className='collection-item avatar'>
                  <img src={`/${auction.productImage}`} className='responsive-img circle' alt=''></img>
                  <span className='title'><b>{auction.title}</b></span>
                  <p className='grey-text'><i>Seller: {auction.author.name}</i></p>
                  <button onClick={this.handleRemove(auction._id)} className='btn-flat waves-effect'>
                    <i className='material-icons left'>delete_forever</i>Remove
                  </button>
                  <span className='secondary-content black-text'><b>${auction.currentBid}</b></span>
                </li>
              ))}

            </ul>
                  
            <h6 className='right'><b>Subtotal: ${this.state.totalPrice}</b></h6>
            {/* Paypal buttons */}
            <PaypalButton 
              buyerID={this.props.auth.user.id} 
              myCartIDs={this.state.myCartIDs} 
              amount={this.state.totalPrice} 
            />
          </div>
      
        </section>

      </div>
    )
  }
}

MyCart.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { }
) (MyCart);