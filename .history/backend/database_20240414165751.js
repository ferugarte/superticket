const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connection URI from MongoDB Atlas dashboard
        console.log(process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
