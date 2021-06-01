const mongoose = require('mongoose');

const Measurement = mongoose.Schema({
    _id: String,
    description: String
});

module.exports = mongoose.model('Measurement', Measurement);
