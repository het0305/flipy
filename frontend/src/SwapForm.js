// src/SwapForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SwapForm.css';

const bookList = [
  'Bhagavad Gita',
  'Ramayana',
  'Mahabharata',
  'Rigveda',
  'Samaveda',
  'Yajurveda',
  'Atharvaveda',
  'Upanishads',
  'Srimad Bhagavatam',
  'Shiva Purana',
  'Vishnu Purana',
  'Devi Bhagavata Purana'
];

const SwapForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    giveBook: '',
    wantBook: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Swap Request Submitted!\n\nName: ${formData.name}\nEmail: ${formData.email}\nGiving: ${formData.giveBook}\nWants: ${formData.wantBook}`);
  };

  return (
    <div className="swap-form-container">
      <Link to="/browse" className="back-link">← Back to Browse</Link>
      <h2>Swap Your Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Which Book Do You Want to Give?</label>
        <input
          type="text"
          name="giveBook"
          placeholder="Enter the book you want to give"
          value={formData.giveBook}
          onChange={handleChange}
          required
        />

        <label>Which Book Do You Want in Exchange?</label>
        <select
          name="wantBook"
          value={formData.wantBook}
          onChange={handleChange}
          required
        >
          <option value="">-- Select desired book --</option>
          {bookList.map((book, index) => (
            <option key={index} value={book}>{book}</option>
          ))}
        </select>

        <button type="submit">Submit Swap Request</button>
      </form>
    </div>
  );
};

export default SwapForm;
