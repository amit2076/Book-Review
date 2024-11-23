import express from 'express';
import Review from '../models/review.js';
import authMiddleware from '../middlewares/authMiddleware.js';  // Ensure user is authenticated

const router = express.Router();

// POST: Add a review (with the username of the authenticated user)
router.post('/', authMiddleware, async (req, res) => {
  const { book, rating, comment } = req.body;
  const user = req.user.username;  // Fetch username from the authenticated user

  try {
    const review = new Review({ book, user, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Get reviews for a specific book
router.get('/', async (req, res) => {
  const { bookId } = req.query;
  
  try {
    const reviews = await Review.find({ book: bookId }).populate('book');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
