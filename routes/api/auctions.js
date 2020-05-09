const express = require('express'),
      router  = express.Router(),
      multer  = require('multer');


// Load Auction & User model
const Auction = require('../../models/Auction');
const User    = require('../../models/User');

// Load input validation
const validateAuctionInput = require('../../validation/auctionForm');
const validateAuctionBid   = require('../../validation/auctionBid');

/* Configuring Multer Storage Engine for file uploads */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    const fileExtension = (file.mimetype === 'image/jpeg') ? '.jpg' : '.png';
    callback(null, file.fieldname + '_' + Date.now() + fileExtension);
  }  
});
const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}
const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB max size
  },
  fileFilter: fileFilter
});


/**
 * AUCTION 'INDEX' ENDPOINT
 * @route GET api/auctions
 * @desc res --> all auctions
 * @access Public
 */
router.get('/', (req, res) => {
  if(!req.query.search) {
    // Get all auctions from DB and send them off as JSON 
    Auction.find({ endingDate: { $gte: new Date() }}, (err, allAuctions) => {
      if(err) { 
        return console.log(`No auctions found: ${err}`); 
      }
      res.json(allAuctions);
    });
  } 
  else {
    console.log(`Query: ${req.query.search}`);
    // Get all auctions that match the query and return them in order of relevance
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Auction
      .find({ $text: { $search: regex }, endingDate: { $gte: new Date() }}, { score: {$meta: 'textScore'}})
      .exec((err, matchedAuctions) => { 
        if(err) { return console.log('need to handle no search hit here') }
        res.json(matchedAuctions);
      });
  }
});


/**
 * AUCTION 'SHOW' ENDPOINT
 * @route GET api/auctions/:auctionID
 * @desc res --> one auction
 * @access Public
 */
router.get('/:auctionID', (req, res) => {
  Auction.findById(req.params.auctionID, (err, auction) => {
    if(err) {
      return console.log(`No auction found under this ID: ${err}`);
    }
    res.json(auction);
  });
});


/**
 * AUCTION 'CREATE' ENDPOINT
 * @route POST api/auctions
 * @desc create a new item for auction, then redirect
 * @access Public
 */
router.post('/', upload.single('productImage'), (req, res) => {
  // Form validation
  const { errors, isValid } = validateAuctionInput(req.body);
  // Check input validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const authorID      = req.body.authorID,
        authorName    = req.body.authorName;

  // console.log(req.file);
  // console.log(req.body);

  // Creating one date object comprised from endingDate and endingTime
  let endingDateString = req.body.endingDate.concat(' ');
  endingDateString = endingDateString.concat(req.body.endingTime);
  const endingDate = new Date(endingDateString);
  console.log(endingDate);
  
  // Otherwise, valid inputs. Create the auction post
  const newAuction = new Auction({
    author: { id: authorID, name: authorName }, // Storing the posts' author ID & name
    title: req.body.title, 
    description: req.body.description,
    currentBid: req.body.startingBid,
    hasBuyItNow: req.body.hasBuyItNow,
    buyItNow: req.body.buyItNow,
    productImage: req.file.path, // req.file object comes from multer's 'upload.single()' middleware
    endingDate: endingDate
  });
  newAuction.save(err => {
    return console.log(err);
  });

  // Find the respective author and add 'newAuction' to their 'auctions' array
  User.findById(authorID, (err, foundUser) => {
    if(err) {
      return console.log(`Could not find OP for auction: ${err}`);
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


/**
 * AUCTION 'UPDATE' ENDPOINT
 * @route PUT /api/auctions/:auctionID
 * @desc updates the current bid on an auction
 * @access Public
 */
router.put('/:auctionID', (req, res) => {
  // Form validation
  const { errors, isValid } = validateAuctionBid(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const newBidderID     = req.body.newBidderID,
        newBidderName   = req.body.newBidderName,
        newBid          = req.body.newBid;

  Auction.findById(req.params.auctionID, (err, foundAuction) => {
    if(err) {
      return console.log(`For some reason, can't find the Auction in the DB: ${err}`)
    }

    // Server-side validation
    if(foundAuction.currentBid + 1 > newBid) {
      let newBidError = { newBid: `Too low!`}
      return res.status(400).json(newBidError);
    }
    
    foundAuction.currentBid = newBid;
    foundAuction.save();

    // If the newBidder is not the same as the previous
    if(foundAuction.currentBidder.id !== newBidderID) {
      // Add 'foundAuction' to bids array of newBidder
      User.findById(newBidderID, (err, foundUser) => {
        if(err) {
          return console.log(`For some reason, can't find User in DB: ${err}`);
        }
        foundUser.bids.push(foundAuction);
        foundUser.save();
      });

      // If there is an 'oldBidder', remove 'foundAuction' from their bids array 
      if(foundAuction.currentBidder.id !== 'dummyID') {
        User.findById(foundAuction.currentBidder.id, (err, foundUser) => {
          if(err) {
            return console.log(`For some reason, can't find User in DB: ${err}`);
          }
          const bidIndex = foundUser.bids.indexOf(foundAuction._id)
          if(bidIndex > -1) { 
            foundUser.bids.splice(bidIndex, 1); 
            foundUser.save();
          }
        });
      }
      // Only need to update currentBidder if it is somebody new
      foundAuction.currentBidder.id   = newBidderID;
      foundAuction.currentBidder.name = newBidderName;
    }

    res.json({
      updatedAuction: foundAuction,
      newBidder: { id: newBidderID, name: newBidderName }
    });
  });
});


/**
 * AUCTION 'DELETE' ENDPOINT
 * @route POST api/auctions/purchased-cart
 * @desc removes from 'myCart' on client from the 'bids' array in mongoose. 
 * @access Public
 */
router.post('/purchased-cart', (req, res) => {
  const { buyerID, myCartIDs } = req.body;

  // Remove the Auctions from the respective buyers's bids array
  User.findById(buyerID)
    .then(foundBuyer => {
      console.log(`Before:\n ${foundBuyer.bids}`);
      myCartIDs.forEach(auctionID => {
        let bidIndex = foundBuyer.bids.indexOf(auctionID);
        if(bidIndex > -1) {
          foundBuyer.bids.splice(bidIndex, 1);
        }
      });
      console.log(`After:\n ${foundBuyer.bids}`);
      
      // Save changes and respond with JSON
      foundBuyer.save();
      res.json({ deletedAuctions: myCartIDs, buyerCart: foundBuyer.bids });
    })
    .catch(err => {});

  // // Delete the Auction documents
  // Auction.deleteMany({
  //   _id: { $in: myCartIDs }
  // }, (err) => {
  //   if(err) { return console.log(`Error deleting Auction documents from myCart: ${err}`) }
  //   console.log(`Auction documents from myCart were deleted!`);
  // });
})



/**
 * Helper method: escaping regex
 * @desc utilizes escape regex to do fuzzy search with mongo query
 */
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;