// src/AboutUs.js
import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Our mission is to promote the exchange of Hindu literature through a vibrant community.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            Flipy is a platform built for book lovers who cherish ancient, cultural, and spiritual knowledge rooted in Hindu literature.
            Our goal is to make sacred and historical texts easily accessible, shareable, and swappable among passionate readers.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Discover a growing library of Hindu scriptures, epics, and commentaries.</li>
            <li>Exchange physical or digital books with others in the community.</li>
            <li>Find book recommendations, reviews, and like-minded readers.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Flipy?</h2>
          <p>
            Because books carry timeless wisdom — and with Flipy, we ensure that this wisdom continues to flow through generations.
            Join us in building a strong literary network based on shared values, culture, and history.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
