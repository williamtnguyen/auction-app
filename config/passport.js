const JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      mongoose      = require('mongoose'),
      User          = mongoose.model('users');
      keys          = require('./keys');

// object literal containing options to control how the token is extracted from the request or verified
const opts = {}; 
// Creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id) 
        .then(user => {
          if(user) {
            return done(null, user); // User exists and is authenticated
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};