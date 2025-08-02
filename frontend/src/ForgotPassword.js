import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const API = "http://localhost:5000/api";

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/forgot-password`, { email });
      setMessage(res.data.msg);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error sending OTP');
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/forgot-password/verify`, { email, otp });
      setMessage(res.data.msg);
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Invalid OTP');
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/forgot-password/reset`, { email, newPassword });
      setMessage(res.data.msg);
      setStep(4);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error resetting password');
    }
  };

  return (
    <div className="forgot-password-container">
      {step === 1 && (
        <form onSubmit={handleRequestOtp}>
          <h2>Forgot Password</h2>
          <p>Enter your email to receive an OTP.</p>
          <input type="email" placeholder="Your Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send OTP</button>
          <p>{message}</p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <h2>Verify OTP</h2>
          <p>Enter the OTP sent to {email}</p>
          <input type="text" placeholder="Enter OTP"
            value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit">Verify OTP</button>
          <p>{message}</p>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <h2>Reset Password</h2>
          <input type="password" placeholder="New Password"
            value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Update Password</button>
          <p>{message}</p>
        </form>
      )}

      {step === 4 && (
        <div>
          <h2>Password Reset Successful ✅</h2>
          <p>You can now <a href="/signin">Sign In</a> with your new password.</p>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
