const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const axios = require('axios');
const FarmData = require('./api/models/FarmData');
const auth = require('./middleware/authMiddleware');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/farm', require('./api/routes/farmRoutes')); // Farm data routes
app.use('/api/users', require('./api/routes/userRoutes')); // User routes

// Example user IDs (replace these with actual user IDs from your database)
const userIds = [
    '6510f9bcf5a1a527b56a23e7',  // Example User ID 1
    '6510f9bcf5a1a527b56a23e8'   // Example User ID 2
];

// Function to fetch live data from Thingspeak for each user
async function fetchFarmDataFromThingspeak() {
    try {
        const url = 'https://api.thingspeak.com/channels/1293177/feeds.json?results=1';  // Thingspeak API URL
        const response = await axios.get(url);
        const feed = response.data.feeds[0];

        // Extract fields
        const temperature = parseFloat(feed.field1);  // Temperature in °C
        const humidity = parseFloat(feed.field2);     // Humidity in %
        const soilMoisture = parseFloat(feed.field3); // Soil Moisture in %
        const motionDetected = feed.field4 === '1';   // Motion Detected (Boolean)

        // Insert fetched data for all users
        for (const userId of userIds) {
            const newData = new FarmData({
                userId,
                temperature,
                humidity,
                soilMoisture,
                motionDetected
            });
            try {
                await newData.save();
                console.log(`Farm data updated for User ${userId}:`, newData);
            } catch (error) {
                console.error(`Error saving data for User ${userId}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching data from Thingspeak:', error);
    }
}

// Fetch data every minute
setInterval(fetchFarmDataFromThingspeak, 60000);  // Runs every 1 minute

// New Endpoint: Fetch Farm Data for Last 30 Minutes
app.get('/api/farm/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params;

        // Get the timestamp from 30 minutes ago
        const halfHourAgo = new Date(Date.now() - 30 * 60000);

        // Query the database for entries from the last 30 minutes
        const recentData = await FarmData.find({
            userId,
            timestamp: { $gte: halfHourAgo }
        }).sort({ timestamp: -1 });

        res.json(recentData);
    } catch (error) {
        console.error('Error fetching farm data:', error);
        res.status(500).json({ message: 'Error fetching farm data' });
    }
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
