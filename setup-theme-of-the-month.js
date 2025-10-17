const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample theme data for the new top banner structure
const sampleTheme = {
  title: "Walking in Victory",
  imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  titleColor: "#ffffff", // White text for banner
  titleFontWeight: "bold", // Options: "thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"
  titleFontFamily: "sans-serif", // Optional: custom font family
  isVisible: true, // Admin toggle - set to false to hide the banner
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Alternative theme with different styling
const sampleThemeAlt = {
  title: "Faith Over Fear",
  imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  titleColor: "#fef3c7", // Light yellow text
  titleFontWeight: "extrabold",
  titleFontFamily: "serif",
  isVisible: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function setupThemeOfTheMonth() {
  try {
    console.log('Setting up Theme of the Month...');
    
    // Create the active theme document
    await setDoc(doc(db, 'theme_of_the_month', 'active'), sampleTheme);
    
    console.log('✅ Theme of the Month setup complete!');
    console.log('📝 Sample theme data:');
    console.log(JSON.stringify(sampleTheme, null, 2));
    console.log('\n💡 To use different styling, update the document with:');
    console.log(JSON.stringify(sampleThemeAlt, null, 2));
    console.log('\n🎨 Configuration Options:');
    console.log('   - title: Main theme text');
    console.log('   - imageUrl: Theme image (displays as thumbnail + opens in modal)');
    console.log('   - titleColor: Text color (hex code, default: #ffffff)');
    console.log('   - titleFontWeight: Text weight (thin/light/normal/medium/semibold/bold/extrabold/black)');
    console.log('   - titleFontFamily: Optional custom font family');
    console.log('   - isVisible: true/false - Admin toggle to show/hide banner');
    console.log('\n📱 Component Features:');
    console.log('   ✨ Displays as compact top banner above hero carousel');
    console.log('   🖼️  Shows small thumbnail + title horizontally');
    console.log('   🔍 Click to open full image in beautiful modal overlay');
    console.log('   📱 Fully responsive design');
    console.log('   🎯 ESC key or click outside to close modal');
    console.log('\n⚙️  Admin Control:');
    console.log('   Set isVisible: false in Firestore to hide the banner');
    
  } catch (error) {
    console.error('❌ Error setting up Theme of the Month:', error);
  }
}

// Run the setup
setupThemeOfTheMonth();
