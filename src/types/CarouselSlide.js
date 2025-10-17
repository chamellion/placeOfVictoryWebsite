/**
 * @typedef {Object} CarouselSlide
 * @property {string} id - Unique identifier for the slide
 * @property {string} imageUrl - Public Firebase Storage URL of the carousel image (required)
 * @property {string} headline - Main title displayed on the slide (required)
 * @property {string} subheadline - Subtitle displayed below the headline (required)
 * @property {string} [ctaText] - Call-to-action button text (optional)
 * @property {string} [ctaLink] - Call-to-action button link (optional)
 * @property {boolean} isVisible - Whether the slide should be displayed on homepage (required)
 * @property {number} order - Numeric order for sorting slides (required)
 * @property {string} [createdAt] - ISO string of creation timestamp (optional)
 * @property {string} [updatedAt] - ISO string of last update timestamp (optional)
 */

/**
 * Validates if a carousel slide object has all required fields
 * @param {CarouselSlide} slide - The slide object to validate
 * @returns {boolean} True if the slide is valid, false otherwise
 */
export const isValidCarouselSlide = (slide) => {
  if (!slide) return false;
  
  // Check for required fields with proper handling of falsy values
  const missingFields = [];
  
  // String fields that cannot be empty
  const stringFields = ['id', 'imageUrl', 'headline', 'subheadline'];
  stringFields.forEach(field => {
    if (!slide.hasOwnProperty(field) || slide[field] === undefined || slide[field] === null || slide[field] === '') {
      missingFields.push(field);
    }
  });
  
  // Boolean field (false is valid)
  if (!slide.hasOwnProperty('isVisible') || typeof slide.isVisible !== 'boolean') {
    missingFields.push('isVisible');
  }
  
  // Number field (0 is valid)
  if (!slide.hasOwnProperty('order') || typeof slide.order !== 'number') {
    missingFields.push('order');
  }
  
  if (missingFields.length > 0) {
    console.warn(`[Validation] Carousel slide ${slide.id || 'unknown'} is missing required fields:`, missingFields);
    return false;
  }
  
  // Validate types
  if (typeof slide.imageUrl !== 'string' || slide.imageUrl.trim() === '') {
    console.warn(`[Validation] Carousel slide ${slide.id} has invalid imageUrl:`, slide.imageUrl);
    return false;
  }
  
  // Validate imageUrl format (should be a valid HTTP/HTTPS URL)
  const urlPattern = /^https?:\/\/.+/;
  if (!urlPattern.test(slide.imageUrl)) {
    console.warn(`[Validation] Carousel slide ${slide.id} has invalid imageUrl format:`, slide.imageUrl);
    return false;
  }
  
  // Additional validation for Firebase Storage URLs
  if (slide.imageUrl.includes('firebasestorage.googleapis.com')) {
    // eslint-disable-next-line no-useless-escape
    const firebaseStoragePattern = /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^\/]+\/o\/[^\/]+\?alt=media&token=[^&]+$/;
    if (!firebaseStoragePattern.test(slide.imageUrl)) {
      console.warn(`[Validation] Carousel slide ${slide.id} has malformed Firebase Storage URL:`, slide.imageUrl);
      return false;
    }
  }
  
  if (typeof slide.headline !== 'string' || slide.headline.trim() === '') {
    console.warn(`[Validation] Carousel slide ${slide.id} has invalid headline:`, slide.headline);
    return false;
  }
  
  if (typeof slide.subheadline !== 'string' || slide.subheadline.trim() === '') {
    console.warn(`[Validation] Carousel slide ${slide.id} has invalid subheadline:`, slide.subheadline);
    return false;
  }
  
  if (typeof slide.isVisible !== 'boolean') {
    console.warn(`[Validation] Carousel slide ${slide.id} has invalid isVisible:`, slide.isVisible);
    return false;
  }
  
  if (typeof slide.order !== 'number' || isNaN(slide.order)) {
    console.warn(`[Validation] Carousel slide ${slide.id} has invalid order:`, slide.order);
    return false;
  }
  
  return true;
}; 