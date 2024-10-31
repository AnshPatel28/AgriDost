const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

// Replace with your MongoDB connection string from .env
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/AgriDost';

// Set strictQuery to true to suppress the Mongoose warning
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
