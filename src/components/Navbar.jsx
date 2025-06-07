import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { title: 'Home', path: '/' },
    { 
      title: 'About', 
      path: '/about',
      dropdown: [
        { title: 'Our History', path: '/about/history' },
        { title: 'Leadership', path: '/about/leadership' },
        { title: 'Core Beliefs', path: '/about/beliefs' },
        { title: 'Service Times', path: '/about/services' }
      ]
    },
    { title: 'Sermons', path: '/sermons' },
    { title: 'Events', path: '/events' },
    { title: 'Community Services', path: '/community-services' },
    { title: 'Prayer', path: '/prayer' },
    { title: 'Testimonies', path: '/testimonies' },
    { title: 'Contact', path: '/contact' },
    { 
      title: 'Donate', 
      path: '/donate',
      highlight: true
    },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/rccg_logo.png" 
                alt="RCCG Logo" 
                className="h-12 md:h-14 w-auto"
              />
              <div className="h-12 md:h-14 w-px bg-gray-300"></div>
              <img 
                src="/church_logo.jpg" 
                alt="Place of Victory Logo" 
                className="h-12 md:h-14 w-auto"
              />
            </div>
            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 hidden md:block">
              RCCG Place of Victory
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center text-gray-700 hover:text-primary-600 font-medium ${
                        activeDropdown === index ? 'text-primary-600' : ''
                      }`}
                      aria-expanded={activeDropdown === index}
                      aria-haspopup="true"
                    >
                      {item.title}
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === index ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <div 
                      className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 
                        transition-all duration-200 transform origin-top ${
                          activeDropdown === index 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`font-medium ${
                      item.highlight 
                        ? 'px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors' 
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Mobile menu button - Moved outside of any container that might interfere with clicks */}
          <div className="md:hidden relative z-50">
            <button
              onClick={() => {
                console.log('Menu button clicked'); // Debug log
                setIsOpen(!isOpen);
              }}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              type="button"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation - Adjusted z-index and positioning */}
        <div 
          ref={mobileMenuRef}
          className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ display: isOpen ? 'block' : 'none' }} // Force display property
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
            style={{ display: isOpen ? 'block' : 'none' }} // Force display property
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold text-primary-600">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {navItems.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                        aria-expanded={activeDropdown === index}
                        aria-haspopup="true"
                      >
                        {item.title}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === index ? 'transform rotate-180' : ''
                          }`} 
                        />
                      </button>
                      <div 
                        className={`mt-1 ml-4 space-y-1 transition-all duration-200 transform origin-top ${
                          activeDropdown === index 
                            ? 'opacity-100 max-h-96' 
                            : 'opacity-0 max-h-0 overflow-hidden'
                        }`}
                      >
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.path}
                            className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => {
                              setIsOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        item.highlight 
                          ? 'bg-primary-600 text-white hover:bg-primary-700' 
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 