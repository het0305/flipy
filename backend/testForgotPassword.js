// Test Forgot Password Flow
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Replace with an email that exists in your database
const TEST_EMAIL = 'hetpatell0305@gmail.com'; // Change this to a real registered email

async function testForgotPasswordFlow() {
  console.log('🔍 Testing Forgot Password Flow...\n');

  try {
    // Step 1: Request OTP
    console.log('Step 1: Requesting OTP for forgot password...');
    console.log(`Email: ${TEST_EMAIL}\n`);
    
    const response1 = await axios.post(`${BASE_URL}/api/forgot-password`, {
      email: TEST_EMAIL
    });
    
    console.log('✅ Response:', response1.data);
    console.log('📧 Check your inbox at:', TEST_EMAIL);
    console.log('📧 Also check your SPAM/JUNK folder!\n');
    
    console.log('⏳ Waiting 10 seconds for email to arrive...\n');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    console.log('---');
    console.log('Next Steps:');
    console.log('1. Check your email inbox for the OTP');
    console.log('2. Note: OTP is also logged in the server console');
    console.log('3. Use the OTP to verify via: POST /api/forgot-password/verify');
    console.log('4. Then reset password via: POST /api/forgot-password/reset\n');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      console.log('\n⚠️  The email is not registered in the database.');
      console.log('Please register first or use a different email.');
    }
  }
}

console.log('📧 Make sure the server is running at http://localhost:5000\n');
testForgotPasswordFlow();
