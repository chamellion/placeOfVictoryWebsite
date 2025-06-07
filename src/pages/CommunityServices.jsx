import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  BookOpen, 
  Home, 
  Phone, 
  Calendar, 
  Clock, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const CommunityServices = () => {
  const services = [
    {
      id: 1,
      title: 'Food Pantry',
      description: 'Providing essential groceries and meals to families in need, ensuring no one in our community goes hungry.',
      impact: 'Serving over 200 families monthly with fresh produce and non-perishable items.',
      image: '/media/services/food-pantry.jpg',
      icon: <Heart className="h-8 w-8" />,
      needs: ['Food donations', 'Volunteers for distribution', 'Storage space'],
      schedule: 'Every Saturday, 9:00 AM - 12:00 PM',
    },
    {
      id: 2,
      title: 'Homeless Outreach',
      description: 'Extending God\'s love to our homeless neighbors through meals, supplies, and support services.',
      impact: 'Providing weekly meals and essential supplies to over 50 individuals.',
      image: '/media/services/homeless-outreach.jpg',
      icon: <Home className="h-8 w-8" />,
      needs: ['Hygiene kits', 'Warm clothing', 'Volunteers'],
      schedule: 'Every Thursday, 6:00 PM - 8:00 PM',
    },
    {
      id: 3,
      title: 'Youth Mentoring',
      description: 'Empowering young people through mentorship, academic support, and life skills development.',
      impact: 'Mentoring 75+ youth annually with a 90% high school graduation rate.',
      image: '/media/services/youth-mentoring.jpg',
      icon: <Users className="h-8 w-8" />,
      needs: ['Mentors', 'Educational resources', 'Meeting space'],
      schedule: 'Every Tuesday & Thursday, 4:00 PM - 6:00 PM',
    },
    {
      id: 4,
      title: 'Job Readiness',
      description: 'Helping community members develop skills and find employment through training and networking.',
      impact: 'Assisted 120+ individuals in finding stable employment last year.',
      image: '/media/services/job-readiness.jpg',
      icon: <BookOpen className="h-8 w-8" />,
      needs: ['Career mentors', 'Computer equipment', 'Workshop space'],
      schedule: 'Every Monday & Wednesday, 6:00 PM - 8:00 PM',
    },
    {
      id: 5,
      title: 'Prayer Support',
      description: 'Offering spiritual guidance and prayer support for those facing life\'s challenges.',
      impact: 'Supporting hundreds of individuals through prayer and spiritual counseling.',
      image: '/media/services/prayer-support.jpg',
      icon: <Heart className="h-8 w-8" />,
      needs: ['Prayer warriors', 'Counseling resources'],
      schedule: 'Available 24/7 through our prayer line',
    },
    {
      id: 6,
      title: 'Crisis Helpline',
      description: 'Providing immediate support and resources for those in crisis situations.',
      impact: 'Responding to over 500 crisis calls annually with appropriate support.',
      image: '/media/services/crisis-helpline.jpg',
      icon: <Phone className="h-8 w-8" />,
      needs: ['Trained volunteers', 'Support resources'],
      schedule: '24/7 helpline available',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Community Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Making a difference in our community through God's love and service. 
            Join us in our mission to transform lives and bring hope to those in need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-primary-600 mb-2">Impact</h4>
                    <p className="text-gray-600">{service.impact}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-primary-600 mb-2">Current Needs</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {service.needs.map((need, index) => (
                        <li key={index}>{need}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-primary-600 mb-2">Schedule</h4>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      {service.schedule}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => window.location.href = '/volunteer'}
                      className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center justify-center"
                    >
                      Volunteer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => window.location.href = '/donate'}
                      className="flex-1 px-4 py-2 bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Your time, talents, and resources can help us expand our impact and serve more people in our community.
              Whether you can volunteer, donate, or spread the word, every contribution makes a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/volunteer" 
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-colors flex items-center"
              >
                Become a Volunteer
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/donate" 
                className="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 text-lg font-medium rounded-lg transition-colors"
              >
                Make a Donation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityServices; 