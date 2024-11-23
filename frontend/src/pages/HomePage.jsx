import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://book-review-backend-gp60.onrender.com/api/books');
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    
    fetchBooks();
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

