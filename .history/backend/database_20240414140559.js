const mongoose = require('mongoose');
const uri = "mongodb+srv://ferugarte:pO06WlMcUiSxeT78@superticket.aexgusy.mongodb.net/?retryWrites=true&w=majority&appName=superticket";

const connectDB = async () => {
    try {
        // Connection URI from MongoDB Atlas dashboard
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
