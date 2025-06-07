import React, { useState } from 'react';
import { Heart, Check, X } from 'lucide-react';

const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    isAnonymous: false,
    allowSharing: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate form
    if (!formData.request.trim()) {
      setError('Please enter your prayer request');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.isAnonymous && !formData.name.trim()) {
      setError('Please enter your name or check the anonymous option');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.isAnonymous && !formData.email.trim() && !formData.phone.trim()) {
      setError('Please provide either an email or phone number for follow-up');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    try {
      // In a real application, you would send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        request: '',
        isAnonymous: false,
        allowSharing: false,
      });
    } catch (err) {
      setError('There was an error submitting your prayer request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Submit a Prayer Request</h2>
            <p className="text-xl text-gray-700">
              We believe in the power of prayer. Share your prayer request with us, and our prayer team will lift it up to God.
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Prayer Request Received</h3>
              <p className="text-green-700 mb-6">
                Thank you for sharing your prayer request with us. Our prayer team will be lifting this up to God.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-lg transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start">
                    <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Anonymous Option */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isAnonymous"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isAnonymous" className="ml-2 block text-gray-700">
                        Submit anonymously
                      </label>
                    </div>
                    
                    {/* Name Field (hidden if anonymous) */}
                    {!formData.isAnonymous && (
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter your name"
                        />
                      </div>
                    )}
                    
                    {/* Contact Information (hidden if anonymous) */}
                    {!formData.isAnonymous && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Prayer Request */}
                    <div>
                      <label htmlFor="request" className="block text-sm font-medium text-gray-700 mb-1">
                        Prayer Request *
                      </label>
                      <textarea
                        id="request"
                        name="request"
                        value={formData.request}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Please share your prayer request here..."
                        required
                      ></textarea>
                    </div>
                    
                    {/* Allow Sharing Option */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="allowSharing"
                        name="allowSharing"
                        checked={formData.allowSharing}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="allowSharing" className="ml-2 block text-gray-700">
                        I give permission for this prayer request to be shared with the prayer team (your contact information will remain private)
                      </label>
                    </div>
                    
                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white text-lg font-medium transition-colors ${
                          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Heart className="mr-2 h-5 w-5" />
                            Submit Prayer Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Additional Information */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              All prayer requests are treated with confidentiality and respect. 
              Our prayer team is committed to lifting your needs before God.
            </p>
            <p className="text-gray-600 mt-2">
              For urgent prayer needs, please call our prayer line at (555) 123-4567.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerRequest; 