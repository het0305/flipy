// src/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content">
          <h1>Welcome to Flipy</h1>
          <p>Discover, Share & Swap Hindu Literature</p>
          <a href="/browse" className="cta-button">Browse Books</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
