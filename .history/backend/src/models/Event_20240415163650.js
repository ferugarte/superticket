const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    zones: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('Event', eventSchema);
