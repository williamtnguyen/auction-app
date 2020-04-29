const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

// Schema/Model for Auction in the DB
const AuctionSchema = new Schema ({
  author: {
    id: {
      type: String,
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
  currentBidder: {
    id: {
      type: String,
      default: 'dummyID',
    },
    name: {
      type: String,
      default: 'dummyUser'
    }
  },
  hasBuyItNow: {
    type: Boolean,
    default: false
  },
  buyItNow: {
    type: Number
  },
  productImage: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  // Materialize.css string inputs --> JS date object --> BSON native date object in Mongo
  endingDate: {
    type: Date,
    required: true
  }
});

// Text Indexing for queries via search bar
AuctionSchema.index({ title: "text", description: "text" });

const Auction = mongoose.model("auctions", AuctionSchema);
module.exports = Auction;