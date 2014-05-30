var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: String,
    surname: String,
    username: String,
    password: String,
    email: String,
    emailPassword: String,
    lists: [{
        name: String,
        contacts: [
            {
                firstName: String,
                lastName: String,
                email: String
            }
        ]
    }],
    campaigns: [{
        name: String,
        startDate: String,
        endDate: String,
        active: Boolean,
        contacts: [
            {
                firstName: String,
                lastName: String,
                email: String
            }
        ],
        Mail: [{
            date: Date,
            time: Date,
            contact: String,
            subject: String,
            content: String
        }],

    }],
    emailLayouts: [
        {
            name: String,
            body: String
        }
    ]


});


module.exports = User;