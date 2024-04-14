const express = require('express');
const connectDB = require('../database'); // Adjust the path as necessary

// Load environment variables
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Other middlewares and routes would be set up here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
