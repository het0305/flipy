import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP states
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // Send OTP
  const sendOtp = async () => {
    if (!email) {
      alert('Please enter your email first!');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/send-otp', { email });
      setOtpSent(true);
      alert('OTP sent to your email!');
    } catch (err) {
      console.error('OTP send error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Failed to send OTP!');
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/verify-otp', {
        email,
        otp,
      });
      if (res.data.success) {
        setVerified(true);
        alert('Email verified successfully!');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('OTP verify error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Failed to verify OTP!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    if (!verified) {
      alert('Please verify your email first.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        mobile,
        password,
      });

      alert('Account created successfully!');
      window.location.href = '/signin';
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Signup failed!');
    }
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

        {/* Email Field with Send OTP Button Inside */}
        <div className="email-field">
          <input
            type="email"
            placeholder="Enter Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!otpSent ? (
            <button type="button" className="otp-btn" onClick={sendOtp}>
              Send OTP
            </button>
          ) : (
            <span className="otp-sent">✅ Sent</span>
          )}
        </div>

        {otpSent && !verified && (
          <div className="otp-field">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="button" className="otp-btn" onClick={verifyOtp}>
              Verify
            </button>
          </div>
        )}

        <input
          type="tel"
          placeholder="+91 | Enter your number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <div className="password-field">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <div className="checkbox-field">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <label>I agree to the terms and conditions</label>
        </div>

        <button type="submit" disabled={!verified}>
          Sign Up
        </button>

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
