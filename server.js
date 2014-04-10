// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;



// configuration ===========================================

// config files
var db = require('./config/db');


var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database

app.configure(function () {
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.bodyParser()); // pull information from html in POST
    app.use(express.methodOverride()); // simulate DELETE and PUT
    app.use(express.cookieParser('keyboard cat'));
    app.use(express.session({
        secret: 'securedsession'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
});

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
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'incorrect username.'
            });
        }
        if (user.password != password) {
            return done(null, false, {
                message: 'incorrect password.'
            });
        }

        return done(null, user);
    });
}));
passport.use('local-register', new LocalStrategy(function (username, password, done) {
    User.findOne({
        username: username
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
            newUser.username = username;
            newUser.password = password;


            newUser.save(function (err) {
                if (err)
                    throw err;

                return done(null, user);
            });
        }
    });
}));
//models
var User = require('./app/models/User');


app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/rejestracja', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/rejestracja',
    failureFlash: true
}));
app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/logout', function (req, res) {
    req.logout();
    res.send(200);

});
require('./app/routes')(app); // pass our application into our routes



// start app ===============================================
app.listen(port);
console.log('Serwer dziala na porcie: ' + port); // shoutout to the user
console.log("0 = disconnected\n1 = connected\n2 = connecting\n3 = disconnecting");
console.log("Status polaczenia z baza: " + mongoose.connection.readyState);
setInterval(function () {
    console.log("Status polaczenia z baza: " + mongoose.connection.readyState);
}, 10000);


exports = module.exports = app; // expose app