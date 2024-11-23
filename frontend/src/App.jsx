import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBookPage from './pages/AddBookPage';
import Navbar from './components/NavBar';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar auth={auth} handleLogout={handleLogout} />

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-book" element={<AddBookPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>© 2024 Book Review Platform</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
