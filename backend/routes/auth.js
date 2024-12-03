const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ id: user._id, username: user.username }, 'your_jwt_secret', {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
