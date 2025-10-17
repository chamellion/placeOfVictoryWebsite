import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import ThemeOfTheMonth from '../components/ThemeOfTheMonth';
import CommunityServicesHero from '../components/CommunityServicesHero';
import ConfessionOfTheMonth from '../components/ConfessionOfTheMonth';

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
      {/* Theme of the Month - Top Banner */}
      <ThemeOfTheMonth />

      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Welcome Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent mb-6">
              Welcome to Our Church Family
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              At RCCG Place of Victory, we believe in creating a welcoming environment where everyone can experience God's love, 
              build meaningful relationships, and grow in faith together. Whether you're just beginning your spiritual 
              journey or have been walking with Christ for years, there's a place for you here.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/about" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                About Our Church
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Services Hero Section - WOW Factor */}
      <CommunityServicesHero />

      {/* Confession of the Month */}
      <ConfessionOfTheMonth />

      {/* Upcoming Events */}
      <section id="service-times" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent">
              Service Times & Events
            </h2>
            <p className="text-xl text-gray-700 mt-4 leading-relaxed">Join us for these upcoming gatherings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{event.title}</h3>
                  <div className="flex items-center text-gray-700 mb-3 text-lg">
                    <div className="bg-primary-50 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    </div>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start text-gray-700 mb-3 text-lg">
                    <div className="bg-primary-50 p-2 rounded-lg mr-3">
                      <Clock className="h-5 w-5 text-primary-600 flex-shrink-0 mt-1" />
                    </div>
                    <span className="whitespace-pre-line">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700 mb-4 text-lg">
                    <div className="bg-primary-50 p-2 rounded-lg mr-3">
                      <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    </div>
                    <span>{event.location}</span>
                  </div>
                  <Link 
                    to="/events" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-lg group-hover:gap-2 transition-all"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/events" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Join Us This Sunday</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-blue-50">
            We'd love to welcome you to our church family. Come as you are and experience 
            God's love in a community of believers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/about/services" 
              className="px-8 py-4 bg-white hover:bg-blue-50 text-primary-700 text-lg font-medium rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Service Times
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border-2 border-white hover:bg-white hover:text-primary-700 text-lg font-medium rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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