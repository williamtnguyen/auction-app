import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
import mockPic from '../../images/mario_king.jpg';
import UtilityNavbar from './UtilityNavbar'

class MockHome extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div>
        {/* Utility navbar for users only */}
        <UtilityNavbar />
        
        {/* Home-feed */}
        <section className='row'>
          <div className='row container'>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>

          </div>
          <div className='row container'>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>

          </div>
          <div className='row container'>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>
            <div className='col s3'>
              <div class="card">
                <div class="card-image">
                  <img src={mockPic}></img>
                </div>
                <div class="card-content">
                  <span class="card-title">Toilet Paper</span>  
                  <p>$6969</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    );
  }
}

MockHome.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, 
  { }
) (MockHome);