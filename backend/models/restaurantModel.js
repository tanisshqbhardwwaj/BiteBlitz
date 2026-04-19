const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    averageCost: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    openingHours: {
        type: String,
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);