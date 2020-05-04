import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

// Home component aggregates UtilityNavbar component
import UtilityNavbar from '../dashboard/UtilityNavbar'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      auctions: []
    };
  }

  componentDidMount() {
    // Will either be empty string or the actual queryString
    const queryString = this.props.location.search; 
    axios
      .get(`/api/auctions/${queryString}`)
      .then(res => {
        const allAuctions = res.data;
        console.log(allAuctions)
        this.setState({ auctions: allAuctions })
      })

    // jQuery and JS for materialize.css
    M.AutoInit();
  }

  componentWillReceiveProps() {
    // When component is re-rendered, refresh to ensure latest data is rendered as well as checking for query params
    window.location.reload();
  }


  render() {
    return (
      <div>
        {/* Utility navbar for users only */}
        <UtilityNavbar history={this.props.history}/>
        
        {/* Home-Feed of auction thumbnails */}
        <section className='row container'>

          {this.state.auctions.slice(0).reverse().map(auction => (
            <Link to={`/auctions/${auction._id}`} className='black-text' key={auction._id}>
              <div className='col m3'>
                <div className='card small'>
                  <div className='card-image'>
                    <img src={`/${auction.productImage}`} className='responsive-img' alt=''></img>
                  </div>
                  <div className='card-content'>
                    <span className='card-title' style={{fontSize:'1.1rem', fontWeight:'440'}}>
                      {auction.title}
                    </span>
                    <p>${auction.currentBid}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </section>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, 
  { }
) (Home);
