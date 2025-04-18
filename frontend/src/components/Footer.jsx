// import React from 'react';
// import { Instagram, Twitter, Dribbble } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative overflow-hidden" 
//       style={{
//         background: 'linear-gradient(to right, #7FD1B9, #A8E6CF, #95AACF)'
//       }}
//     >
//       <div className="container mx-auto px-4 pt-4 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Description Column */}
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-gray-800">EcoTravels</h3>
//             <p className="text-sm text-gray-700 pr-8">
//               Your sustainable travel companion for exploring, planning, and discovering unique destinations 
//               across the country. We make travel simple, exciting, and memorable.
//             </p>
//           </div>

//           {/* Quick Links Column */}
//           <div>
//             <h4 className="text-sm font-semibold mb-4 uppercase text-gray-800">Quick Links</h4>
//             <div className="flex flex-col space-y-2 text-sm">
//               <a href="/trips" className="text-gray-700 hover:text-gray-900 transition">Trips</a>
//               <a href="/rewards" className="text-gray-700 hover:text-gray-900 transition">Rewards</a>
//               <a href="/pricing" className="text-gray-700 hover:text-gray-900 transition">Pricing</a>
//             </div>
//           </div>

//           {/* Social Media Column */}
//           <div>
//             <h4 className="text-sm font-semibold mb-4 uppercase text-gray-800">Share</h4>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-700 hover:text-gray-900 transition">
//                 <Instagram size={20} />
//               </a>
//               <a href="#" className="text-gray-700 hover:text-gray-900 transition">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="text-gray-700 hover:text-gray-900 transition">
//                 <Dribbble size={20} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-300 text-center text-sm text-gray-600">
//           © {currentYear} EcoTravels. All Rights Reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden py-12 font-['Roboto',sans-serif]"
      style={{
        background: 'linear-gradient(to right, #7FD1B9, #A8E6CF, #95AACF)'
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description Column */}
          <div className="flex flex-col justify-start h-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">EcoTravels</h3>
            <p className="text-base text-gray-700">
              Your sustainable travel companion for exploring, planning, and discovering unique destinations
              across the country. We make travel simple, exciting, and memorable.
            </p>
          </div>
          {/* Quick Links Column */}
          <div className="flex flex-col items-center justify-start h-full">
            <h4 className="text-base font-bold mb-4 uppercase text-gray-800">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-base items-center">
              <a href="/trips" className="text-gray-700 hover:text-gray-900 transition">Trips</a>
              <a href="/rewards" className="text-gray-700 hover:text-gray-900 transition">Rewards</a>
              <a href="/pricing" className="text-gray-700 hover:text-gray-900 transition">Pricing</a>
            </div>
          </div>
          {/* Social Media Column */}
          <div className="flex flex-col justify-start items-end h-full">
            <h4 className="text-base font-bold mb-4 uppercase text-center px-5 text-gray-800">Share</h4>
            <div className="flex space-x-4">
              {/* Instagram Filled Icon - Corrected */}
              <a href="#" className="hover:opacity-80 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                  <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
              {/* X (Twitter) New Logo */}
              <a href="#" className="hover:opacity-80 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Facebook New Icon */}
              <a href="#" className="hover:opacity-80 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <linearGradient id="facebook-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#18ACFE"/>
                    <stop offset="100%" stopColor="#0163E0"/>
                  </linearGradient>
                  <path fill="url(#facebook-gradient)" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-black mt-8 pt-6 text-center text-base text-gray-600">
          © {currentYear} EcoTravels. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;