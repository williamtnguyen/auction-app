const express = require('express'),
      router  = express.Router(),
      bcrypt  = require('bcryptjs'),
      jwt     = require('jsonwebtoken'),
      keys    = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public 
 */
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if(!isValid) {
    return res.status(400).json(errors);
  }
  // Otherwise, valid credentials
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
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});