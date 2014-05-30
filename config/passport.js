module.exports = function (app) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var SHA256 = require("crypto-js/sha256");

    var User = require('../app/models/User');
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use('local-login', new LocalStrategy(function (username, password, done) {
        User.findOne({
            username: username.toUpperCase()
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'incorrect username.'
                });
            }
            if (user.password != SHA256(password)) {
                return done(null, false, {
                    message: 'incorrect password.'
                });
            }
            return done(null, user);
        });
    }));
    passport.use('local-register', new LocalStrategy(function (username, password, done, req) {
        User.findOne({
            username: username.toUpperCase()
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, {
                    message: "User exists"
                });
            } else {
                var newUser = new User();
                newUser.username = username.toUpperCase();
                newUser.password = SHA256(password);


                newUser.save(function (err) {
                    if (err) {
                        throw err;
                        console.log("istnieje juz");
                    }

                    return done(null, user);
                });

            }
        });

    }));
};