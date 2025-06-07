import React from 'react';
import { Heart, Users, Clock } from 'lucide-react';
import PrayerRequest from '../components/PrayerRequest';

const Prayer = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Prayer Ministry</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join us in lifting up our community, our church, and our world in prayer. 
            We believe in the power of prayer to transform lives and bring hope.
          </p>
        </div>
      </section>

      {/* Prayer Request Form Section */}
      <PrayerRequest />

      {/* Prayer Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Prayer Team</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our dedicated prayer team is committed to interceding on behalf of our church family and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prayer Warriors</h3>
              <p className="text-gray-700">
                Our team of dedicated prayer warriors is available to pray for your needs, 
                whether they are personal, family-related, or community concerns.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prayer Groups</h3>
              <p className="text-gray-700">
                Join one of our prayer groups that meet regularly to pray for specific needs 
                and to grow together in our prayer life.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prayer Times</h3>
              <p className="text-gray-700">
                We have dedicated prayer times throughout the week where you can join us 
                in corporate prayer for our church and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Prayer Resources</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore these resources to help you grow in your prayer life and deepen your relationship with God.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Prayer Guide</h3>
                <p className="text-gray-700 mb-4">
                  A comprehensive guide to different types of prayer and how to incorporate them into your daily life.
                </p>
                <a 
                  href="/resources/prayer-guide" 
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Download Guide
                  <svg 
                    className="ml-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Prayer Journal</h3>
                <p className="text-gray-700 mb-4">
                  A printable prayer journal template to help you organize your prayer requests and track God's answers.
                </p>
                <a 
                  href="/resources/prayer-journal" 
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Download Journal
                  <svg 
                    className="ml-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                    />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Prayer Calendar</h3>
                <p className="text-gray-700 mb-4">
                  A monthly prayer calendar with specific prayer points for our church, community, and global missions.
                </p>
                <a 
                  href="/resources/prayer-calendar" 
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  View Calendar
                  <svg 
                    className="ml-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prayer; 