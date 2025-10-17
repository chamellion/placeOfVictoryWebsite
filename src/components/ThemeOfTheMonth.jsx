import React, { useState, useEffect } from 'react';
import { subscribeToActiveThemeOfTheMonth } from '../lib/firebaseClient';
import { Sparkles, X, Maximize2 } from 'lucide-react';

const ThemeOfTheMonth = () => {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToActiveThemeOfTheMonth((result) => {
      setLoading(false);
      
      if (result.success && result.theme) {
        setTheme(result.theme);
        setError(null);
      } else {
        setError(result.error || 'Failed to load theme');
        setTheme(null);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Helper function to map font weight strings to numeric values
  const getFontWeight = (weight) => {
    if (!weight) return 700;
    if (typeof weight === 'number') return weight;
    
    const weightMap = {
      'thin': 100,
      'extralight': 200,
      'light': 300,
      'normal': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900,
    };
    
    return weightMap[weight.toLowerCase()] || 700;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 border-b-4 border-primary-900/20 shadow-lg">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4">
          <div className="flex items-center gap-4 animate-pulse max-w-[2000px] mx-auto">
            {/* Icon placeholder - Left */}
            <div className="w-14 h-14 md:w-20 md:h-20 bg-white/20 rounded-lg flex-shrink-0"></div>
            {/* Text placeholder - Center */}
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-white/20 rounded w-32 mb-2"></div>
              <div className="h-6 md:h-8 bg-white/30 rounded w-full max-w-md"></div>
            </div>
            {/* Thumbnail placeholder - Right */}
            <div className="w-14 h-14 md:w-20 md:h-20 bg-white/20 rounded-lg flex-shrink-0"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if there's an error, no theme, or theme is not visible
  if (error || !theme || theme.isVisible === false) {
    return null;
  }

  // Build title styles from Firestore data
  const titleStyles = {
    fontFamily: theme.titleFontFamily || undefined,
    color: theme.titleColor || '#ffffff',
    fontWeight: getFontWeight(theme.titleFontWeight),
  };

  const handleBannerClick = () => {
    if (theme.imageUrl) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = (e) => {
    // Close only if clicking the backdrop or close button
    if (e.target === e.currentTarget || e.target.closest('[data-close]')) {
      setIsModalOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* Compact Top Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 border-b-4 border-primary-900/20 shadow-lg relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.03) 50%, transparent 55%)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Banner Content */}
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 md:py-4">
          <button
            onClick={handleBannerClick}
            className="w-full flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-300 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-2 -m-2 max-w-[2000px] mx-auto"
            aria-label="View theme details"
          >
            {/* Icon Badge - Left Side */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/40 group-hover:scale-105">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
                <p className="text-white/90 text-xs md:text-sm font-semibold tracking-wider uppercase">
                  Theme of the Month
                </p>
              </div>
              <h2 
                className="text-base md:text-xl lg:text-2xl leading-snug truncate transition-all duration-300 group-hover:text-yellow-100"
                style={titleStyles}
              >
                {theme.title || 'Theme of the Month'}
              </h2>
            </div>

            {/* Thumbnail Image - Extreme Right */}
            {theme.imageUrl && (
              <div className="flex-shrink-0 relative">
                <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-xl border-2 border-white/20 transition-all duration-300 group-hover:border-white/40 group-hover:shadow-2xl group-hover:scale-105">
                  <img 
                    src={theme.imageUrl} 
                    alt={theme.title || 'Theme Image'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Expand Icon Overlay - Always Visible */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                    <div className="bg-white/90 rounded-full p-1.5 md:p-2 shadow-lg group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-primary-600 group-hover:text-primary-700" strokeWidth={2.5} />
                    </div>
                  </div>
                  {/* "Click to Expand" Pulse Ring */}
                  <div className="absolute inset-0 rounded-lg border-2 border-yellow-400/60 animate-pulse"></div>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Full Image Modal Overlay */}
      {isModalOpen && theme.imageUrl && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={handleModalClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-modal-title"
        >
          {/* Close Button */}
          <button
            data-close
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 group focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-yellow-300 transition-colors" strokeWidth={2.5} />
          </button>

          {/* Modal Content Container */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center animate-scale-in">
            {/* Title Above Image */}
            <div className="mb-6 text-center animate-slide-down">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span className="text-white/90 text-sm md:text-base font-semibold tracking-wider uppercase">
                  Theme of the Month
                </span>
              </div>
              <h3 
                id="theme-modal-title"
                className="text-2xl md:text-4xl lg:text-5xl leading-tight px-4"
                style={titleStyles}
              >
                {theme.title || 'Theme of the Month'}
              </h3>
            </div>

            {/* Image Container */}
            <div className="relative max-w-full max-h-[70vh] md:max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl animate-scale-in border-4 border-white/10">
              <img 
                src={theme.imageUrl} 
                alt={theme.title || 'Theme Image'}
                className="max-w-full max-h-[70vh] md:max-h-[75vh] w-auto h-auto object-contain"
                loading="eager"
              />
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-yellow-400/50 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-yellow-400/50 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-yellow-400/50 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-yellow-400/50 rounded-br-2xl"></div>
            </div>

            {/* Close Hint */}
            <p className="mt-6 text-white/60 text-sm md:text-base animate-fade-in-delay">
              Click anywhere outside to close or press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 font-mono text-xs">ESC</kbd>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeOfTheMonth;
