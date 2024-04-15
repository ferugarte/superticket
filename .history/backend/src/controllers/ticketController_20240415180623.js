const Ticket = require('../models/Ticket');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Asignar un ticket a un cliente
exports.assignTicket = async (req, res) => {
    const { event, customer, zone } = req.body;

    try {
        const existingTicket = await Ticket.findOne({
            'customer.identityNumber': customer.identityNumber,
            event: event
        });

        if (existingTicket) {
            return res.status(409).json({ message: "A ticket has already been assigned to this identity number for the event." });
        }

        const newTicket = new Ticket({
            event,
            customer,
            zone
        });

        await newTicket.save();

        // Generate QR Code for the ticket URL
        const ticketUrl = `https://yourdomain.com/tickets/${newTicket._id}`;
        const qrCodePath = path.resolve(__dirname, `../temp/${newTicket._id}.png`);

        await QRCode.toFile(qrCodePath, ticketUrl);

        // Set up form data for the POST request
        const formData = new FormData();
        formData.append('number', customer.whatsappNumber);
        formData.append('medias', fs.createReadStream(qrCodePath), `${newTicket._id}.png`);

        console.log(formData);

        const apiResponse = await axios.post('https://api.nissipro.net/api/messages/send', formData, {
            headers: {
                ...formData.getHeaders(),
                'X_TOKEN': 'JVIZHW8FG6OIGOEUF5OE'
            }
        });

        // Clean up the QR code file after sending the message
        fs.unlinkSync(qrCodePath);

        res.status(201).json({ ticket: newTicket, message: 'Ticket assigned and message sent successfully!', apiResponse: apiResponse.data });
    } catch (error) {
        console.error('Error assigning ticket or sending message:', error);
        res.status(500).json({ message: 'Error assigning ticket or sending message', error: error });
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

// Fetch all tickets for a specific event
exports.getTicketsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const tickets = await Ticket.find({ event: eventId }).populate('event', 'name description'); // Adjust populate according to your needs
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

