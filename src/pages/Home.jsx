import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Home = () => {
  // Sample upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: 'Every Sunday',
      time: 'First Service: 9:30 AM – 11:00 AM\nSecond Service: 12:00 PM – 2:00 PM',
      location: 'Main Sanctuary',
    },
    {
      id: 2,
      title: 'Bible Study Group',
      date: 'Every Wednesday',
      time: '6:30 PM – 8:00 PM',
      location: 'Fellowship Hall',
    },
    {
      id: 3,
      title: 'Prayer Meeting',
      date: 'Every Friday',
      time: '6:30 PM – 8:00 PM',
      location: 'Main Sanctuary',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
            {/* Fallback image in case video doesn't load */}
            <img 
              src="https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
              alt="Church worship" 
              className="w-full h-full object-cover"
            />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">Welcome to RCCG Place of Victory</h1>
          <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8">
            Join us in worship, community, and service as we grow together in faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/about" 
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-colors"
            >
              Learn More
            </Link>
            <button 
              onClick={() => {
                // Scroll to service times section on the current page if it exists
                const serviceTimesElement = document.getElementById('service-times');
                if (serviceTimesElement) {
                  serviceTimesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  // Navigate to about page with services section
                  window.location.href = '/about/services';
                }
              }}
              className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 text-lg font-medium rounded-lg transition-colors"
            >
              View Service Times
            </button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Welcome to Our Church Family</h2>
            <p className="text-xl text-gray-700 mb-8">
              At RCCG Place of Victory, we believe in creating a welcoming environment where everyone can experience God's love, 
              build meaningful relationships, and grow in faith together. Whether you're just beginning your spiritual 
              journey or have been walking with Christ for years, there's a place for you here.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/about" 
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-colors"
              >
                About Our Church
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 mb-6">
                To share the love of Christ with our community through worship, discipleship, 
                fellowship, and service, guiding people toward a deeper relationship with God.
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-xl text-gray-700">
                To be a vibrant, growing community of believers that is transforming lives, 
                strengthening families, and making a positive impact in our community and beyond.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden h-96">
              <img 
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Church community" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="service-times" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Service Times & Events</h2>
            <p className="text-xl text-gray-700 mt-2">Join us for these upcoming gatherings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-700 mb-2 text-lg">
                    <Calendar className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start text-gray-700 mb-2 text-lg">
                    <Clock className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0 mt-1" />
                    <span className="whitespace-pre-line">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700 mb-4 text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-primary-600 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <Link 
                    to="/events" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/events" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Join Us This Sunday</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We'd love to welcome you to our church family. Come as you are and experience 
            God's love in a community of believers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/about/services" 
              className="px-8 py-3 bg-white hover:bg-gray-100 text-primary-700 text-lg font-medium rounded-lg transition-colors"
            >
              Service Times
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white hover:bg-white hover:text-primary-700 text-lg font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 