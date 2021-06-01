const mongoose = require('mongoose');
const Measurement = require('measurement');
const Ingredient = require('ingredient');

const QuantityOfIngredient = mongoose.Schema({
    _ingredient_id: Ingredient,
    quantity: Number,
    measurement_id: Measurement
});

const Recipe = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    author: String,
    ingredients: [QuantityOfIngredient], 
    steps: { 
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Recipe', Recipe);
