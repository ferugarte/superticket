const Ticket = require('../models/Ticket');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const mongoose = require('mongoose');

// Asignar un ticket a un cliente
exports.assignTicket = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { event, customer, zone } = req.body;

        // Retrieve the event details for the name
        const eventDetails = await Event.findById(event).session(session);
        if (!eventDetails) {
            throw new Error("Event not found.");
        }
        
        // Check for existing ticket
        const existingTicket = await Ticket.findOne({
            'customer.identityNumber': customer.identityNumber,
            event: event
        }, null, { session });

        if (existingTicket) {
            throw new Error("A ticket has already been assigned to this identity number for the event.");
        }

        const newTicket = new Ticket({ event, customer, zone });
        await newTicket.save({ session });

        // Send text message with event and customer name
        await sendMessage({
            number: customer.whatsappNumber
        }, customer.name, eventDetails.name); // Pass customer and event names

        // Generate and send QR code
        await sendQRCode(newTicket, customer.whatsappNumber);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ ticket: newTicket, message: 'Ticket assigned and messages sent successfully!' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Failed to assign ticket or send message', error: error.message });
    }
};


async function sendMessage(data, customerName, eventName) {
    const messageContent = {
        number: data.number,
        body: `Hello ${customerName}, here is your ticket for ${eventName}!`
    };
    const config = {
        headers: {
            'X_TOKEN': 'JVIZHW8FG6OIGOEUF5OE',
            'Content-Type': 'application/json'
        }
    };
    await axios.post('https://api.nissipro.net/api/messages/send', messageContent, config);
}


async function sendQRCode(ticket, whatsappNumber) {
    const qrCodePath = path.resolve(__dirname, `../temp/${ticket._id}.png`);
    await QRCode.toFile(qrCodePath, `https://yourdomain.com/tickets/${ticket._id}`);

    const formData = new FormData();
    formData.append('number', whatsappNumber);
    formData.append('medias', fs.createReadStream(qrCodePath), `${ticket._id}.png`);

    const config = {
        headers: {
            ...formData.getHeaders(),
            'X_TOKEN': 'JVIZHW8FG6OIGOEUF5OE'
        }
    };
    await axios.post('https://api.nissipro.net/api/messages/send', formData, config);
    fs.unlinkSync(qrCodePath);
}

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

