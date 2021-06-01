const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: String,
    email: String,
    passwordHash: String
});

module.exports = mongoose.model('User', User);
