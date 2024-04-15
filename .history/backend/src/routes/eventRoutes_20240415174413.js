const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const ticketController = require('../controllers/ticketController');

// Route to create a new event
router.post('/', eventController.createEvent);

// Route to retrieve all events
router.get('/', eventController.getAllEvents);

// Route to retrieve a specific event by ID
router.get('/:id', eventController.getEvent);

// Route to update an event by ID
router.put('/:id', eventController.updateEvent);

router.get('/:eventId/tickets', ticketController.getTicketsByEvent);

// Route to delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
