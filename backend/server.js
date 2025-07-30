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

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// 🔐 JWT Helper
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2d' }
  );
};

// ✅ Route: Register
app.post('/api/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ msg: '❗ All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: '⚠️ User already exists. Please sign in.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: '✅ Account created successfully!' });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ msg: '❌ Server error.' });
  }
});

// ✅ Route: Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: '❗ Email and password required.' });
  }

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

// 📧 Setup Email Transporters
const transporter1 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
});

const transporter2 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER2,
    pass: process.env.EMAIL_PASS2,
  },
});

// 📚 Route: Book Swap Request Email
app.post('/api/swap', async (req, res) => {
  const { name, email, giveBook, wantBook } = req.body;

  if (!name || !email || !giveBook || !wantBook) {
    return res.status(400).json({ message: '❗ All fields are required.' });
  }

  const useFirst = Math.random() < 0.5;
  const transporter = useFirst ? transporter1 : transporter2;
  const receiverEmail = useFirst ? process.env.EMAIL_USER1 : process.env.EMAIL_USER2;

  const mailOptions = {
    from: `"Flipy Book Swap" <${email}>`,
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

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
