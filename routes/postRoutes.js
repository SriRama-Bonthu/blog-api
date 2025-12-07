const express = require('express');
const router = express.Router();
const postService = require('../services/postService');

// POST /posts – create post
router.post('/', async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ error: 'Title, content, and authorId are required' });
    }

    const post = await postService.createPost({ title, content, authorId });

    if (!post) {
      // author doesn't exist
      return res.status(400).json({ error: 'Invalid authorId: author does not exist' });
    }

    res.status(201).json(post);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /posts – list all posts (optional ?author_id=)
router.get('/', async (req, res) => {
  try {
    const { author_id } = req.query;
    const posts = await postService.getAllPosts(author_id);
    res.json(posts);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /posts/:id – single post + author
router.get('/:id', async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /posts/:id – update title/content
router.put('/:id', async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /posts/:id – delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
