const Ticket = require('../models/Ticket');

// Asignar un ticket a un cliente
exports.assignTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).send({ message: "Ticket assigned successfully", data: ticket });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Fetch all tickets for a specific event
exports.getTicketsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const tickets = await Ticket.find({ event: id }).populate('event', 'name description'); // Adjust populate according to your needs
        if (tickets.length > 0) {
            res.status(200).json(tickets);
        } else {
            res.status(404).send('No tickets found for this event');
        }
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        res.status(500).json({ message: 'Failed to fetch tickets', error: error });
    }
};

// Obtener un evento por ID
exports.getTickets = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).get;
        if (!event) {
            return res.status(404).send({ message: "Tickets not found for the Event" });
        }
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Verificar código QR para acceso
exports.verifyQRCode = async (req, res) => {
    const { qrCode } = req.body; // Assume QR code data is sent in the request body

    try {
        const ticket = await Ticket.findOne({ qrCode }).populate('event');

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found." });
        }

        if (ticket.isUsed) {
            return res.status(400).json({ message: "This ticket has already been used." });
        }

        if (new Date() > new Date(ticket.event.date)) {
            return res.status(400).json({ message: "This event has already occurred." });
        }

        // Optionally mark the ticket as used, if your logic requires it
        ticket.isUsed = true;
        await ticket.save();

        res.send.status(200).json({ message: "Access granted.", details: ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while verifying QR code." });
    }
};

