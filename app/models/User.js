var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    lists: [
        {
            name: String,
            mails: []
        }

    ]


});


module.exports = User;