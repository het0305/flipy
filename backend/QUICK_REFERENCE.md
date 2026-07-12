# 🚀 Quick Reference - Email System

## ✅ Current Status: WORKING!

**Email**: hetpatell0305@gmail.com  
**Server**: http://localhost:5000  
**Status**: ✅ All systems operational

---

## 🧪 Quick Test Commands

```bash
# Check configuration status
node CHECK_STATUS.js

# Test email sending
node testEmail.js

# Test forgot password
node testForgotPassword.js

# Start server
node server.js
```

---

## 📬 API Endpoints (POST)

```javascript
// Sign Up - Send OTP
fetch('http://localhost:5000/api/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "user@email.com" })
})

// Sign Up - Verify OTP
fetch('http://localhost:5000/api/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "user@email.com", otp: "123456" })
})

// Forgot Password - Send OTP
fetch('http://localhost:5000/api/forgot-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "user@email.com" })
})

// Forgot Password - Verify OTP
fetch('http://localhost:5000/api/forgot-password/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "user@email.com", otp: "123456" })
})

// Forgot Password - Reset
fetch('http://localhost:5000/api/forgot-password/reset', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: "user@email.com", newPassword: "newpass123" })
})
```

---

## 🐛 Troubleshooting

### Email not arriving?
1. ✅ Check spam/junk folder
2. ✅ Check server console for OTP code
3. ✅ Wait 1-2 minutes
4. ✅ Check Gmail Promotions tab

### Server errors?
1. ✅ Check MongoDB is running
2. ✅ Check .env file has no spaces in passwords
3. ✅ Run `node testEmail.js` to verify config

### OTP invalid?
1. ✅ Check OTP hasn't expired (5 min limit)
2. ✅ Check server console for actual OTP sent
3. ✅ Ensure email matches exactly

---

## 📝 What Was Fixed

1. ✅ Removed spaces from app password
2. ✅ Fixed OTP generation (proper 6-digit)
3. ✅ Added HTML email templates
4. ✅ Better error logging
5. ✅ Proper SMTP configuration
6. ✅ OTP expiration handling

---

## 📚 Documentation

- **COMPLETE_EMAIL_SETUP.md** - Full setup guide
- **EMAIL_FIX_SUMMARY.md** - What was fixed
- **EMAIL_TROUBLESHOOTING.md** - Detailed troubleshooting
- **SETUP_GMAIL_APP_PASSWORD.md** - App password guide

---

## ⚡ Quick Tips

- **OTP shown in console** - Check server logs for debugging
- **5-minute expiry** - OTPs expire after 5 minutes
- **Check spam** - Gmail often filters automated emails
- **One-time use** - Each OTP can only be used once

---

**Everything is ready to use! 🎉**
