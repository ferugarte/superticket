const mongoose = require('mongoose');
const MONGODB_URI= "mongodb+srv://ferugarte:pO06WlMcUiSxeT78@superticket.aexgusy.mongodb.net/?retryWrites=true&w=majority&appName=superticket";

const connectDB = async () => {
    try {
        // Connection URI from MongoDB Atlas dashboard
        console.log(env.process.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
