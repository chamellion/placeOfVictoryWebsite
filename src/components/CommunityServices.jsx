import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, BookOpen, Home, Phone, Calendar, Clock, ArrowRight } from 'lucide-react';

const CommunityServices = () => {
  const services = [
    {
      id: 1,
      title: 'Food Pantry',
      description: 'Providing essential groceries and meals to families in need.',
      icon: <Heart className="h-8 w-8" />,
      link: '/community-services#food-pantry',
    },
    {
      id: 2,
      title: 'Homeless Outreach',
      description: 'Extending God\'s love to our homeless neighbors through meals and support.',
      icon: <Home className="h-8 w-8" />,
      link: '/community-services#homeless-outreach',
    },
    {
      id: 3,
      title: 'Youth Mentoring',
      description: 'Empowering young people through mentorship and life skills development.',
      icon: <Users className="h-8 w-8" />,
      link: '/community-services#youth-mentoring',
    },
    {
      id: 4,
      title: 'Job Readiness',
      description: 'Helping community members develop skills and find employment.',
      icon: <BookOpen className="h-8 w-8" />,
      link: '/community-services#job-readiness',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Community Services</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Making a difference in our community through God's love and service. 
            Join us in our mission to transform lives and bring hope to those in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="mb-4 text-primary-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <Link 
                  to={service.link}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/community-services" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-colors"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityServices; 