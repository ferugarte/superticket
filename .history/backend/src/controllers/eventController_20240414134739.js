const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: "Event successfully added!", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Similar structure for getAllEvents, getEvent, updateEvent, deleteEvent
