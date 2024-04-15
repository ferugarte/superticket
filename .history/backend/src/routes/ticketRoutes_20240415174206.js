const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route to assign a ticket to a customer
router.post('/', ticketController.assignTicket);

// Route to get all tickets
router.get('/', ticketController.getAllTickets);

router.get('/events/:eventId/tickets', ticketController.getTicketsByEvent);

// Route to verigy ticket qr
router.post('/verify-qr', ticketController.verifyQRCode);

module.exports = router;
