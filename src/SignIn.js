// src/SignIn.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', remember);
    alert('Login successful!');
    // TODO: connect backend
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-link">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <label className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember Me
        </label>

        <button type="submit">Sign In</button>

        <div className="extra-options">
          <p>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
