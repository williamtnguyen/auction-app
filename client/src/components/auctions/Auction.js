import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { placeBid } from '../../actions/auctionActions';
import classnames from 'classnames';
import axios from 'axios';

import M from 'materialize-css/dist/js/materialize.min.js';
import countDownTimer from '../../utils/countDown';

class Auction extends Component {
  constructor() {
    super();
    this.state = {
      author: {},
      title: '',
      description: '',
      currentBid: 0.00,
      currentBidder: '',
      hasBuyItNow: false,
      buyItNow: 0.00,
      productImage: '',
      newBid: 0.00, // newBid needs its own state
      endingDate: '',
      errors: {}
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
          productImage: auction.productImage,
          endingDate: auction.endingDate
        });
      });
      // jQuery and JS for materialize.css
      // M.AutoInit();
      // const dateObject = new Date(`${this.state.endingDate}`);
      // const diffSeconds = Math.abs((dateObject - Date.now()) / 1000);
      // const timeLeft = document.querySelector('#countDown');
      // countDownTimer(diffSeconds, timeLeft);
  }

  // Depreacted lifecycle, revise when all functionality is done
  componentWillReceiveProps(nextProps) {
    if(nextProps.auction.bidPlaced) {
      window.location.reload(); // react/redux driven refresh (only refresh on successful PUT)
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  /* EVENT HANDLERS */
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault(); 
    const { auctionID } = this.props.match.params;
    const newBidData = { 
      newBidderID: this.props.auth.user.id, 
      newBidderName: this.props.auth.user.name,
      newBid: this.state.newBid 
    };

    this.props.placeBid(auctionID, newBidData);
  }


  render() {
    const errors = this.state.errors;
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
            <p><b><i className='material-icons'>person_outline</i> Seller: </b> {this.state.author.name}</p>
            <blockquote>{this.state.description}</blockquote>
            {/* <h5><b>Ends in:</b> <span id='countDown'></span></h5> */}
            <h5><b>Current bid:</b> <i className='material-icons'>attach_money</i>{this.state.currentBid}</h5>
            
            {/* Form: PUT route for a bid */}
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="input-field col m7">
                <i className="material-icons prefix">attach_money</i>
                <input 
                  onChange={this.handleChange}
                  id="newBid" 
                  type="number" 
                  placeholder="0.00" 
                  className={classnames('', {
                    invalid: errors.newBid
                  })}
                />
                <label htmlFor="bid">Bid amount</label>
                <span className="helper-text">Enter at least ${this.state.currentBid + 1} or more to bid</span>
                <span className="red-text" style={{paddingLeft: '3rem'}}>{errors.newBid}</span>
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
  placeBid: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  auction: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  auction: state.auction,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { placeBid }
) (Auction);