#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 Firebase Carousel Setup Helper');
console.log('==================================\n');

const envTemplate = `# Firebase Configuration
# Replace these placeholder values with your actual Firebase project configuration
# You can find these values in your Firebase Console > Project Settings > General > Your apps

REACT_APP_FIREBASE_API_KEY=AIzaSyC-CGRWB-0aQjDEZrspDAVaZh60588R7ks
REACT_APP_FIREBASE_AUTH_DOMAIN=rccgplaceofvictory.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=rccgplaceofvictory
REACT_APP_FIREBASE_STORAGE_BUCKET=rccgplaceofvictory.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1030806220871
REACT_APP_FIREBASE_APP_ID=1:1030806220871:web:4ad41b0d275a85fb4a4162
REACT_APP_FIREBASE_MEASUREMENT_ID=G-8SNDZPD57L

# Instructions:
# 1. Go to Firebase Console: https://console.firebase.google.com/
# 2. Select your project
# 3. Go to Project Settings > General
# 4. Scroll down to "Your apps" section
# 5. Copy the values from your web app configuration
# 6. Replace the placeholder values above with your actual values
# 7. Restart your development server after making changes
#
# Example with real values:
# REACT_APP_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
# REACT_APP_FIREBASE_AUTH_DOMAIN=my-church-website.firebaseapp.com
# REACT_APP_FIREBASE_PROJECT_ID=my-church-website
# REACT_APP_FIREBASE_STORAGE_BUCKET=my-church-website.appspot.com
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
# REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
`;

const envPath = path.join(__dirname, '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file already exists!');
  console.log('   If you want to update it, please delete the existing file first.\n');
  console.log('   Current .env.local contents:');
  console.log('   ' + '='.repeat(50));
  console.log(fs.readFileSync(envPath, 'utf8'));
  console.log('   ' + '='.repeat(50));
} else {
  try {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local file with Firebase configuration template');
    console.log('📝 Please edit .env.local and replace the placeholder values with your actual Firebase project configuration');
    console.log('🔗 Get your Firebase config from: https://console.firebase.google.com/');
    console.log('🚀 After updating .env.local, restart your development server with: npm start\n');
  } catch (error) {
    console.error('❌ Failed to create .env.local file:', error.message);
    console.log('\n📋 Please manually create a .env.local file with the following content:\n');
    console.log(envTemplate);
  }
}

console.log('📚 For detailed setup instructions, see: FIREBASE_CAROUSEL_SETUP.md');
console.log('🔧 For troubleshooting, check the browser console when running the app'); 