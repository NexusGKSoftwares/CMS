const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Make sure this path is correct
const router = express.Router();

// Admin registration route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ msg: 'Username already taken' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Create the new user (admin)
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
