const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  image: { type: String }, // Image URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
