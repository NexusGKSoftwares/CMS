// routes/post.js

// Edit a post by ID
router.put('/edit/:id', async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true } // Return the updated post
    );
    res.json({ message: 'Post updated successfully', post });
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
  const { title, content, image } = req.body;

  try {
      const newPost = new Post({
          title,
          content,
          image: image || '', // If no image URL is provided, default to empty string
      });

      // Save the new post to the database
      await newPost.save();
      res.status(201).json({ message: 'Post added successfully', newPost });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
