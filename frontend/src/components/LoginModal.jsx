// import React from 'react';

// const LoginModal = ({ showModal, closeModal }) => {
//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md relative shadow-lg">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//           onClick={closeModal}
//         >
//           &#x2715; {/* Close button */}
//         </button>

//         <h2 className="text-2xl font-semibold text-center mb-4">Welcome back</h2>
//         <p className="text-sm text-gray-600 text-center mb-6">Please enter your details to sign in.</p>

//         {/* Social login buttons */}
//         <div className="flex gap-4 mb-6">
//           <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
//             <img src="google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
//             Google
//           </button>
//           <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
//             <img src="github-logo.png" alt="GitHub" className="w-5 h-5 mr-2" />
//             GitHub
//           </button>
//         </div>

//         <div className="flex items-center mb-6">
//           <div className="border-t border-gray-300 w-full"></div>
//           <span className="px-3 text-sm text-gray-500">or</span>
//           <div className="border-t border-gray-300 w-full"></div>
//         </div>

//         {/* Email input */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password input */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter your password"
//           />
//         </div>

//         {/* Remember me & forgot password */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center">
//             {/* <input
//               id="remember_me"
//               type="checkbox"
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//             /> */}
//             {/* <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
//               Remember for 30 days
//             </label> */}
//           </div>

//           <div className="text-sm">
//             <a href="#" className="font-medium text-green-600 hover:text-green-500">
//               Forgot password?
//             </a>
//           </div>
//         </div>

//         {/* Sign in button */}
//         <button
//           type="submit"
//           className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//         >
//           Sign in
//         </button>

//         {/* Sign up link */}
//         <div className="text-sm text-center mt-6">
//           <span>Don’t have an account? </span>
//           <a href="#" className="font-medium text-green-600 hover:text-green-500">
//             Create account
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;
import React, { useState } from 'react';
import './LoginModal.css'; // Import the CSS for the flip effect
import { Link } from 'react-router-dom';  // Make sure 'react-router-dom' is installed and used properly.

const LoginModal = ({ showModal, closeModal }) => {
  const [isSignUp, setIsSignUp] = useState(false); // State to track sign-up or login view
  const [isFlipped, setIsFlipped] = useState(false); // State to track the flip effect

  if (!showModal) return null;

  const handleSignUpClick = () => {
    setIsFlipped(true); // Flip to sign-up view
    setIsSignUp(true);
  };
  const handleSignInClick = () => {
    setIsFlipped(false); // Flip back to sign-in view
    setIsSignUp(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white p-8 rounded-lg w-full max-w-md relative shadow-lg transform transition-all duration-500 ${isFlipped ? 'flip' : ''}`}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={closeModal}
        >
          &#x2715; {/* Close button */}
        </button>

        {isSignUp ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Create an account</h2>
            <p className="text-sm text-gray-600 text-center mb-6">Please enter your details to sign up.</p>

            {/* Sign-up form */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Sign-up button */}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create account
            </button>

            <div className="text-sm text-center mt-6">
              <span>Already have an account? </span>
              <a href="#" onClick={handleSignInClick} className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Welcome back</h2>
            <p className="text-sm text-gray-600 text-center mb-6">Please enter your details to sign in.</p>

            {/* Social login buttons */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                <img src="google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                <img src="github-logo.png" alt="GitHub" className="w-5 h-5 mr-2" />
                GitHub
              </button>
            </div>

            <div className="flex items-center mb-6">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="px-3 text-sm text-gray-500">or</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot password */}
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                Forgot password?
              </a>
            </div>

            {/* Sign-in button */}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>

            <div className="text-sm text-center mt-6">
              <span>Don’t have an account? </span>
              <a href="#" onClick={handleSignUpClick} className="font-medium text-green-600 hover:text-green-500">
                Create account
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
