require('dotenv').config();
const express = require('express');
const connectDB = require('../database');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

connectDB(); // Connect to MongoDB

app.use('/api/events', eventRoutes); // Use
