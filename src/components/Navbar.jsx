import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef({});
  const location = useLocation();

  // Updated navigation structure with correct routes
  const navItems = [
    { title: 'Home', path: '/' },
    { 
      title: 'About', 
      path: '/about',
      dropdown: [
        { title: 'Our History', path: '/about/history' },
        { title: 'Leadership', path: '/about/leadership' },
        { title: 'Our Beliefs', path: '/about/beliefs' },
        { title: 'Service Times', path: '/about/services' },
      ]
    },
    { 
      title: 'Worship & Events', 
      path: '/events',
      dropdown: [
        { title: 'Upcoming Events', path: '/events' },
        { title: 'Community Services', path: '/community-services' },
        { title: 'Prayer Requests', path: '/prayer' },
      ]
    },
    { title: 'Sermons', path: '/sermons' },
    { title: 'Testimonies', path: '/testimonies' },
    { title: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      // Check if click is outside mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      
      // Check if click is outside any dropdown
      const isOutsideDropdown = Object.values(dropdownRefs.current).every(
        ref => !ref?.current?.contains(event.target)
      );
      
      if (isOutsideDropdown) {
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
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleDropdownEnter = (index) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveDropdown(index);
  };

  const handleDropdownLeave = (index) => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 100); // Small delay to prevent flickering
    setHoverTimeout(timeout);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" aria-label="Home">
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
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className="relative"
                  ref={el => dropdownRefs.current[index] = { current: el }}
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={() => handleDropdownLeave(index)}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center px-3 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg transition-colors
                          ${isActive(item.path) ? 'text-primary-600' : ''}
                          ${activeDropdown === index ? 'text-primary-600 bg-gray-50' : ''}`}
                        aria-expanded={activeDropdown === index}
                        aria-haspopup="true"
                        aria-controls={`dropdown-menu-${index}`}
                        type="button"
                      >
                        {item.title}
                        <ChevronDown 
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === index ? 'transform rotate-180' : ''
                          }`} 
                          aria-hidden="true"
                        />
                      </button>
                      <ul 
                        id={`dropdown-menu-${index}`}
                        className={`absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 
                          transition-all duration-200 transform origin-top
                          ${activeDropdown === index 
                            ? 'opacity-100 scale-100 translate-y-0' 
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                        style={{
                          transformOrigin: 'top center',
                          willChange: 'transform, opacity',
                        }}
                        role="menu"
                        aria-label={`${item.title} submenu`}
                      >
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <li key={dropdownIndex} role="none">
                            <Link
                              to={dropdownItem.path}
                              className={`block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors
                                ${isActive(dropdownItem.path) ? 'text-primary-600 bg-gray-50' : ''}`}
                              onClick={() => setActiveDropdown(null)}
                              role="menuitem"
                            >
                              {dropdownItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`px-3 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg transition-colors
                        ${isActive(item.path) ? 'text-primary-600' : ''}`}
                      aria-current={isActive(item.path) ? 'page' : undefined}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              {/* Donate Button */}
              <li>
                <Link
                  to="/donate"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors transform hover:scale-105 active:scale-95"
                  aria-current={isActive('/donate') ? 'page' : undefined}
                >
                  Donate
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
            type="button"
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-all duration-300 md:hidden
            ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div 
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold text-primary-600">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
                aria-label="Close menu"
                type="button"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <nav className="p-4 overflow-y-auto max-h-[calc(100vh-4rem)]" role="navigation" aria-label="Mobile navigation">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg font-medium transition-colors
                            ${isActive(item.path) ? 'text-primary-600 bg-gray-50' : ''}
                            ${activeDropdown === index ? 'text-primary-600 bg-gray-50' : ''}`}
                          aria-expanded={activeDropdown === index}
                          aria-haspopup="true"
                          aria-controls={`mobile-dropdown-${index}`}
                          type="button"
                        >
                          {item.title}
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === index ? 'transform rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <ul 
                          id={`mobile-dropdown-${index}`}
                          className={`mt-1 ml-4 space-y-1 transition-all duration-200 transform origin-top
                            ${activeDropdown === index 
                              ? 'opacity-100 max-h-96 translate-y-0' 
                              : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden'}`}
                          style={{
                            transformOrigin: 'top center',
                            willChange: 'transform, opacity, max-height',
                          }}
                          role="menu"
                          aria-label={`${item.title} submenu`}
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <li key={dropdownIndex} role="none">
                              <Link
                                to={dropdownItem.path}
                                className={`block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors
                                  ${isActive(dropdownItem.path) ? 'text-primary-600 bg-gray-50' : ''}`}
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveDropdown(null);
                                }}
                                role="menuitem"
                              >
                                {dropdownItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link 
                        to={item.path} 
                        className={`block px-4 py-3 rounded-lg transition-colors
                          ${isActive(item.path) 
                            ? 'text-primary-600 bg-gray-50' 
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive(item.path) ? 'page' : undefined}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
                {/* Mobile Donate Button */}
                <li>
                  <Link
                    to="/donate"
                    className="block w-full px-4 py-3 mt-4 text-center bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive('/donate') ? 'page' : undefined}
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 