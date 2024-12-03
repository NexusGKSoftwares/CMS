const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Create a new post
router.post('/add', async (req, res) => {
  const { title, slug, content, image } = req.body;
  
  try {
    const newPost = new Post({ title, slug, content, image });
    await newPost.save();
    res.status(201).json({ message: 'Post added successfully', newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a post
router.put('/edit/:id', async (req, res) => {
  const { title, slug, content, image } = req.body;
  
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, slug, content, image },
      { new: true }
    );
    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
