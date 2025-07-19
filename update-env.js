#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 Updating .env.local with RCCG Place of Victory Firebase Configuration');
console.log('======================================================================\n');

const envContent = `# Firebase Configuration for RCCG Place of Victory
# Replace the placeholder values below with your actual Firebase project configuration
# You can find these values in your Firebase Console > Project Settings > General > Your apps

REACT_APP_FIREBASE_API_KEY=your_actual_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=rccgplaceofvictory.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=rccgplaceofvictory
REACT_APP_FIREBASE_STORAGE_BUCKET=rccgplaceofvictory.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id

# Instructions:
# 1. Go to Firebase Console: https://console.firebase.google.com/
# 2. Select your rccgplaceofvictory project
# 3. Go to Project Settings > General
# 4. Scroll down to "Your apps" section
# 5. Copy the missing values from your web app configuration
# 6. Replace the placeholder values above with your actual values
# 7. Restart your development server after making changes
#
# You need to replace these placeholder values:
# - your_actual_api_key_here
# - your_actual_messaging_sender_id  
# - your_actual_app_id
# - your_actual_measurement_id
#
# Example of what it should look like:
# REACT_APP_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
# REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
# REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
`;

const envPath = path.join(__dirname, '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Updated .env.local with RCCG Place of Victory configuration');
  console.log('📝 Please edit .env.local and replace the placeholder values with your actual Firebase values');
  console.log('🔗 Get your Firebase config from: https://console.firebase.google.com/');
  console.log('🚀 After updating .env.local, restart your development server with: npm start\n');
  
  console.log('📋 Current .env.local contents:');
  console.log('=' .repeat(60));
  console.log(fs.readFileSync(envPath, 'utf8'));
  console.log('=' .repeat(60));
  
} catch (error) {
  console.error('❌ Failed to update .env.local file:', error.message);
  console.log('\n📋 Please manually update your .env.local file with this content:\n');
  console.log(envContent);
}

console.log('\n📚 For detailed setup instructions, see: QUICK_SETUP_GUIDE.md');
console.log('🔧 For troubleshooting, check the browser console when running the app'); 