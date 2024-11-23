import React, { useState } from 'react';
import axios from 'axios';

const AddReviewForm = ({ bookId, setReviews }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      book: bookId,
      user: 'Anonymous',  // In a real app, fetch the username from the logged-in user
      rating,
      comment,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', reviewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token for authenticated users
        },
      });

      // Add the newly added review to the list
      setReviews((prevReviews) => [...prevReviews, response.data]);

      // Clear the form
      setComment('');
      setRating(1);
      alert('Review added successfully');
    } catch (error) {
      alert('Failed to add review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <textarea
        placeholder="Write your review here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-4 border rounded-md"
        rows="4"
        required
      />
      <div className="flex items-center space-x-4">
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-16 p-2 border rounded-md"
          min="1"
          max="5"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md w-32">
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default AddReviewForm;

