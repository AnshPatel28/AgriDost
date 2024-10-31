const FarmData = require('../models/farmModel');

exports.getFarmData = async (req, res) => {
  try {
    const data = await FarmData.find(); // Adjust based on your schema
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farm data', error });
  }
};
