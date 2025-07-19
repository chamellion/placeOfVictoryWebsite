/**
 * @typedef {Object} Event
 * @property {string} id - Unique identifier for the event
 * @property {string} title - Event title (required)
 * @property {string} description - Event description (required)
 * @property {string} date - Event date in YYYY-MM-DD format (required)
 * @property {string} startTime - Event start time in HH:mm format (required)
 * @property {string} endTime - Event end time in HH:mm format (required)
 * @property {string} location - Event location (required)
 * @property {string} [createdAt] - ISO string of creation timestamp (optional)
 * @property {string} [updatedAt] - ISO string of last update timestamp (optional)
 */

/**
 * Validates if an event object has all required fields
 * @param {Event} event - The event object to validate
 * @returns {boolean} True if the event is valid, false otherwise
 */
export const isValidEvent = (event) => {
  if (!event) return false;
  
  const requiredFields = ['id', 'title', 'description', 'date', 'startTime', 'endTime', 'location'];
  const missingFields = requiredFields.filter(field => !event[field]);
  
  if (missingFields.length > 0) {
    console.warn(`[Validation] Event ${event.id || 'unknown'} is missing required fields:`, missingFields);
    return false;
  }
  
  // Validate types
  if (typeof event.title !== 'string' || event.title.trim() === '') {
    console.warn(`[Validation] Event ${event.id} has invalid title:`, event.title);
    return false;
  }
  
  if (typeof event.description !== 'string' || event.description.trim() === '') {
    console.warn(`[Validation] Event ${event.id} has invalid description:`, event.description);
    return false;
  }
  
  if (typeof event.location !== 'string' || event.location.trim() === '') {
    console.warn(`[Validation] Event ${event.id} has invalid location:`, event.location);
    return false;
  }
  
  // Validate date format (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(event.date)) {
    console.warn(`[Validation] Event ${event.id} has invalid date format:`, event.date);
    return false;
  }
  
  // Validate time format (HH:mm)
  const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timePattern.test(event.startTime)) {
    console.warn(`[Validation] Event ${event.id} has invalid startTime format:`, event.startTime);
    return false;
  }
  
  if (!timePattern.test(event.endTime)) {
    console.warn(`[Validation] Event ${event.id} has invalid endTime format:`, event.endTime);
    return false;
  }
  
  // Validate that end time is after start time
  const startTime = new Date(`2000-01-01T${event.startTime}:00`);
  const endTime = new Date(`2000-01-01T${event.endTime}:00`);
  if (endTime <= startTime) {
    console.warn(`[Validation] Event ${event.id} has endTime before or equal to startTime:`, event.startTime, event.endTime);
    return false;
  }
  
  return true;
};

/**
 * Formats a date string (YYYY-MM-DD) and time strings (HH:mm) into a readable format
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} startTime - Start time in HH:mm format
 * @param {string} endTime - End time in HH:mm format
 * @returns {string} Formatted date and time string
 */
export const formatEventDateTime = (date, startTime, endTime) => {
  try {
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };
    
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    
    return `${formattedDate} · ${formattedStartTime} – ${formattedEndTime}`;
  } catch (error) {
    console.warn('[Event] Error formatting date/time:', error);
    return `${date} · ${startTime} – ${endTime}`;
  }
};

/**
 * Converts a date string (YYYY-MM-DD) to a Date object
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Date} Date object
 */
export const parseEventDate = (dateString) => {
  try {
    return new Date(dateString);
  } catch (error) {
    console.warn('[Event] Error parsing date:', error);
    return new Date();
  }
}; 