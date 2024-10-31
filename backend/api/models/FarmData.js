const mongoose = require('mongoose');

// Define the farm data schema
const farmDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',  // Reference to the User model
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    soilMoisture: {
        type: Number,
        required: true
    },
    motionDetected: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
const FarmData = mongoose.model('FarmData', farmDataSchema);

module.exports = FarmData;
