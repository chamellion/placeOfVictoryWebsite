#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 Deploying Firebase Security Rules');
console.log('====================================\n');

// Check if firebase.json exists
const firebaseConfigPath = path.join(__dirname, 'firebase.json');
if (!fs.existsSync(firebaseConfigPath)) {
  console.error('❌ firebase.json not found. Please ensure Firebase is initialized.');
  process.exit(1);
}

console.log('📋 Current Firestore rules:');
console.log('=' .repeat(50));
console.log(fs.readFileSync(path.join(__dirname, 'firestore.rules'), 'utf8'));
console.log('=' .repeat(50));

console.log('\n🚀 Deploying Firestore security rules...');

try {
  // Deploy Firestore rules
  execSync('npx firebase deploy --only firestore:rules', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('\n✅ Firestore security rules deployed successfully!');
  console.log('🔄 Your carousel should now load properly.');
  console.log('📱 Refresh your browser to see the changes.');
  
} catch (error) {
  console.error('\n❌ Failed to deploy Firestore rules:', error.message);
  console.log('\n🔧 Manual deployment steps:');
  console.log('1. Run: npx firebase login');
  console.log('2. Run: npx firebase use rccgplaceofvictory');
  console.log('3. Run: npx firebase deploy --only firestore:rules');
  console.log('\n📚 For more help, see: https://firebase.google.com/docs/firestore/security/get-started');
} 