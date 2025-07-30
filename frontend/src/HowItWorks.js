// src/HowItWorks.js

import React from 'react';
import './HowItWorks.css'; 

function HowItWorks() {
  return (
    <div className="howitworks-container">
      <div className="overlay">
        <div className="howitworks-content">
          <h1>How Flipy Works</h1>
          <p>
            Flipy is a <strong>Book Swap Platform</strong> that allows you to exchange your books with others without paying money.
          </p>
          <p>
            Simply list the books you have, browse books from others, and request a swap.
          </p>
          <p>
            Our goal is to help you <strong>read as many books as possible</strong> while saving money and building a community of readers.
          </p>
          <p>
            Join Flipy today, swap books, read more, and share the joy of reading with everyone!
          </p>
           <a href="/browse" className="cta-button">Explore Books</a>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
