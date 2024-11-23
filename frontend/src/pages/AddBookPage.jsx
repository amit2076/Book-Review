import React from 'react';
import AddBookForm from '../components/AddBookForm';

const AddBookPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add a New Book</h1>
      <AddBookForm />
    </div>
  );
};

export default AddBookPage;
