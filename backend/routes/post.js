// routes/post.js

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);

      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// routes/post.js

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

