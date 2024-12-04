const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Ensure Post model is correctly imported

// GET route to fetch all posts
router.get('/', async (req, res) => {
  try {
      const posts = await Post.find(); // Fetch all posts from the database
      res.json(posts); // Send the posts as a JSON response
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

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

// DELETE route for deleting a post by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route for adding a new post
router.post('/add', async (req, res) => {
  const { title, content, image } = req.body; // Retrieve data from request body

  try {
      // Generate a slug from the title
      const slug = title.toLowerCase().replace(/ /g, '-');

      // Create a new post
      const newPost = new Post({
          title,
          slug,
          content,
          image: image || '', // Default to empty string if no image is provided
      });

      await newPost.save(); // Save the post to the database
      res.status(201).json({ message: 'Post added successfully', newPost });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router; // Don't forget to export the router
