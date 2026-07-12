# Email Troubleshooting Guide

## Common Issues and Solutions

### 1. Gmail App Password Issues

**Problem**: Emails not sending, authentication errors

**Solutions**:
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account → Security
   - Under "Signing in to Google", click "2-Step Verification"
   - Scroll down to "App passwords"
   - Select "Mail" and your device
   - Copy the 16-character password (remove spaces)
   - Update `.env` file with this password

3. **Update .env format**:
   ```
   EMAIL_PASS1=abcd efgh ijkl mnop  (❌ Wrong - has spaces)
   EMAIL_PASS1=abcdefghijklmnop     (✅ Correct - no spaces)
   ```

### 2. "Less Secure Apps" Setting

Gmail no longer supports "Less secure app access". You MUST use App Passwords.

### 3. Check Spam/Junk Folder

OTP emails might be going to spam. Check:
- Spam/Junk folder
- Promotions tab (if using Gmail)
- Social tab

### 4. Email Sending Limits

Gmail has sending limits:
- Free accounts: ~500 emails/day
- If limit reached, wait 24 hours

### 5. Test Email Configuration

Run the test script:
```bash
cd backend
node testEmail.js
```

This will:
- Verify email credentials
- Send test emails
- Show detailed error messages

### 6. Check Server Logs

When requesting OTP, check server console for:
- `🔄 Attempting to send OTP to...`
- `✅ OTP sent to...`
- `❌ OTP error:` (if failed)

### 7. Firewall/Antivirus

Some firewalls block SMTP connections. Try:
- Temporarily disable firewall
- Add Node.js to firewall exceptions
- Use port 587 instead of 465

### 8. Alternative: Use Port 587

If port 465 doesn't work, try port 587 (in server.js):
```javascript
const transporter1 = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,  // Changed from 465
  secure: false,  // Changed from true
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
```

## Verification Checklist

- [ ] Gmail 2FA is enabled
- [ ] App Password generated (16 characters, no spaces)
- [ ] .env file updated with correct credentials
- [ ] Server restarted after .env changes
- [ ] testEmail.js runs successfully
- [ ] Check spam folder
- [ ] Check server console logs

## Quick Fix Steps

1. **Stop the server** (Ctrl+C)

2. **Test email configuration**:
   ```bash
   node testEmail.js
   ```

3. **If test fails**:
   - Regenerate Gmail App Password
   - Update .env file
   - Remove all spaces from password

4. **Restart server**:
   ```bash
   node server.js
   ```

5. **Try forgot password flow**
   - Check server console for logs
   - Check email inbox AND spam

## Contact Support

If issues persist, check:
- Google Account security alerts
- Gmail "Recent security activity"
- Try from different network (mobile hotspot)
