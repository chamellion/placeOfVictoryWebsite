import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Heart, 
  Users, 
  BookOpen, 
  Download, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const BecomeAVolunteer = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phoneNumber: '',
    
    // Spiritual Growth
    bornAgain: '',
    workersTraining: '',
    baptismalClass: '',
    disciplesTraining: '',
    
    // Ministry Interest
    primaryDepartment: '',
    secondaryDepartment: '',
    
    // Agreement
    understandsInfo: '',
    
    // Comments
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Ministry departments
  const ministryDepartments = [
    'Ushering & Protocol',
    'Media & Technical',
    'Children\'s Ministry',
    'Youth Ministry',
    'Prayer Ministry',
    'Worship & Music',
    'Evangelism & Outreach',
    'Hospitality & Catering',
    'Transportation',
    'Security',
    'Cleaning & Maintenance',
    'Administration',
    'Finance & Stewardship',
    'Pastoral Care',
    'Education & Discipleship',
    'Community Services',
    'Intercessory Prayer',
    'Welcome & Follow-up',
    'Event Planning',
    'Other (Please specify)'
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Spiritual Growth validation
    if (!formData.bornAgain) {
      newErrors.bornAgain = 'Please answer this question';
    }

    if (!formData.workersTraining) {
      newErrors.workersTraining = 'Please answer this question';
    }

    if (!formData.baptismalClass) {
      newErrors.baptismalClass = 'Please answer this question';
    }

    if (!formData.disciplesTraining) {
      newErrors.disciplesTraining = 'Please answer this question';
    }

    // Ministry Interest validation
    if (!formData.primaryDepartment) {
      newErrors.primaryDepartment = 'Please select a primary department';
    }

    // Agreement validation
    if (!formData.understandsInfo) {
      newErrors.understandsInfo = 'Please confirm your understanding';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Volunteer Application Submitted:', formData);
      
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        bornAgain: '',
        workersTraining: '',
        baptismalClass: '',
        disciplesTraining: '',
        primaryDepartment: '',
        secondaryDepartment: '',
        understandsInfo: '',
        comments: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadManual = () => {
    window.open('https://bit.ly/povworkersmanual23', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become a Volunteer at RCCG Place of Victory
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              "We are saved to serve. Step into your calling by joining one of our ministry departments."
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Application Submitted Successfully!</h3>
                <p className="text-green-700 mb-4">
                  Thank you for your interest in serving at RCCG Place of Victory. We've received your application and will be in touch soon.
                </p>
                <p className="text-green-600 text-sm">
                  Please remember to download the Workers' Manual and send your confirmation email as outlined below.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mr-4">
                      <User className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                          errors.fullName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                          errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Spiritual Growth Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mr-4">
                      <Heart className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Spiritual Growth</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Are you a born-again Christian? <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="bornAgain"
                              value={option}
                              checked={formData.bornAgain === option}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.bornAgain && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.bornAgain}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Have you completed RCCG Workers-in-Training? <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="workersTraining"
                              value={option}
                              checked={formData.workersTraining === option}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.workersTraining && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.workersTraining}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Have you completed RCCG Baptismal Class? <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="baptismalClass"
                              value={option}
                              checked={formData.baptismalClass === option}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.baptismalClass && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.baptismalClass}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Have you completed RCCG School of Disciples Training? <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Yes', 'No'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="disciplesTraining"
                              value={option}
                              checked={formData.disciplesTraining === option}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                      {errors.disciplesTraining && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.disciplesTraining}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ministry Interest Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mr-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Ministry Interest</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="primaryDepartment" className="block text-sm font-medium text-gray-700 mb-2">
                        Which department do you wish to serve in (Primary Unit)? <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="primaryDepartment"
                        name="primaryDepartment"
                        value={formData.primaryDepartment}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                          errors.primaryDepartment ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a department</option>
                        {ministryDepartments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      {errors.primaryDepartment && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.primaryDepartment}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="secondaryDepartment" className="block text-sm font-medium text-gray-700 mb-2">
                        Which department do you wish to serve in (Secondary Unit)?
                      </label>
                      <select
                        id="secondaryDepartment"
                        name="secondaryDepartment"
                        value={formData.secondaryDepartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        <option value="">Select a department (optional)</option>
                        {ministryDepartments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Training Manual Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900">Training Manual & Next Steps</h2>
                  </div>
                  
                  <div className="space-y-4 text-blue-800">
                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Download className="h-5 w-5 mr-2" />
                        Download Workers' Manual
                      </h3>
                      <p className="mb-4">
                        Please download and study the RCCG Place of Victory Workers' Manual to understand our ministry structure and expectations.
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadManual}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Download Manual
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 border border-blue-200">
                      <h3 className="text-lg font-semibold mb-3">Important Onboarding Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p>
                            <strong>If you have NOT completed RCCG workers training:</strong> You are expected to study the manual and email confirmation to:
                          </p>
                        </div>
                        <div className="ml-5 space-y-1">
                          <p>• <strong>Primary:</strong> admin@placeofvictory.org.uk</p>
                          <p>• <strong>CC:</strong> ademiloyeadesola@gmail.com</p>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p>
                            <strong>If you HAVE completed the training:</strong> Still send confirmation email and we'll notify you of next cohort/start date.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mr-4">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Agreement</h2>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Do you understand the information above? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="understandsInfo"
                          value="yes"
                          checked={formData.understandsInfo === 'yes'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-1"
                        />
                        <span className="ml-3 text-gray-700">
                          <span className="text-green-600">✅</span> Yes, I will download and study the POV workers' curriculum. I will also send a confirmation email.
                        </span>
                      </label>
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="understandsInfo"
                          value="no"
                          checked={formData.understandsInfo === 'no'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-1"
                        />
                        <span className="ml-3 text-gray-700">
                          <span className="text-red-600">❌</span> No, do not process my application.
                        </span>
                      </label>
                    </div>
                    {errors.understandsInfo && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.understandsInfo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mr-4">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>
                  </div>
                  
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                      Any other comments or questions? (Optional)
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Share any additional information, questions, or comments..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white text-lg font-medium rounded-lg transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeAVolunteer; 