// src/Browse.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Browse.css';

const books = [
  {
    title: 'Bhagavad Gita',
    author: 'Vyasa',
    image: '/images/bhagavad-gita.webp'
  },
  {
    title: 'Ramayana',
    author: 'Valmiki',
    image: '/images/ramayana.jpg'
  },
  {
    title: 'Mahabharata',
    author: 'Vyasa',
    image: '/images/mahabharata.jpg'
  },
  {
    title: 'Rigveda',
    author: 'Ancient Rishis',
    image: '/images/rigveda.jpg'
  },
  {
    title: 'Samaveda',
    author: 'Ancient Rishis',
    image: '/images/samaveda.jpg'
  },
  {
    title: 'Yajurveda',
    author: 'Ancient Rishis',
    image: '/images/yajurveda.jpg'
  },
  {
    title: 'Atharvaveda',
    author: 'Ancient Rishis',
    image: '/images/atharvaveda.jpg'
  },
  {
    title: 'Upanishads',
    author: 'Various Sages',
    image: '/images/upanishads.jpg'
  },
  {
    title: 'Srimad Bhagavatam',
    author: 'Vyasa',
    image: '/images/srimad-bhagavatam.jpg'
  },
  {
    title: 'Shiva Purana',
    author: 'Vyasa',
    image: '/images/shiva-purana.jpg'
  },
  {
    title: 'Vishnu Purana',
    author: 'Vyasa',
    image: '/images/vishnu-purana.jpg'
  },
  {
    title: 'Devi Bhagavata Purana',
    author: 'Vyasa',
    image: '/images/devi-bhagavata.jpg'
  }
];

const Browse = () => {
  return (
    <div className="browse-container">
      <br /><h2>Browse Hindu Literature Books</h2><br />
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

      {/* Global Swap Button */}
      <div className="swap-button-wrapper">
        <Link to="/swap">
          <button className="swap-global-button">Swap Your Book Here</button>
        </Link>
      </div>
    </div>
  );
};

export default Browse;
