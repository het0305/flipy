const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Transporters using two Gmail accounts
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

// API to send email
app.post('/api/swap', async (req, res) => {
  const { name, email, giveBook, wantBook } = req.body;

  const useFirst = Math.random() < 0.5;
  const transporter = useFirst ? transporter1 : transporter2;
  const sender = useFirst ? process.env.EMAIL_USER1 : process.env.EMAIL_USER2;

  const mailOptions = {
    from: sender,
    to: sender,
    subject: `📚 Book Swap Request from ${name}`,
    text: `
New Book Swap Request Received!

Name: ${name}
Email: ${email}
Give Book: ${giveBook}
Want Book: ${wantBook}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `✅ Email sent successfully via ${sender}` });
  } catch (err) {
    console.error(`❌ Failed to send email via ${sender}:`, err);
    res.status(500).json({ message: '❌ Email failed to send' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
