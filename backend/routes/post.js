const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const router = express.Router();

// Multer configuration for file uploads (image)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Create a new post
router.post('/add', upload.single('image'), async (req, res) => {
  const { title, slug, content } = req.body;
  try {
    const newPost = new Post({
      title,
      slug,
      content,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    await newPost.save();
    res.status(201).json({ msg: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Edit a post
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const { title, slug, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        content,
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
      { new: true }
    );
    res.json({ msg: 'Post updated successfully', updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
