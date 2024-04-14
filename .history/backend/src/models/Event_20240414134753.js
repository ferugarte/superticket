const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
        lat: Number,
        lng: Number
    },
    zones: [{
        name: String,
        price: Number,
        capacity: Number
    }]
});

module.exports = mongoose.model('Event', eventSchema);
