const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    customer: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        identityNumber: {
            type: String,
            required: true,
            trim: true
        },
        whatsappNumber: {
            type: String,
            required: true,
            trim: true
        }
    },
    qrCode: { type: String, required: true }, // QR code data
    isUsed: { type: Boolean, default: false } // Flag to check if the ticket is already used
});

module.exports = mongoose.model('Ticket', ticketSchema);
