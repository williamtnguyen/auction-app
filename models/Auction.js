const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

// Schema/Model for Auction in the DB
const AuctionSchema = new Schema ({
  author: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // initially 'startingBid', this field is subject be updated; hence 'currentBid'
  currentBid: {
    type: Number,
    default: 0.00,
    required: true
  },
  hasBuyItNow: {
    type: Boolean,
    default: false
  },
  buyItNow: {
    type: Number
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Auction = mongoose.model("auctions", AuctionSchema);
module.exports = Auction;