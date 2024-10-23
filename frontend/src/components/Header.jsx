import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
//import LoginModal from "./LoginModal"; // Import the modal component
const Header = () => {
  const [nav, setNav] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div
          className={`container mx-auto flex justify-between items-center h-20 px-4 text-black ${
            showLoginModal ? "filter blur-md" : ""
          }`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <span className="font-poppins font-bold text-2xl text-black-500">
              EcoTravels
            </span>
            <img
              src="/ecotravel_globe.png"
              alt="Logo"
              className="w-10 h-10 ml-2"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-500">
              Discover
            </Link>
            <Link to="/trips" className="text-gray-700 hover:text-green-500">
              Trips
            </Link>
            <Link to="/rewards" className="text-gray-700 hover:text-green-500">
              Rewards
            </Link>
            <Link to="/reviews" className="text-gray-700 hover:text-green-500">
              Reviews
            </Link>
          </nav>

          {/* Log In / Sign Up button */}
          <div className="hidden md:block">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Log In / Sign Up
            </button>
          </div>

          {/* Mobile Navigation Icon */}
          <div onClick={handleNav} className="block md:hidden">
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>

          {/* Mobile Navigation Menu */}
          <ul
            className={
              nav
                ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
                : "ease-in-out duration-500 fixed left-[-100%] top-0 h-full"
            }
          >
            <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
              EcoTravels
            </h1>

            <li className="p-4 border-b border-gray-600">
              <Link
                to="/"
                className="text-gray-200 hover:text-green-500"
                onClick={handleNav}
              >
                Discover
              </Link>
            </li>
            <li className="p-4 border-b border-gray-600">
              <Link
                to="/trips"
                className="text-gray-200 hover:text-green-500"
                onClick={handleNav}
              >
                Trips
              </Link>
            </li>
            <li className="p-4 border-b border-gray-600">
              <Link
                to="/rewards"
                className="text-gray-200 hover:text-green-500"
                onClick={handleNav}
              >
                Rewards
              </Link>
            </li>
            <li className="p-4 border-b border-gray-600">
              <Link
                to="/reviews"
                className="text-gray-200 hover:text-green-500"
                onClick={handleNav}
              >
                Reviews
              </Link>
            </li>
            <li className="p-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-full"
                onClick={handleLoginClick}
              >
                Log In / Sign Up
              </button>
            </li>
          </ul>
        </div>
      </header>
      {/* <LoginModal showModal={showLoginModal} closeModal={closeModal} /> */}
    </>
  );
};
export default Header;
