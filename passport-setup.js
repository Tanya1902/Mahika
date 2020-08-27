const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Author = require("./model/authorModel");
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    // console.log(user);
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
      done(null, user);
    // });
  });


passport.use(new GoogleStrategy({
    clientID: "505838542031-tnesg908pdkcbsq9r6mqhsrd3ngv842h.apps.googleusercontent.com",
    clientSecret: "Rm7NR3qavlQa2eYlNm-a_DLX",
    callbackURL: "http://localhost:3000/google/callback"
  },
   function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // console.log(profile);
        let newauthor = new Author();
        
            newauthor.email = profile.emails[0].value;
            newauthor.author_id = newauthor._id;
            newauthor.save().then((newauthor) => {
            console.log(newauthor);
        })
      return done(null, profile);
    // });
  }
));


passport.use(new FacebookStrategy({
    clientID: "344900633205576",
    clientSecret: "65ba0edced2dbdf84b496583924e14ea",
    callbackURL: "http://localhost:3000/facebook/callback",
    profileFields: ['emails']
  },
   function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // console.log(profile);
        let newauthor = new Author();
        
            newauthor.email = profile.emails[0].value;
            newauthor.author_id = newauthor._id;
            newauthor.save().then((newauthor) => {
            // console.log(newauthor);
        })
        // console.log(profile);
        // if(err)
        // {
        //   return done(err);
        // }
      return done(null, profile);
    // });
  }
));

