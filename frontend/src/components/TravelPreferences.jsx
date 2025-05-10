import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Hotel,
  Coffee,
  Mountain,
  Camera,
  Book,
  Utensils,
  Music,
  Map,
  Sun,
  Check,
  Plus,
  X,
  ArrowRight,
  MapPin,
  Plane,
  Train,
  Building,
  Trees
} from "lucide-react";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const TravelPreferences = () => {
  const navigate = useNavigate();
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUpdatingPoints, setIsUpdatingPoints] = useState(false);
  const [preferences, setPreferences] = useState({
    activities: [],
    locationPreference: "",
    pacePreference: "",
  });
  const auth = getAuth();

  useEffect(() => {
    // Set current user when component mounts
    setCurrentUser(auth.currentUser);

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  // Available activity options
  const activityOptions = [
    {
      id: "hiking",
      icon: <Mountain className="h-5 w-5" />,
      label: "Hiking & Nature",
    },
    {
      id: "sightseeing",
      icon: <Camera className="h-5 w-5" />,
      label: "Sightseeing",
    },
    {
      id: "culture",
      icon: <Book className="h-5 w-5" />,
      label: "Cultural Sites",
    },
    { id: "food", icon: <Utensils className="h-5 w-5" />, label: "Food Tours" },
    {
      id: "nightlife",
      icon: <Music className="h-5 w-5" />,
      label: "Nightlife",
    },
    {
      id: "adventure",
      icon: <Compass className="h-5 w-5" />,
      label: "Adventure",
    },
  ];

  // Location preferences
  const locationOptions = [
    {
      id: "airport",
      icon: <Plane className="h-5 w-5" />,
      label: "Near Airport",
      description: "Convenient for short stays and early/late flights"
    },
    {
      id: "railway",
      icon: <Train className="h-5 w-5" />,
      label: "Near Railway Station",
      description: "Perfect for train travelers and local transit access"
    },
    {
      id: "central",
      icon: <Building className="h-5 w-5" />,
      label: "Central City",
      description: "In the heart of the action with attractions nearby"
    },
    {
      id: "outskirts",
      icon: <Trees className="h-5 w-5" />,
      label: "Out of City",
      description: "Peaceful locations with natural surroundings"
    }
  ];

  // Pace preferences
  const paceOptions = [
    {
      id: "relaxed",
      icon: <Coffee className="h-5 w-5" />,
      label: "Relaxed",
      description: "More free time, fewer activities per day",
    },
    {
      id: "balanced",
      icon: <Sun className="h-5 w-5" />,
      label: "Balanced",
      description: "Mix of planned activities and leisure time",
    },
    {
      id: "packed",
      icon: <Map className="h-5 w-5" />,
      label: "Action-Packed",
      description: "Maximized sightseeing with full daily schedules",
    },
  ];

  const handleActivityToggle = (activityId) => {
    setPreferences((prev) => {
      const activities = [...prev.activities];

      if (activities.includes(activityId)) {
        return {
          ...prev,
          activities: activities.filter((id) => id !== activityId),
        };
      } else {
        return { ...prev, activities: [...activities, activityId] };
      }
    });
  };

  const handleCustomActivityAdd = () => {
    if (customActivity.trim()) {
      setPreferences((prev) => ({
        ...prev,
        activities: [...prev.activities, `custom:${customActivity.trim()}`],
      }));
      setCustomActivity("");
      setShowCustomInput(false);
      toast.success(`"${customActivity.trim()}" added to your activities`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const removeCustomActivity = (activity) => {
    setPreferences((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a !== activity),
    }));
  };

  const handleLocationSelect = (locationId) => {
    setPreferences((prev) => ({
      ...prev,
      locationPreference: locationId,
    }));
  };

  const handlePaceSelect = (paceId) => {
    setPreferences((prev) => ({
      ...prev,
      pacePreference: paceId,
    }));
  };

  const calculateRewardPoints = () => {
    let points = 0;

    // Points for selecting activities
    points += preferences.activities.length * 5;

    // Points for location preference
    if (preferences.locationPreference) {
      points += 15;
    }

    // Points for pace preference
    if (preferences.pacePreference === "relaxed") {
      points += 15; // More sustainable pace
    } else if (preferences.pacePreference === "balanced") {
      points += 10;
    } else if (preferences.pacePreference === "packed") {
      points += 5;
    }

    return points;
  };

  const updateUserPoints = async (points) => {
    if (!currentUser) return;

    setIsUpdatingPoints(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${
          currentUser.uid
        }/addpoints`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            points: points,
            activityType: "travel_preference",
            description: `Reward for selecting travel preferences: ${preferences.activities.length} activities, ${preferences.locationPreference} accommodation, ${preferences.pacePreference} pace`,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error || `Server error: ${response.status}`
        );
      }

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
    } catch (error) {
      console.error("Error updating user points:", error);

      // Store the points to be awarded later
      const pendingPoints = JSON.parse(
        localStorage.getItem("pendingPoints") || "[]"
      );
      pendingPoints.push({
        points,
        activityType: "travel_preference",
        description: `Reward for selecting travel preferences: ${preferences.activities.length} activities, ${preferences.locationPreference} accommodation, ${preferences.pacePreference} pace`,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("pendingPoints", JSON.stringify(pendingPoints));

      toast.warning("Points will be awarded when connection is restored.", {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setIsUpdatingPoints(false);
    }
  };

  const handleContinue = async () => {
    if (
      preferences.activities.length === 0 ||
      !preferences.locationPreference ||
      !preferences.pacePreference
    ) {
      toast.warning("Please complete all preference sections", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // Get existing data from local storage
    const existingData = JSON.parse(
      localStorage.getItem("selectedCitiesData") || '{"selectedCities": []}'
    );

    // Update with new preferences
    const updatedData = {
      ...existingData,
      activities: preferences.activities,
      locationPreference: preferences.locationPreference,
      pacePreference: preferences.pacePreference,
    };

    // Save to local storage
    localStorage.setItem("selectedCitiesData", JSON.stringify(updatedData));

    // Calculate and award points
    const points = calculateRewardPoints();

    // Try to award points if user is logged in
    if (points > 0 && currentUser) {
      try {
        await updateUserPoints(points);
      } catch (error) {
        // Already handled in updateUserPoints, continue with navigation
        console.log("Continuing despite points error");
      }
    } else if (points > 0 && !currentUser) {
      // If user is not logged in, prompt to login
      toast.info("Log in to earn reward points for your selections!", {
        position: "top-center",
        autoClose: 5000,
      });
    }

    // Navigate to next screen
    navigate("/duration");
  };

  // Extract custom activities for display
  const customActivities = preferences.activities
    .filter((activity) => activity.startsWith("custom:"))
    .map((activity) => activity.replace("custom:", ""));
    
  // Calculate completion percentage
  const totalSections = 3; // Activities, Location, Pace
  let completedSections = 0;
  
  if (preferences.activities.length > 0) completedSections++;
  if (preferences.locationPreference) completedSections++;
  if (preferences.pacePreference) completedSections++;
  
  const completionPercentage = (completedSections / totalSections) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Personalize Your Eco Trip
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your travel style to create the perfect itinerary
          </p>
          
          {/* Progress bar */}
          <div className="mt-6 w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedSections} of {totalSections} preferences selected</p>
        </div>

        {/* Activities Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <Compass className="mr-3 h-7 w-7 text-green-600" />
            Activities Interest
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Select all activities that interest you for your eco-friendly adventure
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {activityOptions.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityToggle(activity.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all flex items-center space-x-3
                  ${
                    preferences.activities.includes(activity.id)
                      ? "bg-green-100 border-2 border-green-400 shadow-md transform scale-105"
                      : "bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                  }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    preferences.activities.includes(activity.id)
                      ? "bg-green-200 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {activity.icon}
                </div>
                <span className="text-sm font-medium">{activity.label}</span>
                {preferences.activities.includes(activity.id) && (
                  <Check className="h-4 w-4 text-green-600 ml-auto" />
                )}
              </div>
            ))}

            {/* Add Custom Activity */}
            <div
              onClick={() => !showCustomInput && setShowCustomInput(true)}
              className={`p-4 rounded-xl cursor-pointer transition-all flex items-center space-x-3 
                ${
                  showCustomInput
                    ? "bg-blue-100 border-2 border-blue-300 transform scale-105"
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
            >
              <div className="p-2 rounded-full bg-blue-200 text-blue-700">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Other Activity</span>
            </div>
          </div>

          {/* Custom Activity Input */}
          {showCustomInput && (
            <div className="mt-5 flex items-center">
              <input
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="Enter activity..."
                className="flex-1 p-3 border border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleCustomActivityAdd()
                }
              />
              <button
                onClick={handleCustomActivityAdd}
                className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowCustomInput(false)}
                className="p-3 ml-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Custom Activities Tags */}
          {customActivities.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {customActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm flex items-center shadow-sm"
                >
                  {activity}
                  <button
                    onClick={() => removeCustomActivity(`custom:${activity}`)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Preference */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <MapPin className="mr-3 h-7 w-7 text-green-600" />
            Accommodation Location
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Where would you prefer to stay during your trip?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {locationOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleLocationSelect(option.id)}
                className={`p-5 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    preferences.locationPreference === option.id
                      ? "bg-green-100 border-2 border-green-400 shadow-md transform scale-105"
                      : "bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-3 rounded-full ${
                      preferences.locationPreference === option.id
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </div>
                  {preferences.locationPreference === option.id && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <h3 className="font-medium text-base mb-1">{option.label}</h3>
                <p className="text-xs text-gray-600">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pace Preference */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <Map className="mr-3 h-7 w-7 text-green-600" />
            Itinerary Pace
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose your preferred travel rhythm and schedule intensity
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paceOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handlePaceSelect(option.id)}
                className={`p-5 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    preferences.pacePreference === option.id
                      ? "bg-green-100 border-2 border-green-400 shadow-md transform scale-105"
                      : "bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-3 rounded-full ${
                      preferences.pacePreference === option.id
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </div>
                  {preferences.pacePreference === option.id && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <h3 className="font-medium text-base mb-1">{option.label}</h3>
                <p className="text-xs text-gray-600">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleContinue}
            disabled={
              preferences.activities.length === 0 ||
              !preferences.locationPreference ||
              !preferences.pacePreference ||
              isUpdatingPoints
            }
            className={`px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 text-lg
              ${
                preferences.activities.length > 0 &&
                preferences.locationPreference &&
                preferences.pacePreference &&
                !isUpdatingPoints
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isUpdatingPoints ? "Processing..." : "Continue to Duration"}
            {!isUpdatingPoints && <ArrowRight className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelPreferences;