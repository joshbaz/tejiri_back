const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../api/models/users');
const mongoose = require('mongoose');

/*
** uniqueness to the user
** implementation of serialize
*/
passport.serializeUser((user, done) => {
    done(null, user._id);
});

/*
**this identifies the user who once logged In
**deserialization begins
*/
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
});

passport.use(new googleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL:'/auth/google/callback' 
}, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refresh token', refreshToken);
    console.log('profile', profile);
    User.findOne({ googleId: profile.id})
        .then((userExists) => {
            if (userExists) {
                console.log("user already registered");

                done(null, userExists);
            }
            else {
                new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: profile._json.email,
                    googleId: profile.id,
                    profile: profile._json.picture,
                    firstName: profile.name.familyName,
                    lastName: profile.name.givenName

                }).save()
                .then(user => done(null, user));

            }
        })
    
}
));

