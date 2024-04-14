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
