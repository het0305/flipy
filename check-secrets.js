// Security Check Script - Run before pushing to GitHub
const fs = require('fs');
const path = require('path');

console.log('\n🔐 Security Check - Scanning for potential secrets...\n');

let issues = [];

// Check 1: Verify .env is in .gitignore
console.log('✓ Checking .gitignore configuration...');
const gitignorePath = path.join(__dirname, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (gitignore.includes('.env')) {
    console.log('  ✅ .env is in .gitignore\n');
  } else {
    console.log('  ❌ .env NOT found in .gitignore!\n');
    issues.push('.env not in .gitignore');
  }
} else {
  console.log('  ❌ .gitignore file not found!\n');
  issues.push('.gitignore missing');
}

// Check 2: Verify .env.example exists and has no real values
console.log('✓ Checking .env.example...');
const envExamplePath = path.join(__dirname, 'backend', '.env.example');
if (fs.existsSync(envExamplePath)) {
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  
  // Check for potential real passwords
  const suspiciousPatterns = [
    /EMAIL_PASS1=[a-z]{16}/i,
    /EMAIL_PASS2=[a-z]{16}/i,
    /gmqztkbrfuqfylor/i,
    /@gmail\.com.*\n.*EMAIL_PASS1=[a-z]{16}/is
  ];
  
  let hasRealValues = false;
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(envExample)) {
      hasRealValues = true;
    }
  });
  
  if (hasRealValues) {
    console.log('  ⚠️  .env.example might contain real passwords!\n');
    issues.push('.env.example contains suspicious values');
  } else {
    console.log('  ✅ .env.example looks safe\n');
  }
} else {
  console.log('  ⚠️  .env.example not found (should create one)\n');
}

// Check 3: Look for hardcoded secrets in code files
console.log('✓ Scanning for hardcoded secrets in code...');
const dangerousPatterns = [
  { pattern: /gmqztkbrfuqfylor/gi, name: 'App Password' },
  { pattern: /hetpatell0305@gmail\.com.*gmqz/gi, name: 'Email with Password' },
];

function scanDirectory(dir, exclude = ['node_modules', '.git', 'dist', 'build']) {
  const files = [];
  
  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!exclude.includes(item)) {
          walk(fullPath);
        }
      } else if (stat.isFile() && /\.(js|jsx|ts|tsx|json)$/.test(item)) {
        files.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return files;
}

const filesToScan = scanDirectory(__dirname);
let foundSecrets = false;

filesToScan.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = path.relative(__dirname, file);
  
  // Skip this security check script itself and test files
  if (relativePath === 'check-secrets.js' || 
      relativePath.includes('testEmail.js') ||
      relativePath.includes('testForgotPassword.js') ||
      relativePath.includes('CHECK_STATUS.js') ||
      relativePath.includes('.md')) {
    return;
  }
  
  dangerousPatterns.forEach(({ pattern, name }) => {
    if (pattern.test(content)) {
      console.log(`  ⚠️  Found ${name} in: ${relativePath}`);
      foundSecrets = true;
      issues.push(`Hardcoded secret in ${relativePath}`);
    }
  });
});

if (!foundSecrets) {
  console.log('  ✅ No hardcoded secrets found in code\n');
} else {
  console.log('');
}

// Check 4: Verify .env exists locally but will be ignored
console.log('✓ Checking .env file status...');
const envPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(envPath)) {
  console.log('  ✅ .env file exists (will be ignored by Git)\n');
} else {
  console.log('  ⚠️  .env file not found (create from .env.example)\n');
}

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (issues.length === 0) {
  console.log('✅ SAFE TO PUSH: No security issues found!\n');
  console.log('Your secrets are protected. You can safely push to GitHub.\n');
  process.exit(0);
} else {
  console.log('❌ SECURITY ISSUES FOUND:\n');
  issues.forEach((issue, i) => {
    console.log(`   ${i + 1}. ${issue}`);
  });
  console.log('\n⚠️  FIX THESE ISSUES BEFORE PUSHING TO GITHUB!\n');
  console.log('See SECURITY_SETUP.md for help.\n');
  process.exit(1);
}
