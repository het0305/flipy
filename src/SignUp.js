// src/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Mobile:', mobile);
    console.log('Password:', password);

    alert('Account created successfully!');
    // TODO: integrate backend
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Enter Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="+91 | Enter your number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="checkbox-field">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <label style={{ marginLeft: '8px' }}>I agree to terms and condition</label>
        </div>

        <button type="submit">Sign Up</button>

        <div className="extra-options">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
