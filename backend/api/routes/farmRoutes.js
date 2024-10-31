const express = require('express');
const router = express.Router();
const FarmData = require('../models/FarmData'); // Correct path to the FarmData model

// Route to get the latest farm data for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    // Fetch the latest farm data for this user
    const latestFarmData = await FarmData.findOne({ userId }).sort({ timestamp: -1 });

    // If no data is found for the user
    if (!latestFarmData) {
      return res.status(404).json({ message: 'No farm data found for this user.' });
    }

    res.json(latestFarmData);  // Return the latest farm data
  } catch (error) {
    console.error('Error fetching farm data:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
