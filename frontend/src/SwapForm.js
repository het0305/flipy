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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('✅ Swap Request Submitted & Email Sent Successfully!');
        setFormData({ name: '', email: '', giveBook: '', wantBook: '' });
      } else {
        alert('❌ Failed to send email. Try again.');
      }
    } catch (error) {
      console.error('Email Error:', error);
      alert('❌ Something went wrong. Please check backend.');
    }
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
