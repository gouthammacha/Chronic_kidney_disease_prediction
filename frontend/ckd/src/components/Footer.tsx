// import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">HealthPredict</span>
            </div>
            <p className="mt-4 text-gray-400">
              Advanced AI-powered kidney disease prediction for early detection and better health outcomes.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">About</Link></li>
              <li><Link to="/predict" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Test Now</Link></li>
              <li><Link to="/chat" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Help Chat</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>sphoorthy@engg.ac.in</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>CKD Medical Center</span>
              </li>
            </ul>
          </div>
          
          {/* Social Media & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link>
                {' '} | {' '}
                <Link to="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} HealthPredict. All rights reserved.
          </p>
          {/* <p className="mt-2 text-sm">
          </p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;