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
