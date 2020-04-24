import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';

class Auction extends Component {
  constructor() {
    super();
    this.state = {
      author: {},
      title: '',
      description: '',
      currentBid: 0.00,
      hasBuyItNow: false,
      buyItNow: 0.00,
      productImage: '',
      // Todo: add auctionEndingDate field
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.match.params);
    const { auctionID } = this.props.match.params;
    axios
      .get(`/api/auctions/${ auctionID }`)
      .then(res => {
        const auction = res.data;
        console.log(auction);
        this.setState({
          author: auction.author,
          title: auction.title,
          description: auction.description,
          currentBid: auction.currentBid,
          currentBidder: auction.currentBidder,
          hasBuyItNow: auction.hasBuyItNow,
          buyItNow: auction.buyItNow,
          productImage: auction.productImage
        });
      });
      M.AutoInit();
  }


  /* EVENT HANDLERS */
  handleChange(event) {
    this.setState({ [event.target.id] : event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { auctionID } = this.props.match.params;
    const newBidData = { 
      newBidder: this.props.auth.user.id, 
      newBid: this.state.currentBid 
    };
    axios
      .put(`/api/auctions/${ auctionID }`, newBidData) 
      .then(res => console.log(res))
  }


  render() {
    return (
      <div className='container'>
        <Link to='/auctions' className='btn-flat waves-effect' style={{ paddingBottom: '5rem' }}>
          <i className='material-icons left'>keyboard_backspace</i>Back to dashboard
        </Link>
        <div className='row'>
          <div className='col m5'>
            <img src={`/${this.state.productImage}`} className='responsive-img' alt=''></img>
          </div>
          <div className='col m7'>
            <h3><b>{this.state.title}</b></h3>
            <blockquote>{this.state.description}</blockquote>
            <h5><b>Current bid:</b> <i className='material-icons'>attach_money</i>{this.state.currentBid}</h5>
            
            {/* Todo: write post route for a bid */}
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="input-field col m7">
                <i className="material-icons prefix">attach_money</i>
                <input 
                  onChange={this.handleChange}
                  id="bid" 
                  type="number" 
                  placeholder="0.00" 
                  className="validate"
                />
                <label htmlFor="bid">Bid amount</label>
                <span className="helper-text" data-error="wrong" data-success="right">Enter at least ${this.state.currentBid + 1} or more to bid</span>
              </div>
              {/* submit button */}
              <div className='col m2' style={{ paddingLeft: '11.25px'}}>
                <button 
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem'
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue lighten-3 black-text'
                >
                  Place Bid
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Auction.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { }
) (Auction);