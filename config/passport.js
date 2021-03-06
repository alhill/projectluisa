//Importing Passport, our strategies and the config files
const passport = require('passport'),
    User = require('../models/user'),
    config = require('./keys'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');

//We use the email field as username
const localOptions = { usernameField: 'email' };

//Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.'}); }

        user.comparePassword(password, function(err, isMatch) {
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

            return done(null, user);
        });
    });
});

//Setting up JWT auth options
const jwtOptions = {
    //Telling Passport to check auth headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    //Telling Passport where to find the secret
    secretOrKey: config.cookieKey
};

//Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //console.log(payload);
    User.findById(payload._id, function(err, user) {
        if(err) { return done(err, false); }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

//Passport middleware
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    Employer.findById(id, function (err, user) {
        done(err, user);
    });
});

//Allow passport to use the strategies we defined
passport.use(jwtLogin);
passport.use(localLogin);