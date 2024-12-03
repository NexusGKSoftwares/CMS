// routes/post.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');  // Ensure Post model is correctly imported

// PUT route for editing a post by ID
router.put('/edit/:id', async (req, res) => {
    const { title, slug, content, image } = req.body;

    try {
        // Check if the post exists
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the post
        post.title = title || post.title;
        post.slug = slug || post.slug;
        post.content = content || post.content;
        post.image = image || post.image;

        // Save the updated post
        await post.save();

        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


// Delete a post by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// routes/post.js

// Add a new post
router.post('/add', async (req, res) => {
  const { title, content, image } = req.body; // Retrieve data from request body

  try {
      // Create a new post
      const newPost = new Post({
          title,
          slug: title.toLowerCase().replace(/ /g, '-'), // Generate a slug from the title
          content,
          image: image || '', // Default to empty string if no image is provided
      });

      await newPost.save(); // Save the post to the database
      res.status(201).json({ message: 'Post added successfully', newPost });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

