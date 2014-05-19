// modules =================================================
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;


// configuration ===========================================

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


//models
var User = require('./app/models/User');
require('./config/passport')(app);
require('./app/routes')(app); // pass our application into our routes



// start app ===============================================
app.listen(port);
console.log('Serwer dziala na porcie: ' + port);

//console.log("0 = disconnected\n1 = connected\n2 = connecting\n3 = disconnecting");
//console.log("Status polaczenia z baza: " + mongoose.connection.readyState);
setTimeout(function () {
    if (mongoose.connection.readyState === 1)
        console.log("polaczono z baza");
    else if (mongoose.connection.readyState === 0)
        console.log("nie polaczono z baza");

}, 5000);


exports = module.exports = app; // expose app