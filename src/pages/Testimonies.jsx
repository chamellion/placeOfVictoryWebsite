import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';
import { addTestimony, uploadPhoto } from '../lib/firebaseClient';

const Testimonies = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    testimony: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setSubmitError('Photo size must be less than 2MB');
        e.target.value = '';
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitError('Please select a valid image file');
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({ ...prev, photo: file }));
      setSubmitError(null);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    // Reset the file input
    const fileInput = document.getElementById('photo');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    if (!formData.testimony.trim()) {
      setSubmitError('Please share your testimony');
      return false;
    }
    
    if (!isAnonymous && !formData.name.trim()) {
      setSubmitError('Please enter your name');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setUploadProgress(0);

    try {
      let photoURL = null;
      
      // Upload photo if provided
      if (formData.photo) {
        setIsUploading(true);
        const uploadResult = await uploadPhoto(formData.photo, 'testimonies');
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error);
        }
        
        photoURL = uploadResult.downloadURL;
        setIsUploading(false);
      }

      // Prepare testimony data
      const testimonyData = {
        name: isAnonymous ? 'Anonymous' : formData.name.trim(),
        testimony: formData.testimony.trim(),
        photo: photoURL,
        isAnonymous,
      };

      // Save to Firestore
      const result = await addTestimony(testimonyData);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Success - clear form and show success message
      setSubmitSuccess(true);
      setFormData({
        name: '',
        testimony: '',
        photo: null,
      });
      setIsAnonymous(false);
      setUploadProgress(0);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      setSubmitError(error.message || 'Failed to submit testimony. Please try again.');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const closeError = () => {
    setSubmitError(null);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Your Testimony</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your story of faith, transformation, and God's work in your life can inspire others. 
            Share your journey and glorify His name.
          </p>
        </div>
      </section>

      {/* Testimony Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
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
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-700">{submitError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={closeError}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Anonymous Toggle */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Submit as Anonymous
                    </span>
                  </label>
                  {isAnonymous && (
                    <p className="mt-1 text-sm text-gray-500">
                      Your name will be hidden and saved as "Anonymous" in our records.
                    </p>
                  )}
                </div>

                {/* Name Field - Hidden if Anonymous */}
                {!isAnonymous && (
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
                )}

                {/* Testimony Field */}
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

                {/* Photo Upload */}
                <div className="mb-6">
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Photo (Optional)
                  </label>
                  
                  {formData.photo ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <img
                          src={URL.createObjectURL(formData.photo)}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{formData.photo.name}</p>
                          <p className="text-sm text-gray-500">
                            {(formData.photo.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {isUploading && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <label htmlFor="photo" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-2">
                          Click to upload a photo
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className={`w-full px-6 py-3 bg-primary-600 text-white text-lg font-medium rounded-lg 
                    transition-colors flex items-center justify-center
                    ${(isSubmitting || isUploading) ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                >
                  {(isSubmitting || isUploading) ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      {isUploading ? 'Uploading Photo...' : 'Submitting...'}
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