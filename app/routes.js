module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
    var nodemailer = require('nodemailer');
    var passport = require('passport');
    var User = require('./models/User');

    var auth = function (req, res, next) {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };

    app.get('/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/registration', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/registration',
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



    app.get('/api/listOfUsers', auth, function (req, res) {
        User.find(function (err, data) {
            if (err)
                console.log("errors fetchinh");
            else
                res.json(data);

        });
    });
    app.post('/api/UpdateUserData', function (req, res, done) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err)
                return err;
            if (user) {
                user.name = req.body.name;
                user.password = req.body.password;
                user.surname = req.body.surname;
                user.email = req.body.email;
                user.save();
            }
            return done(null, user);
        });

    });
    app.post('/api/sendmail', function (req, res) {

        var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "nodemailtester@gmail.com",
                pass: "nodemailtester123"
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
            to: "nodemailtester@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world ✔", // plaintext body
            html: "<b>Hello world ✔</b>" // html body
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail sent");
            }
        });
        res.redirect("/");
    });



    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });






};