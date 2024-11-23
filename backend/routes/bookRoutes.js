import express from 'express';
import Book from '../models/book.js';

// Create an express router
const router = express.Router();

// Middleware to parse JSON bodies
// router.use(express.json());

// Get all books with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find().skip(skip).limit(limit);
    const count = await Book.countDocuments();
    res.json({ 
      books, 
      totalPages: Math.ceil(count / limit), 
      currentPage: page 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new book (Admin only)
router.post('/', async (req, res) => {
  const { title, author, description, genre, rating } = req.body;

  // Basic validation for required fields
  if (!title || !author || !description || !genre || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new book instance
  const book = new Book({ title, author, description, genre, rating });

  try {
    // Save the new book to the database
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
