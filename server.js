const express     = require('express'),
      mongoose    = require('mongoose'),
      bodyParser  = require('body-parser'),
      passport    = require('passport');
      app         = express();

const users       = require('./routes/api/users'),
      auctions    = require('./routes/api/auctions'); 

// Middleware for getting input from client-side
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Makes './uploads' folder from Multer public so that client-side can access the API endpoints
app.use('/uploads/', express.static('uploads'));

// DB Config
const db = require('./config/keys').mongoURI;
// Connecting to MongoDB Atlas 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);


// ~~~~ API endpoints ~~~~ //
app.use('/api/users', users);
app.use('/api/auctions', auctions);


// Starts the server on localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if(err) {
    return console.log(`Error: ${err}`);
  }
  console.log(`Server started on port ${PORT}...`);
});
