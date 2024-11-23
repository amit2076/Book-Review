import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all">
      <img src="https://via.placeholder.com/150" alt={book.title} className="w-full h-48 object-cover rounded-md mb-4"/>
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <Link to={`/book/${book._id}`} className="text-blue-500 mt-4 block">View Details</Link>
    </div>
  );
};

export default BookCard;
