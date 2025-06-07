import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

// Create a custom YouTube icon component
const YoutubeIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/church_logo.jpg" 
                alt="RCCG Place of Victory Logo" 
                className="h-16 w-auto"
              />
              <h3 className="text-2xl md:text-3xl font-bold">RCCG Place of Victory</h3>
            </div>
            <p className="mb-4 text-lg text-gray-300">
              Bringing hope, sharing faith, and serving our community with God's love.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                <YoutubeIcon size={24} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-lg text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-lg text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/sermons" className="text-lg text-gray-300 hover:text-white transition-colors">Sermons</Link>
              </li>
              <li>
                <Link to="/events" className="text-lg text-gray-300 hover:text-white transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/contact" className="text-lg text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-gray-300">47B Westbury Street<br />Swansea</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-lg text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-lg text-gray-300">info@rccgplaceofvictory.org</span>
              </li>
            </ul>
          </div>
          
          {/* Service Times */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Service Times</h3>
            <ul className="space-y-4">
              <li className="text-lg text-gray-300">
                <span className="block font-medium">Sunday Services</span>
                <span className="block">First Service: 9:30 AM – 11:00 AM</span>
                <span className="block">Second Service: 12:00 PM – 2:00 PM</span>
              </li>
              <li className="text-lg text-gray-300">
                <span className="block font-medium">Wednesday Bible Study</span>
                <span className="block">6:30 PM – 8:00 PM</span>
              </li>
              <li className="text-lg text-gray-300">
                <span className="block font-medium">Friday Prayer Meeting</span>
                <span className="block">6:30 PM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-base text-center text-gray-400">
            &copy; {currentYear} RCCG Place of Victory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 