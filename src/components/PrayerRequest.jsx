import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { addPrayerRequest } from '../lib/firebaseClient';
import Toast from './Toast';

const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    isAnonymous: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.request.trim()) {
      setToast({ show: true, message: 'Please enter your prayer request', type: 'error' });
      return false;
    }
    
    if (!formData.isAnonymous && !formData.name.trim()) {
      setToast({ show: true, message: 'Please enter your name or check the anonymous option', type: 'error' });
      return false;
    }
    
    if (!formData.isAnonymous && formData.email.trim() && !isValidEmail(formData.email)) {
      setToast({ show: true, message: 'Please enter a valid email address', type: 'error' });
      return false;
    }
    
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare prayer request data
      const prayerData = {
        name: formData.isAnonymous ? null : formData.name.trim(),
        email: formData.isAnonymous ? null : formData.email.trim() || null,
        request: formData.request.trim(),
        isAnonymous: formData.isAnonymous,
      };

      // Save to Firestore
      const result = await addPrayerRequest(prayerData);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Success - clear form and show success message
      setToast({ show: true, message: 'Prayer request submitted successfully! Our prayer team will lift it up to God.', type: 'success' });
      setFormData({
        name: '',
        email: '',
        request: '',
        isAnonymous: false,
      });

    } catch (error) {
      setToast({ show: true, message: error.message || 'Failed to submit prayer request. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
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

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
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
                        Your Name
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
                  
                  {/* Email Field (hidden if anonymous) */}
                  {!formData.isAnonymous && (
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
                        placeholder="Enter your email (optional)"
                      />
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

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
        duration={5000}
      />
    </section>
  );
};

export default PrayerRequest; 