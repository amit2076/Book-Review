import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ auth, handleLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Book Review</Link>
      <div>
        {auth ? (
          <>
            <Link to="/add-book" className="mr-4">Add Book</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="mr-4">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
