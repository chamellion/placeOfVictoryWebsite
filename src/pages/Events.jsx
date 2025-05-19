import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, ChevronLeft } from 'lucide-react';

const Events = () => {
  // Current date for the calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: new Date(2025, 4, 25), // May 25, 2025
      time: '9:00 AM & 11:00 AM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly worship service featuring contemporary music, biblical teaching, and community.',
      registrationLink: '#',
      capacity: 250,
      category: 'Worship'
    },
    {
      id: 2,
      title: 'Bible Study Group',
      date: new Date(2025, 4, 27), // May 27, 2025
      time: '7:00 PM - 8:30 PM',
      location: 'Fellowship Hall',
      description: 'Our midweek Bible study focuses on diving deeper into Scripture and applying it to our daily lives.',
      registrationLink: '#',
      capacity: 50,
      category: 'Study'
    },
    {
      id: 3,
      title: 'Youth Night',
      date: new Date(2025, 4, 29), // May 29, 2025
      time: '6:30 PM - 9:00 PM',
      location: 'Youth Center',
      description: 'A fun night for teens featuring games, worship, a short message, and small group discussions.',
      registrationLink: '#',
      capacity: 75,
      category: 'Youth'
    },
    {
      id: 4,
      title: 'Community Outreach',
      date: new Date(2025, 5, 5), // June 5, 2025
      time: '10:00 AM - 2:00 PM',
      location: 'Downtown Community Center',
      description: 'Volunteer to serve our community through food distribution, cleanup projects, and relationship building.',
      registrationLink: '#',
      capacity: 100,
      category: 'Outreach'
    },
    {
      id: 5,
      title: 'Marriage Retreat',
      date: new Date(2025, 5, 12), // June 12, 2025
      time: '9:00 AM - 5:00 PM',
      location: 'Mountain View Retreat Center',
      description: 'A full-day retreat for married couples focusing on strengthening relationships through communication and faith.',
      registrationLink: '#',
      capacity: 20,
      category: 'Retreat'
    },
    {
      id: 6,
      title: 'Children\'s VBS',
      date: new Date(2025, 5, 19), // June 19, 2025
      time: '9:00 AM - 12:00 PM',
      location: 'Children\'s Ministry Wing',
      description: 'Our annual Vacation Bible School for children ages 5-12. Five days of fun, crafts, music, and Bible lessons.',
      registrationLink: '#',
      capacity: 120,
      category: 'Children'
    },
  ];
  
  // Get upcoming events (events after today)
  const today = new Date();
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date - b.date);
  
  // Functions for calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Function to format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
        const cloneDay = new Date(day);
        const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
        const isToday = day.toDateString() === today.toDateString();
        
        // Check if day has events
        const dayEvents = events.filter(event => 
          event.date.getDate() === day.getDate() && 
          event.date.getMonth() === day.getMonth() && 
          event.date.getFullYear() === day.getFullYear()
        );
        
        days.push(
          <div
            key={day.toString()}
            className={`p-2 h-24 border border-gray-200 ${
              isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
            } ${isToday ? 'bg-primary-50 border-primary-300' : ''}`}
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
                    className="text-xs p-1 mb-1 bg-primary-100 text-primary-800 rounded truncate"
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
            
            {/* Upcoming Events */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="border-l-4 border-primary-600 pl-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center text-gray-700 mb-2">
                          <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <Clock className="h-4 w-4 mr-2 text-primary-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-700 mb-3">
                          <Users className="h-4 w-4 mr-2 text-primary-600" />
                          <span>Capacity: {event.capacity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                            {event.category}
                          </span>
                          <a 
                            href={event.registrationLink} 
                            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                          >
                            Register Now
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">No upcoming events at this time.</p>
                )}
                
                {upcomingEvents.length > 5 && (
                  <div className="mt-6 text-center">
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                      View All Events
                    </button>
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
          <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
            />
            <button className="py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events; 