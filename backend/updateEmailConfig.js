// Interactive script to update email configuration
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '.env');

console.log('📧 Email Configuration Setup Tool\n');
console.log('This tool will help you update your Gmail App Passwords.\n');
console.log('⚠️  IMPORTANT: Remove all spaces from your app password!');
console.log('   Example: "abcd efgh ijkl mnop" → "abcdefghijklmnop"\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  try {
    // Read current .env
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    console.log('Current EMAIL_USER1:', process.env.EMAIL_USER1 || 'Not set');
    console.log('Current EMAIL_USER2:', process.env.EMAIL_USER2 || 'Not set\n');

    const updateEmail1 = await question('Do you want to update EMAIL_USER1 configuration? (y/n): ');
    
    if (updateEmail1.toLowerCase() === 'y') {
      const email1 = await question('Enter EMAIL_USER1 (Gmail address): ');
      const pass1 = await question('Enter EMAIL_PASS1 (16-char app password, NO SPACES): ');
      
      // Validate password format
      if (pass1.includes(' ')) {
        console.log('\n❌ ERROR: Password contains spaces! Please remove all spaces.');
        console.log('   Input: "' + pass1 + '"');
        console.log('   Should be: "' + pass1.replace(/\s/g, '') + '"\n');
        const confirm = await question('Use password without spaces? (y/n): ');
        if (confirm.toLowerCase() === 'y') {
          const cleanPass1 = pass1.replace(/\s/g, '');
          envContent = envContent.replace(/EMAIL_USER1=.*/, `EMAIL_USER1=${email1}`);
          envContent = envContent.replace(/EMAIL_PASS1=.*/, `EMAIL_PASS1=${cleanPass1}`);
          console.log('✅ EMAIL_USER1 configuration updated (spaces removed)\n');
        }
      } else {
        envContent = envContent.replace(/EMAIL_USER1=.*/, `EMAIL_USER1=${email1}`);
        envContent = envContent.replace(/EMAIL_PASS1=.*/, `EMAIL_PASS1=${pass1}`);
        console.log('✅ EMAIL_USER1 configuration updated\n');
      }
    }

    const updateEmail2 = await question('Do you want to update EMAIL_USER2 configuration? (y/n): ');
    
    if (updateEmail2.toLowerCase() === 'y') {
      const email2 = await question('Enter EMAIL_USER2 (Gmail address): ');
      const pass2 = await question('Enter EMAIL_PASS2 (16-char app password, NO SPACES): ');
      
      // Validate password format
      if (pass2.includes(' ')) {
        console.log('\n❌ ERROR: Password contains spaces! Please remove all spaces.');
        console.log('   Input: "' + pass2 + '"');
        console.log('   Should be: "' + pass2.replace(/\s/g, '') + '"\n');
        const confirm = await question('Use password without spaces? (y/n): ');
        if (confirm.toLowerCase() === 'y') {
          const cleanPass2 = pass2.replace(/\s/g, '');
          envContent = envContent.replace(/EMAIL_USER2=.*/, `EMAIL_USER2=${email2}`);
          envContent = envContent.replace(/EMAIL_PASS2=.*/, `EMAIL_PASS2=${cleanPass2}`);
          console.log('✅ EMAIL_USER2 configuration updated (spaces removed)\n');
        }
      } else {
        envContent = envContent.replace(/EMAIL_USER2=.*/, `EMAIL_USER2=${email2}`);
        envContent = envContent.replace(/EMAIL_PASS2=.*/, `EMAIL_PASS2=${pass2}`);
        console.log('✅ EMAIL_USER2 configuration updated\n');
      }
    }

    // Write updated .env
    fs.writeFileSync(envPath, envContent);
    console.log('💾 Configuration saved to .env\n');
    
    const testNow = await question('Do you want to test the email configuration now? (y/n): ');
    if (testNow.toLowerCase() === 'y') {
      console.log('\n🔍 Running email test...\n');
      rl.close();
      
      // Reload env
      require('dotenv').config({ override: true });
      
      // Run test
      require('./testEmail.js');
    } else {
      console.log('\nYou can test later by running: node testEmail.js\n');
      rl.close();
    }
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
  }
}

main();
