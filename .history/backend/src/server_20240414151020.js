const express = require('express');
const connectDB = require('../database'); // Adjust the path as necessary
const eventRoutes = require('./routes/eventRoutes');

// Load environment variables
require('dotenv').config();

const app = express();
app.use('/api/events', eventRoutes); // Use

// Connect to Database
connectDB();

// Other middlewares and routes would be set up here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
