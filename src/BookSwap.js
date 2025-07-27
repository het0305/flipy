import React, { useContext } from 'react';
import { BookContext } from './BookContext';
import BookCard from './BookCard';
import './BookSwap.css';

const BookSwap = () => {
  const { books } = useContext(BookContext);

  return (
    <div className="book-swap-container">
      <h2>Available Books for Swapping</h2>
      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard key={index} book={book} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BookSwap;
