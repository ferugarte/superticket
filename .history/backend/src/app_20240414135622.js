const express = require('express');
const app = express();

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Use routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;
