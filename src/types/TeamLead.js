/**
 * @typedef {Object} TeamLead
 * @property {string} id - Unique identifier for the team lead
 * @property {string} name - Team lead's full name (required)
 * @property {string} role - Team lead's role/title (required)
 * @property {string} image - URL to team lead's image (required)
 * @property {string} bio - Team lead's biography (required)
 * @property {string|number} customId - Custom ID for ordering (required)
 * @property {string} category - Category (should be "teamLead") (required)
 * @property {boolean} isActive - Whether the team lead is active (required)
 * @property {string} [createdAt] - ISO string of creation timestamp (optional)
 * @property {string} [updatedAt] - ISO string of last update timestamp (optional)
 */

/**
 * Validates if a team lead object has all required fields
 * @param {TeamLead} teamLead - The team lead object to validate
 * @returns {boolean} True if the team lead is valid, false otherwise
 */
export const isValidTeamLead = (teamLead) => {
  if (!teamLead) return false;
  
  const requiredFields = ['id', 'name', 'role', 'image', 'bio', 'customId', 'category', 'isActive'];
  const missingFields = requiredFields.filter(field => !teamLead[field]);
  
  if (missingFields.length > 0) {
    console.warn(`[Validation] Team lead ${teamLead.id || 'unknown'} is missing required fields:`, missingFields);
    return false;
  }
  
  // Validate types
  if (typeof teamLead.name !== 'string' || teamLead.name.trim() === '') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid name:`, teamLead.name);
    return false;
  }
  
  if (typeof teamLead.role !== 'string' || teamLead.role.trim() === '') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid role:`, teamLead.role);
    return false;
  }
  
  if (typeof teamLead.bio !== 'string' || teamLead.bio.trim() === '') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid bio:`, teamLead.bio);
    return false;
  }
  
  if (typeof teamLead.image !== 'string' || teamLead.image.trim() === '') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid image:`, teamLead.image);
    return false;
  }
  
  // customId can be either string or number, but must be present and valid
  if (teamLead.customId === null || teamLead.customId === undefined || teamLead.customId === '') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid customId:`, teamLead.customId);
    return false;
  }
  
  // If it's a string, it shouldn't be empty after trimming
  if (typeof teamLead.customId === 'string' && teamLead.customId.trim() === '') {
    console.warn(`[Validation] Team lead ${teamLead.id} has empty customId string:`, teamLead.customId);
    return false;
  }
  
  if (typeof teamLead.category !== 'string' || teamLead.category !== 'teamLead') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid category:`, teamLead.category);
    return false;
  }
  
  if (typeof teamLead.isActive !== 'boolean') {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid isActive:`, teamLead.isActive);
    return false;
  }
  
  // Validate URL format for image (basic check)
  const urlPattern = /^https?:\/\/.*/;
  if (!urlPattern.test(teamLead.image)) {
    console.warn(`[Validation] Team lead ${teamLead.id} has invalid image URL format:`, teamLead.image);
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
 * Sorts team leads by customId numerically
 * @param {TeamLead[]} teamLeads - Array of team leads to sort
 * @returns {TeamLead[]} Sorted array of team leads
 */
export const sortTeamLeadsByCustomId = (teamLeads) => {
  return teamLeads.sort((a, b) => {
    const aId = parseInt(a.customId) || 0;
    const bId = parseInt(b.customId) || 0;
    return aId - bId;
  });
}; 