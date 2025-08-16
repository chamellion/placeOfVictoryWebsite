import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import useSWR from 'swr';
import { getPublicEvents, getPublicRecurringEvents, getPublicSkippedRecurringEvents } from '../lib/firebaseClient';
import { isValidEvent, formatEventDateTime, parseEventDate } from '../types/Event';
import { generateRecurringEventsFromFirestore, mergeAndSortEvents } from '../lib/utils/calendar';
import EventExportButtons from '../components/EventExportButtons';
import RecurringEventBadge from '../components/RecurringEventBadge';
import NewsletterForm from '../components/NewsletterForm';

const Events = () => {
  // Current date for the calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Fetch events from Firestore with SWR caching
  const { data: firestoreEvents = [], isLoading: eventsLoading, error: eventsError } = useSWR(
    'events',
    getPublicEvents,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  // Fetch recurring events from Firestore
  const { data: firestoreRecurringEvents = [], isLoading: recurringLoading, error: recurringError } = useSWR(
    'recurringEvents',
    getPublicRecurringEvents,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  // Debug SWR recurring events
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Events] SWR Recurring Events Status:', {
        data: firestoreRecurringEvents,
        isLoading: recurringLoading,
        error: recurringError,
        dataLength: firestoreRecurringEvents.length
      });
      
      // Log each recurring event in detail
      if (firestoreRecurringEvents.length > 0) {
        console.log('[Events] Recurring events details:', firestoreRecurringEvents.map(event => ({
          id: event.id,
          title: event.title,
          dayOfWeek: event.dayOfWeek,
          isActive: event.isActive,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location
        })));
      }
    }
  }, [firestoreRecurringEvents, recurringLoading, recurringError]);

  // Fetch skipped recurring events from Firestore
  const { data: skippedRecurringEvents = [], isLoading: skippedLoading, error: skippedError } = useSWR(
    'skippedRecurringEvents',
    getPublicSkippedRecurringEvents,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  // Debug SWR skipped events
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Events] SWR Skipped Events Status:', {
        data: skippedRecurringEvents,
        isLoading: skippedLoading,
        error: skippedError,
        dataLength: skippedRecurringEvents.length
      });
    }
  }, [skippedRecurringEvents, skippedLoading, skippedError]);
  
  // Generate recurring events from Firestore data
  const recurringEvents = useMemo(() => 
    generateRecurringEventsFromFirestore(firestoreRecurringEvents, skippedRecurringEvents), 
    [firestoreRecurringEvents, skippedRecurringEvents]
  );
  
  // Filter and validate events from Firestore
  const processedFirestoreEvents = firestoreEvents
    .filter(event => isValidEvent(event))
    .map(event => {
      const parsedDate = parseEventDate(event.date);
      return {
        ...event,
        date: parsedDate, // Convert string to Date object for calendar
        time: `${event.startTime} - ${event.endTime}`, // Format time for display
        formattedDateTime: formatEventDateTime(parsedDate, event.startTime, event.endTime)
      };
    });
  
  // Merge and sort all events
  const allEvents = useMemo(() => 
    mergeAndSortEvents(processedFirestoreEvents, recurringEvents), 
    [processedFirestoreEvents, recurringEvents]
  );
  
  // Use all events (no month filtering)
  const filteredEvents = useMemo(() => {
    return allEvents;
  }, [allEvents]);
  
  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    
    const events = filteredEvents.filter(event => {
      // Use local date comparison to avoid timezone issues
      const eventDate = new Date(event.date);
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();
      
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();
      
      return selectedYear === eventYear && 
             selectedMonth === eventMonth && 
             selectedDay === eventDay;
    });
    
    console.log('[Events] Selected date events:', {
      selectedDate: selectedDate.toDateString(),
      selectedYear: selectedDate.getFullYear(),
      selectedMonth: selectedDate.getMonth(),
      selectedDay: selectedDate.getDate(),
      totalFilteredEvents: filteredEvents.length,
      selectedDateEvents: events.length,
      events: events.map(e => ({ 
        title: e.title, 
        date: e.date, 
        eventYear: new Date(e.date).getFullYear(),
        eventMonth: new Date(e.date).getMonth(),
        eventDay: new Date(e.date).getDate(),
        isRecurring: e.isRecurring 
      }))
    });
    
    return events;
  }, [filteredEvents, selectedDate]);
  
  // Combined loading and error states
  const isLoading = eventsLoading || recurringLoading || skippedLoading;
  const hasError = eventsError || recurringError || skippedError;

  // Debug logging for events data
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Events] Data status:', {
        isLoading,
        hasError: !!hasError,
        totalEvents: firestoreEvents.length,
        validEvents: processedFirestoreEvents.length,
        firestoreRecurringEvents: firestoreRecurringEvents.length,
        skippedEvents: skippedRecurringEvents.length,
        generatedRecurringEvents: recurringEvents.length,
        allEvents: allEvents.length,
        filteredEvents: filteredEvents.length
      });
      
      if (allEvents.length > 0) {
        console.log('[Events] All events loaded:', allEvents.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date,
          location: event.location,
          isRecurring: event.isRecurring,
          formattedDateTime: event.formattedDateTime
        })));
      }
    }
  }, [firestoreEvents, processedFirestoreEvents, firestoreRecurringEvents, skippedRecurringEvents, recurringEvents, allEvents, filteredEvents, isLoading, hasError]);
  

  
  // Debug selectedDate changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Events] SelectedDate changed:', {
        selectedDate: selectedDate ? selectedDate.toDateString() : null,
        selectedYear: selectedDate ? selectedDate.getFullYear() : null,
        selectedMonth: selectedDate ? selectedDate.getMonth() : null,
        selectedDay: selectedDate ? selectedDate.getDate() : null,
        selectedDateEventsCount: selectedDateEvents.length
      });
    }
  }, [selectedDate, selectedDateEvents]);
  
  // Get recurring weekly activities for default view
  const recurringWeeklyActivities = useMemo(() => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Debug logging for recurring events
    if (process.env.NODE_ENV === 'development') {
      console.log('[Events] Recurring events debug:', {
        firestoreRecurringEventsLength: firestoreRecurringEvents.length,
        firestoreRecurringEvents: firestoreRecurringEvents,
        filteredActiveEvents: firestoreRecurringEvents.filter(event => event.isActive)
      });
    }
    
    const result = firestoreRecurringEvents
      .filter(event => event.isActive)
      .map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        day: dayNames[event.dayOfWeek],
        time: `${event.startTime} - ${event.endTime}`,
        location: event.location,
        isRecurring: true
      }))
      .sort((a, b) => {
        const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
      });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Events] Recurring weekly activities result:', result);
    }
    
    return result;
  }, [firestoreRecurringEvents]);

  // Get upcoming events (events after today) - used when no date is selected
  const today = useMemo(() => new Date(), []);
  const upcomingEvents = useMemo(() => {
    if (selectedDate) {
      console.log('[Events] Using selectedDateEvents:', selectedDateEvents.length, 'Events:', selectedDateEvents.map(e => ({ title: e.title, date: e.date })));
      return selectedDateEvents;
    }
    
    const upcoming = filteredEvents
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    console.log('[Events] Using upcoming events:', upcoming.length);
    return upcoming;
  }, [filteredEvents, selectedDate, selectedDateEvents, today]);

  // Get upcoming special events (non-recurring events from database)
  const upcomingSpecialEvents = useMemo(() => {
    return filteredEvents
      .filter(event => !event.isRecurring && new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredEvents, today]);
  
  // Functions for calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null); // Reset to default view when changing months
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null); // Reset to default view when changing months
  };
  
  // Handle calendar day click
  const handleDayClick = (day) => {
    console.log('[Events] Day clicked:', day.toDateString(), 'Year:', day.getFullYear(), 'Month:', day.getMonth(), 'Day:', day.getDate());
    // Force a new Date object to ensure React detects the change
    const newSelectedDate = new Date(day);
    setSelectedDate(newSelectedDate);
  };
  

  
  // Check if a date is selected
  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return day.getFullYear() === selectedDate.getFullYear() && 
           day.getMonth() === selectedDate.getMonth() && 
           day.getDate() === selectedDate.getDate();
  };
  
  // Calendar rendering functions
  const renderCalendarHeader = () => {
    const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{monthYear}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  const renderCalendarDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCalendarCells = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    if (endDate.getDay() !== 6) {
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    }
    
    const rows = [];
    let days = [];
    let day = new Date(startDate);
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        // Create a new Date object for each day to avoid mutation issues
        const currentDay = new Date(day);
        const isCurrentMonth = currentDay.getMonth() === currentMonth.getMonth();
        const isToday = currentDay.toDateString() === today.toDateString();
        
        // Check if day has events
        const dayEvents = filteredEvents.filter(event => {
          const eventDate = new Date(event.date);
          return currentDay.getFullYear() === eventDate.getFullYear() && 
                 currentDay.getMonth() === eventDate.getMonth() && 
                 currentDay.getDate() === eventDate.getDate();
        });
        
        days.push(
          <div
            key={currentDay.toString()}
            className={`p-2 h-24 border border-gray-200 cursor-pointer transition-colors ${
              isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'
            } ${isToday ? 'bg-primary-50 border-primary-300' : ''} ${
              isDateSelected(currentDay) ? 'bg-primary-100 border-primary-500 ring-2 ring-primary-200' : ''
            }`}
            onClick={() => isCurrentMonth && handleDayClick(currentDay)}
          >
            <div className="flex justify-between items-start">
              <span className={`text-sm font-medium ${isToday ? 'text-primary-700' : ''}`}>
                {day.getDate()}
              </span>
              {dayEvents.length > 0 && (
                <span className="h-2 w-2 rounded-full bg-primary-600"></span>
              )}
            </div>
            {isCurrentMonth && dayEvents.length > 0 && (
              <div className="mt-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div 
                    key={event.id} 
                    className={`text-xs p-1 mb-1 rounded truncate ${
                      event.isRecurring 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-primary-100 text-primary-800'
                    }`}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 2} more</div>
                )}
              </div>
            )}
          </div>
        );
        
        day.setDate(day.getDate() + 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join us for worship, fellowship, and community outreach opportunities.
          </p>
        </div>
      </section>

      {/* Calendar and Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Calendar</h2>
              {renderCalendarHeader()}
              {renderCalendarDays()}
              {renderCalendarCells()}
            </div>
            
            {/* Events Sidebar */}
            <div className="lg:col-span-2">
              <div 
                key={selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}` : 'no-date'}
                className="bg-white rounded-xl shadow-md p-6 sticky top-24 transition-all duration-300"
              >
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedDate 
                        ? `Events for ${selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}`
                        : 'Weekly Activities'
                      }
                    </h2>
                    {selectedDate && (
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                      >
                        Back to Weekly
                      </button>
                    )}
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-700">Loading events...</p>
                  </div>
                ) : hasError ? (
                  <div className="text-center py-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-yellow-700 mb-2">Unable to load events</p>
                      <p className="text-yellow-600 text-sm mb-3">
                        This might be because we're setting up our new event system. Please try again in a moment.
                      </p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                ) : selectedDate ? (
                  // Show individual events for selected date
                  upcomingEvents.length > 0 ? (
                    <div className="space-y-6 transition-all duration-300 ease-in-out">
                      {upcomingEvents.map((event) => (
                        <div key={`${event.id}-${selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}` : 'default'}`} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                            {event.isRecurring && <RecurringEventBadge />}
                          </div>
                          <div className="flex items-center text-gray-700 mb-3">
                            <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                            <span className="font-medium">{event.formattedDateTime}</span>
                          </div>
                          <div className="flex items-center text-gray-700 mb-4">
                            <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {event.description}
                          </p>
                          <div className="border-t pt-4">
                            <EventExportButtons event={event} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 transition-all duration-300 ease-in-out">
                      <div className="bg-gray-50 rounded-xl p-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-700 text-lg font-medium mb-2">No Events Scheduled</p>
                        <p className="text-gray-500 text-sm">
                          No events are scheduled for {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  // Show recurring weekly activities by default
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <p className="text-gray-600 text-sm">Our regular weekly activities</p>
                    </div>
                    {recurringWeeklyActivities.length > 0 ? (
                      recurringWeeklyActivities.map((activity) => (
                        <div key={activity.id} className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                              <div className="flex items-center text-primary-700 text-sm font-medium">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{activity.day}</span>
                                <span className="mx-2">•</span>
                                <span>{activity.time}</span>
                              </div>
                            </div>
                            <RecurringEventBadge />
                          </div>
                          <div className="flex items-center text-gray-700 mb-3">
                            <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                            <span className="text-sm">{activity.location}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                          <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                          <p className="text-blue-700 text-lg font-medium mb-2">Setting Up Weekly Activities</p>
                          <p className="text-blue-600 text-sm">
                            We're currently setting up our weekly recurring events. Check back soon for our regular schedule!
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Show upcoming special events */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Special Events</h3>
                      {upcomingSpecialEvents.length > 0 ? (
                        <div className="space-y-3">
                          {upcomingSpecialEvents.slice(0, 3).map((event) => (
                            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                              </div>
                              <div className="flex items-center text-gray-600 text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                <span className="mx-1">•</span>
                                <span>{event.startTime}</span>
                              </div>
                            </div>
                          ))}
                          {upcomingSpecialEvents.length > 3 && (
                            <p className="text-xs text-gray-500 text-center">
                              +{upcomingSpecialEvents.length - 3} more events
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm font-medium">No Special Events</p>
                            <p className="text-gray-500 text-xs mt-1">
                              We don't have any special upcoming events at the moment.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                

              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Registration CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Interested in our events?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Sign up for our newsletter to stay informed about upcoming events and opportunities to get involved.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default Events; 