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
    app.post('/api/UpdateUserData', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err)
                return done(err);
            else if (user) {
                user.name = req.body.name;
                user.surname = req.body.surname;
                user.email = req.body.email;
                user.emailPassword = req.body.emailPassword;
                user.save();

                res.send(200);


            }
        });
    });
    app.post('/api/createList', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            console.log("create list api");
            user.lists.push({
                name: req.body.name,
            });
            user.save();

            res.send(200);

        });
    });

    app.post('/api/addContactToList', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            console.log("add address  api");

            console.log(req.body.listId);
            console.log(req.body.contactFirstName);
            console.log(req.body.contactLastName);
            console.log(req.body.contactEmail);
            console.log(user.lists[req.body.listId]);

            user.lists[req.body.listId].contacts.push({
                firstName: req.body.contactFirstName,
                lastName: req.body.contactLastName,
                email: req.body.contactEmail
            });
            user.save();

            res.send(200);

        });
    });
    app.post('/api/deleteContactFromList', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            console.log("delete contact from list api");
            console.log(req.body.id + " id kontaktu");
            console.log(req.body.listId + " id listy");
            user.lists[req.body.listId].contacts.splice(req.body.id, 1);
            user.save();
            res.send(200);
        });
    });
    app.post('/api/editContactData', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            console.log("edit contact api");
            console.log(req.body.contactId + " id kontaktu");
            console.log(req.body.listId + " id listy");
            console.log(req.body.firstName);
            console.log(req.body.lastName);
            console.log(req.body.email);
            user.lists[req.body.listId].contacts[req.body.contactId].firstName = req.body.firstName;
            user.lists[req.body.listId].contacts[req.body.contactId].lastName = req.body.lastName;
            user.lists[req.body.listId].contacts[req.body.contactId].email = req.body.email;

            user.save();
            res.send(200);
        });
    });

    app.post('/api/deleteList', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            console.log("delete list api");
            user.lists.splice(req.body.id, 1);
            user.save();

            res.send(200);

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
            from: "Fred Foo✔ < foo@ blurdybloop.com > ", // sender address
            to: "nodemailtester@ gmail.com ", // list of receivers
            subject: "Hello✔ ", // Subject line
            text: "Hello world✔ ", // plaintext body
            html: "<!DOCTYPE html>" // html body
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail sent ");
            }
        });
        res.redirect("/");
    });

    app.post('/api/createNewMail', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            user.emailLayouts.push({
                name: req.body.name,
                body: req.body.body
            });
            user.save();
            res.send(200);
        })
    });
    app.post('/api/deleteEmail', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            user.emailLayouts.splice(req.body.id, 1);
            user.save();
            res.send(200);
        });
    });
    app.post('/api/updateEmailData', function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            user.emailLayouts[req.body.id].name = req.body.name;
            user.emailLayouts[req.body.id].body = req.body.body;
            user.save();
            res.send(200);
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });






};