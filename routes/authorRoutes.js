const express = require('express');
const router = express.Router();
const authorService = require('../services/authorService');

// POST /authors – create author
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const author = await authorService.createAuthor({ name, email });
    res.status(201).json(author);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /authors – list all authors
router.get('/', async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.json(authors);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /authors/:id – single author
router.get('/:id', async (req, res) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /authors/:id – update author
router.put('/:id', async (req, res) => {
  try {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /authors/:id – delete author (cascade posts)
router.delete('/:id', async (req, res) => {
  try {
    const author = await authorService.deleteAuthor(req.params.id);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json({ message: 'Author and their posts deleted' });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /authors/:id/posts – all posts for this author
router.get('/:id/posts', async (req, res) => {
  try {
    const result = await authorService.getPostsForAuthor(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(result); // { author, posts }
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
