import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const intervalRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const carouselRef = useRef(null);
  const imageLoadPromises = useRef([]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Load images from the carousel directory
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

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

        // Create an array of image load promises
        imageLoadPromises.current = expectedImages.map(imageName => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            const imagePath = `/media/carousel/${imageName}`;
            
            img.onload = () => resolve({ path: imagePath, name: imageName });
            img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
            img.src = imagePath;
          });
        });

        // Wait for all images to load
        const loadedImages = await Promise.allSettled(imageLoadPromises.current);
        
        // Filter out failed loads and map to paths
        const validImages = loadedImages
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value.path);

        if (validImages.length === 0) {
          throw new Error('No carousel images could be loaded');
        }

        setImages(validImages);
      } catch (err) {
        console.error('Error loading carousel images:', err);
        setError(err.message || 'Failed to load carousel images');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Auto-advance carousel with pause on hover
  useEffect(() => {
    if (images.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 8000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isPaused]);

  const transitionToSlide = (newIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
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
      }, 8000);
    }
  };

  // Touch event handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Mouse event handlers for pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

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
              Please ensure the following images are in the /public/media/carousel/ directory:
            </p>
            <ul className="mt-2 text-sm text-yellow-600 list-disc list-inside">
              <li>church-worship.jpg</li>
              <li>church-community.jpg</li>
              <li>church-building.jpg</li>
              <li>church-service.jpg</li>
              <li>church-fellowship.jpg</li>
              <li>church-photo-one.jpg</li>
              <li>church-photo-two.jpg</li>
              <li>church-photo-three.jpg</li>
              <li>church-photo-four.jpg</li>
              <li>church-photo-five.jpg</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Church worship" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/media/carousel/church-worship.jpg';
            }}
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
    <div 
      ref={carouselRef}
      className="relative h-screen overflow-hidden select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Carousel Images */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transform transition-all duration-500 ease-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 z-10' 
                : index < currentIndex 
                  ? 'opacity-0 -translate-x-full z-0' 
                  : 'opacity-0 translate-x-full z-0'
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/media/carousel/church-worship.jpg';
              }}
            />
            <div 
              className="absolute inset-0 bg-black transition-opacity duration-500 ease-out"
              style={{ opacity: 0.6 }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="relative h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                  goToPrevious();
                }
              }}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 
                bg-white/30 hover:bg-white/50 text-white rounded-full p-3
                focus:outline-none focus:ring-2 focus:ring-white 
                transition-all duration-300 ease-in-out pointer-events-auto
                ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-110 active:scale-95'}
                md:p-4 md:left-8`}
              aria-label="Previous slide"
              disabled={isTransitioning}
              type="button"
              style={{ zIndex: 40 }}
            >
              <ChevronLeft size={32} className="md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                  goToNext();
                }
              }}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 
                bg-white/30 hover:bg-white/50 text-white rounded-full p-3
                focus:outline-none focus:ring-2 focus:ring-white 
                transition-all duration-300 ease-in-out pointer-events-auto
                ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-110 active:scale-95'}
                md:p-4 md:right-8`}
              aria-label="Next slide"
              disabled={isTransitioning}
              type="button"
              style={{ zIndex: 40 }}
            >
              <ChevronRight size={32} className="md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 pointer-events-none">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning) {
                  goToSlide(index);
                }
              }}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white 
                transition-all duration-300 ease-in-out pointer-events-auto
                ${index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }
                ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
                md:w-4 md:h-4 active:scale-95`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
              type="button"
              style={{ zIndex: 40 }}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transform transition-all duration-500 ease-out">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transform transition-all duration-500 ease-out">
            Welcome to RCCG Place of Victory
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8 transform transition-all duration-500 ease-out">
            Join us in worship, community, and service as we grow together in faith.
          </p>
          <div className="flex flex-wrap justify-center gap-4 transform transition-all duration-500 ease-out pointer-events-auto">
            <a 
              href="/about" 
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
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
              className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              type="button"
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