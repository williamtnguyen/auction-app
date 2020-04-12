const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

// Schema/Model for User in the DB
const UserSchema = new Schema ({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  }, 
  date: {
    type: Date, 
    default: Date.now
  },
  // Respective posted auctions/current bids
  auctions: [{
    type: Schema.Types.ObjectId,
    ref: "Auction"
  }],
  bids: [{
    type: Schema.Types.ObjectId,
    ref: "Bids"
  }]
});

const User = mongoose.model("users", UserSchema);
module.exports = User;