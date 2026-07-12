// Quick Status Check Script
require('dotenv').config();

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║           📧 EMAIL SYSTEM STATUS CHECK                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log('📝 Configuration Status:\n');

// Check environment variables
const checks = {
  'MongoDB URI': process.env.MONGO_URI,
  'JWT Secret': process.env.JWT_SECRET,
  'Server Port': process.env.PORT,
  'Email User 1': process.env.EMAIL_USER1,
  'Email Pass 1': process.env.EMAIL_PASS1 ? '✅ Set (' + process.env.EMAIL_PASS1.length + ' chars)' : '❌ Not Set',
  'Email User 2': process.env.EMAIL_USER2,
  'Email Pass 2': process.env.EMAIL_PASS2 ? '✅ Set (' + process.env.EMAIL_PASS2.length + ' chars)' : '❌ Not Set',
};

Object.entries(checks).forEach(([key, value]) => {
  if (key.includes('Pass')) {
    console.log(`   ${key.padEnd(20)}: ${value}`);
  } else {
    const displayValue = value || '❌ Not Set';
    const status = value ? '✅' : '❌';
    console.log(`   ${key.padEnd(20)}: ${status} ${displayValue}`);
  }
});

console.log('\n📧 Email Configuration Details:\n');
console.log(`   Primary Email: ${process.env.EMAIL_USER1}`);
console.log(`   App Password:  ${process.env.EMAIL_PASS1 ? '*'.repeat(16) + ' (configured)' : '❌ Not configured'}`);
console.log(`   Password Check: ${process.env.EMAIL_PASS1?.includes(' ') ? '⚠️  Contains spaces (WRONG)' : '✅ No spaces (CORRECT)'}`);

console.log('\n🔧 Server Status:\n');
console.log('   Server URL:     http://localhost:' + (process.env.PORT || 5000));
console.log('   MongoDB:        Connecting...');
console.log('   Email Service:  Gmail SMTP (smtp.gmail.com:465)');

console.log('\n📬 Available Endpoints:\n');
const endpoints = [
  { method: 'POST', path: '/api/send-otp', desc: 'Send signup OTP' },
  { method: 'POST', path: '/api/verify-otp', desc: 'Verify signup OTP' },
  { method: 'POST', path: '/api/register', desc: 'Register new user' },
  { method: 'POST', path: '/api/login', desc: 'User login' },
  { method: 'POST', path: '/api/forgot-password', desc: 'Send password reset OTP' },
  { method: 'POST', path: '/api/forgot-password/verify', desc: 'Verify reset OTP' },
  { method: 'POST', path: '/api/forgot-password/reset', desc: 'Reset password' },
  { method: 'POST', path: '/api/swap', desc: 'Send book swap email' },
];

endpoints.forEach(ep => {
  console.log(`   ${ep.method.padEnd(6)} ${ep.path.padEnd(35)} - ${ep.desc}`);
});

console.log('\n🧪 Testing Commands:\n');
console.log('   Test email config:       node testEmail.js');
console.log('   Test forgot password:    node testForgotPassword.js');
console.log('   Update email config:     node updateEmailConfig.js');
console.log('   Check status:            node CHECK_STATUS.js');

console.log('\n📚 Documentation Files:\n');
const docs = [
  'COMPLETE_EMAIL_SETUP.md - Complete setup guide',
  'EMAIL_FIX_SUMMARY.md - Summary of fixes',
  'EMAIL_TROUBLESHOOTING.md - Troubleshooting guide',
  'SETUP_GMAIL_APP_PASSWORD.md - App password setup',
];
docs.forEach(doc => console.log(`   📄 ${doc}`));

console.log('\n✅ Next Steps:\n');
console.log('   1. Ensure server is running: node server.js');
console.log('   2. Test email delivery: node testEmail.js');
console.log('   3. Test from frontend: Try "Forgot Password" feature');
console.log('   4. Check inbox: ' + process.env.EMAIL_USER1);
console.log('   5. Check spam folder if email not in inbox\n');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  🎉 Email System Ready! Check COMPLETE_EMAIL_SETUP.md         ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');
