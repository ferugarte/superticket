const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route to assign a ticket to a customer
router.post('/', ticketController.assignTicket);

// Route to get all tickets
router.get('/', ticketController.getAllTickets);

module.exports = router;