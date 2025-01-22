// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// //import LoginModal from "./LoginModal"; // Import the modal component
// const Header = () => {
//   const [nav, setNav] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleLoginClick = () => {
//     setShowLoginModal(true);
//   };

//   const closeModal = () => {
//     setShowLoginModal(false);
//   };

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <>
//       <header className="bg-white shadow-md">
//         <div
//           className={`container mx-auto flex justify-between items-center h-20 px-4 text-black ${
//             showLoginModal ? "filter blur-md" : ""
//           }`}
//         >
//           {/* Logo */}
//           <div className="flex items-center">
//             <span className="font-poppins font-bold text-2xl text-black-500">
//               EcoTravels
//             </span>
//             <img
//               src="/ecotravel_globe.png"
//               alt="Logo"
//               className="w-10 h-10 ml-2"
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-green-500">
//               Discover
//             </Link>
//             <Link to="/trips" className="text-gray-700 hover:text-green-500">
//               Trips
//             </Link>
//             <Link to="/rewards" className="text-gray-700 hover:text-green-500">
//               Rewards
//             </Link>
//             <Link to="/reviews" className="text-gray-700 hover:text-green-500">
//               Reviews
//             </Link>
//           </nav>

//           {/* Log In / Sign Up button */}
//           <div className="hidden md:block">
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded-full"
//             >
//               Log In / Sign Up
//             </button>
//           </div>

//           {/* Mobile Navigation Icon */}
//           <div onClick={handleNav} className="block md:hidden">
//             {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </div>

//           {/* Mobile Navigation Menu */}
//           <ul
//             className={
//               nav
//                 ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
//                 : "ease-in-out duration-500 fixed left-[-100%] top-0 h-full"
//             }
//           >
//             <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
//               EcoTravels
//             </h1>

//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Discover
//               </Link>
//             </li>
//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/trips"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Trips
//               </Link>
//             </li>
//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/rewards"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Rewards
//               </Link>
//             </li>
//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/reviews"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Reviews
//               </Link>
//             </li>
//             <li className="p-4">
//               <button
//                 className="bg-green-500 text-white py-2 px-4 rounded-full"
//                 onClick={handleLoginClick}
//               >
//                 Log In / Sign Up
//               </button>
//             </li>
//           </ul>
//         </div>
//       </header>
//       {/* <LoginModal showModal={showLoginModal} closeModal={closeModal} /> */}
//     </>
//   );
// };
// export default Header;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import LoginModal from "./LoginModal"; // Import the modal component
// import Home from "./Home"; // Import the Home component

// const Header = () => {
//   const [nav, setNav] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleLoginClick = () => {
//     setShowLoginModal(true);
//   };

//   const closeModal = () => {
//     setShowLoginModal(false);
//   };

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <>
//       <header className="bg-white shadow-md">
//         <div
//           className={`container mx-auto flex justify-between items-center h-20 px-4 text-black ${
//             showLoginModal ? "filter blur-md" : ""
//           }`}
//         >
//           {/* Logo */}
//           <div className="flex items-center">
//             <span className="font-poppins font-bold text-2xl text-black-500">
//               EcoTravels
//             </span>
//             <img
//               src="/ecotravel_globe.png"
//               alt="Logo"
//               className="w-10 h-10 ml-2"
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-green-500">
//               Discover
//             </Link>
//             <Link to="/trips" className="text-gray-700 hover:text-green-500">
//               Trips
//             </Link>
//             <Link to="/rewards" className="text-gray-700 hover:text-green-500">
//               Rewards
//             </Link>
//             <Link to="/reviews" className="text-gray-700 hover:text-green-500">
//               Reviews
//             </Link>
//           </nav>

//           {/* Log In / Sign Up button */}
//           <div className="hidden md:block">
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded-full"
//               onClick={handleLoginClick}
//             >
//               Log In / Sign Up
//             </button>
//           </div>

//           {/* Mobile Navigation Icon */}
//           <div onClick={handleNav} className="block md:hidden">
//             {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </div>

//           {/* Mobile Navigation Menu */}
//           <ul
//             className={
//               nav
//                 ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
//                 : "ease-in-out duration-500 fixed left-[-100%] top-0 h-full"
//             }
//           >
//             <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
//               EcoTravels
//             </h1>

//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Discover
//               </Link>
//             </li>
//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/trips"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Trips
//               </Link>
//             </li>
//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/rewards"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Rewards
//               </Link>
//             </li>
//             <li className="p-4 border-b border-gray-600">
//               <Link
//                 to="/reviews"
//                 className="text-gray-200 hover:text-green-500"
//                 onClick={handleNav}
//               >
//                 Reviews
//               </Link>
//             </li>
//             <li className="p-4">
//               <button
//                 className="bg-green-500 text-white py-2 px-4 rounded-full"
//                 onClick={handleLoginClick}
//               >
//                 Log In / Sign Up
//               </button>
//             </li>
//           </ul>
//         </div>
//       </header>

//       <LoginModal showModal={showLoginModal} closeModal={closeModal} />
//     </>
//   );
// };

// export default Header;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
// import LoginModal from './LoginModal'; // Import the modal component

// const Header = ({ showLoginModal, handleLoginClick, closeModal }) => {
//   const [nav, setNav] = React.useState(false);

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <>
//       <header className={`bg-white shadow-md ${showLoginModal ? "blur-sm" : ""}`}>
//         <div className="container mx-auto flex justify-between items-center h-20 px-4 text-black">
//           <div className="flex items-center">
//             <span className="font-poppins font-bold text-2xl text-black-500">
//               EcoTravels
//             </span>
//             <img src="/ecotravel_globe.png" alt="Logo" className="w-10 h-10 ml-2" />
//           </div>

//           <nav className="hidden md:flex space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-green-500">Discover</Link>
//             <Link to="/trips" className="text-gray-700 hover:text-green-500">Trips</Link>
//             <Link to="/rewards" className="text-gray-700 hover:text-green-500">Rewards</Link>
//             <Link to="/reviews" className="text-gray-700 hover:text-green-500">Reviews</Link>
//           </nav>

//           <div className="hidden md:block">
//             <button className="bg-green-500 text-white py-2 px-4 rounded-full" onClick={handleLoginClick}>
//               Log In / Sign Up
//             </button>
//           </div>

//           <div onClick={handleNav} className="block md:hidden">
//             {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </div>

//           <ul className={nav ? "fixed left-0 top-0 w-[60%] h-full border-r bg-black" : "fixed left-[-100%]"}>
//             <li className="p-4 border-b border-gray-600"><Link to="/" onClick={handleNav}>Discover</Link></li>
//             <li className="p-4 border-b border-gray-600"><Link to="/trips" onClick={handleNav}>Trips</Link></li>
//             <li className="p-4 border-b border-gray-600"><Link to="/rewards" onClick={handleNav}>Rewards</Link></li>
//             <li className="p-4 border-b border-gray-600"><Link to="/reviews" onClick={handleNav}>Reviews</Link></li>
//             <li className="p-4">
//               <button className="bg-green-500 text-white py-2 px-4 rounded-full" onClick={handleLoginClick}>
//                 Log In / Sign Up
//               </button>
//             </li>
//           </ul>
//         </div>
//       </header>

//       <LoginModal showModal={showLoginModal} closeModal={closeModal} />
//     </>
//   );
// };

// export default Header;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
// import LoginModal from './LoginModal'; // Import the modal component

// const Header = ({ showLoginModal, handleLoginClick, closeModal }) => {
//   const [nav, setNav] = React.useState(false);

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <>
//       <header className={`bg-white shadow-md ${showLoginModal ? "blur-sm" : ""}`}>
//         <div className="container mx-auto flex justify-between items-center h-20 px-4 text-black">
//           <div className="flex items-center">
//             <span className="font-poppins font-bold text-2xl text-black-500">
//               EcoTravels
//             </span>
//             <img 
//               src="/ecotravel_globe.png" 
//               alt="EcoTravels logo" 
//               className="w-10 h-10 ml-2" 
//             />
//           </div>

//           <nav className="hidden md:flex space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-green-500">Discover</Link>
//             <Link to="/trips" className="text-gray-700 hover:text-green-500">Trips</Link>
//             <Link to="/rewards" className="text-gray-700 hover:text-green-500">Rewards</Link>
//             <Link to="/reviews" className="text-gray-700 hover:text-green-500">Reviews</Link>
//           </nav>

//           <div className="hidden md:block">
//             <button 
//               className="bg-green-500 text-white py-2 px-4 rounded-full" 
//               onClick={handleLoginClick}
//               aria-label="Open Login Modal"
//             >
//               Log In / Sign Up
//             </button>
//           </div>

//           <div onClick={handleNav} className="block md:hidden cursor-pointer">
//             {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </div>

//           {/* Mobile Menu */}
//           <ul className={`fixed left-0 top-0 w-[60%] h-full bg-black text-white transition-transform duration-300 ease-in-out ${nav ? 'transform-none' : 'transform -translate-x-full'}`}>
//             <li className="p-4 border-b border-gray-600"><Link to="/" onClick={handleNav}>Discover</Link></li>
//             <li className="p-4 border-b border-gray-600"><Link to="/trips" onClick={handleNav}>Trips</Link></li>
//             <li className="p-4 border-b border-gray-600"><Link to="/rewards" onClick={handleNav}>Rewards</Link></li>
//             <li className="p-4 border-b border-gray-600"><Link to="/reviews" onClick={handleNav}>Reviews</Link></li>
//             <li className="p-4">
//               <button 
//                 className="bg-green-500 text-white py-2 px-4 rounded-full" 
//                 onClick={handleLoginClick}
//                 aria-label="Open Login Modal"
//               >
//                 Log In / Sign Up
//               </button>
//             </li>
//           </ul>
//         </div>
//       </header>

//       {/* Login Modal */}
//       <LoginModal showModal={showLoginModal} closeModal={closeModal} />
//     </>
//   );
// };

// export default Header;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Menu, 
//   X, 
//   Home, 
//   MapPin, 
//   Award, 
//   MessageSquare, 
//   LogIn 
// } from 'lucide-react';
// import LoginModal from './LoginModal';

// const Header = ({ showLoginModal, handleLoginClick, closeModal }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const navLinks = [
//     { 
//       name: 'Discover', 
//       path: '/', 
//       icon: Home 
//     },
//     { 
//       name: 'Trips', 
//       path: '/trips', 
//       icon: MapPin 
//     },
//     { 
//       name: 'Rewards', 
//       path: '/rewards', 
//       icon: Award 
//     },
//     { 
//       name: 'Reviews', 
//       path: '/reviews', 
//       icon: MessageSquare 
//     }
//   ];

//   const sidebarVariants = {
//     closed: {
//       x: '100%',
//       transition: {
//         type: 'tween',
//         duration: 0.3
//       }
//     },
//     open: {
//       x: 0,
//       transition: {
//         type: 'tween',
//         duration: 0.3
//       }
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <header className={`bg-white shadow-md ${showLoginModal ? "blur-sm" : ""}`}>
//         <div className="container mx-auto flex justify-between items-center h-20 px-4">
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <span className="font-poppins font-bold text-2xl text-black-500">
//               EcoTravels
//             </span>
//             <img
//               src="/ecotravel_globe.png"
//               alt="EcoTravels logo"
//               className="w-10 h-10 ml-2"
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-6">
//             {navLinks.map((link) => (
//               <Link 
//                 key={link.path} 
//                 to={link.path} 
//                 className="text-gray-700 hover:text-green-500 transition-colors duration-300 flex items-center"
//               >
//                 <link.icon className="mr-2" size={20} />
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Login Button */}
//           <div className="hidden md:block">
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center"
//               onClick={handleLoginClick}
//             >
//               <LogIn className="mr-2" size={20} />
//               Log In / Sign Up
//             </button>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div 
//             onClick={toggleSidebar} 
//             className="block md:hidden cursor-pointer z-50"
//           >
//             {isSidebarOpen ? (
//               <X size={24} className="text-green-700" />
//             ) : (
//               <Menu size={24} className="text-black-700" />
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Sidebar Navigation */}
//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={toggleSidebar}
//             />

//             {/* Sidebar */}
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={sidebarVariants}
//               className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 overflow-y-auto"
//             >
//               <div className="p-6">
//                 {/* Sidebar Header */}
//                 <div className="flex justify-between items-center mb-8">
//                   <div className="flex items-center">
//                     <span className="font-poppins font-bold text-xl text-green-700">
//                       EcoTravels
//                     </span>
//                     <img
//                       src="/ecotravel_globe.png"
//                       alt="EcoTravels logo"
//                       className="w-8 h-8 ml-2"
//                     />
//                   </div>
//                   <X 
//                     size={24} 
//                     className="text-gray-600 cursor-pointer" 
//                     onClick={toggleSidebar} 
//                   />
//                 </div>

//                 {/* Navigation Links */}
//                 <nav className="space-y-4">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.path}
//                       to={link.path}
//                       onClick={toggleSidebar}
//                       className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300 group"
//                     >
//                       <link.icon 
//                         className="mr-4 text-green-600 group-hover:text-green-700" 
//                         size={24} 
//                       />
//                       <span className="text-gray-800 font-medium group-hover:text-green-700">
//                         {link.name}
//                       </span>
//                     </Link>
//                   ))}
//                 </nav>

//                 {/* Login Button */}
//                 <div className="mt-8">
//                   <button
//                     className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
//                     onClick={() => {
//                       toggleSidebar();
//                       handleLoginClick();
//                     }}
//                   >
//                     <LogIn className="mr-2" size={20} />
//                     Log In / Sign Up
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Login Modal */}
//       <LoginModal showModal={showLoginModal} closeModal={closeModal} />
//     </>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, Home, MapPin, Award, MessageSquare, LogIn } from "lucide-react";

// const Header = ({ handleLoginClick }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const navLinks = [
//     { name: "Discover", path: "/", icon: Home },
//     { name: "Trips", path: "/trips", icon: MapPin },
//     { name: "Rewards", path: "/rewards", icon: Award },
//     { name: "Reviews", path: "/reviews", icon: MessageSquare },
//   ];

//   const sidebarVariants = {
//     closed: {
//       x: "100%",
//       transition: {
//         type: "tween",
//         duration: 0.3,
//       },
//     },
//     open: {
//       x: 0,
//       transition: {
//         type: "tween",
//         duration: 0.3,
//       },
//     },
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto flex justify-between items-center h-20 px-4">
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <span className="font-poppins font-bold text-2xl text-black-500">
//               EcoTravels
//             </span>
//             <img
//               src="/ecotravel_globe.png"
//               alt="EcoTravels logo"
//               className="w-10 h-10 ml-2"
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="text-gray-700 hover:text-green-500 transition-colors duration-300 flex items-center"
//               >
//                 <link.icon className="mr-2" size={20} />
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Login Button */}
//           <div className="hidden md:block">
//             <button
//               className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center"
//               onClick={handleLoginClick}
//             >
//               <LogIn className="mr-2" size={20} />
//               Log In / Sign Up
//             </button>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div
//             onClick={toggleSidebar}
//             className="block md:hidden cursor-pointer z-50"
//           >
//             {isSidebarOpen ? (
//               <X size={24} className="text-green-700" />
//             ) : (
//               <Menu size={24} className="text-black-700" />
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Mobile Sidebar Navigation */}
//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black z-40"
//               onClick={toggleSidebar}
//             />

//             {/* Sidebar */}
//             <motion.div
//               initial="closed"
//               animate="open"
//               exit="closed"
//               variants={sidebarVariants}
//               className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 overflow-y-auto"
//             >
//               <div className="p-6">
//                 {/* Sidebar Header */}
//                 <div className="flex justify-between items-center mb-8">
//                   <div className="flex items-center">
//                     <span className="font-poppins font-bold text-xl text-green-700">
//                       EcoTravels
//                     </span>
//                     <img
//                       src="/ecotravel_globe.png"
//                       alt="EcoTravels logo"
//                       className="w-8 h-8 ml-2"
//                     />
//                   </div>
//                   <X
//                     size={24}
//                     className="text-gray-600 cursor-pointer"
//                     onClick={toggleSidebar}
//                   />
//                 </div>

//                 {/* Navigation Links */}
//                 <nav className="space-y-4">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.path}
//                       to={link.path}
//                       onClick={toggleSidebar}
//                       className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors duration-300 group"
//                     >
//                       <link.icon
//                         className="mr-4 text-green-600 group-hover:text-green-700"
//                         size={24}
//                       />
//                       <span className="text-gray-800 font-medium group-hover:text-green-700">
//                         {link.name}
//                       </span>
//                     </Link>
//                   ))}
//                 </nav>

//                 {/* Login Button */}
//                 <div className="mt-8">
//                   <button
//                     className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
//                     onClick={() => {
//                       toggleSidebar();
//                       handleLoginClick();
//                     }}
//                   >
//                     <LogIn className="mr-2" size={20} />
//                     Log In / Sign Up
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, MapPin, Award, MessageSquare, LogIn, User, LogOut } from "lucide-react";
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import {  onAuthStateChanged } from "firebase/auth";
const Header = ({ handleLoginClick, isLoggedIn, userEmail }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navLinks = [
    { name: "Discover", path: "/", icon: Home },
    { name: "Trips", path: "/trips", icon: MapPin },
    { name: "Rewards", path: "/rewards", icon: Award },
    { name: "Reviews", path: "/reviews", icon: MessageSquare },
  ];

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success('Logged out successfully!', { position: 'top-center' });
      setShowDropdown(false);
    } catch (error) {
      toast.error('Error logging out', { position: 'top-center' });
      console.error('Logout error:', error);
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
          <div className="flex items-center">
            <span className="font-poppins font-bold text-2xl text-black-500">
              EcoTravels
            </span>
            <img
              src="/ecotravel_globe.png"
              alt="EcoTravels logo"
              className="w-10 h-10 ml-2"
            />
          </div>

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
                <div className="flex justify-between items-center mb-8">
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
                        <span className="text-gray-800 font-medium">{userEmail}</span>
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