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
