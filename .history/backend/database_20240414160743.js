const mongoose = require('mongoose');
const uri = "mongodb+srv://ferugarte:<password>@superticket.aexgusy.mongodb.net/?retryWrites=true&w=majority&appName=superticket";


const connectDB = async () => {
    try {
        // Connection URI from MongoDB Atlas dashboard
        console.log(uri);
        const conn = await mongoose.connect(uri, {
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
