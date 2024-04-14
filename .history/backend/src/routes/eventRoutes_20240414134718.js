const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
