const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use IPv4 localhost instead of IPv6
    await mongoose.connect('mongodb://127.0.0.1:27017/CMS', {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
