import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlipCardCSS = ({ name, role, bio, imageUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFlip = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div 
      className="group w-full h-full"
      tabIndex={isMobile ? 0 : -1}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Flip card for ${name}`}
    >
      {/* Flip Container */}
      <div 
        className="relative w-full min-h-[26rem] mx-auto"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className={`relative w-full h-full cursor-pointer transition-transform duration-500 ease-in-out ${
            !isMobile ? 'group-hover:rotate-y-180' : ''
          }`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isMobile && isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
          animate={isMobile ? { 
            rotateY: isFlipped ? 180 : 0 
          } : {}}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut" 
          }}
          onClick={handleFlip}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="h-64 overflow-hidden bg-gray-200">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center w-full h-full text-gray-500 text-4xl">
                👤
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
              <p className="text-primary-600 font-medium text-lg">{role}</p>
              {isMobile && bio && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  className="mt-4 text-sm text-primary-600 hover:text-primary-800 underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  aria-expanded={isFlipped}
                >
                  {isFlipped ? 'Hide Bio' : 'Read Bio'}
                </button>
              )}
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl shadow-xl border border-primary-500 p-6 flex flex-col justify-center text-center"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-primary-200 font-medium text-lg mb-4">{role}</p>
            {bio && (
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm leading-relaxed text-primary-100">{bio}</p>
              </div>
            )}
            {isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="mt-4 text-sm text-white underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
              >
                Back
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlipCardCSS; 