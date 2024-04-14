const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to create a new event
router.post('/api/events', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).send(newEvent);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Route to retrieve all events
router.get('/', eventController.getAllEvents);

// Route to retrieve a specific event by ID
router.get('/:id', eventController.getEvent);

// Route to update an event by ID
router.put('/:id', eventController.updateEvent);

// Route to delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
