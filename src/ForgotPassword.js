import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      alert('Please enter your email address.');
      return;
    }

    setMessage(`A reset link has been sent to ${email}`);
    setEmail('');
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>

        {message && (
          <>
            <p className="success-message">{message}</p>
            <p className="return-link">
              <Link to="/signin">Return to Sign In</Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
