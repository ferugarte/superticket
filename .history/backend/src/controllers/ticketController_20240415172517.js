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

// Listar todos los tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({}).populate('event');
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un evento por ID
exports.getAllTicketsByEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
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

