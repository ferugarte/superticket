const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes'); // Adjust the path as necessary

app.use(express.json());  // This line is crucial for parsing JSON request bodies

// Use the event routes
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
