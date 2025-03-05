import React from 'react';
import { Instagram, Twitter, Dribbble } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" 
      style={{
        background: 'linear-gradient(to right, #7FD1B9, #A8E6CF, #95AACF)'
      }}
    >
      <div className="container mx-auto px-4 pt-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">EcoTravels</h3>
            <p className="text-sm text-gray-700 pr-8">
              Your sustainable travel companion for exploring, planning, and discovering unique destinations 
              across the country. We make travel simple, exciting, and memorable.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase text-gray-800">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Trips</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Rewards</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">Pricing</a>
            </div>
          </div>

          {/* Social Media Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase text-gray-800">Share</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition">
                <Dribbble size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 text-center text-sm text-gray-600">
          © {currentYear} EcoTravels. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;