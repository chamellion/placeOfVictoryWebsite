import React, { useState } from 'react';
import { Star, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Testimonies = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    testimony: '',
    photo: null,
    allowSharing: true,
  });

  // Sample testimonies data
  const testimonies = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Church Member',
      photo: '/media/testimonies/sarah.jpg',
      quote: 'Finding this church has been a true blessing. The community here has helped me grow in my faith and find purpose in serving others.',
      date: 'March 15, 2024',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Thompson',
      role: 'Youth Ministry Volunteer',
      photo: '/media/testimonies/michael.jpg',
      quote: 'The youth ministry has transformed my life. I\'ve found my calling in mentoring young people and helping them discover their potential.',
      date: 'March 10, 2024',
      rating: 5,
    },
    {
      id: 3,
      name: 'Rebecca Martinez',
      role: 'Community Outreach Participant',
      photo: '/media/testimonies/rebecca.jpg',
      quote: 'Through the community services, I\'ve seen firsthand how God\'s love can change lives. The food pantry ministry has been especially impactful.',
      date: 'March 5, 2024',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'New Member',
      photo: '/media/testimonies/david.jpg',
      quote: 'I was welcomed with open arms from day one. The worship services and Bible studies have deepened my understanding of God\'s word.',
      date: 'February 28, 2024',
      rating: 5,
    },
    {
      id: 5,
      name: 'Emily Chen',
      role: 'Prayer Ministry Volunteer',
      photo: '/media/testimonies/emily.jpg',
      quote: 'Being part of the prayer ministry has shown me the power of collective faith. The support and love here are truly remarkable.',
      date: 'February 20, 2024',
      rating: 5,
    },
    {
      id: 6,
      name: 'James Anderson',
      role: 'Men\'s Ministry Leader',
      photo: '/media/testimonies/james.jpg',
      quote: 'The men\'s ministry has helped me become a better husband, father, and leader. The fellowship and accountability are invaluable.',
      date: 'February 15, 2024',
      rating: 5,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        testimony: '',
        photo: null,
        allowSharing: true,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to submit testimony. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Testimonies</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stories of faith, transformation, and God's work in our community. 
            Share your journey and inspire others with your testimony.
          </p>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonies.map((testimony) => (
              <div 
                key={testimony.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimony.photo}
                        alt={testimony.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{testimony.name}</h3>
                      <p className="text-primary-600">{testimony.role}</p>
                      <div className="flex mt-1">
                        {renderStars(testimony.rating)}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimony.quote}"
                  </blockquote>
                  <p className="text-sm text-gray-500">{testimony.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Testimony Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Story</h2>
              <p className="text-xl text-gray-700">
                Your testimony can inspire others and glorify God. Share how He has worked in your life.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You for Sharing!</h3>
                <p className="text-green-700">
                  Your testimony has been submitted successfully. We'll review it and may share it on our website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                {submitError && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                    <p className="text-red-700">{submitError}</p>
                  </div>
                )}

                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email (optional)"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="testimony" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Testimony *
                  </label>
                  <textarea
                    id="testimony"
                    name="testimony"
                    required
                    value={formData.testimony}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Share your story of faith, transformation, or how God has worked in your life..."
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Photo (Optional)
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a photo to accompany your testimony (max 2MB)
                  </p>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="allowSharing"
                      checked={formData.allowSharing}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to share my testimony on the church website
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-primary-600 text-white text-lg font-medium rounded-lg 
                    transition-colors flex items-center justify-center
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Share My Testimony
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonies; 