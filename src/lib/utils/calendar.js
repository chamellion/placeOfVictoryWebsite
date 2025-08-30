import { createEvent } from 'ics';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { formatEventDateTime } from '../../types/Event';

/**
 * Generates recurring events from Firestore data for the next 6 months
 * @param {Array} recurringEvents - Array of recurring event objects from Firestore
 * @param {Array} skippedEvents - Array of skipped recurring event objects from Firestore
 * @returns {Array} Array of generated recurring event instances
 */
export const generateRecurringEventsFromFirestore = (recurringEvents, skippedEvents = []) => {
  const generatedEvents = [];
  const today = new Date();
  const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  
  // Create a map of skipped dates for quick lookup
  const skippedDatesMap = new Map();
  skippedEvents.forEach(skippedEvent => {
    if (!skippedDatesMap.has(skippedEvent.recurringEventId)) {
      skippedDatesMap.set(skippedEvent.recurringEventId, new Set());
    }
    skippedDatesMap.get(skippedEvent.recurringEventId).add(skippedEvent.skipDate);
  });
  
  // Generate events for each active recurring event
  recurringEvents.forEach(recurringEvent => {
    if (!recurringEvent.isActive) return;
    
    let currentDate = new Date(today);
    
    while (currentDate <= sixMonthsFromNow) {
      const dayOfWeek = currentDate.getDay();
      
      // Check if this date matches the recurring event's day of week
      if (dayOfWeek === recurringEvent.dayOfWeek) {
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        
        // Check if this date is skipped
        const skippedDates = skippedDatesMap.get(recurringEvent.id);
        const isSkipped = skippedDates && skippedDates.has(dateString);
        
        if (!isSkipped) {
          // Generate the event instance
          const eventInstance = {
            id: `${recurringEvent.id}-${dateString}`,
            title: recurringEvent.title,
            description: recurringEvent.description,
            date: dateString,
            startTime: recurringEvent.startTime,
            endTime: recurringEvent.endTime,
            location: recurringEvent.location,
            isRecurring: true,
            recurringEventId: recurringEvent.id,
            originalDate: new Date(currentDate),
            formattedDateTime: formatEventDateTime(dateString, recurringEvent.startTime, recurringEvent.endTime)
          };
          
          generatedEvents.push(eventInstance);
        }
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  
  return generatedEvents;
};

/**
 * Legacy function for backward compatibility
 * @returns {Array} Array of hardcoded recurring event objects
 */
export const generateRecurringEvents = () => {
  const recurringEvents = [];
  const today = new Date();
  const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  
  // Sunday Service events (9:30 AM - 11:00 AM and 12:00 PM - 1:30 PM)
  const sundayService = {
    id: 'sunday-service-1',
    title: 'Sunday Service',
    description: 'Join us for our weekly Sunday worship service. Experience powerful worship, inspiring messages, and fellowship with our church family.',
    startTime: '09:30',
    endTime: '11:00',
    location: 'Main Sanctuary',
    isRecurring: true,
    recurringType: 'sunday-service-1'
  };
  
  const sundayService2 = {
    id: 'sunday-service-2',
    title: 'Sunday Service (Second Service)',
    description: 'Join us for our second Sunday worship service. Experience powerful worship, inspiring messages, and fellowship with our church family.',
    startTime: '12:00',
    endTime: '13:30',
    location: 'Main Sanctuary',
    isRecurring: true,
    recurringType: 'sunday-service-2'
  };
  
  // Wednesday Bible Study
  const wednesdayBibleStudy = {
    id: 'wednesday-bible-study',
    title: 'Wednesday Bible Study',
    description: 'Join us for an in-depth study of God\'s Word. This is a time for learning, discussion, and spiritual growth.',
    startTime: '18:30',
    endTime: '20:00',
    location: 'Fellowship Hall',
    isRecurring: true,
    recurringType: 'wednesday-bible-study'
  };
  
  // Friday Prayer Meeting
  const fridayPrayerMeeting = {
    id: 'friday-prayer-meeting',
    title: 'Friday Prayer Meeting',
    description: 'Join us for a powerful time of prayer and intercession. Come together to lift up our church, community, and world in prayer.',
    startTime: '18:30',
    endTime: '20:00',
    location: 'Prayer Room',
    isRecurring: true,
    recurringType: 'friday-prayer-meeting'
  };
  
  // Generate events for the next 6 months
  let currentDate = new Date(today);
  
  while (currentDate <= sixMonthsFromNow) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 3 = Wednesday, 5 = Friday
    
    if (dayOfWeek === 0) { // Sunday
      // First service
      recurringEvents.push({
        ...sundayService,
        id: `sunday-service-1-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        originalDate: new Date(currentDate)
      });
      
      // Second service
      recurringEvents.push({
        ...sundayService2,
        id: `sunday-service-2-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        originalDate: new Date(currentDate)
      });
    } else if (dayOfWeek === 3) { // Wednesday
      recurringEvents.push({
        ...wednesdayBibleStudy,
        id: `wednesday-bible-study-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        originalDate: new Date(currentDate)
      });
    } else if (dayOfWeek === 5) { // Friday
      recurringEvents.push({
        ...fridayPrayerMeeting,
        id: `friday-prayer-meeting-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
        originalDate: new Date(currentDate)
      });
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return recurringEvents;
};

/**
 * Exports an event to Google Calendar
 * @param {Object} event - The event object
 * @returns {string} Google Calendar URL
 */
export const exportToGoogleCalendar = (event) => {
  const formatDateForGoogle = (date, time) => {
    const [hours, minutes] = time.split(':');
    const eventDate = new Date(date);
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return eventDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };
  
  const startDateTime = formatDateForGoogle(event.date, event.startTime);
  const endDateTime = formatDateForGoogle(event.date, event.endTime);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDateTime}/${endDateTime}`,
    details: event.description,
    location: event.location,
    ctz: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Exports an event to iCal format
 * @param {Object} event - The event object
 * @returns {Promise<string>} Promise that resolves to the iCal data
 */
export const exportToICal = async (event) => {
  try {
    const formatDateForICal = (date, time) => {
      const [hours, minutes] = time.split(':');
      const eventDate = new Date(date);
      eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return eventDate;
    };
    
    const startDate = formatDateForICal(event.date, event.startTime);
    const endDate = formatDateForICal(event.date, event.endTime);
    
    const icsEvent = {
      start: [
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      ],
      end: [
        endDate.getFullYear(),
        endDate.getMonth() + 1,
        endDate.getDate(),
        endDate.getHours(),
        endDate.getMinutes()
      ],
      title: event.title,
      description: event.description,
      location: event.location,
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Place of Victory Church', email: 'info@placeofvictory.org' }
    };
    
    const { error, value } = await createEvent(icsEvent);
    
    if (error) {
      console.error('[Calendar] Error creating iCal event:', error);
      throw new Error('Failed to create iCal event');
    }
    
    return value;
  } catch (error) {
    console.error('[Calendar] Error in exportToICal:', error);
    throw error;
  }
};

/**
 * Downloads an iCal file
 * @param {string} icsData - The iCal data string
 * @param {string} filename - The filename for the download
 */
export const downloadICalFile = (icsData, filename) => {
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * Filters events by month
 * @param {Array} events - Array of events
 * @param {Date} month - The month to filter by
 * @returns {Array} Filtered events for the specified month
 */
export const filterEventsByMonth = (events, month) => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Calendar] Filtering events by month:', {
      start: start.toISOString(),
      end: end.toISOString(),
      totalEvents: events.length
    });
  }
  
  return events.filter(event => {
    // Handle both string dates and Date objects
    let eventDate;
    if (typeof event.date === 'string') {
      eventDate = new Date(event.date);
    } else if (event.date instanceof Date) {
      eventDate = event.date;
    } else {
      // Handle case where date might be a Date object from previous processing
      eventDate = new Date(event.date);
    }
    
    const isInRange = isWithinInterval(eventDate, { start, end });
    
    // Debug logging for first few events
    if (process.env.NODE_ENV === 'development' && events.indexOf(event) < 3) {
      console.log('[Calendar] Event date check:', {
        eventTitle: event.title,
        originalDate: event.date,
        eventDate: eventDate.toISOString(),
        isInRange
      });
    }
    
    return isInRange;
  });
};

/**
 * Merges Firestore events with recurring events and sorts by date
 * @param {Array} firestoreEvents - Events from Firestore
 * @param {Array} recurringEvents - Generated recurring events
 * @returns {Array} Merged and sorted events
 */
export const mergeAndSortEvents = (firestoreEvents, recurringEvents) => {
  // Convert Firestore events to have consistent structure
  const processedFirestoreEvents = firestoreEvents.map(event => ({
    ...event,
    isRecurring: false,
    originalDate: event.date instanceof Date ? event.date : new Date(event.date)
  }));
  
  // Convert recurring events to have consistent date structure
  const processedRecurringEvents = recurringEvents.map(event => ({
    ...event,
    date: new Date(event.date), // Ensure date is a Date object
    originalDate: new Date(event.date)
  }));
  
  // Merge all events
  const allEvents = [...processedFirestoreEvents, ...processedRecurringEvents];
  
  // Sort by date and time
  return allEvents.sort((a, b) => {
    // Handle both Date objects and date strings
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);
    
    // Set the time for comparison
    const [hoursA, minutesA] = a.startTime.split(':');
    const [hoursB, minutesB] = b.startTime.split(':');
    
    const compareDateA = new Date(dateA);
    const compareDateB = new Date(dateB);
    
    compareDateA.setHours(parseInt(hoursA), parseInt(minutesA), 0, 0);
    compareDateB.setHours(parseInt(hoursB), parseInt(minutesB), 0, 0);
    
    return compareDateA - compareDateB;
  });
};

/**
 * Exports multiple events to iCal
 * @param {Array} events - Array of events to export
 * @param {string} filename - The filename for the download
 * @returns {Promise<void>}
 */
export const exportMultipleEventsToICal = async (events, filename = 'events.ics') => {
  try {
    const icsEvents = [];
    
    for (const event of events) {
      const formatDateForICal = (date, time) => {
        const [hours, minutes] = time.split(':');
        const eventDate = new Date(date);
        eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return eventDate;
      };
      
      const startDate = formatDateForICal(event.date, event.startTime);
      const endDate = formatDateForICal(event.date, event.endTime);
      
      icsEvents.push({
        start: [
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate(),
          startDate.getHours(),
          startDate.getMinutes()
        ],
        end: [
          endDate.getFullYear(),
          endDate.getMonth() + 1,
          endDate.getDate(),
          endDate.getHours(),
          endDate.getMinutes()
        ],
        title: event.title,
        description: event.description,
        location: event.location,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Place of Victory Church', email: 'info@placeofvictory.org' }
      });
    }
    
    const { error, value } = await createEvent(icsEvents);
    
    if (error) {
      console.error('[Calendar] Error creating iCal events:', error);
      throw new Error('Failed to create iCal events');
    }
    
    downloadICalFile(value, filename);
  } catch (error) {
    console.error('[Calendar] Error in exportMultipleEventsToICal:', error);
    throw error;
  }
}; 