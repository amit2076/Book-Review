import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddReviewForm from '../components/AddReviewForm';  // Import AddReviewForm component

const BookDetailPage = () => {
  const { id } = useParams();  // Get the book ID from the URL parameters
  const [book, setBook] = useState(null);  // State to store book details
  const [reviews, setReviews] = useState([]);  // State to store reviews for the book
  const [error, setError] = useState('');  // State to store any error messages

  // Fetch book details from the backend
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  // Fetch reviews for the book from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews?bookId=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Send token in headers for authentication
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        if (error.response && error.response.status === 401) {
          setError('You need to be logged in to view or add reviews');
        } else {
          setError('Failed to fetch reviews. Please try again later.');
        }
      }
    };
    fetchReviews();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      {book ? (
        <>
          {/* Book details */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <p className="text-xl text-gray-600">By: {book.author}</p>
            <p className="mt-4">{book.description}</p>
            <p className="mt-2 font-semibold">Genre: {book.genre}</p>
            <p className="mt-2 text-gray-500">Rating: {book.rating}</p>
          </div>

          {/* Reviews section */}
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="border p-4 rounded-lg shadow-sm">
                  <p className="font-semibold">{review.user} - Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to add one!</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Add Review Form */}
          <AddReviewForm bookId={id} setReviews={setReviews} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetailPage;
