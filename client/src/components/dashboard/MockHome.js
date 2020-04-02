import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
import mockPic from '../../images/mario_king.jpg';

class MockHome extends Component {

  componentDidMount() {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
  }

  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.logoutUser();
    // TODO: remove sidenav-overlay class or make opacity = 0
  };

  render() {
    const user = this.props.auth.user;

    return (
      <div>
        {/* Navbar for logged-in users */}
        <section className='row'>
          <div className='navbar-fixed'>
            <nav className='grey lighten-4'>
              <a href='#' data-target='slide-out' className='sidenav-trigger show-on-large'>
                  <i style={{ color: '#000'}} className='material-icons'>
                    person_outline
                  </i>
                  {user.name}
              </a>
              <div className='nav-wrapper container'>
                <ul id='nav-mobile' className='left hide-on-med-and-down'>
                  <li><a className='black-text'>home</a></li>
                  <li>
                    <a className='dropdown-trigger black-text' data-target='dropdown1'>
                      shop by category
                      <i className='material-icons right'>arrow_drop_down</i>
                    </a>
                  </li>
                  <li>
                    <form>
                      <div className="input-field">
                        <input id="search" type="search" required></input>
                        <label className="label-icon" for="search"><i className="material-icons black-text">search</i></label>
                        <i className="material-icons">close</i>
                      </div>
                    </form>
                  </li>
                </ul> 
              </div>
            </nav>
          </div>

          {/* Sidenav menu bar */}
          <ul id='slide-out' className='sidenav'>
            <li>
              <div className='user-view'>
                <div className='background grey lighten-4'></div>
                <Link to='/profile'><img className='circle' src=''></img></Link>
                <Link to=''><span class='black-text name'>{user.name}</span></Link>
                <Link to=''><span class='black-text email'>@GoodSeller</span></Link>
              </div>
            </li>

            <li><Link to='' className='subheader'>eCommerce</Link></li>
            <li><div className='divider'></div></li>

            <li><Link to='item2'><i className='material-icons'>local_atm</i>Bids/Offers</Link></li>
            <li><Link to='item3'><i className='material-icons'>shopping_cart</i>Won Bids/Purchased</Link></li>
            <li><Link to='item1'><i className='material-icons'>mail_outline</i>Messages</Link></li>

            <li><Link to='' className='subheader'>Account Settings</Link></li>
            <li><div className='divider'></div></li>

            <li><Link to='item1'><i className='material-icons'>settings</i>Edit Profile</Link></li>
            <li><Link onClick={this.onLogoutClick}><i className='material-icons'>power_settings_new</i>Sign Out</Link></li>
          </ul>

          {/* NOT WORKING: Dropdown structure for categories tab */}
          <ul id='dropdown1' className='dropdown-content'>
            <li><a>home appliances</a></li>
            <li><a>yard, garden, & decor</a></li>
            <li><a>electronics</a></li>
          </ul>
        </section>

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

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, 
  { logoutUser }
) (MockHome);