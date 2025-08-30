const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
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

// Sample recurring events data
const sampleRecurringEvents = [
  {
    title: "Sunday Service - First Service",
    description: "Join us for our first Sunday service of the week. A time of worship, prayer, and biblical teaching.",
    dayOfWeek: 0, // Sunday
    startTime: "09:30",
    endTime: "11:00",
    location: "Main Sanctuary",
    isActive: true
  },
  {
    title: "Sunday Service - Second Service",
    description: "Our second Sunday service. Come experience the presence of God through worship and the Word.",
    dayOfWeek: 0, // Sunday
    startTime: "12:00",
    endTime: "13:30",
    location: "Main Sanctuary",
    isActive: true
  },
  {
    title: "Bible Study",
    description: "Mid-week Bible study session. Deep dive into God's Word with interactive discussions.",
    dayOfWeek: 2, // Tuesday
    startTime: "19:00",
    endTime: "20:30",
    location: "Fellowship Hall",
    isActive: true
  },
  {
    title: "Prayer Meeting",
    description: "Corporate prayer time. Join us as we lift up our church, community, and world in prayer.",
    dayOfWeek: 4, // Thursday
    startTime: "18:00",
    endTime: "19:00",
    location: "Prayer Room",
    isActive: true
  },
  {
    title: "Youth Group",
    description: "Youth ministry gathering. Fun activities, Bible study, and fellowship for young people.",
    dayOfWeek: 5, // Friday
    startTime: "17:00",
    endTime: "19:00",
    location: "Youth Center",
    isActive: true
  }
];

async function populateRecurringEvents() {
  try {
    console.log('🚀 Populating recurringEvents collection...');
    console.log('Project ID:', firebaseConfig.projectId);
    
    const recurringEventsRef = collection(db, 'recurringEvents');
    
    for (const eventData of sampleRecurringEvents) {
      try {
        const docRef = await addDoc(recurringEventsRef, {
          ...eventData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        console.log(`✅ Added recurring event: ${eventData.title} (ID: ${docRef.id})`);
        console.log(`   Day: ${eventData.dayOfWeek}, Time: ${eventData.startTime}-${eventData.endTime}`);
        
      } catch (error) {
        console.error(`❌ Failed to add event "${eventData.title}":`, error.message);
      }
    }
    
    console.log('\n🎉 Recurring events population complete!');
    console.log(`📊 Added ${sampleRecurringEvents.length} recurring events`);
    
  } catch (error) {
    console.error('💥 Error populating recurring events:', error);
    
    if (error.code === 'permission-denied') {
      console.error('🔒 Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('🌐 Firebase service unavailable. Check network connection.');
    } else {
      console.error('💥 Unexpected error:', error.message);
    }
  }
}

// Run the population
populateRecurringEvents()
  .then(() => {
    console.log('\n✨ Population completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Population failed:', error);
    process.exit(1);
  });
