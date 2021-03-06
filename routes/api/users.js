const express = require('express'),
      router  = express.Router(),
      bcrypt  = require('bcryptjs'),
      jwt     = require('jsonwebtoken'),
      keys    = require('../../config/keys');


// Load User model
const User = require('../../models/User');
const Auction = require('../../models/Auction');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


/**
 * REGISTER ENDPOINT
 * @route POST api/users/register
 * @desc Register a user
 * @access Public 
 */
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check input validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // Otherwise, valid inputs. Check if user already exists in DB
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'Email already exists'});
      } else {
        // Create newUser object from request body via input from client
        const newUser = new User({
          name: req.body.name, 
          email: req.body.email,
          password: req.body.password
        });

        // Hash password before saving in DB
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user)) // returns user as JSON
              .catch(err => console.log(err));
          });
        });
      }
    });
});


/**
 * LOGIN ENDPOINT
 * @route POST api/users/login
 * @desc Login a user and return JWT 
 * @access Public 
 */
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check input validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // Otherwise, valid inputs. Check if user already exists in DB
  const email     = req.body.email,
        password  = req.body.password;

  // Check is user exists in DB via email
  User.findOne({ email })
    .then(user => {
      if(!user) {
        return res.status(404).json({ emailnotfound: 'Email not found' });
      }

      // Check if password submitted by client matches hashed password in DB
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User successfully logs in, create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            };
            
            // Signing the JWT
            jwt.sign(
              payload, 
              keys.secretOrKey, 
              {
                expiresIn: 31556926 // 1 year in seconds from now is when the token expires
              }, 
              (err, token) => {
                if(err) {
                  return console.log(err);
                }
                // Return JWT
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } 
          else {
            return res.status(400).json({ passwordincorrect: 'Password incorrect' });
          }
        });
    });
});


/**
 * MY-AUCTIONS ENDPOINT
 * @route GET api/users/:userID/my-auctions
 * @desc res --> all auctions a user has posted
 * @access Public
 */
router.get('/:userID/my-auctions', (req, res) => {
  User.findById(req.params.userID)
    .then(user => {
      const userAuctionIDs = user.auctions;
      // Find all auctions from the currentUsers' array of auction id's and respond w/ all the documents as JSON
      Auction.find({
        _id: { $in: userAuctionIDs }
      })
      .then(userAuctions => {
        res.json(userAuctions);
      })
      .catch(err => {});
    });
});


/**
 * MY-BIDS ENDPOINT
 * @route GET api/users/:userID/my-bids
 * @desc res --> all CURRENT bids
 * @access Public
 */
router.get('/:userID/my-bids', (req, res) => {
  User.findById(req.params.userID)
    .then(user => {
      const userBidIDs = user.bids;
      // Find all bids from the currentUsers' array of auction id's that they've bid on and hasn't expired
      Auction.find({
        _id: { $in: userBidIDs },
        endingDate: { $gte: new Date() }
      })
      .then(userBids => {
        res.json(userBids);
      })
      .catch(err => {});
    });
});


/**
 * 'MY-WON-AUCTIONS' ENDPOINT (more simply my-cart)
 * @route GET api/users/:userID/my-cart
 * @desc res --> all EXPIRED/WON bids
 * @access Public
 */
router.get('/:userID/my-cart', (req, res) => {
  User.findById(req.params.userID)
    .then(user => {
      const userBidIDs = user.bids;
      // Find all bids from the currentUsers' array of auction id's they've bid on and has expired
      Auction.find({
        _id: { $in: userBidIDs },
        $or: [{isBought: true}, {endingDate: { $lte: new Date() }},]
      })
      .then(userBids => {
        res.json(userBids);
      })
      .catch(err => {});
    });
});


// Modularity of API endpoints
module.exports = router;