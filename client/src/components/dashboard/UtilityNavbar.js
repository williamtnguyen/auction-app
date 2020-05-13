import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

import mockPic from '../../images/mario_king.jpg';
import defaultPic from '../../images/logo.jpg'

/* This component is a navbar with utility functions only avail to auth'd users */
class UtilityNavbar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
    // Binding 'this' context for event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  /* Event Handlers */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    // URLSearchParams is available in all modern browsers
    const queryString = new URLSearchParams({ search: this.state.query }).toString();
    // Redirects to 'home' route with a query parameter
    this.props.history.push({
      pathname: '/auctions',
      search: queryString
    })
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
              <Link to='' data-target='slide-out' className='sidenav-trigger show-on-large'>
                <i style={{ color: '#000'}} className='material-icons'>person</i>
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
                  {/* Search Bar for queries */}
                  <li style={{ width: '26rem', paddingLeft: '1rem' }}>
                    <form noValidate onSubmit={this.handleSubmit} >
                      <div className='input-field' className=''>
                        <input 
                          onChange={this.handleChange}
                          value={this.state.query}
                          id='query'
                          type='text' 
                          placeholder='🔎 Search for an item...'
                          style={{paddingLeft: '1rem', background: '#ffffff', borderRadius: '25px'}}
                        />
                      </div>
                    </form>
                  </li>
                </ul> 
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                  <li>
                    <Link to='/auctions/new' 
                      className='btn waves-effect waves-light hoverable red lighten-3 black-text'>
                      Post Auction <i className="material-icons right">add</i>
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
                <Link to=''><img className='circle' src={defaultPic} alt=''></img></Link>
                <Link to=''><span className='black-text name'>{user.name}</span></Link>
                <Link to=''><span className='black-text email'>@GoodSeller</span></Link>
              </div>
            </li>

            <li><Link to='' className='subheader'>eCommerce</Link></li>
            <li><div className='divider'></div></li>

            <li><Link to='/user/my-auctions'><i className='material-icons'>person_outline</i>My Auctions</Link></li>
            <li><Link to='/user/my-bids'><i className='material-icons'>local_atm</i>My Bids</Link></li>
            <li><Link to='/user/my-cart'><i className='material-icons'>shopping_cart</i>My Won Bids/Cart</Link></li>
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