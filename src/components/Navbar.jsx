import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.mobile-menu')) {
        setActiveDropdown(null);
      }
      if (!event.target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
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
    <header className={`fixed w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}>
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
                src="/church_logo.png" 
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
              <div key={index} className="relative group dropdown-container">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center text-gray-700 hover:text-primary-600 font-medium ${
                        activeDropdown === index ? 'text-primary-600' : ''
                      }`}
                    >
                      {item.title}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === index ? 'transform rotate-180' : ''
                      }`} />
                    </button>
                    <div 
                      className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-200 ${
                        activeDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600"
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
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none mobile-menu-container"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <div 
              className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              } mobile-menu-container`}
            >
              <div className="p-4 border-b">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="p-4 mobile-menu">
                {navItems.map((item, index) => (
                  <div key={index} className="mb-4">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 font-medium"
                        >
                          {item.title}
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            activeDropdown === index ? 'transform rotate-180' : ''
                          }`} />
                        </button>
                        <div 
                          className={`mt-2 space-y-2 pl-4 ${
                            activeDropdown === index ? 'block' : 'hidden'
                          }`}
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.path}
                              className="block py-2 text-gray-700 hover:text-primary-600"
                              onClick={() => setIsOpen(false)}
                            >
                              {dropdownItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link 
                        to={item.path} 
                        className={`block py-2 ${
                          item.highlight 
                            ? 'px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center' 
                            : 'text-gray-700 hover:text-primary-600'
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
        )}
      </div>
    </header>
  );
};

export default Navbar; 