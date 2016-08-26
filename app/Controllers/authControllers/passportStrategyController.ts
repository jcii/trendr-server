'use strict'
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const userModelClass = require('../../Models/authModels/userModel')
const userModel = new userModelClass

module.exports = (passport) => {
  passport.use(
  new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      session: true },
    (username, password, done) => {
        process.nextTick(() => {
          userModel.checkUserLogin({username})
            .catch((e) => done(null, false))
            .then((collection) => {
            if(collection.length > 0){
              if(bcrypt.compareSync(password, collection[0].password)){
                return done(null, collection[0])
              } else {
                return done(null, false)
              }
            } else {
              return done(null, false)
            }
        })
      })
    }
  )
)

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';
opts.issuer = "accounts.examplesoft.com";
opts.audience = "yoursite.net";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account 
        }
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
}