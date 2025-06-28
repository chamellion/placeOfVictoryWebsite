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
  ChevronRight,
  Baby,
  Brain,
  HandHeart,
  Utensils,
  Shirt,
  Users2,
  Star,
  Quote,
  Share2
} from 'lucide-react';

const CommunityServices = () => {
  // Gallery of Love in Action - Using real available images
  const galleryImages = [
    {
      id: 1,
      src: '/images/community_work/community_work_one.jpg',
      alt: 'Community Work - Clothing Distribution',
      caption: 'Clothing Distribution',
      category: 'Essential Needs'
    },
    {
      id: 2,
      src: '/images/community_work/community_work_two.jpg',
      alt: 'Community Work - Shoe Drive',
      caption: 'Shoe Drive',
      category: 'Essential Needs'
    },
    {
      id: 3,
      src: '/images/community_work/community_work_three.jpg',
      alt: 'Community Work - Clothing Sharing',
      caption: 'Clothing Sharing',
      category: 'Essential Needs'
    },
    {
      id: 4,
      src: '/images/community_work/community_work_four.jpg',
      alt: 'Community Work - Community Support',
      caption: 'Community Support',
      category: 'Essential Needs'
    },
    {
      id: 5,
      src: '/images/community_work/community_work_five.jpg',
      alt: 'Community Work - Clothing Distribution',
      caption: 'Clothing Distribution',
      category: 'Essential Needs'
    },
    {
      id: 6,
      src: '/images/community_work/community_work_six.jpg',
      alt: 'Community Work - Shoe Distribution',
      caption: 'Shoe Distribution',
      category: 'Essential Needs'
    },
    {
      id: 7,
      src: '/images/community_work/community_work_seven.jpg',
      alt: 'Community Work - Community Outreach',
      caption: 'Community Outreach',
      category: 'Essential Needs'
    },
    {
      id: 8,
      src: '/images/community_work/community_work_eight.jpg',
      alt: 'Community Work - Clothing Drive',
      caption: 'Clothing Drive',
      category: 'Essential Needs'
    },
    {
      id: 9,
      src: '/images/community_work/community_work_nine.jpg',
      alt: 'Community Work - Shoe Sharing',
      caption: 'Shoe Sharing',
      category: 'Essential Needs'
    },
    {
      id: 10,
      src: '/images/community_work/community_work_ten.jpg',
      alt: 'Community Work - Community Service',
      caption: 'Community Service',
      category: 'Essential Needs'
    }
  ];

  // Enhanced services with categories and badges
  const services = [
    {
      id: 1,
      title: 'Food & Clothing Distribution',
      description: 'Providing essential groceries, meals, and clothing to families in need, ensuring no one in our community goes hungry or without proper attire.',
      impact: 'Serving over 200 families monthly with fresh produce, non-perishable items, and seasonal clothing.',
      image: '/images/community_work/community_work_one.jpg',
      icon: <Utensils className="h-8 w-8" />,
      needs: ['Food donations', 'Clothing donations', 'Volunteers for distribution', 'Storage space'],
      schedule: 'Every Saturday, 9:00 AM - 12:00 PM',
      category: 'Essential Needs',
      badge: 'Essential Care',
      badgeColor: 'bg-blue-100 text-blue-800',
      emoji: '👕'
    },
    {
      id: 2,
      title: 'Shoe Drive Initiative',
      description: 'Collecting and distributing shoes to children and adults in need, helping them walk with dignity and comfort.',
      impact: 'Distributed over 500 pairs of shoes to families and individuals in the past year.',
      image: '/images/community_work/community_work_two.jpg',
      icon: <Shirt className="h-8 w-8" />,
      needs: ['New and gently used shoes', 'Volunteers for collection', 'Distribution partners'],
      schedule: 'Monthly drives with year-round collection',
      category: 'Essential Needs',
      badge: 'Dignity',
      badgeColor: 'bg-green-100 text-green-800',
      emoji: '👟'
    },
    {
      id: 3,
      title: 'Care Home Visits',
      description: 'Bringing joy, companionship, and spiritual support to residents in local care homes through regular visits and activities.',
      impact: 'Visiting 3 care homes monthly, bringing comfort and connection to over 100 elderly residents.',
      image: '/images/charity_photos/care_home.jpg',
      icon: <Heart className="h-8 w-8" />,
      needs: ['Volunteers for visits', 'Activity materials', 'Transportation'],
      schedule: 'Every Sunday afternoon, 2:00 PM - 4:00 PM',
      category: 'Elderly Care',
      badge: 'Companionship',
      badgeColor: 'bg-purple-100 text-purple-800',
      emoji: '🧓'
    },
    {
      id: 4,
      title: 'Children Support Programs',
      description: 'Supporting children through educational assistance, mentorship, and providing essential supplies for their development.',
      impact: 'Supporting 75+ children annually with educational resources, mentorship, and essential supplies.',
      image: '/images/charity_photos/children_support.jpg',
      icon: <Baby className="h-8 w-8" />,
      needs: ['Educational materials', 'Mentors', 'School supplies', 'Meeting space'],
      schedule: 'Every Tuesday & Thursday, 4:00 PM - 6:00 PM',
      category: 'Youth Support',
      badge: 'Future',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      emoji: '👶'
    },
    {
      id: 5,
      title: 'Men\'s Mental Health Awareness',
      description: 'Creating safe spaces for men to discuss mental health, providing support groups, and raising awareness about men\'s mental wellness.',
      impact: 'Hosting monthly support groups and awareness events, reaching 50+ men annually.',
      image: '/images/charity_photos/men_mental_health_event.jpg',
      icon: <Brain className="h-8 w-8" />,
      needs: ['Mental health professionals', 'Meeting space', 'Educational materials'],
      schedule: 'Monthly support groups and quarterly awareness events',
      category: 'Mental Health',
      badge: 'Wellness',
      badgeColor: 'bg-red-100 text-red-800',
      emoji: '🧠'
    },
    {
      id: 6,
      title: 'Spiritual & Life Counseling',
      description: 'Offering spiritual guidance, emotional support, and life coaching for those facing challenges and seeking direction.',
      impact: 'Providing counseling support to hundreds of individuals annually through one-on-one and group sessions.',
      image: '/images/charity_photos/care_home_one.JPG',
      icon: <Users2 className="h-8 w-8" />,
      needs: ['Trained counselors', 'Prayer warriors', 'Confidential meeting spaces'],
      schedule: 'By appointment and weekly group sessions',
      category: 'Mental Health',
      badge: 'Guidance',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      emoji: '🙏'
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

      {/* Why We Serve Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
              <HandHeart className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why We Serve</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Our faith moves us to act. At RCCG Place of Victory, we go beyond Sunday sermons. 
              Through food, clothing, emotional support, and presence, we express God's love in 
              tangible ways to those around us.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Outreach Programs</h2>
            <p className="text-xl text-gray-700">
              Comprehensive support services designed to meet the diverse needs of our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                    <span className="text-2xl">{service.emoji}</span>
                  </div>
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
                  <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-primary-600 mb-2 flex items-center">
                      <Star className="h-5 w-5 mr-2" />
                      Impact
                    </h4>
                    <p className="text-gray-600">{service.impact}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-primary-600 mb-2">Current Needs</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {service.needs.map((need, index) => (
                        <li key={index}>{need}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-primary-600 mb-2 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Schedule
                    </h4>
                    <p className="text-gray-600">{service.schedule}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600 italic">
                      Get involved through prayer, giving, or showing up.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery of Love in Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gallery of Love in Action</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              See our ministry in action through these moments of service, love, and transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                    <div className="p-3 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                      <p className="text-white/80 text-xs">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengthened CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let Your Hands Be an Answer to Someone's Prayer</h2>
            <p className="text-xl mb-8 opacity-90">
              Every act of service, every donation, every moment of your time can transform a life 
              and bring hope to our community. Join us in making a tangible difference.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-4">💖</div>
                <h3 className="text-xl font-semibold mb-2">Become a Volunteer</h3>
                <p className="opacity-80">Share your time and talents to serve others</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-4">🙌</div>
                <h3 className="text-xl font-semibold mb-2">Make a Donation</h3>
                <p className="opacity-80">Support our programs with your resources</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-4">📣</div>
                <h3 className="text-xl font-semibold mb-2">Share Our Mission</h3>
                <p className="opacity-80">Help spread the word about our community work</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/volunteer" 
                className="px-8 py-4 bg-white text-primary-700 hover:bg-gray-100 text-lg font-medium rounded-lg transition-colors flex items-center"
              >
                Become a Volunteer
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/donate" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg font-medium rounded-lg transition-colors"
              >
                Make a Donation
              </Link>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'RCCG Place of Victory Community Services',
                      text: 'Join us in serving our community with love and compassion.',
                      url: window.location.href
                    });
                  } else {
                    // Fallback for browsers that don't support Web Share API
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-800 text-white text-lg font-medium rounded-lg transition-colors flex items-center"
              >
                Share Our Mission
                <Share2 className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityServices; 