// Test Email Configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

// Test Transporter 1
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

// Test Transporter 2
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

async function testEmailConfig() {
  console.log('🔍 Testing Email Configuration...\n');
  
  // Test Transporter 1
  console.log('Testing Transporter 1...');
  console.log('Email:', process.env.EMAIL_USER1);
  console.log('Password (hidden):', process.env.EMAIL_PASS1 ? '****' : 'NOT SET');
  
  try {
    await transporter1.verify();
    console.log('✅ Transporter 1 is ready!\n');
    
    // Send test email
    console.log('📧 Sending test email from Transporter 1...');
    const info1 = await transporter1.sendMail({
      from: `"Flipy Test" <${process.env.EMAIL_USER1}>`,
      to: process.env.EMAIL_USER1, // Send to self
      subject: '✅ Test Email - Transporter 1',
      html: `
        <h2>Test Email Successful</h2>
        <p>Your email configuration for Transporter 1 is working correctly!</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
      text: 'Test email from Transporter 1'
    });
    console.log('✅ Test email sent! Message ID:', info1.messageId);
  } catch (error) {
    console.error('❌ Transporter 1 Error:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error Command:', error.command);
  }

  console.log('\n---\n');

  // Test Transporter 2
  console.log('Testing Transporter 2...');
  console.log('Email:', process.env.EMAIL_USER2);
  console.log('Password (hidden):', process.env.EMAIL_PASS2 ? '****' : 'NOT SET');
  
  try {
    await transporter2.verify();
    console.log('✅ Transporter 2 is ready!\n');
    
    // Send test email
    console.log('📧 Sending test email from Transporter 2...');
    const info2 = await transporter2.sendMail({
      from: `"Flipy Test" <${process.env.EMAIL_USER2}>`,
      to: process.env.EMAIL_USER2, // Send to self
      subject: '✅ Test Email - Transporter 2',
      html: `
        <h2>Test Email Successful</h2>
        <p>Your email configuration for Transporter 2 is working correctly!</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
      text: 'Test email from Transporter 2'
    });
    console.log('✅ Test email sent! Message ID:', info2.messageId);
  } catch (error) {
    console.error('❌ Transporter 2 Error:', error.message);
    console.error('Error Code:', error.code);
    console.error('Error Command:', error.command);
  }

  console.log('\n🏁 Testing complete!');
}

// Run the test
testEmailConfig().catch(console.error);
