const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Use routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;
