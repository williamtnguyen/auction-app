const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

// Schema/Model for Auction in the DB
const AuctionSchema = new Schema ({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  currentBid: {
    type: Number,
    default: 0.00
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