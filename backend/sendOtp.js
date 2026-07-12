// backend/sendOtp.js
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER1,  // Your Gmail
    pass: process.env.EMAIL_PASS1,  // App password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter on load
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ sendOtp.js transporter verify failed:', error);
  } else {
    console.log('✅ sendOtp.js transporter ready to send emails');
  }
});

let otpStore = {}; // { email: otp }

// ✅ Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, msg: "Email is required" });

  try {
    // Generate proper 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString().padStart(6, '0');
    otpStore[email] = otp;

    const mailOptions = {
      from: `"Flipy Support" <${process.env.EMAIL_USER1}>`,
      to: email,
      subject: "Your Email Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333;">Email Verification</h2>
            <p style="font-size: 16px; color: #666;">Your verification code is:</p>
            <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666;">This OTP is valid for 5 minutes.</p>
            <p style="color: #999; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `,
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    console.log(`🔄 Attempting to send OTP to ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
    console.log(`📧 Message ID: ${info.messageId}`);
    
    res.json({ success: true, msg: "OTP sent successfully" });

    // Auto-clear OTP after 5 minutes
    setTimeout(() => {
      if (otpStore[email]) {
        delete otpStore[email];
        console.log(`🗑️ OTP expired for ${email}`);
      }
    }, 5 * 60 * 1000);
  } catch (err) {
    console.error("❌ OTP Email Error:", err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      command: err.command
    });
    res.status(500).json({ success: false, msg: "Failed to send OTP. Please try again." });
  }
};

// ✅ Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, msg: "Email and OTP required" });
  }

  console.log(`🔍 Verifying OTP for ${email}. Stored: ${otpStore[email]}, Provided: ${otp}`);

  if (otpStore[email] && otpStore[email].toString() === otp.toString()) {
    delete otpStore[email];
    console.log(`✅ OTP verified for ${email}`);
    return res.json({ success: true, msg: "OTP verified successfully" });
  } else {
    console.log(`❌ Invalid OTP for ${email}`);
    return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
  }
};
