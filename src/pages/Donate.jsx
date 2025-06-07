import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Users, 
  BookOpen, 
  Home,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Heart
} from 'lucide-react';

const Donate = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedAmount(null);
        setCustomAmount('');
      }, 5000);
    }, 2000);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Our Ministry</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your generous donations help us continue our mission of spreading God's love and serving our community.
          </p>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You for Your Donation!</h2>
                <p className="text-green-700 mb-6">
                  Your generous contribution will help us continue our mission of serving God and our community.
                </p>
                <p className="text-sm text-green-600">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <form onSubmit={handleDonationSubmit}>
                    {/* Donation Type Selection */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Donation Type</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setDonationType('one-time')}
                          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                            donationType === 'one-time'
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-primary-200 text-gray-700'
                          }`}
                        >
                          <ArrowRight className="mr-2 h-5 w-5" />
                          One-Time Donation
                        </button>
                        <button
                          type="button"
                          onClick={() => setDonationType('recurring')}
                          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                            donationType === 'recurring'
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-primary-200 text-gray-700'
                          }`}
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          Recurring Donation
                        </button>
                      </div>
                    </div>

                    {/* Donation Amount Selection */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Amount</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {suggestedAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handleAmountSelect(amount)}
                            className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                              selectedAmount === amount
                                ? 'border-primary-600 bg-primary-50 text-primary-700'
                                : 'border-gray-200 hover:border-primary-200 text-gray-700'
                            }`}
                          >
                            <DollarSign className="h-4 w-4 mr-1" />
                            {amount.toLocaleString()}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter custom amount"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('credit-card')}
                          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                            paymentMethod === 'credit-card'
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-primary-200 text-gray-700'
                          }`}
                        >
                          <CreditCard className="mr-2 h-5 w-5" />
                          Credit Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank-transfer')}
                          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                            paymentMethod === 'bank-transfer'
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-primary-200 text-gray-700'
                          }`}
                        >
                          <svg 
                            className="mr-2 h-5 w-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                            />
                          </svg>
                          Bank Transfer
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing || (!selectedAmount && !customAmount)}
                      className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white text-lg font-medium transition-colors ${
                        isProcessing || (!selectedAmount && !customAmount)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-primary-600 hover:bg-primary-700'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-5 w-5" />
                          Donate Now
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Impact Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact</h3>
              <p className="text-gray-700">
                Your donations help us serve over 1,000 families in our community through various outreach programs.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Spiritual Growth</h3>
              <p className="text-gray-700">
                Support our Bible study programs, youth ministry, and discipleship initiatives that help people grow in faith.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Church Development</h3>
              <p className="text-gray-700">
                Your contributions help maintain our facilities and support the growth of our church community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate; 