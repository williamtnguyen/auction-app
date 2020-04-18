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
 * AUCTION 'INDEX' ENDPOINT
 * @route GET api/auctions
 * @desc res --> all auctions
 * @access Public
 */
router.get('/', (req, res) => {
  /* TODO: conditional statements depending on category filter */

  // Get all auctions from DB and send them off as JSON 
  Auction.find({}, (err, allAuctions) => {
    if(err) { 
      return console.log(`No auctions found: ${err}`); 
    }
    res.json(allAuctions);
  });
});


/**
 * AUCTION 'CREATE' ENDPOINT
 * @route POST api/auctions
 * @desc create a new item for auction, then redirect
 * @access Public
 */
router.post('/', (req, res) => {
  // Form validation
  const { errors, isValid } = validateAuctionInput(req.body);
  // Check input validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const authorID      = req.body.authorID,
        authorName    = req.body.authorName;

  // Otherwise, valid inputs. Create the auction post
  const newAuction = new Auction({
    author: { id: authorID, name: authorName }, // Storing the posts' author ID & name
    title: req.body.title, 
    description: req.body.description,
    currentBid: req.body.startingBid,
    hasBuyItNow: req.body.hasBuyItNow,
    buyItNow: req.body.buyItNow
  });
  newAuction.save(err => {
    return console.log(err);
  });

  // Find the respective author and add 'newAuction' to their 'auctions' array
  User.findById(authorID, (err, foundUser) => {
    if(err) {
      return console.log('Could not find OP for auction: ' + err);
    }
    foundUser.auctions.push(newAuction);
    foundUser.save();
    
    // For postman/api testing
    res.json({
      newAuction: newAuction, 
      author: foundUser
    });
  });
});

module.exports = router;