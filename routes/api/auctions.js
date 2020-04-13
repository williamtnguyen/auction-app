const express = require('express'),
      router  = express.Router();
      // bcrypt  = require('bcryptjs'),
      // jwt     = require('jsonwebtoken'),

// Load input validation
const validateAuctionInput = require('../../validation/auction-form');

// Load Auction model
const Auction = require('../../models/Auction');
const User    = require('../../models/User');

/**
 * AUCTION ENDPOINT
 * @route POST api/auctions
 * @desc post a new item for auction
 * @access Public
 */
router.post('/auctions', (req, res) => {
  // Form validation
  const { errors, isValid } = validateAuctionInput(req.body);
  // Check input validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const authorID      = req.body.author.id,
        authorName    = req.body.author.name;

  // Otherwise, valid inputs. Create the auction post
  const newAuction = new Auction({
    author: { authorID, authorName }, // Storing the posts' author ID & name
    title: req.body.title, 
    description: req.body.description,
    currentBid: req.body.startingBid,
    hasBuyItNow: req.body.hasBuyItNow,
    buyItNow: req.body.buyItNow
  });

  // Find the respective author and add 'newAuction' to their 'auctions' array
  User.findById(authorID, (err, foundUser) => {
    if(err) {
      return console.log('Error' + err);
    }
    foundUser.auctions.push(newAuction);
    foundUser.save();
  });
  
  // For postman/api testing
  res.json({
    newAuction: newAuction, 
    author: foundUser
  });
  
});

module.exports = router;