'use strict';
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
var userModelClass = require('../../Models/authModels/userModel');
var userModel = new userModelClass;
module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true }, function (username, password, done) {
        process.nextTick(function () {
            userModel.checkUserLogin({ username: username })
                .catch(function (e) { return done(null, false); })
                .then(function (collection) {
                if (collection.length > 0) {
                    if (bcrypt.compareSync(password, collection[0].password)) {
                        return done(null, collection[0]);
                    }
                    else {
                        return done(null, false);
                    }
                }
                else {
                    return done(null, false);
                }
            });
        });
    }));
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = 'secret';
    opts.issuer = "accounts.examplesoft.com";
    opts.audience = "yoursite.net";
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};
