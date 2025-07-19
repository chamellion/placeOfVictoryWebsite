/**
 * @typedef {Object} Pastor
 * @property {string} id - Unique identifier for the pastor
 * @property {string} name - Pastor's full name (required)
 * @property {string} role - Pastor's role/title (required)
 * @property {string} image - URL to pastor's image (required)
 * @property {string} bio - Pastor's biography (required)
 * @property {string|number} customId - Custom ID for ordering (required)
 * @property {string} category - Category (should be "pastor") (required)
 * @property {boolean} isActive - Whether the pastor is active (required)
 * @property {string} [createdAt] - ISO string of creation timestamp (optional)
 * @property {string} [updatedAt] - ISO string of last update timestamp (optional)
 */

/**
 * Validates if a pastor object has all required fields
 * @param {Pastor} pastor - The pastor object to validate
 * @returns {boolean} True if the pastor is valid, false otherwise
 */
export const isValidPastor = (pastor) => {
  if (!pastor) return false;
  
  const requiredFields = ['id', 'name', 'role', 'image', 'bio', 'customId', 'category', 'isActive'];
  const missingFields = requiredFields.filter(field => !pastor[field]);
  
  if (missingFields.length > 0) {
    console.warn(`[Validation] Pastor ${pastor.id || 'unknown'} is missing required fields:`, missingFields);
    return false;
  }
  
  // Validate types
  if (typeof pastor.name !== 'string' || pastor.name.trim() === '') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid name:`, pastor.name);
    return false;
  }
  
  if (typeof pastor.role !== 'string' || pastor.role.trim() === '') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid role:`, pastor.role);
    return false;
  }
  
  if (typeof pastor.bio !== 'string' || pastor.bio.trim() === '') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid bio:`, pastor.bio);
    return false;
  }
  
  if (typeof pastor.image !== 'string' || pastor.image.trim() === '') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid image:`, pastor.image);
    return false;
  }
  
  // customId can be either string or number, but must be present and valid
  if (pastor.customId === null || pastor.customId === undefined || pastor.customId === '') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid customId:`, pastor.customId);
    return false;
  }
  
  // If it's a string, it shouldn't be empty after trimming
  if (typeof pastor.customId === 'string' && pastor.customId.trim() === '') {
    console.warn(`[Validation] Pastor ${pastor.id} has empty customId string:`, pastor.customId);
    return false;
  }
  
  if (typeof pastor.category !== 'string' || pastor.category !== 'pastor') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid category:`, pastor.category);
    return false;
  }
  
  if (typeof pastor.isActive !== 'boolean') {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid isActive:`, pastor.isActive);
    return false;
  }
  
  // Validate URL format for image (basic check)
  const urlPattern = /^https?:\/\/.*/;
  if (!urlPattern.test(pastor.image)) {
    console.warn(`[Validation] Pastor ${pastor.id} has invalid image URL format:`, pastor.image);
    return false;
  }
  
  return true;
};

/**
 * Validates if customId is numeric for sorting
 * @param {string|number} customId - The customId to validate
 * @returns {boolean} True if customId is numeric, false otherwise
 */
export const isNumericCustomId = (customId) => {
  // If it's already a number, it's valid
  if (typeof customId === 'number' && isFinite(customId)) {
    return true;
  }
  // If it's a string, check if it can be parsed as a number
  if (typeof customId === 'string') {
    return !isNaN(parseInt(customId)) && isFinite(parseInt(customId));
  }
  return false;
};

/**
 * Sorts pastors by customId numerically
 * @param {Pastor[]} pastors - Array of pastors to sort
 * @returns {Pastor[]} Sorted array of pastors
 */
export const sortPastorsByCustomId = (pastors) => {
  return pastors.sort((a, b) => {
    const aId = parseInt(a.customId) || 0;
    const bId = parseInt(b.customId) || 0;
    return aId - bId;
  });
}; 