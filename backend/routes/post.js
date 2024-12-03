const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/add', async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const newPost = new Post({ title, content, image });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post
router.put('/edit/:id', async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
