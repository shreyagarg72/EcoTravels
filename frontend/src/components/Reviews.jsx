// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';
// import { db, auth } from '../../firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';

// function Reviews({handleLoginClick}) {
//   const [reviews, setReviews] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [newReview, setNewReview] = useState({
//     rating: 0,
//     feedback: '',
//   });
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setIsLoggedIn(!!currentUser);
//     });

//     fetchReviews();
//     return () => unsubscribe();
//   }, []);

//   const fetchReviews = async () => {
//     const reviewsQuery = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
//     const querySnapshot = await getDocs(reviewsQuery);
//     const fetchedReviews = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setReviews(fetchedReviews);
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     if (!isLoggedIn) {
//       handleLoginClick();
//       return;
//     }

//     if (newReview.rating === 0) {
//       alert('Please select a rating');
//       return;
//     }

//     try {
//       await addDoc(collection(db, 'reviews'), {
//         ...newReview,
//         userName: user.displayName || user.email.split('@')[0],
//         timestamp: new Date()
//       });

//       setNewReview({ rating: 0, feedback: '' });
//       fetchReviews();
//     } catch (error) {
//       console.error("Error adding review: ", error);
//     }
//   };

//   const StarRating = ({ rating, setRating, interactive = false }) => {
//     const stars = [1, 2, 3, 4, 5];
//     return (
//       <div className="flex">
//         {stars.map((star) => (
//           <span
//             key={star}
//             onClick={() => interactive && setRating(star)}
//             className={`text-3xl cursor-${interactive ? 'pointer' : 'default'} ${
//               star <= rating
//                 ? 'text-green-500'
//                 : 'text-gray-300'
//             }`}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-green-800 mb-4">Traveler Experiences</h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Hear from fellow eco-travelers about their sustainable journeys and unforgettable moments.
//           </p>
//         </div>

//         {/* Horizontal Reviews Scroll */}
//         <div className="flex overflow-x-auto space-x-6 pb-6">
//           {reviews.map((review) => (
//             <div
//               key={review.id}
//               className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl border-l-4 border-green-500"
//             >
//               <div className="mb-4">
//                 <StarRating rating={review.rating} />
//               </div>
//               <p className="text-gray-600 italic mb-4 h-24 overflow-hidden">"{review.feedback}"</p>
//               <div className="text-sm text-gray-500 flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 mr-2 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//                 {review.userName}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Review Submission Form (unchanged) */}
//         <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 mt-12">
//           <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">Share Your Eco-Journey</h2>
//           <form onSubmit={handleSubmitReview}>
//             <div className="mb-6 text-center">
//               <label className="block mb-4 text-gray-700">Your Travel Rating</label>
//               <div className="flex justify-center mb-6">
//                 <StarRating
//                   rating={newReview.rating}
//                   setRating={(rating) => setNewReview({...newReview, rating})}
//                   interactive={true}
//                 />
//               </div>
//             </div>
//             <div className="mb-6">
//               <label className="block mb-2 text-gray-700">Your Sustainable Travel Story</label>
//               <textarea
//                 value={newReview.feedback}
//                 onChange={(e) => setNewReview({...newReview, feedback: e.target.value})}
//                 className="w-full p-4 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
//                 rows="4"
//                 placeholder="Tell us about your eco-friendly travel experience..."
//                 required
//               />
//             </div>
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-2"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Share Experience
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Reviews;

import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { CircleUserRound } from "lucide-react";

function Reviews({ handleLoginClick }) {
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    feedback: "",
  });
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });

    fetchReviews();
    return () => unsubscribe();
  }, []);

  const fetchReviews = async () => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(reviewsQuery);
    const fetchedReviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(fetchedReviews);
  };

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const cardWidth = 320; // Width of each card + margin
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }

    if (newReview.rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      const userData = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      };

      await addDoc(collection(db, "reviews"), {
        ...newReview,
        user: userData,
        timestamp: new Date(),
      });

      setNewReview({ rating: 0, feedback: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  const StarRating = ({ rating, setRating, interactive = false }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="flex">
        {stars.map((star) => (
          <span
            key={star}
            onClick={() => interactive && setRating(star)}
            className={`text-3xl cursor-${
              interactive ? "pointer" : "default"
            } ${star <= rating ? "text-green-500" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Traveler Experiences
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from fellow eco-travelers about their sustainable journeys and
            unforgettable moments.
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg z-10 disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>

          <div
            ref={sliderRef}
            className="flex overflow-x-hidden scroll-smooth space-x-6 pb-6"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl border-l-4 border-green-500"
              >
                <div className="flex items-center mb-4">
                  <CircleUserRound
                    className="w-10 h-10 rounded-full mr-3 text-green-600 stroke-current"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="font-semibold">
                      {review.user?.displayName || "Anonymous"}
                    </p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4 h-24 overflow-hidden">
                  "{review.feedback}"
                </p>
                <div className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  <span>
                    {review.user?.email?.split("@")[0] || "Eco Traveler"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg z-10 disabled:opacity-50"
            disabled={currentIndex === reviews.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>
        </div>

        {/* Review Submission Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">
            Share Your Eco-Journey
          </h2>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-6 text-center">
              <label className="block mb-4 text-gray-700">
                Your Travel Rating
              </label>
              <div className="flex justify-center mb-6">
                <StarRating
                  rating={newReview.rating}
                  setRating={(rating) => setNewReview({ ...newReview, rating })}
                  interactive={true}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">
                Your Sustainable Travel Story
              </label>
              <textarea
                value={newReview.feedback}
                onChange={(e) =>
                  setNewReview({ ...newReview, feedback: e.target.value })
                }
                className="w-full p-4 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                rows="4"
                placeholder="Tell us about your eco-friendly travel experience..."
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
              >
                Share Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
