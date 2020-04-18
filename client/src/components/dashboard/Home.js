import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';
import mockPic from '../../images/mario_king.jpg';

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
      .get('./api/auctions')
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
            <div key={auction.id} className='col s3'>
              <div className='card small'>
                <div className='card-image'>
                  <img src={mockPic} className='responsive-img'alt=''></img>
                </div>
                <div className='card-content'>
                  <span className='card-title' style={{fontSize:'1.2rem', fontWeight:'430'}}>
                    {auction.title}
                  </span>
                  <p>${auction.currentBid}</p>
                </div>
              </div>
            </div>
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