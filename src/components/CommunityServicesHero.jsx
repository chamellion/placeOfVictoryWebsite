import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Heart, BookOpen, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * CommunityServicesHero Component
 * 
 * World-class community services showcase with 3 sections:
 * 1. Hero Impact Section (Visual + Emotional Hook)
 * 2. Impact Metrics (Animated Counters)
 * 3. Featured Services (Action Cards)
 * 
 * Future: Will integrate with Firestore for dynamic content
 */
const CommunityServicesHero = () => {
  const [counts, setCounts] = useState({
    homes: 0,
    families: 0,
    shoes: 0,
    careHomes: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Target values for metrics
  const targets = {
    homes: 58,
    families: 200,
    shoes: 500,
    careHomes: 3
  };

  // Animated counter effect
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3
    });

    const metricsSection = document.getElementById('impact-metrics');
    if (metricsSection) {
      observer.observe(metricsSection);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        homes: Math.floor(targets.homes * progress),
        families: Math.floor(targets.families * progress),
        shoes: Math.floor(targets.shoes * progress),
        careHomes: Math.floor(targets.careHomes * progress)
      });

      if (step >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);
  };

  const services = [
    {
      id: 1,
      title: 'Food Pantry',
      description: 'Providing essential groceries and meals to families in need.',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-red-50 to-red-100',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      link: '/community-services#food-pantry',
    },
    {
      id: 2,
      title: 'Community Outreach',
      description: 'Extending God\'s love to our neighbors by spreading the gospel and sharing the love of Christ.',
      icon: <Home className="h-8 w-8" />,
      color: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: '/community-services#homeless-outreach',
    },
    {
      id: 3,
      title: 'Youth Mentoring',
      description: 'Empowering young people through mentorship and life skills development.',
      icon: <Users className="h-8 w-8" />,
      color: 'from-green-50 to-green-100',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      link: '/community-services#youth-mentoring',
    },
    {
      id: 4,
      title: 'Job Readiness',
      description: 'Helping community members develop skills and find employment.',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: '/community-services#job-readiness',
    },
  ];

  const metrics = [
    {
      count: counts.homes,
      target: targets.homes,
      label: 'Homes Blessed',
      icon: <Home className="h-8 w-8" />,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      count: counts.families,
      target: targets.families,
      label: 'Families Supported',
      icon: <Users className="h-8 w-8" />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      count: counts.shoes,
      target: targets.shoes,
      label: 'Pairs of Shoes Distributed',
      icon: <BookOpen className="h-8 w-8" />,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      count: counts.careHomes,
      target: targets.careHomes,
      label: 'Care Homes Visited',
      icon: <Heart className="h-8 w-8" />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="relative">
      {/* 1️⃣ HERO IMPACT SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-700"
          style={{
            backgroundImage: `url('/images/community_work/evangelism_ten.jpg')`,
            transform: 'scale(1.1)',
          }}
        >
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-primary-700/70"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 text-center">
          {/* Title - Fade in from top */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in">
            Our Community Services
          </h1>

          {/* Subtitle - Fade in with delay */}
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white/95 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
            Bringing hope and transformation through God's love in action.
          </p>

          {/* Bible Verse - Fade in with more delay */}
          <div className="mb-12 animate-slide-up-delay">
            <p className="text-lg md:text-xl italic text-yellow-100/90 max-w-3xl mx-auto leading-relaxed border-l-4 border-yellow-400 pl-6 py-4 bg-white/5 backdrop-blur-sm rounded-r-lg">
              "Let your light so shine before men, that they may see your good works and glorify your Father in heaven."
              <span className="block mt-2 text-base font-semibold text-yellow-300">— Matthew 5:16</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-zoom-in">
            <Link 
              to="/community-services" 
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
            >
              See Our Impact
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/donate" 
              className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
            >
              Support the Mission
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>
            
            <Link 
              to="/contact" 
              className="group px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
            >
              Contact Us
              <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          {/* Scroll Cue Icon */}
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/70 mx-auto" strokeWidth={3} />
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* 2️⃣ IMPACT METRICS SECTION */}
      <section 
        id="impact-metrics" 
        className="py-20 md:py-28 bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent mb-4">
              Love in Action: Our Impact So Far
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every number tells a story of faith, compassion, and transformation.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 text-center border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Circle */}
                <div className={`w-16 h-16 ${metric.iconBg} ${metric.iconColor} rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
                  {metric.icon}
                </div>

                {/* Count */}
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {metric.count}
                  {metric.target >= 50 && <span className="text-primary-600">+</span>}
                </div>

                {/* Label */}
                <div className="text-base md:text-lg font-medium text-gray-700">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ FEATURED SERVICES SECTION */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent mb-4">
              How We Serve
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover the ways we're making a difference in our community through compassionate service and faithful action.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group bg-gradient-to-br ${service.color} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200`}
                style={{ 
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 150}ms`,
                  opacity: 0
                }}
              >
                <div className="p-8">
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 ${service.iconBg} ${service.iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <Link 
                    to={service.link}
                    className={`inline-flex items-center ${service.iconColor} hover:gap-2 font-semibold transition-all duration-300 group/link`}
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link 
              to="/community-services" 
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CommunityServicesHero;

