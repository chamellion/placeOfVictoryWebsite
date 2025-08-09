#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 Firebase Carousel Setup Helper');
console.log('==================================\n');

const envTemplate = `# Firebase Configuration
# Replace these placeholder values with your actual Firebase project configuration
# You can find these values in your Firebase Console > Project Settings > General > Your apps

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

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