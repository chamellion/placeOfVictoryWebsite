import React, { useState } from 'react';
import { addNewsletterSignup } from '../lib/firebaseClient';
import Toast from './Toast';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await addNewsletterSignup(email);
      
      if (result.success) {
        showToast('Thanks for subscribing to our newsletter!', 'success');
        setEmail(''); // Clear the input field
      } else {
        showToast(result.error || 'Failed to subscribe. Please try again later.', 'error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      showToast('An unexpected error occurred. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow transition-colors"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !email.trim()}
          className={`py-3 px-6 font-medium rounded-lg transition-colors ${
            isLoading || !email.trim()
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Subscribing...
            </div>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />
    </>
  );
};

export default NewsletterForm;
