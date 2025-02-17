import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  MapPin,
  Award,
  MessageSquare,
  LogIn,
  User,
  LogOut,BadgeDollarSign
} from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

import { onAuthStateChanged } from "firebase/auth";
const Header = ({ handleLoginClick, isLoggedIn, userEmail }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navLinks = [
    { name: "Discover", path: "/", icon: Home },
    { name: "Trips", path: "/trips", icon: MapPin },
    { name: "Rewards", path: "/rewards", icon: Award },
    { name: "Reviews", path: "/reviews", icon: MessageSquare },
    { name: "Pricing", path: "/pricing", icon: BadgeDollarSign },
  ];

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", { position: "top-center" });
      setShowDropdown(false);
    } catch (error) {
      toast.error("Error logging out", { position: "top-center" });
      console.error("Logout error:", error);
    }
  };

  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center h-20 px-4">
          {/* Logo Section */}
          {/* <div className="flex items-center">
            <span className="font-poppins font-bold text-2xl text-black-500">
              EcoTravels
            </span>
            <img
              src="/ecotravel_globe.png"
              alt="EcoTravels logo"
              className="w-10 h-10 ml-2"
            />
          </div> */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-duration-300"
          >
            <span className="font-poppins font-bold text-2xl text-black-500">
              EcoTravels
            </span>
            <img
              src="/ecotravel_globe.png"
              alt="EcoTravels logo"
              className="w-10 h-10 ml-2"
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-green-500 transition-colors duration-300 flex items-center"
              >
                <link.icon className="mr-2" size={20} />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors duration-300"
                >
                  <User size={20} />
                  <span className="text-sm">{userEmail}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-300"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center"
                onClick={handleLoginClick}
              >
                <LogIn className="mr-2" size={20} />
                Log In / Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div
            onClick={toggleSidebar}
            className="block md:hidden cursor-pointer z-50"
          >
            {isSidebarOpen ? (
              <X size={24} className="text-green-700" />
            ) : (
              <Menu size={24} className="text-black-700" />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Sidebar Header */}
                {/* <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center">
                    <span className="font-poppins font-bold text-xl text-green-700">
                      EcoTravels
                    </span>
                    <img
                      src="/ecotravel_globe.png"
                      alt="EcoTravels logo"
                      className="w-8 h-8 ml-2"
                    />
                  </div>
                  <X
                    size={24}
                    className="text-gray-600 cursor-pointer"
                    onClick={toggleSidebar}
                  />
                </div> */}
                {/* Sidebar Header */}
                <div className="flex justify-between items-center mb-8">
                  <Link
                    to="/"
                    className="flex items-center hover:opacity-80 transition-duration-300"
                    onClick={toggleSidebar}
                  >
                    <span className="font-poppins font-bold text-xl text-green-700">
                      EcoTravels
                    </span>
                    <img
                      src="/ecotravel_globe.png"
                      alt="EcoTravels logo"
                      className="w-8 h-8 ml-2"
                    />
                  </Link>
                  <X
                    size={24}
                    className="text-gray-600 cursor-pointer"
                    onClick={toggleSidebar}
                  />
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={toggleSidebar}
                      className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300 group"
                    >
                      <link.icon
                        className="mr-4 text-green-600 group-hover:text-green-700"
                        size={24}
                      />
                      <span className="text-gray-800 font-medium group-hover:text-green-700">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth Section */}
                <div className="mt-8">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="flex items-center p-3 rounded-lg bg-green-50">
                        <User size={24} className="text-green-600 mr-4" />
                        <span className="text-gray-800 font-medium">
                          {userEmail}
                        </span>
                      </div>
                      <button
                        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
                        onClick={() => {
                          handleLogout();
                          toggleSidebar();
                        }}
                      >
                        <LogOut className="mr-2" size={20} />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
                      onClick={() => {
                        toggleSidebar();
                        handleLoginClick();
                      }}
                    >
                      <LogIn className="mr-2" size={20} />
                      Log In / Sign Up
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
