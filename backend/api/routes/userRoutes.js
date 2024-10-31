const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords
const auth = require('../../middleware/authMiddleware');
const validateSignup = require('../../middleware/validation');
const FarmData = require('../models/FarmData'); // Ensure the model is imported

// Route for user signup
router.post('/signup', validateSignup, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get details of the currently logged-in user
router.get('/me', auth, async (req, res) => {
  try {
    // Find user by ID and exclude password field from the response
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the latest farm data for this user
    const farmData = await FarmData.findOne({ userId: req.user._id }).sort({ timestamp: -1 });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      farmData: farmData || {}  // Return farm data or an empty object if no data
    });
  } catch (error) {
    console.error('Error fetching user or farm data:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Route to get a list of all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Fetch all users and exclude passwords
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
