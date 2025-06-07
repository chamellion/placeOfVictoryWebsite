import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  // Load images from the carousel directory
  useEffect(() => {
    const loadImages = async () => {
      try {
        // List of expected images in the carousel directory
        const expectedImages = [
          'church-worship.jpg',
          'church-community.jpg',
          'church-building.jpg',
          'church-service.jpg',
          'church-fellowship.jpg',
          'church-photo-one.jpg',
          'church-photo-two.jpg',
          'church-photo-three.jpg',
          'church-photo-four.jpg',
          'church-photo-five.jpg',
        ];

        // Try to load each image and only keep the ones that load successfully
        const validImages = [];
        for (const imageName of expectedImages) {
          const img = new Image();
          const imagePath = `/media/carousel/${imageName}`;
          
          try {
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = imagePath;
            });
            validImages.push(imagePath);
          } catch (err) {
            console.warn(`Failed to load image: ${imagePath}`);
          }
        }

        if (validImages.length === 0) {
          setError('No carousel images found. Please add images to the /public/media/carousel/ directory.');
        } else {
          setImages(validImages);
        }
      } catch (err) {
        setError('Failed to load carousel images. Please check the console for details.');
        console.error('Error loading carousel images:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);
  // Auto-advance carousel
  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 8000); // Increased from 5000ms to 8000ms for slower transitions
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  const transitionToSlide = (newIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    // Clear any existing transition timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    // Reset transition state after animation completes
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with the CSS transition duration
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    transitionToSlide(newIndex);
    resetAutoAdvance();
  };

  const goToNext = () => {
    if (isTransitioning) return;
    const newIndex = (currentIndex + 1) % images.length;
    transitionToSlide(newIndex);
    resetAutoAdvance();
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    transitionToSlide(index);
    resetAutoAdvance();
  };

  const resetAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading carousel images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Carousel Images Not Found</h2>
            <p className="text-yellow-700 mb-4">{error}</p>
            <p className="text-sm text-yellow-600">
              Please add the following images to the /public/media/carousel/ directory:
            </p>
            <ul className="mt-2 text-sm text-yellow-600 list-disc list-inside">
              <li>church-worship.jpg</li>
              <li>church-community.jpg</li>
              <li>church-building.jpg</li>
              <li>church-service.jpg</li>
              <li>church-fellowship.jpg</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    // Fallback if no images are available
    return (
      <div className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Church worship" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">Welcome to RCCG Place of Victory</h1>
          <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8">
            Join us in worship, community, and service as we grow together in faith.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Carousel Images */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transform transition-all duration-1000 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            }}
          >
            <img
              src={image}
              alt={`Church carousel image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            />
            <div 
              className="absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out"
              style={{ opacity: 0.6 }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 
              bg-white/30 hover:bg-white/50 text-white rounded-full p-2 
              focus:outline-none focus:ring-2 focus:ring-white 
              transition-all duration-300 ease-in-out
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goToNext}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 
              bg-white/30 hover:bg-white/50 text-white rounded-full p-2 
              focus:outline-none focus:ring-2 focus:ring-white 
              transition-all duration-300 ease-in-out
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white 
                transition-all duration-300 ease-in-out
                ${index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }
                ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transform transition-all duration-1000 ease-in-out">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transform transition-all duration-1000 ease-in-out">
            Welcome to RCCG Place of Victory
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8 transform transition-all duration-1000 ease-in-out">
            Join us in worship, community, and service as we grow together in faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4 transform transition-all duration-1000 ease-in-out">
            <a 
              href="/about" 
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Learn More
            </a>
            <button 
              onClick={() => {
                const serviceTimesElement = document.getElementById('service-times');
                if (serviceTimesElement) {
                  serviceTimesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.location.href = '/about/services';
                }
              }}
              className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              View Service Times
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel; 