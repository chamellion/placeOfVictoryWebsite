const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
require('dotenv').config();

// Firebase configuration
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

async function testCollections() {
  try {
    console.log('🔍 Testing Firebase collections...');
    console.log('Project ID:', firebaseConfig.projectId);
    
    // Test recurringEvents collection
    console.log('\n📅 Testing recurringEvents collection...');
    const recurringRef = collection(db, 'recurringEvents');
    const recurringSnapshot = await getDocs(recurringRef);
    console.log(`✅ recurringEvents: ${recurringSnapshot.size} documents`);
    
    if (recurringSnapshot.size > 0) {
      recurringSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${doc.id}: ${data.title} (Day: ${data.dayOfWeek}, Active: ${data.isActive})`);
      });
    }
    
    // Test skippedRecurringEvents collection
    console.log('\n⏭️ Testing skippedRecurringEvents collection...');
    const skippedRef = collection(db, 'skippedRecurringEvents');
    const skippedSnapshot = await getDocs(skippedRef);
    console.log(`✅ skippedRecurringEvents: ${skippedSnapshot.size} documents`);
    
    if (skippedSnapshot.size > 0) {
      skippedSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${doc.id}: Skip ${data.skipDate} for ${data.recurringEventId}`);
      });
    }
    
    // Test events collection
    console.log('\n📋 Testing events collection...');
    const eventsRef = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsRef);
    console.log(`✅ events: ${eventsSnapshot.size} documents`);
    
    console.log('\n🎉 Collection test complete!');
    
  } catch (error) {
    console.error('❌ Error testing collections:', error);
    
    if (error.code === 'permission-denied') {
      console.error('🔒 Permission denied. Check Firestore security rules.');
    } else if (error.code === 'not-found') {
      console.error('🔍 Collection not found. Check if collections exist.');
    } else {
      console.error('💥 Unexpected error:', error.message);
    }
  }
}

// Run the test
testCollections()
  .then(() => {
    console.log('\n✨ Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  });
