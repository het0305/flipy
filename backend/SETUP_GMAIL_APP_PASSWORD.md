# How to Set Up Gmail App Passwords (Step-by-Step)

## ⚠️ IMPORTANT: Your Current App Passwords Are Not Working

The authentication is failing. You need to regenerate your Gmail App Passwords.

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable it (if not already enabled)

## Step 2: Generate App Password

### For EMAIL_USER1 (hetptl0305@gmail.com):

1. **Sign in** to hetptl0305@gmail.com
2. Go to: https://myaccount.google.com/apppasswords
   - OR: Google Account → Security → 2-Step Verification → App passwords (at bottom)
3. Click **"Select app"** → Choose **"Mail"**
4. Click **"Select device"** → Choose **"Other (Custom name)"**
5. Type: **"Flipy BookSwap"**
6. Click **Generate**
7. Google will show a **16-character password** like: `abcd efgh ijkl mnop`
8. **IMPORTANT**: Copy this password and **REMOVE ALL SPACES**
   - Example: `abcd efgh ijkl mnop` → `abcdefghijklmnop`

### For EMAIL_USER2 (hetpatell0305@gmail.com):

Repeat the exact same steps for the second email account.

## Step 3: Update .env File

Open `backend/.env` and update:

```env
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=yourSuperSecretKey
PORT=5000

EMAIL_USER1=hetptl0305@gmail.com
EMAIL_PASS1=YOUR_NEW_16_CHAR_PASSWORD_NO_SPACES

EMAIL_USER2=hetpatell0305@gmail.com
EMAIL_PASS2=YOUR_NEW_16_CHAR_PASSWORD_NO_SPACES
```

**Example** (with fake passwords):
```env
EMAIL_USER1=hetptl0305@gmail.com
EMAIL_PASS1=abcdefghijklmnop

EMAIL_USER2=hetpatell0305@gmail.com
EMAIL_PASS2=qrstuvwxyzabcdef
```

## Step 4: Test Email Configuration

```bash
cd backend
node testEmail.js
```

You should see:
```
✅ Transporter 1 is ready!
✅ Test email sent! Message ID: <...>
```

## Step 5: Start Your Server

```bash
node server.js
```

## Step 6: Test Forgot Password Flow

1. Go to your frontend application
2. Navigate to "Forgot Password"
3. Enter your email
4. Check your inbox (and spam folder) for the OTP

## Troubleshooting

### If app passwords option is not visible:
- Make sure 2FA is enabled
- Wait 15 minutes after enabling 2FA
- Try accessing directly: https://myaccount.google.com/apppasswords

### If emails still don't send:
1. Check spam/junk folder
2. Make sure there are NO SPACES in the password
3. Try regenerating the app password
4. Check Google Account security alerts

### Common Mistakes:
❌ Password has spaces: `abcd efgh ijkl mnop`
✅ Password has no spaces: `abcdefghijklmnop`

❌ Using regular Gmail password
✅ Using 16-character app password

❌ App password expires or is revoked
✅ Generate a fresh app password

## Security Notes

- App passwords bypass 2FA, so keep them secret
- Each app password is unique to one application
- You can revoke app passwords anytime from Google Account settings
- Never share your app passwords or commit them to public repositories

## Quick Reference Links

- Google Account: https://myaccount.google.com/
- App Passwords: https://myaccount.google.com/apppasswords
- Gmail Help: https://support.google.com/mail/?p=BadCredentials
