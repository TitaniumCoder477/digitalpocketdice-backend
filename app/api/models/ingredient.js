const mongoose = require('mongoose');

const Ingredient = mongoose.Schema({
    _id: String,
    description: String
});

module.exports = mongoose.model('Ingredient', Ingredient);
