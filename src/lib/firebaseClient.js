import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { isValidCarouselSlide } from '../types/CarouselSlide';
import { isValidEvent } from '../types/Event';
import { isValidPastor } from '../types/Pastor';
import { isValidTeamLead } from '../types/TeamLead';

// Firebase configuration - using REACT_APP_ environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN, // Renamed to avoid AUTH warning
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('[Firebase] Missing required environment variables:', missingFields);
    console.error('[Firebase] Please create a .env.local file with the following variables:');
    console.error('REACT_APP_FIREBASE_API_KEY=your_api_key');
    console.error('REACT_APP_FIREBASE_DOMAIN=your_project_id.firebaseapp.com');
    console.error('REACT_APP_FIREBASE_PROJECT_ID=your_project_id');
    console.error('REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com');
    console.error('REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id');
    console.error('REACT_APP_FIREBASE_APP_ID=your_app_id');
    return false;
  }
  
  return true;
};

// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('[Firebase] Configuration check:');
  console.log('[Firebase] Project ID:', firebaseConfig.projectId || 'NOT SET');
  console.log('[Firebase] Storage Bucket:', firebaseConfig.storageBucket || 'NOT SET');
  console.log('[Firebase] Config validation:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasProjectId: !!firebaseConfig.projectId,
    hasAuthDomain: !!firebaseConfig.authDomain,
    hasStorageBucket: !!firebaseConfig.storageBucket,
    hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
    hasAppId: !!firebaseConfig.appId,
  });
  
  if (!validateFirebaseConfig()) {
    console.warn('[Firebase] Configuration is incomplete. Carousel will use fallback content.');
  }
}

// Initialize Firebase only in the browser
let app;
let firestore;

if (typeof window !== "undefined") {
  // Only initialize if configuration is valid
  if (validateFirebaseConfig()) {
    try {
      // Only initialize if not already initialized
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
        console.log('[Firebase] Successfully initialized with project:', firebaseConfig.projectId);
      } else {
        app = getApps()[0];
        console.log('[Firebase] Using existing Firebase app');
      }
      firestore = getFirestore(app);
    } catch (error) {
      console.error('[Firebase] Failed to initialize Firebase:', error);
      firestore = null;
    }
  } else {
    console.warn('[Firebase] Skipping initialization due to missing configuration');
    firestore = null;
  }
}

export { firestore };

/**
 * Fetches visible carousel slides from Firestore
 * @returns {Promise<CarouselSlide[]>} Array of visible carousel slides ordered by the order field
 */
export const getPublicCarouselSlides = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log('[Firebase] Fetching carousel slides from collection: carousel');
    
    const carouselRef = collection(firestore, 'carousel');
    const q = query(
      carouselRef,
      where('isVisible', '==', true),
      orderBy('order', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const slides = [];
    const invalidSlides = [];

    console.log(`[Firebase] Found ${querySnapshot.size} total documents in carousel collection`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const slide = {
        id: doc.id,
        imageUrl: data.imageUrl || '',
        headline: data.headline || '',
        subheadline: data.subheadline || '',
        ctaText: data.ctaText || '',
        ctaLink: data.ctaLink || '',
        isVisible: data.isVisible || false,
        order: data.order || 0,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
      };

      // Debug log for each slide
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Firebase] Processing slide ${doc.id}:`, {
          imageUrl: slide.imageUrl,
          headline: slide.headline,
          isVisible: slide.isVisible,
          order: slide.order,
          isValid: isValidCarouselSlide(slide)
        });
      }

      // Validate the slide before adding it to the array
      if (isValidCarouselSlide(slide)) {
        slides.push(slide);
      } else {
        invalidSlides.push({ id: doc.id, data: slide });
        console.warn(`[Firebase] Skipping invalid carousel slide: ${doc.id}`);
      }
    });

    // Comprehensive development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Firebase] Carousel slides summary:`);
      console.log(`  - Total documents: ${querySnapshot.size}`);
      console.log(`  - Valid slides: ${slides.length}`);
      console.log(`  - Invalid slides: ${invalidSlides.length}`);
      
      if (slides.length === 0) {
        console.warn('[Firebase] No valid carousel slides found. Possible issues:');
        console.warn('  1. Check Firestore rules allow public reads from carousel');
        console.warn('  2. Verify each slide document has valid imageUrl and isVisible=true');
        console.warn('  3. Ensure Firebase configuration is correct');
        console.warn('  4. Check network connectivity to Firebase');
      }
      
      if (invalidSlides.length > 0) {
        console.warn('[Firebase] Invalid slides details:', invalidSlides);
      }
    }

    return slides;
  } catch (error) {
    console.error('[Firebase] Error fetching carousel slides:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection not found. Verify carousel collection exists.');
    }
    
    return [];
  }
};

/**
 * Fetches all events from Firestore
 * @returns {Promise<Event[]>} Array of events ordered by date ascending
 */
export const getPublicEvents = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log('[Firebase] Fetching events from collection: events');
    
    const eventsRef = collection(firestore, 'events');
    const q = query(
      eventsRef,
      orderBy('date', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const events = [];
    const invalidEvents = [];

    console.log(`[Firebase] Found ${querySnapshot.size} total documents in events collection`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const event = {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        startTime: data.startTime || '',
        endTime: data.endTime || '',
        location: data.location || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
      };

      // Debug log for each event
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Firebase] Processing event ${doc.id}:`, {
          title: event.title,
          date: event.date,
          location: event.location,
          isValid: isValidEvent(event)
        });
      }

      // Validate the event before adding it to the array
      if (isValidEvent(event)) {
        events.push(event);
      } else {
        invalidEvents.push({ id: doc.id, data: event });
        console.warn(`[Firebase] Skipping invalid event: ${doc.id}`);
      }
    });

    // Comprehensive development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Firebase] Events summary:`);
      console.log(`  - Total documents: ${querySnapshot.size}`);
      console.log(`  - Valid events: ${events.length}`);
      console.log(`  - Invalid events: ${invalidEvents.length}`);
      
      if (events.length === 0) {
        console.warn('[Firebase] No valid events found. Possible issues:');
        console.warn('  1. Check Firestore rules allow public reads from events');
        console.warn('  2. Verify each event document has valid required fields');
        console.warn('  3. Ensure Firebase configuration is correct');
        console.warn('  4. Check network connectivity to Firebase');
      }
      
      if (invalidEvents.length > 0) {
        console.warn('[Firebase] Invalid events details:', invalidEvents);
      }
    }

    return events;
  } catch (error) {
    console.error('[Firebase] Error fetching events:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection not found. Verify events collection exists.');
    }
    
    return [];
  }
}; 

/**
 * Fetches active pastors from Firestore
 * @returns {Promise<Pastor[]>} Array of active pastors ordered by customId
 */
export const getPublicPastors = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log('[Firebase] Fetching pastors from collection: pastors');
    
    const pastorsRef = collection(firestore, 'pastors');
    const q = query(
      pastorsRef,
      where('category', '==', 'pastor'),
      where('isActive', '==', true),
      orderBy('customId', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const pastors = [];
    const invalidPastors = [];

    console.log(`[Firebase] Found ${querySnapshot.size} total documents in pastors collection`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const pastor = {
        id: doc.id,
        name: data.name || '',
        role: data.role || '',
        image: data.image || '',
        bio: data.bio || '',
        customId: data.customId || '',
        category: data.category || '',
        isActive: data.isActive || false,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
      };

      // Debug log for each pastor
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Firebase] Processing pastor ${doc.id}:`, {
          name: pastor.name,
          role: pastor.role,
          customId: pastor.customId,
          isValid: isValidPastor(pastor)
        });
      }

      // Validate the pastor before adding it to the array
      if (isValidPastor(pastor)) {
        pastors.push(pastor);
      } else {
        invalidPastors.push({ id: doc.id, data: pastor });
        console.warn(`[Firebase] Skipping invalid pastor: ${doc.id}`);
      }
    });

    // Sort by customId as number (fallback to string if not numeric)
    pastors.sort((a, b) => {
      const aId = parseInt(a.customId) || 0;
      const bId = parseInt(b.customId) || 0;
      return aId - bId;
    });

    // Comprehensive development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Firebase] Pastors summary:`);
      console.log(`  - Total documents: ${querySnapshot.size}`);
      console.log(`  - Valid pastors: ${pastors.length}`);
      console.log(`  - Invalid pastors: ${invalidPastors.length}`);
      
      if (pastors.length === 0) {
        console.warn('[Firebase] No valid pastors found. Possible issues:');
        console.warn('  1. Check Firestore rules allow public reads from pastors');
        console.warn('  2. Verify each pastor document has valid required fields');
        console.warn('  3. Ensure category is "pastor" and isActive is true');
        console.warn('  4. Check Firebase configuration is correct');
        console.warn('  5. Check network connectivity to Firebase');
      }
      
      if (invalidPastors.length > 0) {
        console.warn('[Firebase] Invalid pastors details:', invalidPastors);
      }
    }

    return pastors;
  } catch (error) {
    console.error('[Firebase] Error fetching pastors:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection not found. Verify pastors collection exists.');
    }
    
    return [];
  }
}; 

/**
 * Fetches active team leads from Firestore
 * @returns {Promise<TeamLead[]>} Array of active team leads ordered by customId
 */
export const getPublicTeamLeads = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log('[Firebase] Fetching team leads from collection: teamLeads');
    
    const teamLeadsRef = collection(firestore, 'teamLeads');
    const q = query(
      teamLeadsRef,
      where('category', '==', 'teamLead'),
      where('isActive', '==', true),
      orderBy('customId', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const teamLeads = [];
    const invalidTeamLeads = [];

    console.log(`[Firebase] Found ${querySnapshot.size} total documents in teamLeads collection`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const teamLead = {
        id: doc.id,
        name: data.name || '',
        role: data.role || '',
        image: data.image || '',
        bio: data.bio || '',
        customId: data.customId || '',
        category: data.category || '',
        isActive: data.isActive || false,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
      };

      // Debug log for each team lead
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Firebase] Processing team lead ${doc.id}:`, {
          name: teamLead.name,
          role: teamLead.role,
          customId: teamLead.customId,
          isValid: isValidTeamLead(teamLead)
        });
      }

      // Validate the team lead before adding it to the array
      if (isValidTeamLead(teamLead)) {
        teamLeads.push(teamLead);
      } else {
        invalidTeamLeads.push({ id: doc.id, data: teamLead });
        console.warn(`[Firebase] Skipping invalid team lead: ${doc.id}`);
      }
    });

    // Sort by customId as number (fallback to string if not numeric)
    teamLeads.sort((a, b) => {
      const aId = parseInt(a.customId) || 0;
      const bId = parseInt(b.customId) || 0;
      return aId - bId;
    });

    // Comprehensive development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Firebase] Team leads summary:`);
      console.log(`  - Total documents: ${querySnapshot.size}`);
      console.log(`  - Valid team leads: ${teamLeads.length}`);
      console.log(`  - Invalid team leads: ${invalidTeamLeads.length}`);
      
      if (teamLeads.length === 0) {
        console.warn('[Firebase] No valid team leads found. Possible issues:');
        console.warn('  1. Check Firestore rules allow public reads from teamLeads');
        console.warn('  2. Verify each team lead document has valid required fields');
        console.warn('  3. Ensure category is "teamLead" and isActive is true');
        console.warn('  4. Check Firebase configuration is correct');
        console.warn('  5. Check network connectivity to Firebase');
      }
      
      if (invalidTeamLeads.length > 0) {
        console.warn('[Firebase] Invalid team leads details:', invalidTeamLeads);
      }
    }

    return teamLeads;
  } catch (error) {
    console.error('[Firebase] Error fetching team leads:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection not found. Verify teamLeads collection exists.');
    }
    
    return [];
  }
}; 