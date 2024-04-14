const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    zones: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true }
    }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
