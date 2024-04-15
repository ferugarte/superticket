const Ticket = require('../models/Ticket');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Asignar un ticket a un cliente
exports.assignTicket = async (req, res) => {
    const session = await mongoose.startSession();  // Start a MongoDB session
    session.startTransaction();  // Start a transaction
    try {
        const { event, customer, zone } = req.body;

        // Check for existing ticket
        const existingTicket = await Ticket.findOne({
            'customer.identityNumber': customer.identityNumber,
            event: event
        }).session(session);

        if (existingTicket) {
            throw new Error("A ticket has already been assigned to this identity number for the event.");
        }

        const newTicket = new Ticket({
            event,
            customer,
            zone
        });

        await newTicket.save({ session });  // Save using the transaction session

        // Generate QR Code and send WhatsApp message
        const qrCodePath = await generateAndSendQRCode(newTicket, customer.whatsappNumber);

        await session.commitTransaction();  // Commit the transaction
        session.endSession();  // End the session

        res.status(201).json({ ticket: newTicket, message: 'Ticket assigned and message sent successfully!' });
    } catch (error) {
        await session.abortTransaction();  // Abort the transaction on error
        session.endSession();  // End the session

        res.status(500).json({ message: 'Failed to assign ticket or send message', error: error.message });
    }
};

async function generateAndSendQRCode(ticket, whatsappNumber) {
    const ticketUrl = `https://yourdomain.com/tickets/${ticket._id}`;
    const qrCodePath = path.resolve(__dirname, `../temp/${ticket._id}.png`);

    await QRCode.toFile(qrCodePath, ticketUrl);

    const formData = new FormData();
    formData.append('number', whatsappNumber);
    formData.append('medias', fs.createReadStream(qrCodePath), `${ticket._id}.png`);

    try {
        await axios.post('https://api.nissipro.net/api/messages/send', formData, {
            headers: {
                ...formData.getHeaders(),
                'X_TOKEN': 'JVIZHW8FG6OIGOEUF5OE'
            }
        });
    } finally {
        fs.unlinkSync(qrCodePath);  // Always clean up the QR code file
    }

    return qrCodePath;
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

