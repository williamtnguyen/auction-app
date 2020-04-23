import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';
// import mockPic from '../../images/mario_king.jpg';

// Home component aggregates UtilityNavbar component
import UtilityNavbar from './UtilityNavbar'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      auctions: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/auctions')
      .then(res => {
        const allAuctions = res.data;
        console.log(allAuctions)
        this.setState({ auctions: allAuctions })
      })

    // jQuery and JS for materialize.css
    M.AutoInit();
  }


  render() {
    return (
      <div>
        {/* Utility navbar for users only */}
        <UtilityNavbar />
        
        {/* Home-feed */}
        <section className='row container'>

          {this.state.auctions.map(auction => (
            <Link to={`/auctions/${auction._id}`} className='black-text' key={auction._id}>
              <div className='col s3'>
                <div className='card small'>
                  <div className='card-image'>
                    <img src={`/${auction.productImage}`} className='responsive-img'alt=''></img>
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
