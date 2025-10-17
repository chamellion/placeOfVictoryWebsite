import React, { useState, useEffect } from 'react';
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
  Share2,
  Gift,
  Smile,
  Target,
  TrendingUp,
  Award,
  Globe,
  Music,
  ShoppingBag,
  Gamepad2,
  Palette,
  MessageCircle,
  MapPin,
  PhoneCall,
  Mail
} from 'lucide-react';

const CommunityServices = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Beneficiary of household items support",
      title: "Partnership with Cwtch Mawr",
      quote: "I'd like to tender my sincere appreciation to Place of Victory Church Swansea for the package that they've given me today. I really appreciate it so much because it is now going to save me some money. I don't need to buy some of the things I've taken, like the tissue, the handwash, the blue roll, toothpaste. I am really grateful. I pray that God will continue to provide for POV Swansea. I pray that this initiative will open more doors for the church. Thank you so much POV for helping lives out there.",
      avatar: "👤"
    },
    {
      id: 2,
      name: "Beneficiary of household items support",
      title: "Moving house support",
      quote: "I recently moved houses and the process was quite demanding both physically and financially. So when the church announced on it's WhatsApp platform that members could come pick items for free, I told my wife and we went to get a few things. We got toiletries, clothing and even toys for our son. It's a wonderful initiative by the church and it really helped us save money. The funds we would have spent on these items went toward our energy bills, so we're really grateful.",
      avatar: "👤"
    },
    {
      id: 3,
      name: "Beneficiary of Maternal Care Support",
      title: "New mother support",
      quote: "I joined POV in February 2024 while I was pregnant. Moving to a new place was challenging, and I was anxious about getting support when the baby arrived. I gave birth in March, and the welfare team stepped in to help. I was deeply touched by how many people showed up on such short notice. I'm so grateful to POV and don't take their support for granted. God bless the church!",
      avatar: "👤"
    },
    {
      id: 4,
      name: "Beneficiary of education grant",
      title: "Graduation support",
      quote: "I had lost my job in Swansea, so I relocated to a location outside Swansea. I was able to pay my tuition fee, but I had an outstanding balance of £750 for which I wasn't going to graduate. I reached out to Pastor as I had less than 48 hours to complete payment, and he responded positively. I was helped out with £500 which not only eased the burden, but also helped me complete my tuition. I graduated successfully on the 25th all thanks to the Pastor and the entire Place of Victory. I have also started another new job where I relocated to. Once again, thank you.",
      avatar: "👤"
    },
    {
      id: 5,
      name: "Beneficiary of accommodation grant",
      title: "Newcomer support",
      quote: "My first visit to POV Swansea was on the day of its 2023 anniversary, just a few days after my wife and I arrived in the UK. It was a beautiful service, and we were warmly welcomed. Since then, we've become regular members. POV Swansea is a wonderful place to worship. The sermons, ministrations, and the people are all amazing. Being part of this church has positively impacted our lives. The church's activities are thoughtfully designed to help members grow spiritually. I clearly remember when we were in desperate need of accommodation. As newcomers to Swansea, we had nowhere to stay. I reached out to the church, and a brother got involved, passing the matter to Pastor Jeffery. Not only did the pastor reassure us that we would find a place, but the church also generously paid £100 to cover the balance of the rent. I will always be grateful to that brother, the pastor, and the entire church for their kindness. God bless POV Swansea! God bless His people!",
      avatar: "👤"
    },
    {
      id: 6,
      name: "Mental health initiatives",
      title: "Men's fellowship impact",
      quote: "The men's fellowship at POV Swansea has been a great boost to my mental health and overall well-being. Since it started, I've had the privilege of participating in various men's gatherings, whether for fellowship, church cleaning, or even watching football. These moments create a refreshing atmosphere that helps me temporarily set aside work and family stresses while connecting with other men on a deeper level. Overall, I can confidently say that POV Swansea has made and continues to make a positive impact on my life and my family.",
      avatar: "👤"
    }
  ];

  // 2024 Projects data
  const projects2024 = [
    {
      id: 1,
      title: "Distributing items to church members",
      description: "Providing essential household items, clothing, and toiletries to church members in need",
      category: "Essential Support",
      icon: <Gift className="h-8 w-8" />,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "School bags & calculators",
      description: "Supporting children with educational supplies including school bags and calculators",
      category: "Education",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Care home visits",
      description: "Regular visits to care homes bringing joy, companionship, and spiritual support",
      category: "Elderly Care",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Youth games night",
      description: "Featuring church members & non-church members in fun, inclusive activities",
      category: "Youth",
      icon: <Gamepad2 className="h-8 w-8" />,
      color: "bg-yellow-500"
    },
    {
      id: 5,
      title: "Diversity celebration",
      description: "Celebrating the rich diversity within our community and church family",
      category: "Community",
      icon: <Globe className="h-8 w-8" />,
      color: "bg-indigo-500"
    },
    {
      id: 6,
      title: "Ladies hangout",
      description: "Creating safe spaces for women to connect, share, and support each other",
      category: "Women",
      icon: <Users className="h-8 w-8" />,
      color: "bg-pink-500"
    },
    {
      id: 7,
      title: "Mental health art therapy",
      description: "Art therapy sessions for men to support mental health and well-being",
      category: "Mental Health",
      icon: <Palette className="h-8 w-8" />,
      color: "bg-red-500"
    },
    {
      id: 8,
      title: "Weekly football matches",
      description: "Regular football matches for men to build community and stay active",
      category: "Sports",
      icon: <Users className="h-8 w-8" />,
      color: "bg-orange-500"
    }
  ];

  // Gallery categories
  const galleryCategories = ['All', 'Food & Clothing', 'Outreach', 'Youth', 'Mental Health', 'Festive Support'];
  
  // Gallery images with enhanced categories
  const galleryImages = [
    {
      id: 1,
      src: '/images/community_work/community_work_one.jpg',
      alt: 'Community Work - Clothing Distribution',
      caption: 'Clothing Distribution',
      category: 'Food & Clothing'
    },
    {
      id: 2,
      src: '/images/community_work/community_work_two.jpg',
      alt: 'Community Work - Shoe Drive',
      caption: 'Shoe Drive',
      category: 'Food & Clothing'
    },
    {
      id: 3,
      src: '/images/community_work/community_work_three.jpg',
      alt: 'Community Work - Clothing Sharing',
      caption: 'Clothing Sharing',
      category: 'Food & Clothing'
    },
    {
      id: 4,
      src: '/images/community_work/community_work_four.jpg',
      alt: 'Community Work - Community Support',
      caption: 'Community Support',
      category: 'Outreach'
    },
    {
      id: 5,
      src: '/images/community_work/community_work_five.jpg',
      alt: 'Community Work - Clothing Distribution',
      caption: 'Clothing Distribution',
      category: 'Food & Clothing'
    },
    {
      id: 6,
      src: '/images/community_work/community_work_six.jpg',
      alt: 'Community Work - Shoe Distribution',
      caption: 'Shoe Distribution',
      category: 'Food & Clothing'
    },
    {
      id: 7,
      src: '/images/community_work/community_work_seven.jpg',
      alt: 'Community Work - Community Outreach',
      caption: 'Community Outreach',
      category: 'Outreach'
    },
    {
      id: 8,
      src: '/images/community_work/community_work_eight.jpg',
      alt: 'Community Work - Clothing Drive',
      caption: 'Clothing Drive',
      category: 'Food & Clothing'
    },
    {
      id: 9,
      src: '/images/community_work/community_work_nine.jpg',
      alt: 'Community Work - Shoe Sharing',
      caption: 'Shoe Sharing',
      category: 'Food & Clothing'
    },
    {
      id: 10,
      src: '/images/community_work/community_work_ten.jpg',
      alt: 'Community Work - Community Service',
      caption: 'Community Service',
      category: 'Outreach'
    }
  ];

  // Filtered gallery images
  const filteredGalleryImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Impact metrics with animation
  const [counts, setCounts] = useState({
    homes: 0,
    families: 0,
    shoes: 0,
    careHomes: 0
  });

  useEffect(() => {
    const targetCounts = {
      homes: 58,
      families: 200,
      shoes: 500,
      careHomes: 3
    };

    const duration = 2000;
    const steps = 60;
    const stepValue = {};
    
    Object.keys(targetCounts).forEach(key => {
      stepValue[key] = targetCounts[key] / steps;
    });

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCounts({
          homes: Math.floor(stepValue.homes * currentStep),
          families: Math.floor(stepValue.families * currentStep),
          shoes: Math.floor(stepValue.shoes * currentStep),
          careHomes: Math.floor(stepValue.careHomes * currentStep)
        });
      } else {
        setCounts(targetCounts);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Bold & Inspiring */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: 'url(/images/community_work/community_work_one.jpg)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/80" />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in">
            When We Say Community Matters,<br />
            <span className="text-yellow-300">We Mean It.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
            Since 2023, our journey of compassion has been creating ripples of change throughout Swansea, 
            touching hearts and transforming lives in ways we never imagined possible.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link 
              to="/volunteer" 
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Volunteer With Us
            </Link>
            <Link 
              to="/donate" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Donate Today
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
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto md:mx-0"
            >
              Share Our Mission
              <Share2 className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Story */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Journey of Compassion
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
                Picture this: A care home resident's face lighting up as our voices fill the room with melody, 
                their anxiety melting away into smiles. That's the delight we bring through our regular visits, 
                proving that sometimes, the best medicine is simply human connection.
              </p>
            </div>

            {/* Story Blocks */}
            <div className="space-y-16">
              {/* Samaritan's Basket */}
              <div className="flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-6">
                      <Gift className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">The Samaritan's Basket</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Stands as a beacon of hope, where anyone can access non-perishable food items without judgment or cost. 
                      It's not just about providing food – it's about preserving dignity and spreading kindness.
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="/images/community_work/community_work_two.jpg" 
                    alt="Samaritan's Basket"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Acts 2:44 Initiative */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12 animate-fade-in-up">
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-6">
                      <Heart className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Acts 2:44 Initiative</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We're revolutionizing how we support each other. When someone needs furniture, books, or clothing, 
                      our community steps up! It's beautiful to see items finding new homes and bringing joy to families in need.
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="/images/community_work/community_work_three.jpg" 
                    alt="Acts 2:44 Initiative"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Christmas Hampers */}
              <div className="flex flex-col lg:flex-row items-center gap-12 animate-fade-in-up">
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white mb-6">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Christmas Hamper Campaign</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Has already blessed 58 homes across Swansea since 2023. Each hamper represents more than just goods – 
                      it's a warm embrace from our church community, saying "We care about you."
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="/images/community_work/community_work_four.jpg" 
                    alt="Christmas Hampers"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every number represents a life touched, a family supported, and a community strengthened
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Homes Blessed */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
                <Home className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{counts.homes}+</div>
              <div className="text-lg text-gray-700">Homes Blessed</div>
              <div className="text-sm text-gray-500 mt-2">Christmas Hampers</div>
            </div>

            {/* Families Supported */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{counts.families}+</div>
              <div className="text-lg text-gray-700">Families Supported</div>
              <div className="text-sm text-gray-500 mt-2">Monthly Food & Clothing</div>
            </div>

            {/* Shoes Distributed */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Shirt className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{counts.shoes}+</div>
              <div className="text-lg text-gray-700">Pairs of Shoes</div>
              <div className="text-sm text-gray-500 mt-2">Distributed</div>
            </div>

            {/* Care Homes Visited */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{counts.careHomes}</div>
              <div className="text-lg text-gray-700">Care Homes</div>
              <div className="text-sm text-gray-500 mt-2">Visited Monthly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects of 2024 Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Projects Completed in 2024
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A year of transformation, connection, and community building
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects2024.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4 ${project.color}`}>
                  {project.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {project.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stories of Transformation
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Real testimonies from real people whose lives have been touched by our community service
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl relative">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-6xl text-primary-200 opacity-50">
                <Quote />
              </div>
              
              {/* Testimonial Content */}
              <div className="text-center relative z-10">
                <div className="text-4xl mb-6">{testimonials[activeTestimonial].avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {testimonials[activeTestimonial].name}
                </h3>
                <p className="text-primary-600 mb-6">{testimonials[activeTestimonial].title}</p>
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-primary-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health & Well-being Highlight */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 mb-8">
              <Brain className="h-10 w-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Mental Health & Well-being
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
              The men's fellowship at POV Swansea has been a great boost to my mental health and overall well-being. 
              Since it started, I've had the privilege of participating in various men's gatherings, whether for fellowship, 
              church cleaning, or even watching football. These moments create a refreshing atmosphere that helps me 
              temporarily set aside work and family stresses while connecting with other men on a deeper level.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-4xl">
              <span>🧠</span>
              <span>🙏</span>
              <span>⚽️</span>
              <span>👥</span>
              <span>💪</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Gallery of Love in Action
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              See our ministry in action through these moments of service, love, and transformation
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredGalleryImages.map((image) => (
              <div key={image.id} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold text-sm">{image.caption}</p>
                      <p className="text-white/80 text-xs">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strong Closing CTA */}
      <section className="py-24 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Together, We're Building a<br />
            <span className="text-yellow-300">Stronger Swansea</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90">
            Every act of service, every donation, every moment of your time can transform a life 
            and bring hope to our community. Join us in making a tangible difference.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Link 
              to="/volunteer" 
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              Volunteer With Us
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/donate" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Make a Donation
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Contact Us
              <MessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-6 w-6 text-yellow-300" />
              <span>47B Westbury Street, Swansea</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <PhoneCall className="h-6 w-6 text-yellow-300" />
              <span>Contact for details</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-6 w-6 text-yellow-300" />
              <span>info@placeofvictory.co.uk</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityServices; 