import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig";

const googleProvider = new GoogleAuthProvider();

const LoginSignupModel = ({ showModal, closeModal }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError("");
  };

  // const handleGoogleSignIn = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;
      
  //     // Only save user data if signing up (not already in system)
  //     await saveUserToMongoDB({
  //       email: user.email,
  //       firebaseUid: user.uid,
  //     });
      
  //     toast.success("Signed in with Google successfully!", { position: "top-center" });
  //     closeModal();
      
  //     // Redirect to itinerary if on duration page
  //     if (location.pathname === '/duration') {
  //       navigate('/itinerary');
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      await saveUserToMongoDB({
        email: user.email,
        firebaseUid: user.uid,
      });
      
      toast.success("Signed in with Google successfully!", { position: "top-center" });
      closeModal();
      
      // Get return URL from localStorage
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        localStorage.removeItem('returnUrl'); // Clear the stored URL
        navigate(returnUrl);
      } else {
        // Default fallback if no return URL
        navigate('/duration');
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToMongoDB({
          email: userCredential.user.email,
          firebaseUid: userCredential.user.uid,
        });
        toast.success("Signup Successful!", { position: "top-center" });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!", { position: "top-center" });
      }

      closeModal();
      
      // Get return URL from localStorage
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        localStorage.removeItem('returnUrl'); // Clear the stored URL
        navigate(returnUrl);
      } else {
        // Default fallback if no return URL
        navigate('/duration');
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     let userCredential;
  //     if (isSignup) {
  //       userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       await saveUserToMongoDB({
  //         email: userCredential.user.email,
  //         firebaseUid: userCredential.user.uid,
  //       });
  //       toast.success("Signup Successful!", { position: "top-center" });
  //     } else {
  //       userCredential = await signInWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       toast.success("Logged in successfully!", { position: "top-center" });
  //     }

  //     closeModal();
      
  //     if (location.pathname === '/duration') {
  //       navigate('/itinerary');
  //     }

  //   } catch (err) {
  //     console.error(err.message);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const saveUserToMongoDB = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save user to MongoDB");
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving user to MongoDB:", error.message);
      // Don't throw the error - if saving to MongoDB fails but Firebase auth succeeded,
      // we still want to let the user proceed
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-sm w-full z-60">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &#x2715;
        </button>
        
        <h2 className="text-xl font-semibold text-center mb-4">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        
        <p className="text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-green-500 hover:underline focus:outline-none"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupModel;