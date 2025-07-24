import React from 'react';
import './Browse.css';

const books = [
  {
    title: 'Bhagavad Gita',
    author: 'Vyasa',
    image: '/images/srimad-bhagavad-gita.webp'
  },
  {
    title: 'Ramayana',
    author: 'Valmiki',
    image: '/images/Ramayana.jpg'
  },
  {
    title: 'Mahabharata',
    author: 'Vyasa',
    image: '/images/81gxiU-w93L.jpg'
  },
  {
    title: 'Vedas',
    author: 'Ancient Rishis',
    image: '/images/9789362808875.jpg'
  },
  {
    title: 'Upanishads',
    author: 'Various Sages',
    image: '/images/download.jpeg'
  }
];

const Browse = () => {
  return (
    <div className="browse-container">
      <h2>Browse Hindu Literature Books</h2>
      <div className="book-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className="image-section">
              <img src={book.image} alt={book.title} />
            </div>
            <div className="info-section">
              <div className="book-title">{book.title}</div>
              <div className="book-author">by {book.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
