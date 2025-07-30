// src/NotFound.js
import React from 'react';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <a href="/" style={{ color: '#4CAF50', textDecoration: 'underline' }}>Back to Home</a>
    </div>
  );
}

export default NotFound;
