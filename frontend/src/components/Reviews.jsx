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
import { toast } from "react-toastify";

function Reviews({ handleLoginClick }) {
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    feedback: "",
  });
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserProfile = async (uid) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${uid}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };
  
// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//     if (currentUser) {
//       setUser(currentUser);
//       setIsLoggedIn(true);
      
//       // Try to fetch MongoDB user profile
//       const userProfile = await fetchUserProfile(currentUser.uid);
//       if (userProfile) {
//         // Update user with MongoDB data
//         setUser(prev => ({
//           ...prev,
//           mongoDbProfile: userProfile,
//         }));
//       }
//     } else {
//       setUser(null);
//       setIsLoggedIn(false);
//     }
//   });

//   fetchReviews();
//   return () => unsubscribe();
// }, []);
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
        
        // Try to fetch MongoDB user profile
        const userProfile = await fetchUserProfile(currentUser.uid);
        if (userProfile) {
          // Update user with MongoDB data
          setUser(prev => ({
            ...prev,
            mongoDbProfile: userProfile,
          }));
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  
    fetchReviews();
    return () => unsubscribe();
  }, []);
  const updateUserPoints = async (points) => {
    if (!user) return false;
    
    try {
      // Using the endpoint for adding points
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.uid}/addpoints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: points,
          activityType: "review_submission",
          description: "Reward for submitting a review"
        }),
      });
      
      const responseData = await response.json();
      console.log('Points update response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || `Server error: ${response.status}`);
      }
      
      // Show toast notification for points with tier info if available
      toast.success(`🪙 +${points} reward points earned!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
  
      return true;
    } catch (error) {
      console.error("Error updating user points:", error);
      
      // Store the points to be awarded later
      const pendingPoints = JSON.parse(localStorage.getItem('pendingPoints') || '[]');
      pendingPoints.push({
        points,
        activityType: "review_submission",
        description: "Reward for submitting a review",
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('pendingPoints', JSON.stringify(pendingPoints));
      
      toast.warning("Points will be awarded when connection is restored.", {
        position: "top-center",
        autoClose: 4000,
      });
      
      return false;
    }
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

    setIsSubmitting(true);

    try {
      // Use MongoDB userName if available, otherwise fallback to Firebase
      const userData = {
        displayName: user.mongoDbProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Anonymous',
        photoURL: user.photoURL,
        email: user.email,
      };
  
      await addDoc(collection(db, "reviews"), {
        ...newReview,
        user: userData,
        timestamp: new Date(),
      });
  
      // Award points to the user
      if (user) {
        await updateUserPoints(50);
      }
  
      setNewReview({ rating: 0, feedback: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error adding review: ", error);
      toast.error("There was a problem submitting your review.", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
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
            {isLoggedIn && <span className="text-green-600 ml-1">Share your own experience and earn 50 eco points!</span>}
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
            {isLoggedIn && <span className="text-sm text-green-600 block mt-1">(+50 points)</span>}
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
                disabled={isSubmitting}
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
              >
                {isSubmitting ? "Submitting..." : "Share Experience"}
              </button>
            </div>

            {/* Login Notice (if not logged in) */}
            {!isLoggedIn && (
              <div className="text-center mt-4 text-sm text-blue-600">
                Log in to earn 50 eco points for your review!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reviews;