const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const app = express();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cms_website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
