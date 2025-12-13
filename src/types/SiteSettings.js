/**
 * Site Settings Type Definition
 * Represents the site configuration data from Firestore
 */

/**
 * Validates if an object is a valid SiteSettings object
 * @param {Object} settings - The settings object to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidSiteSettings = (settings) => {
  if (!settings || typeof settings !== 'object') {
    return false;
  }

  // socialLinks is required and must be an object
  if (!settings.socialLinks || typeof settings.socialLinks !== 'object') {
    return false;
  }

  return true;
};

/**
 * Validates a social media URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidSocialUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

