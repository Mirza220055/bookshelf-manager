const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const router = express.Router();

// Invalid ID check
const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  next();
};

// GET /books -> সব book
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
});

// POST /books -> নতুন book
router.post('/', async (req, res, next) => {
  try {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    const author = typeof req.body.author === 'string' ? req.body.author.trim() : '';

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await Book.create({ title, author });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// PUT /books/:id -> read হিসেবে mark
router.put('/:id', validateId, async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
});

// DELETE /books/:id -> delete
router.delete('/:id', validateId, async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully', id: book.id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;