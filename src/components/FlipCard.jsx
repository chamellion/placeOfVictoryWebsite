import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlipCard = ({ name, role, bio, imageUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  console.log('FlipCard rendering with props:', { name, role, bio, imageUrl });

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
        className="relative w-full h-full"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          style={{ 
            transformStyle: 'preserve-3d',
          }}
          animate={{ 
            rotateY: isFlipped ? 180 : 0 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut" 
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setIsFlipped(true);
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setIsFlipped(false);
            }
          }}
          onClick={handleFlip}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)'
            }}
          >
            <div className="h-64 overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  console.log('FlipCard image failed to load:', imageUrl);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                onLoad={() => {
                  console.log('FlipCard image loaded successfully:', imageUrl);
                }}
              />
              <div 
                className="hidden items-center justify-center w-full h-full text-gray-500 text-4xl bg-gray-100"
                style={{ display: 'none' }}
              >
                👤
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
              <p className="text-blue-600 font-medium text-lg">{role}</p>
              {isMobile && bio && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                  }}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-expanded={isFlipped}
                >
                  {isFlipped ? 'Hide Bio' : 'Read Bio'}
                </button>
              )}
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl border border-blue-500 p-6 flex flex-col justify-center text-center"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-blue-200 font-medium text-lg mb-4">{role}</p>
            {bio && (
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm leading-relaxed text-blue-100">{bio}</p>
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

export default FlipCard;
