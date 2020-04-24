import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

import mockPic from '../../images/mario_king.jpg';


class UtilityNavbar extends Component {

  componentDidMount() {
    // let sidenav = document.querySelector('#slide-out');
    // M.Sidenav.init(sidenav, {});
    M.AutoInit();
  }

  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.logoutUser();
    // TODO: remove sidenav-overlay class or make opacity = 0
  };

  render() {
    const user = this.props.auth.user;
    return(
      <div>
        {/* Navbar for logged-in users, has UTILITIES */}
        <section className='row'>
          <div className='navbar-fixed'>
            <nav className='grey lighten-4'>
              <Link to='' data-target='slide-out' className='sidenav-trigger show-on-large hoverable'>
                  <i style={{ color: '#000'}} className='material-icons'>person</i>
                  {user.name}
              </Link>
              <div className='nav-wrapper container'>
                <ul id='nav-mobile' className='left hide-on-med-and-down'>
                  <li><Link to='/auctions'className='black-text'>home</Link></li>
                  <li>
                    <Link to='' className='dropdown-trigger black-text' data-target='dropdown1'>
                      shop by category
                      <i className='material-icons right'>arrow_drop_down</i>
                    </Link>
                  </li>
                  <li>
                  {/* !! Search bar here !! */}
                  </li>
                </ul> 
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                  <li>
                    <Link to='/auctions/new' 
                      className='btn waves-effect waves-light hoverable blue lighten-3 black-text'>
                      Post Bidding <i className="material-icons right">add</i>
                    </Link>
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
                <Link to='/profile'><img className='circle' src={mockPic} alt=''></img></Link>
                <Link to=''><span className='black-text name'>{user.name}</span></Link>
                <Link to=''><span className='black-text email'>@GoodSeller</span></Link>
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
            <li><Link to='' onClick={this.onLogoutClick}><i className='material-icons'>power_settings_new</i>Sign Out</Link></li>
          </ul>

          {/* Dropdown structure for categories tab */}
          <ul id='dropdown1' className='dropdown-content'>
            <li style={{ fontSize:'30px' }}><a>home appliances</a></li>
            <li style={{ fontSize:'30px' }}><a>yard, garden, & decor</a></li>
            <li style={{ fontSize:'30px' }}><a>electronics</a></li>
          </ul>
        </section>
      </div>
    );
  }
}

UtilityNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, 
  { logoutUser }
) (UtilityNavbar);