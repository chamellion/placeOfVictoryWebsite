import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../lib/firebaseClient';

/**
 * ConfessionOfTheMonth Component
 * 
 * Fetches and displays the current confession of the month from Firestore.
 * Supports both image and color background modes with responsive design.
 * Respects Firestore font settings for typography customization.
 * 
 * @returns {JSX.Element|null} The confession section or null if no data
 */
const ConfessionOfTheMonth = () => {
  const [confession, setConfession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to the active confession document
    const unsubscribe = onSnapshot(
      doc(firestore, 'confession_of_the_month', 'active'),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setConfession({
            id: docSnapshot.id,
            ...data,
            // Set defaults for optional fields
            backgroundColor: data.backgroundColor || '#f9fafb',
            textColor: data.textColor || '#ffffff',
            fontFamily: data.fontFamily || 'Inter, sans-serif',
            fontWeight: data.fontWeight || 'normal',
            fontStyle: data.fontStyle || 'normal',
            createdAt: data.createdAt?.toDate?.() || new Date()
          });
        } else {
          // No active confession found
          setConfession(null);
        }
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching confession of the month:', error);
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show nothing if loading or no confession found
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center">
            {/* Skeleton loader */}
            <div className="animate-pulse">
              <div className="h-12 bg-blue-200 rounded-lg mb-6 max-w-2xl mx-auto"></div>
              <div className="h-32 bg-blue-200 rounded-lg max-w-4xl mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render anything if no confession data
  if (!confession) {
    return null;
  }

  const { 
    title, 
    text, 
    backgroundMode, 
    backgroundImageUrl, 
    backgroundColor, 
    textColor,
    fontFamily,
    fontWeight,
    fontStyle
  } = confession;

  // Build dynamic styles object for typography
  const titleStyles = {
    color: textColor,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontStyle: fontStyle
  };

  const bodyStyles = {
    color: textColor,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontStyle: fontStyle
  };

  // Determine padding based on background mode
  const sectionPadding = backgroundMode === 'image' 
    ? 'px-6 py-16 md:px-12 md:py-24' 
    : 'py-16 md:py-24 px-6';

  return (
    <section className={`${sectionPadding} relative overflow-hidden`}>
      {/* Background - Image or Color */}
      {backgroundMode === 'image' && backgroundImageUrl ? (
        <div className="absolute inset-0">
          {/* Parallax-style background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div 
          className="absolute inset-0"
          style={{ backgroundColor }}
        />
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Title */}
          <h2 
            className="text-3xl md:text-5xl font-bold mb-8 animate-fade-in"
            style={titleStyles}
          >
            {title}
          </h2>
          
          {/* Confession Text */}
          <div 
            className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto animate-fade-in-up"
            style={{ 
              ...bodyStyles,
              animationDelay: '0.2s',
              animationFillMode: 'both'
            }}
          >
            {/* Split text into paragraphs for better formatting */}
            {text.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-2 border-current opacity-10 rounded-full animate-pulse"
           style={{ color: textColor }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-current opacity-10 rounded-full animate-pulse"
           style={{ color: textColor }} />
    </section>
  );
};

export default ConfessionOfTheMonth;
