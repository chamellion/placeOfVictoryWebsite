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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/rccg_logo.png" 
              alt="RCCG Place of Victory Logo" 
              className="h-16 md:h-18 w-auto"
            />
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600">RCCG Place of Victory</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <>
                    <button 
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors py-2 text-lg"
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === index && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-40">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <Link
                            key={dropIndex}
                            to={dropItem.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-lg"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-primary-600 transition-colors text-lg"
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
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <div key={index} className="py-2">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="w-full flex items-center justify-between text-left px-2 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md text-lg"
                    >
                      {item.title}
                      <ChevronDown className="h-5 w-5" />
                    </button>
                    {activeDropdown === index && (
                      <div className="pl-4 mt-1 border-l-2 border-primary-100">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <Link
                            key={dropIndex}
                            to={dropItem.path}
                            className="block px-2 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md text-lg"
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsOpen(false);
                            }}
                          >
                            {dropItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-2 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar; 