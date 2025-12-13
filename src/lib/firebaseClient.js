import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, addDoc, serverTimestamp, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { isValidCarouselSlide } from '../types/CarouselSlide';
import { isValidEvent } from '../types/Event';
import { isValidPastor } from '../types/Pastor';
import { isValidTeamLead } from '../types/TeamLead';
import { isValidSiteSettings } from '../types/SiteSettings';

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
let storage;

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
      storage = getStorage(app);
    } catch (error) {
      console.error('[Firebase] Failed to initialize Firebase:', error);
      firestore = null;
      storage = null;
    }
  } else {
    console.warn('[Firebase] Skipping initialization due to missing configuration');
    firestore = null;
  }
}

export { firestore, storage };

/**
 * Adds a new testimony to Firestore
 * @param {Object} testimonyData - The testimony data object
 * @returns {Promise<{success: boolean, error?: string, docId?: string}>} Result of the operation
 */
export const addTestimony = async (testimonyData) => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    console.log('[Firebase] Adding testimony:', testimonyData);
    
    // Ensure name is "Anonymous" if isAnonymous is true
    const finalName = testimonyData.isAnonymous ? "Anonymous" : testimonyData.name;
    
    const testimoniesRef = collection(firestore, 'testimonies');
    
    const docRef = await addDoc(testimoniesRef, {
      name: finalName,
      testimony: testimonyData.testimony,
      photo: testimonyData.photo || null,
      isAnonymous: testimonyData.isAnonymous,
      createdAt: serverTimestamp()
    });
    
    console.log('[Firebase] Testimony added successfully with ID:', docRef.id);
    return { success: true, docId: docRef.id };
    
  } catch (error) {
    console.error('[Firebase] Error adding testimony:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'invalid-argument') {
      console.error('[Firebase] Invalid data format.');
      return { success: false, error: 'Please check your input and try again.' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

/**
 * Uploads a photo to Firebase Storage
 * @param {File} file - The photo file to upload
 * @param {string} folder - The folder path in storage (default: 'testimonies')
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<{success: boolean, error?: string, downloadURL?: string}>} Result of the operation
 */
export const uploadPhoto = async (file, folder = 'testimonies', onProgress) => {
  if (!storage) {
    console.warn('[Firebase] Storage not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase Storage not initialized' };
  }

  try {
    console.log('[Firebase] Uploading photo to folder:', folder);
    
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('[Firebase] Photo uploaded successfully:', downloadURL);
    return { success: true, downloadURL };
    
  } catch (error) {
    console.error('[Firebase] Error uploading photo:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Storage security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'storage/unauthorized') {
      console.error('[Firebase] Unauthorized access to storage.');
      return { success: false, error: 'Unauthorized access. Please try again later.' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

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

/**
 * Fetches active recurring events from Firestore
 * @returns {Promise<RecurringEvent[]>} Array of active recurring events
 */
export const getPublicRecurringEvents = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log('[Firebase] Fetching recurring events from collection: recurringEvents');
    
    const recurringEventsRef = collection(firestore, 'recurringEvents');
    const q = query(
      recurringEventsRef,
      where('isActive', '==', true),
      orderBy('dayOfWeek', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const recurringEvents = [];
    const invalidRecurringEvents = [];

    console.log(`[Firebase] Found ${querySnapshot.size} total documents in recurringEvents collection`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const recurringEvent = {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        dayOfWeek: data.dayOfWeek || 0,
        startTime: data.startTime || '',
        endTime: data.endTime || '',
        location: data.location || '',
        isActive: data.isActive || false,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
      };

      // Debug log for each recurring event
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Firebase] Processing recurring event ${doc.id}:`, {
          title: recurringEvent.title,
          dayOfWeek: recurringEvent.dayOfWeek,
          location: recurringEvent.location,
          isActive: recurringEvent.isActive
        });
      }

      // Validate the recurring event before adding it to the array
      if (recurringEvent.title && recurringEvent.dayOfWeek >= 0 && recurringEvent.dayOfWeek <= 6 && recurringEvent.isActive) {
        recurringEvents.push(recurringEvent);
      } else {
        invalidRecurringEvents.push({ id: doc.id, data: recurringEvent });
        console.warn(`[Firebase] Skipping invalid recurring event: ${doc.id}`);
      }
    });

    // Comprehensive development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Firebase] Recurring events summary:`);
      console.log(`  - Total documents: ${querySnapshot.size}`);
      console.log(`  - Valid recurring events: ${recurringEvents.length}`);
      console.log(`  - Invalid recurring events: ${invalidRecurringEvents.length}`);
      
      if (recurringEvents.length === 0) {
        console.warn('[Firebase] No valid recurring events found. Possible issues:');
        console.warn('  1. Check Firestore rules allow public reads from recurringEvents');
        console.warn('  2. Verify each recurring event document has valid required fields');
        console.warn('  3. Ensure isActive is true');
        console.warn('  4. Check Firebase configuration is correct');
        console.warn('  5. Check network connectivity to Firebase');
      }
      
      if (invalidRecurringEvents.length > 0) {
        console.warn('[Firebase] Invalid recurring events details:', invalidRecurringEvents);
      }
    }

    return recurringEvents;
  } catch (error) {
    console.error('[Firebase] Error fetching recurring events:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection not found. Verify recurringEvents collection exists.');
    }
    
    return [];
  }
};

/**
 * Fetches skipped recurring events from Firestore
 * @returns {Promise<SkippedRecurringEvent[]>} Array of skipped recurring events
 */
export const getPublicSkippedRecurringEvents = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log('[Firebase] Fetching skipped recurring events from collection: skippedRecurringEvents');
    
    const skippedEventsRef = collection(firestore, 'skippedRecurringEvents');
    const q = query(
      skippedEventsRef,
      orderBy('skipDate', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const skippedEvents = [];
    const invalidSkippedEvents = [];

    console.log(`[Firebase] Found ${querySnapshot.size} total documents in skippedRecurringEvents collection`);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const skippedEvent = {
        id: doc.id,
        recurringEventId: data.recurringEventId || '',
        skipDate: data.skipDate || '',
        reason: data.reason || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
      };

      // Debug log for each skipped event
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Firebase] Processing skipped event ${doc.id}:`, {
          recurringEventId: skippedEvent.recurringEventId,
          skipDate: skippedEvent.skipDate,
          reason: skippedEvent.reason
        });
      }

      // Validate the skipped event before adding it to the array
      if (skippedEvent.recurringEventId && skippedEvent.skipDate) {
        skippedEvents.push(skippedEvent);
      } else {
        invalidSkippedEvents.push({ id: doc.id, data: skippedEvent });
        console.warn(`[Firebase] Skipping invalid skipped event: ${doc.id}`);
      }
    });

    // Comprehensive development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Firebase] Skipped events summary:`);
      console.log(`  - Total documents: ${querySnapshot.size}`);
      console.log(`  - Valid skipped events: ${skippedEvents.length}`);
      console.log(`  - Invalid skipped events: ${invalidSkippedEvents.length}`);
      
      if (invalidSkippedEvents.length > 0) {
        console.warn('[Firebase] Invalid skipped events details:', invalidSkippedEvents);
      }
    }

    return skippedEvents;
  } catch (error) {
    console.error('[Firebase] Error fetching skipped recurring events:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection not found. Verify skippedRecurringEvents collection exists.');
    }
    
    return [];
  }
}; 

/**
 * Adds a new newsletter signup to Firestore
 * @param {string} email - The subscriber's email address
 * @returns {Promise<{success: boolean, error?: string}>} Result of the operation
 */
export const addNewsletterSignup = async (email) => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    console.log('[Firebase] Adding newsletter signup for email:', email);
    
    const newsletterRef = collection(firestore, 'newsletterSignups');
    
    const docRef = await addDoc(newsletterRef, {
      email: email.toLowerCase().trim(),
      createdAt: serverTimestamp()
    });
    
    console.log('[Firebase] Newsletter signup added successfully with ID:', docRef.id);
    return { success: true };
    
  } catch (error) {
    console.error('[Firebase] Error adding newsletter signup:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'invalid-argument') {
      console.error('[Firebase] Invalid email format.');
      return { success: false, error: 'Please enter a valid email address.' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

/**
 * Adds a new prayer request to Firestore
 * @param {Object} prayerData - The prayer request data object
 * @returns {Promise<{success: boolean, error?: string, docId?: string}>} Result of the operation
 */
export const addPrayerRequest = async (prayerData) => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    console.log('[Firebase] Adding prayer request:', prayerData);
    
    const prayerRequestsRef = collection(firestore, 'prayerRequests');
    
    const docRef = await addDoc(prayerRequestsRef, {
      name: prayerData.isAnonymous ? null : prayerData.name,
      email: prayerData.isAnonymous ? null : prayerData.email,
      request: prayerData.request,
      isAnonymous: prayerData.isAnonymous,
      createdAt: serverTimestamp()
    });
    
    console.log('[Firebase] Prayer request added successfully with ID:', docRef.id);
    return { success: true, docId: docRef.id };
    
  } catch (error) {
    console.error('[Firebase] Error adding prayer request:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'invalid-argument') {
      console.error('[Firebase] Invalid data format.');
      return { success: false, error: 'Please check your input and try again.' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
};

/**
 * Adds a new contact message to Firestore
 * @param {Object} contactData - The contact message data object
 * @returns {Promise<{success: boolean, error?: string, docId?: string}>} Result of the operation
 */
export const addContactMessage = async (contactData) => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    console.log('[Firebase] Adding contact message:', contactData);
    
    const contactMessagesRef = collection(firestore, 'contactMessages');
    
    const docRef = await addDoc(contactMessagesRef, {
      name: contactData.name.trim(),
      email: contactData.email.toLowerCase().trim(),
      phone: contactData.phone?.trim() || null,
      subject: contactData.subject?.trim() || null,
      message: contactData.message.trim(),
      preferredContactMethod: contactData.preferredContactMethod || 'email',
      userAgent: contactData.userAgent || null,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    
    console.log('[Firebase] Contact message added successfully with ID:', docRef.id);
    return { success: true, docId: docRef.id };
    
  } catch (error) {
    console.error('[Firebase] Error adding contact message:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'invalid-argument') {
      console.error('[Firebase] Invalid data format.');
      return { success: false, error: 'Please check your input and try again.' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
}; 

/**
 * Fetches the active theme of the month from Firestore
 * @returns {Promise<{success: boolean, theme?: Object, error?: string}>} Result with theme data
 */
export const getActiveThemeOfTheMonth = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    console.log('[Firebase] Fetching active theme of the month from collection: theme_of_the_month, document: active');
    
    const themeRef = doc(firestore, 'theme_of_the_month', 'active');
    const themeDoc = await getDoc(themeRef);
    
    if (!themeDoc.exists()) {
      console.warn('[Firebase] Active theme document not found');
      return { success: false, error: 'Theme not found' };
    }
    
    const data = themeDoc.data();
    const theme = {
      id: themeDoc.id,
      title: data.title || '',
      subtitle: data.subtitle || '',
      backgroundMode: data.backgroundMode || 'color',
      backgroundImageUrl: data.backgroundImageUrl || '',
      backgroundColor: data.backgroundColor || '#1f2937',
      textColor: data.textColor || '#ffffff',
      fontFamily: data.fontFamily || 'sans',
      createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
    };

    // Validate required fields
    if (!theme.title) {
      console.warn('[Firebase] Theme missing required title field');
      return { success: false, error: 'Invalid theme data' };
    }

    // Validate background mode
    if (theme.backgroundMode === 'image' && !theme.backgroundImageUrl) {
      console.warn('[Firebase] Theme set to image mode but missing backgroundImageUrl');
      return { success: false, error: 'Invalid theme data' };
    }

    console.log('[Firebase] Theme of the month fetched successfully:', {
      title: theme.title,
      backgroundMode: theme.backgroundMode,
      fontFamily: theme.fontFamily
    });

    return { success: true, theme };
    
  } catch (error) {
    console.error('[Firebase] Error fetching theme of the month:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection or document not found. Verify theme_of_the_month collection exists.');
      return { success: false, error: 'Theme not found' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
}; 

/**
 * Subscribes to real-time updates for the active theme of the month
 * @param {Function} callback - Function called with theme data or error
 * @returns {Function} Unsubscribe function
 */
export const subscribeToActiveThemeOfTheMonth = (callback) => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    callback({ success: false, error: 'Firebase not initialized' });
    return () => {};
  }

  try {
    console.log('[Firebase] Subscribing to active theme of the month from collection: theme_of_the_month, document: active');
    
    const themeRef = doc(firestore, 'theme_of_the_month', 'active');
    
    const unsubscribe = onSnapshot(themeRef, 
      (doc) => {
        if (!doc.exists()) {
          console.warn('[Firebase] Active theme document not found');
          callback({ success: false, error: 'Theme not found' });
          return;
        }
        
        const data = doc.data();
        const theme = {
          id: doc.id,
          title: data.title || '',
          subtitle: data.subtitle || '',
          imageUrl: data.imageUrl || '',
          textColor: data.textColor || '#1f2937',
          fontFamily: data.fontFamily || 'sans',
          createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
        };

        // Validate required fields
        if (!theme.title) {
          console.warn('[Firebase] Theme missing required title field');
          callback({ success: false, error: 'Invalid theme data' });
          return;
        }

        console.log('[Firebase] Theme of the month updated:', {
          title: theme.title,
          fontFamily: theme.fontFamily
        });

        callback({ success: true, theme });
      },
      (error) => {
        console.error('[Firebase] Error subscribing to theme of the month:', error);
        
        // Provide specific error guidance
        if (error.code === 'permission-denied') {
          console.error('[Firebase] Permission denied. Check Firestore security rules.');
          callback({ success: false, error: 'Permission denied. Please try again later.' });
        } else if (error.code === 'unavailable') {
          console.error('[Firebase] Firebase service unavailable. Check network connection.');
          callback({ success: false, error: 'Service unavailable. Please check your connection and try again.' });
        } else if (error.code === 'not-found') {
          console.error('[Firebase] Collection or document not found. Verify theme_of_the_month collection exists.');
          callback({ success: false, error: 'Theme not found' });
        } else {
          console.error('[Firebase] Unexpected error:', error.message);
          callback({ success: false, error: 'An unexpected error occurred. Please try again later.' });
        }
      }
    );

    return unsubscribe;
    
  } catch (error) {
    console.error('[Firebase] Error setting up theme subscription:', error);
    callback({ success: false, error: 'Failed to subscribe to theme updates' });
    return () => {};
  }
}; 

/**
 * Fetches site settings from Firestore
 * @returns {Promise<{success: boolean, settings?: Object, error?: string}>} Result with settings data
 */
export const getSiteSettings = async () => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    console.log('[Firebase] Fetching site settings from collection: settings, document: main');
    
    const settingsRef = doc(firestore, 'settings', 'main');
    const settingsDoc = await getDoc(settingsRef);
    
    if (!settingsDoc.exists()) {
      console.warn('[Firebase] Settings document not found');
      return { success: false, error: 'Settings not found' };
    }
    
    const data = settingsDoc.data();
    const settings = {
      id: settingsDoc.id,
      contactPhone: data.contactPhone || '',
      homeHeroText: data.homeHeroText || '',
      socialLinks: {
        facebook: data.socialLinks?.facebook || '',
        instagram: data.socialLinks?.instagram || '',
        twitter: data.socialLinks?.twitter || '',
        youtube: data.socialLinks?.youtube || '',
      },
      createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
    };

    // Validate settings
    if (!isValidSiteSettings(settings)) {
      console.warn('[Firebase] Settings missing required fields');
      return { success: false, error: 'Invalid settings data' };
    }

    console.log('[Firebase] Site settings fetched successfully:', {
      hasContactPhone: !!settings.contactPhone,
      hasHomeHeroText: !!settings.homeHeroText,
      hasFacebook: !!settings.socialLinks.facebook,
      hasInstagram: !!settings.socialLinks.instagram,
      hasTwitter: !!settings.socialLinks.twitter,
      hasYoutube: !!settings.socialLinks.youtube,
    });

    return { success: true, settings };
    
  } catch (error) {
    console.error('[Firebase] Error fetching site settings:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Firebase] Permission denied. Check Firestore security rules.');
      return { success: false, error: 'Permission denied. Please try again later.' };
    } else if (error.code === 'unavailable') {
      console.error('[Firebase] Firebase service unavailable. Check network connection.');
      return { success: false, error: 'Service unavailable. Please check your connection and try again.' };
    } else if (error.code === 'not-found') {
      console.error('[Firebase] Collection or document not found. Verify settings collection exists.');
      return { success: false, error: 'Settings not found' };
    } else {
      console.error('[Firebase] Unexpected error:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
  }
}; 

/**
 * Subscribes to real-time updates for site settings
 * @param {Function} callback - Function called with settings data or error
 * @returns {Function} Unsubscribe function
 */
export const subscribeToSiteSettings = (callback) => {
  if (!firestore) {
    console.warn('[Firebase] Firestore not initialized - running in SSR or missing config');
    callback({ success: false, error: 'Firebase not initialized' });
    return () => {};
  }

  try {
    console.log('[Firebase] Subscribing to site settings from collection: settings, document: main');
    
    const settingsRef = doc(firestore, 'settings', 'main');
    
    const unsubscribe = onSnapshot(settingsRef, 
      (doc) => {
        if (!doc.exists()) {
          console.warn('[Firebase] Settings document not found');
          callback({ success: false, error: 'Settings not found' });
          return;
        }
        
        const data = doc.data();
        const settings = {
          id: doc.id,
          contactPhone: data.contactPhone || '',
          homeHeroText: data.homeHeroText || '',
          socialLinks: {
            facebook: data.socialLinks?.facebook || '',
            instagram: data.socialLinks?.instagram || '',
            twitter: data.socialLinks?.twitter || '',
            youtube: data.socialLinks?.youtube || '',
          },
          createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
        };

        // Validate settings
        if (!isValidSiteSettings(settings)) {
          console.warn('[Firebase] Settings missing required fields');
          callback({ success: false, error: 'Invalid settings data' });
          return;
        }

        console.log('[Firebase] Site settings updated:', {
          hasContactPhone: !!settings.contactPhone,
          hasHomeHeroText: !!settings.homeHeroText,
          hasFacebook: !!settings.socialLinks.facebook,
          hasInstagram: !!settings.socialLinks.instagram,
          hasTwitter: !!settings.socialLinks.twitter,
          hasYoutube: !!settings.socialLinks.youtube,
        });

        callback({ success: true, settings });
      },
      (error) => {
        console.error('[Firebase] Error subscribing to site settings:', error);
        
        // Provide specific error guidance
        if (error.code === 'permission-denied') {
          console.error('[Firebase] Permission denied. Check Firestore security rules.');
          callback({ success: false, error: 'Permission denied. Please try again later.' });
        } else if (error.code === 'unavailable') {
          console.error('[Firebase] Firebase service unavailable. Check network connection.');
          callback({ success: false, error: 'Service unavailable. Please check your connection and try again.' });
        } else if (error.code === 'not-found') {
          console.error('[Firebase] Collection or document not found. Verify settings collection exists.');
          callback({ success: false, error: 'Settings not found' });
        } else {
          console.error('[Firebase] Unexpected error:', error.message);
          callback({ success: false, error: 'An unexpected error occurred. Please try again later.' });
        }
      }
    );

    return unsubscribe;
    
  } catch (error) {
    console.error('[Firebase] Error setting up settings subscription:', error);
    callback({ success: false, error: 'Failed to subscribe to settings updates' });
    return () => {};
  }
}; 