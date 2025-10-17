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
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            Our Community Services
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Making a difference in our community through God's love and service. 
            Join us in our mission to transform lives and bring hope to those in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-100/50"
            >
              <div className="p-6">
                <div className="mb-4 text-primary-600 bg-primary-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                <Link 
                  to={service.link}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:gap-2 transition-all"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/community-services" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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