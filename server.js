// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');

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
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Serwer dziala na porcie: ' + port); // shoutout to the user
console.log("0 = disconnected\n1 = connected\n2 = connecting\n3 = disconnecting");
setInterval(function () {
    console.log("Status polaczenia z baza: " + mongoose.connection.readyState);
}, 5000);
exports = module.exports = app; // expose app