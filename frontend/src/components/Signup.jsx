// SignUp.jsx
import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic (e.g., API call)
    console.log('Signed up with:', email, password);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Create an account</h2>
      <p className="text-sm text-gray-600 text-center mb-6">Please enter your details to sign up.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create account
        </button>
      </form>

      <div className="text-sm text-center mt-6">
        <span>Already have an account? </span>
        <a href="#" className="font-medium text-green-600 hover:text-green-500">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignUp;
// import React, { useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { Link } from 'react-router-dom';
// import { X } from 'lucide-react';



// // Replace with your Firebase config
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID ,
//   storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
//   messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

// const SignUp = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     console.log('Starting signup process...');

//     try {
//       console.log('Creating Firebase user...');
//       // Create user in Firebase
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const { user } = userCredential;
      
//       console.log('Firebase user created:', user.uid);

//       console.log('Sending data to MongoDB...');
//       // Store user data in MongoDB
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: user.email,
//           uid: user.uid,
//           createdAt: new Date(),
//         }),
//       });

//       if (!response.ok) {
//         console.error('MongoDB response not ok:', response.status);
//         throw new Error('Failed to create user profile');
//       }

//       const userData = await response.json();
//       console.log('User created successfully:', userData);
      
//       onClose();
//     } catch (error) {
//       console.error('Error during signup:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
// };
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Blurred backdrop */}
//       <div 
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       {/* Modal content */}
//       <div className="relative z-50 p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <h2 className="text-2xl font-semibold text-center mb-4">Create an account</h2>
//         <p className="text-sm text-gray-600 text-center mb-6">
//           Please enter your details to sign up.
//         </p>

//         {error && (
//           <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label 
//               className="block text-sm font-medium text-gray-700" 
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label 
//               className="block text-sm font-medium text-gray-700" 
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               placeholder="Enter your password"
//               required
//               minLength={6}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Creating account...' : 'Create account'}
//           </button>
//         </form>

//         <div className="text-sm text-center mt-6">
//           <span>Already have an account? </span>
//           <Link 
//             to="/login" 
//             className="font-medium text-green-600 hover:text-green-500"
//             onClick={onClose}
//           >
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;