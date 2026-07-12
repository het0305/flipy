// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ------------------ MongoDB Connection ------------------
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------ User Schema ------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// ------------------ JWT Helper ------------------
const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// ------------------ Email Transporters ------------------
const transporter1 = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const transporter2 = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER2,
    pass: process.env.EMAIL_PASS2,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter1.verify((error, success) => {
  if (error) {
    console.error('❌ transporter1 verify failed:', error);
  } else {
    console.log('✅ transporter1 ready to send emails');
  }
});

transporter2.verify((error, success) => {
  if (error) {
    console.error('❌ transporter2 verify failed:', error);
  } else {
    console.log('✅ transporter2 ready to send emails');
  }
});

// ------------------ OTP Store ------------------
let otpStore = {}; // { email: otp }

// ------------------ SignUp OTP ------------------

// 1️⃣ Send OTP for SignUp
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "❗ Email is required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ msg: "⚠️ Email already registered" });

    // Generate proper 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
    otpStore[email] = otp;

    const mailOptions = {
      from: `"Flipy Support" <${process.env.EMAIL_USER1}>`,
      to: email,
      subject: "Flipy Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333;">Email Verification</h2>
            <p style="font-size: 16px; color: #666;">Please use the following OTP to verify your email address.</p>
            <div style="background-color: #28a745; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666;">This OTP is valid for 5 minutes.</p>
            <p style="color: #999; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `,
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    console.log(`🔄 Attempting to send SignUp OTP to ${email}...`);
    const info = await transporter1.sendMail(mailOptions);
    console.log(`✅ SignUp OTP sent to ${email}: ${otp}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    
    res.status(200).json({ msg: "✅ OTP sent successfully!" });

    // Auto-delete OTP after 5 minutes
    setTimeout(() => {
      if (otpStore[email]) {
        delete otpStore[email];
        console.log(`🗑️ SignUp OTP expired for ${email}`);
      }
    }, 5 * 60 * 1000);
  } catch (err) {
    console.error("❌ SignUp OTP error:", err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      command: err.command
    });
    res.status(500).json({ msg: "❌ Failed to send OTP. Please try again." });
  }
});

// 2️⃣ Verify OTP for SignUp
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ success: false, msg: '❗ Email and OTP are required' });
  }

  console.log(`🔍 Verifying SignUp OTP for ${email}. Stored: ${otpStore[email]}, Provided: ${otp}`);
  
  if (otpStore[email] && otpStore[email].toString() === otp.toString()) {
    delete otpStore[email];
    console.log(`✅ SignUp OTP verified for ${email}`);
    return res.json({ success: true, msg: "✅ OTP verified successfully!" });
  } else {
    console.log(`❌ Invalid SignUp OTP for ${email}`);
    return res.status(400).json({ success: false, msg: "❌ Invalid or expired OTP" });
  }
});

// ------------------ Register ------------------
app.post('/api/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) return res.status(400).json({ msg: '❗ All fields required.' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ msg: '⚠️ User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: '✅ Account created successfully!' });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ msg: '❌ Server error.' });
  }
});

// ------------------ Login ------------------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: '❗ Email and password required.' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: '❌ Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: '❌ Invalid credentials.' });

    const token = createToken(user);
    res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ msg: '❌ Server error.' });
  }
});

// ------------------ Forgot Password ------------------

// 1️⃣ Send OTP
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: '❗ Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: '❌ User not found' });

    // Generate proper 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
    otpStore[email] = otp;

    const mailOptions = {
      from: `"Flipy Support" <${process.env.EMAIL_USER1}>`,
      to: email,
      subject: '🔑 Password Reset OTP - Flipy',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="font-size: 16px; color: #666;">You have requested to reset your password.</p>
            <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666;">This OTP is valid for 5 minutes.</p>
            <p style="color: #999; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `,
      text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
    };

    console.log(`🔄 Attempting to send OTP to ${email}...`);
    const info = await transporter1.sendMail(mailOptions);
    console.log(`✅ Forgot Password OTP sent to ${email}: ${otp}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    
    res.json({ msg: '✅ OTP sent to your email.' });

    // Auto-delete OTP after 5 minutes
    setTimeout(() => {
      if (otpStore[email]) {
        delete otpStore[email];
        console.log(`🗑️ OTP expired for ${email}`);
      }
    }, 5 * 60 * 1000);
  } catch (err) {
    console.error('❌ Forgot Password OTP error:', err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      command: err.command
    });
    res.status(500).json({ msg: '❌ Failed to send OTP. Please try again.' });
  }
});

// 2️⃣ Verify OTP
app.post('/api/forgot-password/verify', (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ success: false, msg: '❗ Email and OTP are required' });
  }

  console.log(`🔍 Verifying OTP for ${email}. Stored: ${otpStore[email]}, Provided: ${otp}`);
  
  if (otpStore[email] && otpStore[email].toString() === otp.toString()) {
    console.log(`✅ OTP verified for ${email}`);
    return res.json({ success: true, msg: '✅ OTP verified' });
  } else {
    console.log(`❌ Invalid OTP for ${email}`);
    return res.status(400).json({ success: false, msg: '❌ Invalid or expired OTP' });
  }
});

// 3️⃣ Reset Password
app.post('/api/forgot-password/reset', async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ msg: '❗ Missing fields' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: '❌ User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email];
    console.log(`✅ Password reset successfully for ${email}`);
    res.json({ msg: '✅ Password updated successfully!' });
  } catch (err) {
    console.error('❌ Password reset error:', err.message);
    res.status(500).json({ msg: '❌ Failed to reset password' });
  }
});

// ------------------ Book Swap Email ------------------
app.post('/api/swap', async (req, res) => {
  const { name, email, giveBook, wantBook } = req.body;
  if (!name || !email || !giveBook || !wantBook) return res.status(400).json({ message: '❗ All fields required.' });

  const useFirst = Math.random() < 0.5;
  const transporter = useFirst ? transporter1 : transporter2;
  const authSenderEmail = useFirst ? process.env.EMAIL_USER1 : process.env.EMAIL_USER2;
  const receiverEmail = authSenderEmail;

  const mailOptions = {
    from: `"Flipy Book Swap" <${authSenderEmail}>`,
    replyTo: email,
    to: receiverEmail,
    subject: `📚 Book Swap Request from ${name}`,
    text: `
📚 Book Swap Request

👤 Name: ${name}
📧 Email: ${email}
📘 Book to Give: ${giveBook}
📗 Book Wanted: ${wantBook}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `✅ Email sent successfully via ${receiverEmail}` });
  } catch (err) {
    console.error(`❌ Email failed:`, err.message);
    res.status(500).json({ message: '❌ Email failed to send' });
  }
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
