import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

// MyAuctions component aggregates UtilityNavbar component
import UtilityNavbar from './UtilityNavbar';

// Component to view posted auctions as a seller
class MyAuctions extends Component {
  constructor() {
    super();
    this.state = {
      auctions: []
    };
  }

  componentDidMount() {
    const userID = this.props.auth.user.id;
    // Making a GET request of for all posted documents from logged in user
    axios
      .get(`/api/users/${userID}/my-auctions`)
      .then(res => {
        const myAuctions = res.data;
        console.log(myAuctions);
        this.setState({ auctions: myAuctions });
      })

      // jQuery and JS for materialize.css
      M.AutoInit();
  }


  render() {
    return (
      <div>
        {/* Utilitiy navbar for users only */}
        <UtilityNavbar />

        {/* UL of collapsible posted auctions */}
        <section className='row container'>
          
          <h4 className='center'><b>My Posted Auctions</b></h4>
          <div className='divider'></div>
          <div style={{ paddingTop: '1rem' }} className='col m8 offset-m2'>
            <ul className='collapsible popout'>
              {this.state.auctions.slice(0).reverse().map(auction => (
                <li key={auction._id}>
                  <div className='collapsible-header'>
                    <h6><b>{auction.title}:</b> ${auction.currentBid}</h6>
                  </div>
                  <div className='collapsible-body'>
                    <img src={`/${auction.productImage}`} className='responsive-img' alt=''></img>
                    <h6><i>Description:</i></h6>
                    <blockquote>{auction.description}</blockquote>
                  </div>
                </li>
              ))}
            </ul>
          </div>
      
        </section>

      </div>
    )
  }
}

MyAuctions.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { }
) (MyAuctions);
