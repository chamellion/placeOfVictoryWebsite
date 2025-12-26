import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from './firebaseClient';

/**
 * Fetches gallery items for a specific page from Firestore
 * @param {string} pageName - The page to fetch gallery items for (e.g., 'community-services')
 * @returns {Promise<Array>} Array of gallery items
 */
export async function fetchGalleryItems(pageName) {
  if (!firestore) {
    console.warn('[Gallery] Firestore not initialized - running in SSR or missing config');
    return [];
  }

  try {
    console.log(`[Gallery] Fetching gallery items for page: ${pageName}`);
    
    const q = query(
      collection(firestore, 'gallery'),
      where('page', '==', pageName),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const items = [];

    console.log(`[Gallery] Found ${snapshot.size} documents in gallery collection for page: ${pageName}`);

    snapshot.forEach((doc) => {
      const data = doc.data();
      const item = {
        id: doc.id,
        title: data.title || '',
        url: data.url || '',
        category: data.category || '',
        page: data.page || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || '',
      };

      // Validate required fields
      if (item.url && item.title && item.category) {
        items.push(item);
      } else {
        console.warn(`[Gallery] Skipping invalid gallery item: ${doc.id}`);
      }
    });

    console.log(`[Gallery] Successfully fetched ${items.length} valid gallery items`);
    return items;
    
  } catch (error) {
    console.error('[Gallery] Error fetching gallery items:', error);
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('[Gallery] Permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('[Gallery] Firebase service unavailable. Check network connection.');
    } else if (error.code === 'not-found') {
      console.error('[Gallery] Collection not found. Verify gallery collection exists.');
    }
    
    return [];
  }
}

/**
 * Fetches gallery items for the Community Services page
 * @returns {Promise<Array>} Array of community services gallery items
 */
export async function fetchCommunityServicesGallery() {
  return fetchGalleryItems('community-services');
}

