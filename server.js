const express     = require('express'),
      mongoose    = require('mongoose'),
      bodyParser  = require('body-parser'),
      app         = express();

// Middleware for getting input from client-side
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
// Connecting to MongoDB Atlas 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(err));


// Starts the server on localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if(err) {
    return console.log(`Error: ${err}`);
  }
  console.log(`Server started on port ${PORT}...`);
});