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
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;