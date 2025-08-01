// backend/sendOtp.js
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER1,  // Your Gmail
    pass: process.env.EMAIL_PASS1,  // App password
  },
});

let otpStore = {}; // { email: otp }

// ✅ Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, msg: "Email is required" });

  const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
  otpStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER1,
    to: email,
    subject: "Your Email Verification Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.json({ success: true, msg: "OTP sent successfully" });

    // Auto-clear OTP after 5 minutes
    setTimeout(() => delete otpStore[email], 5 * 60 * 1000);
  } catch (err) {
    console.error("❌ OTP Email Error:", err);
    res.status(500).json({ success: false, msg: "Failed to send OTP" });
  }
};

// ✅ Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ success: false, msg: "Email and OTP required" });

  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success: true, msg: "OTP verified successfully" });
  } else {
    return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
  }
};
