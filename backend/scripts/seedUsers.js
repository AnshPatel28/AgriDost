const mongoose = require('mongoose');
const User = require('../api/models/userModel');  // Update the path if necessary
const bcrypt = require('bcryptjs');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/AgriDost'; // Update as needed

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        // User data to add
        const users = [
            {
                name: 'Ansh Patel',
                email: 'anshpatel@example.com',
                password: 'Ansh@123'  // Change this to a secure password
            },
            {
                name: 'Tarsh Agarwal',
                email: 'tarshagarwal@example.com',
                password: 'Tarsh@456'  // Change this to a secure password
            }
        ];

        // Hash passwords
        for (let user of users) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        // Insert users into the database
        await User.insertMany(users);
        console.log('Users added to the database');
        
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
