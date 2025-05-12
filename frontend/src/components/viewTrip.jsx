// import React, { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { Link, useParams } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import TripSummary from "./Itinerary/TripSummary";
// // Fix for default marker icons
// import EcoImpactCalculator from "../components/Itinerary/EcoImpactCalculator";
// import LocationSelector from "../components/Itinerary/LocationSelector";
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });
// const ViewTrip = () => {
//   const { tripId } = useParams();
//   const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
//   const [trip, setTrip] = useState(null);
//   const [isEcoFriendly, setIsEcoFriendly] = useState(false);
//   useEffect(() => {
//     const fetchTrip = async () => {
//       if (!tripId) return;
//       const docRef = doc(db, "AITrips", tripId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setTrip(docSnap.data());
//         if (trip?.tripData?.travelPlans) {
//           const hasEcoFriendlyHotels = trip.tripData.travelPlans.some((plan) =>
//             plan.hotelOptions?.some((hotel) =>
//               hotel.description?.toLowerCase().includes("eco-friendly")
//             )
//           );

//           const hasOutdoorActivities = tripData.tripData.travelPlans.some(
//             (plan) =>
//               plan.itinerary?.some((day) =>
//                 [
//                   day.morning?.activity,
//                   day.afternoon?.activity,
//                   day.evening?.activity,
//                 ].some((activity) =>
//                   activity?.placeDetails?.toLowerCase().includes("outdoor")
//                 )
//               )
//           );

//           setIsEcoFriendly(hasEcoFriendlyHotels || hasOutdoorActivities);
//         }
//       }
//     };
//     fetchTrip();
//   }, [tripId]);
//   const isValidCoordinate = (coord) => {
//     if (!coord) return false;
//     const num = parseFloat(coord);
//     return !isNaN(num) && typeof num === "number" && isFinite(num);
//   };

//   const isValidLatLng = (coordinates) => {
//     if (!coordinates) return false;

//     const lat = parseFloat(coordinates.latitude);
//     const lng = parseFloat(coordinates.longitude);

//     return (
//       isValidCoordinate(lat) &&
//       isValidCoordinate(lng) &&
//       lat >= -90 &&
//       lat <= 90 &&
//       lng >= -180 &&
//       lng <= 180 &&
//       coordinates.latitude !== "Not available" &&
//       coordinates.longitude !== "Not available" &&
//       coordinates.latitude !== "Varies based on venue" &&
//       coordinates.longitude !== "Varies based on venue"
//     );
//   };
//   // const getAllDayActivities = (itinerary) => {
//   //   if (!itinerary) return [];

//   //   const activities = [];
//   //   itinerary.forEach((day, dayIndex) => {
//   //     if (day.morning?.activity?.coordinates) {
//   //       activities.push({
//   //         ...day.morning.activity,
//   //         dayNumber: dayIndex + 1,
//   //         timeOfDay: "Morning",
//   //       });
//   //     }
//   //     if (day.afternoon?.activity?.coordinates) {
//   //       activities.push({
//   //         ...day.afternoon.activity,
//   //         dayNumber: dayIndex + 1,
//   //         timeOfDay: "Afternoon",
//   //       });
//   //     }
//   //     if (day.evening?.activity?.coordinates) {
//   //       activities.push({
//   //         ...day.evening.activity,
//   //         dayNumber: dayIndex + 1,
//   //         timeOfDay: "Evening",
//   //       });
//   //     }
//   //   });
//   //   return activities;
//   // };
//   const getAllDayActivities = (itinerary) => {
//     if (!itinerary) return [];

//     const activities = [];
//     itinerary.forEach((day, dayIndex) => {
//       if (
//         day.morning?.activity?.coordinates &&
//         isValidLatLng(day.morning.activity.coordinates)
//       ) {
//         activities.push({
//           ...day.morning.activity,
//           dayNumber: dayIndex + 1,
//           timeOfDay: "Morning",
//         });
//       }
//       if (
//         day.afternoon?.activity?.coordinates &&
//         isValidLatLng(day.afternoon.activity.coordinates)
//       ) {
//         activities.push({
//           ...day.afternoon.activity,
//           dayNumber: dayIndex + 1,
//           timeOfDay: "Afternoon",
//         });
//       }
//       if (
//         day.evening?.activity?.coordinates &&
//         isValidLatLng(day.evening.activity.coordinates)
//       ) {
//         activities.push({
//           ...day.evening.activity,
//           dayNumber: dayIndex + 1,
//           timeOfDay: "Evening",
//         });
//       }
//     });
//     return activities;
//   };

//   const handleLocationSelect = (index) => {
//     setSelectedLocationIndex(index);
//   };

//   // Update map center function
//   const getMapCenter = () => {
//     if (
//       !trip?.userSelection?.selectedCities ||
//       trip.userSelection.selectedCities.length === 0
//     ) {
//       return [20.5937, 78.9629]; // Default to India's center
//     }

//     const selectedCity =
//       trip.userSelection.selectedCities[selectedLocationIndex];
//     return [selectedCity.latitude, selectedCity.longitude];
//   };

//   useEffect(() => {
//     if (
//       trip?.userSelection?.selectedCities &&
//       trip.userSelection.selectedCities.length > 0
//     ) {
//       setSelectedLocationIndex(0);
//     }
//   }, [trip]);

//   if (!trip) return <div className="p-4">Loading...</div>;

//   const currentPlan =
//     trip?.tripData?.travelPlans?.[selectedLocationIndex] || {};
//   const locations =
//     trip?.userSelection?.selectedCities?.[selectedLocationIndex] || [];
//   const allActivities = getAllDayActivities(currentPlan.itinerary);
//   const mapCenter = getMapCenter(allActivities);

//   const CategoryBox = ({ category, children }) => (
//     <div className="mb-4">
//       <div className="flex items-center gap-2 mb-2">
//         <div
//           className={`w-2 h-6 rounded ${
//             category === "Breakfast"
//               ? "bg-blue-500"
//               : category === "Lunch"
//               ? "bg-green-500"
//               : category === "Dinner"
//               ? "bg-purple-500"
//               : "bg-gray-500"
//           }`}
//         />
//         <span className="text-sm font-medium text-gray-600">{category}</span>
//       </div>
//       <div className="ml-4">{children}</div>
//     </div>
//   );

//   const renderActivity = (activityData) => {
//     if (!activityData) return null;

//     return (
//       <div className="space-y-2">
//         {activityData.placeName && (
//           <div className="font-bold">{activityData.placeName}</div>
//         )}
//         {activityData.ticketPrice && (
//           <div className="text-gray-600">
//             Ticket: {activityData.ticketPrice}
//           </div>
//         )}
//         {activityData.bestTimeToVisit && (
//           <div className="text-gray-500">{activityData.bestTimeToVisit}</div>
//         )}
//         {activityData.rating && (
//           <div className="flex items-center gap-1">
//             Rating: <span className="text-yellow-500">⭐</span>{" "}
//             {activityData.rating}
//           </div>
//         )}
//         {activityData.placeDetails && (
//           <div className="text-gray-600">{activityData.placeDetails}</div>
//         )}
//         {activityData.travelTime && (
//           <div className="text-gray-500">
//             Travel Time: {activityData.travelTime}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderMeal = (mealData) => {
//     if (!mealData) return null;

//     return (
//       <div className="space-y-2">
//         {mealData.restaurantName && (
//           <div className="font-medium">{mealData.restaurantName}</div>
//         )}
//         {mealData.cuisine && (
//           <div className="text-gray-600">Cuisine: {mealData.cuisine}</div>
//         )}
//         {mealData.location && (
//           <div className="text-gray-600">Location: {mealData.location}</div>
//         )}
//         {mealData.priceRange && (
//           <div className="text-gray-600">
//             Price Range: {mealData.priceRange}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <LocationSelector
//         trip={trip}
//         selectedLocationIndex={selectedLocationIndex}
//         onLocationSelect={handleLocationSelect}
//       />

//       {/* trip Info section */}
//       <TripSummary trip={trip} />

//       {/* Eco Impact carbon footprint calculator */}
//       <EcoImpactCalculator trip={trip} isEcoFriendly={isEcoFriendly} />

//       {/* hotel Section */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">🏨 Hotel Options</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
//           {currentPlan.hotelOptions?.map((hotel, index) => (
//             <div
//               key={index}
//               className="border rounded-lg p-4 hover:shadow-lg transition-shadow h-full hover:scale-110 transition-all"
//             >
//               <Link
//                 to={
//                   "https://www.google.com/maps/search/?api=1&query=" +
//                   hotel.hotelName +
//                   "," +
//                   hotel?.hotelAddress
//                 }
//                 target="_blank"
//               >
//                 <h3 className="font-bold text-lg mb-2">{hotel.hotelName}</h3>
//                 <div className="space-y-2">
//                   <p className="text-gray-600 line-clamp-2">
//                     {hotel.description}
//                   </p>
//                   <div className="text-green-600 font-semibold">
//                     💰 Price: {hotel.price}
//                   </div>
//                   <div className="flex items-center">
//                     <span>Rating: </span>
//                     <span className="ml-1"> {hotel.rating} ⭐</span>
//                   </div>
//                   <div className="text-gray-500">{hotel.hotelAddress}</div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* activity timeline */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">📍 Activities Map</h2>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {/* Activity Timeline */}
//           <div className="border rounded-lg p-4">
//             <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
//             <div className="space-y-4">
//               {allActivities.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded"
//                 >
//                   <div
//                     className={`text-sm px-2 py-1 rounded ${
//                       activity.timeOfDay === "Morning"
//                         ? "bg-blue-100 text-blue-800"
//                         : activity.timeOfDay === "Afternoon"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-purple-100 text-purple-800"
//                     }`}
//                   >
//                     Day {activity.dayNumber}
//                   </div>
//                   <div>
//                     <div className="font-medium">{activity.placeName}</div>
//                     <div className="text-sm text-gray-600">
//                       {activity.timeOfDay}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Map */}
//           <div className="lg:col-span-2 border rounded-lg p-4">
//             <div className="h-[500px] w-full">
//               <MapContainer
//                 key={selectedLocationIndex} // Force remount when location changes
//                 center={getMapCenter()}
//                 zoom={12}
//                 style={{ height: "100%", width: "100%" }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {/* City Center Marker */}
//                 {trip?.userSelection?.selectedCities[selectedLocationIndex] &&
//                   isValidLatLng({
//                     latitude:
//                       trip.userSelection.selectedCities[selectedLocationIndex]
//                         .latitude,
//                     longitude:
//                       trip.userSelection.selectedCities[selectedLocationIndex]
//                         .longitude,
//                   }) && (
//                     <Marker
//                       position={[
//                         trip.userSelection.selectedCities[selectedLocationIndex]
//                           .latitude,
//                         trip.userSelection.selectedCities[selectedLocationIndex]
//                           .longitude,
//                       ]}
//                     >
//                       <Popup>
//                         <div className="p-2">
//                           <div className="font-bold">
//                             {
//                               trip.userSelection.selectedCities[
//                                 selectedLocationIndex
//                               ].cityName
//                             }
//                           </div>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   )}
//                 {allActivities
//                   .filter((activity) => isValidLatLng(activity.coordinates))
//                   .map((activity, index) => (
//                     <Marker
//                       key={index}
//                       position={[
//                         parseFloat(activity.coordinates.latitude),
//                         parseFloat(activity.coordinates.longitude),
//                       ]}
//                     >
//                       <Popup>
//                         <div className="p-2">
//                           <div className="font-bold">{activity.placeName}</div>
//                           <div className="text-sm">
//                             Day {activity.dayNumber} - {activity.timeOfDay}
//                           </div>
//                           {activity.bestTimeToVisit && (
//                             <div className="text-sm text-gray-600">
//                               Best time: {activity.bestTimeToVisit}
//                             </div>
//                           )}
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ))}
//               </MapContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto p-4">
//         {[...Array(currentPlan.itinerary?.length || 0)].map((_, index) => {
//           const day = currentPlan.itinerary[index];
//           return (
//             <div key={index} className="border rounded-lg p-6 mb-6">
//               <div className="flex items-center gap-2 mb-6">
//                 <h2 className="text-2xl font-bold">Day {day.day}</h2>
//                 {day.theme && (
//                   <span className="text-gray-600">- {day.theme}</span>
//                 )}
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Morning</h3>
//                 {day.morning?.activity && renderActivity(day.morning.activity)}
//                 {day.morning?.breakfast && (
//                   <CategoryBox category="Breakfast">
//                     {renderMeal(day.morning.breakfast)}
//                   </CategoryBox>
//                 )}
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Afternoon</h3>
//                 {day.afternoon?.activity &&
//                   renderActivity(day.afternoon.activity)}
//                 {day.afternoon?.lunch && (
//                   <CategoryBox category="Lunch">
//                     {renderMeal(day.afternoon.lunch)}
//                   </CategoryBox>
//                 )}
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Evening</h3>
//                 {day.evening?.activity && renderActivity(day.evening.activity)}
//                 {day.evening?.dinner && (
//                   <CategoryBox category="Dinner">
//                     {renderMeal(day.evening.dinner)}
//                   </CategoryBox>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ViewTrip;





import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import TripSummary from "./Itinerary/TripSummary";
import EcoImpactCalculator from "../components/Itinerary/EcoImpactCalculator";
import LocationSelector from "../components/Itinerary/LocationSelector";
import axios from "axios"; // Make sure axios is installed
import { getAuth } from "firebase/auth"; // Import Firebase auth

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ViewTrip = () => {
  const { tripId } = useParams();
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [trip, setTrip] = useState(null);
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // null, 'success', 'error'
  const auth = getAuth();

  useEffect(() => {
    const fetchTrip = async () => {
      if (!tripId) return;
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
        if (docSnap.data()?.tripData?.travelPlans) {
          const tripData = docSnap.data();
          const hasEcoFriendlyHotels = tripData.tripData.travelPlans.some(
            (plan) =>
              plan.hotelOptions?.some((hotel) =>
                hotel.description?.toLowerCase().includes("eco-friendly")
              )
          );

          const hasOutdoorActivities = tripData.tripData.travelPlans.some(
            (plan) =>
              plan.itinerary?.some((day) =>
                [
                  day.morning?.activity,
                  day.afternoon?.activity,
                  day.evening?.activity,
                ].some((activity) =>
                  activity?.placeDetails?.toLowerCase().includes("outdoor")
                )
              )
          );

          setIsEcoFriendly(hasEcoFriendlyHotels || hasOutdoorActivities);
        }
      }
    };
    fetchTrip();
  }, [tripId]);

  // Save trip ID to user's profile
  const handleSaveTrip = async () => {
    if (!tripId) return;

    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Get current user
      const user = auth.currentUser;

      if (!user) {
        // Handle not logged in case
        alert("Please log in to save this itinerary");
        setIsSaving(false);
        return;
      }

      // Create save trip payload - just the tripId and userId
      const saveData = {
        tripId,
        userId: user.uid,
      };

      // API call to save trip
      const response = await axios.post(
        "https://ecotravels.onrender.com/api/save-trip",
        saveData
      );

      if (response.status === 200) {
        setSaveStatus("success");

        // Show success message
        setTimeout(() => {
          // Reset success status after 3 seconds
          setSaveStatus(null);
        }, 3000);
      } else {
        setSaveStatus("error");
        alert("Failed to save trip. Please try again.");
      }
    } catch (error) {
      console.error("Error saving trip:", error);
      setSaveStatus("error");
      alert("An error occurred while saving the trip.");
    } finally {
      setIsSaving(false);
    }
  };

  const isValidCoordinate = (coord) => {
    if (!coord) return false;
    const num = parseFloat(coord);
    return !isNaN(num) && typeof num === "number" && isFinite(num);
  };

  const isValidLatLng = (coordinates) => {
    if (!coordinates) return false;

    const lat = parseFloat(coordinates.latitude);
    const lng = parseFloat(coordinates.longitude);

    return (
      isValidCoordinate(lat) &&
      isValidCoordinate(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180 &&
      coordinates.latitude !== "Not available" &&
      coordinates.longitude !== "Not available" &&
      coordinates.latitude !== "Varies based on venue" &&
      coordinates.longitude !== "Varies based on venue"
    );
  };

  const getAllDayActivities = (itinerary) => {
    if (!itinerary) return [];

    const activities = [];
    itinerary.forEach((day, dayIndex) => {
      if (
        day.morning?.activity?.coordinates &&
        isValidLatLng(day.morning.activity.coordinates)
      ) {
        activities.push({
          ...day.morning.activity,
          dayNumber: dayIndex + 1,
          timeOfDay: "Morning",
        });
      }
      if (
        day.afternoon?.activity?.coordinates &&
        isValidLatLng(day.afternoon.activity.coordinates)
      ) {
        activities.push({
          ...day.afternoon.activity,
          dayNumber: dayIndex + 1,
          timeOfDay: "Afternoon",
        });
      }
      if (
        day.evening?.activity?.coordinates &&
        isValidLatLng(day.evening.activity.coordinates)
      ) {
        activities.push({
          ...day.evening.activity,
          dayNumber: dayIndex + 1,
          timeOfDay: "Evening",
        });
      }
    });
    return activities;
  };

  const handleLocationSelect = (index) => {
    setSelectedLocationIndex(index);
  };

  // Update map center function
  const getMapCenter = () => {
    if (
      !trip?.userSelection?.selectedCities ||
      trip.userSelection.selectedCities.length === 0
    ) {
      return [20.5937, 78.9629]; // Default to India's center
    }

    const selectedCity =
      trip.userSelection.selectedCities[selectedLocationIndex];
    return [selectedCity.latitude, selectedCity.longitude];
  };

  useEffect(() => {
    if (
      trip?.userSelection?.selectedCities &&
      trip.userSelection.selectedCities.length > 0
    ) {
      setSelectedLocationIndex(0);
    }
  }, [trip]);

  if (!trip) return <div className="p-4">Loading...</div>;

  const currentPlan =
    trip?.tripData?.travelPlans?.[selectedLocationIndex] || {};
  const allActivities = getAllDayActivities(currentPlan.itinerary);
  const mapCenter = getMapCenter(allActivities);

  const CategoryBox = ({ category, children }) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-2 h-6 rounded ${
            category === "Breakfast"
              ? "bg-blue-500"
              : category === "Lunch"
              ? "bg-green-500"
              : category === "Dinner"
              ? "bg-purple-500"
              : "bg-gray-500"
          }`}
        />
        <span className="text-sm font-medium text-gray-600">{category}</span>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  const renderActivity = (activityData) => {
    if (!activityData) return null;

    return (
      <div className="space-y-2">
        {activityData.placeName && (
          <div className="font-bold">{activityData.placeName}</div>
        )}
        {activityData.ticketPrice && (
          <div className="text-gray-600">
            Ticket: {activityData.ticketPrice}
          </div>
        )}
        {activityData.bestTimeToVisit && (
          <div className="text-gray-500">{activityData.bestTimeToVisit}</div>
        )}
        {activityData.rating && (
          <div className="flex items-center gap-1">
            Rating: <span className="text-yellow-500">⭐</span>{" "}
            {activityData.rating}
          </div>
        )}
        {activityData.placeDetails && (
          <div className="text-gray-600">{activityData.placeDetails}</div>
        )}
        {activityData.travelTime && (
          <div className="text-gray-500">
            Travel Time: {activityData.travelTime}
          </div>
        )}
      </div>
    );
  };

  const renderMeal = (mealData) => {
    if (!mealData) return null;

    return (
      <div className="space-y-2">
        {mealData.restaurantName && (
          <div className="font-medium">{mealData.restaurantName}</div>
        )}
        {mealData.cuisine && (
          <div className="text-gray-600">Cuisine: {mealData.cuisine}</div>
        )}
        {mealData.location && (
          <div className="text-gray-600">Location: {mealData.location}</div>
        )}
        {mealData.priceRange && (
          <div className="text-gray-600">
            Price Range: {mealData.priceRange}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <LocationSelector
          trip={trip}
          selectedLocationIndex={selectedLocationIndex}
          onLocationSelect={handleLocationSelect}
        />

        {/* Save Itinerary Button */}
        <button
          onClick={handleSaveTrip}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
            saveStatus === "success"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : saveStatus === "error"
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isSaving ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : saveStatus === "success" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save Itinerary
            </>
          )}
        </button>
      </div>

      {/* Rest of component remains unchanged */}
      <TripSummary trip={trip} />
      <EcoImpactCalculator trip={trip} isEcoFriendly={isEcoFriendly} />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🏨 Hotel Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {currentPlan.hotelOptions?.map((hotel, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow h-full hover:scale-110 transition-all"
            >
              <Link
                to={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  hotel.hotelName +
                  "," +
                  hotel?.hotelAddress
                }
                target="_blank"
              >
                <h3 className="font-bold text-lg mb-2">{hotel.hotelName}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600 line-clamp-2">
                    {hotel.description}
                  </p>
                  <div className="text-green-600 font-semibold">
                    💰 Price: {hotel.price}
                  </div>
                  <div className="flex items-center">
                    <span>Rating: </span>
                    <span className="ml-1"> {hotel.rating} ⭐</span>
                  </div>
                  <div className="text-gray-500">{hotel.hotelAddress}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">📍 Activities Map</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {allActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded"
                >
                  <div
                    className={`text-sm px-2 py-1 rounded ${
                      activity.timeOfDay === "Morning"
                        ? "bg-blue-100 text-blue-800"
                        : activity.timeOfDay === "Afternoon"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    Day {activity.dayNumber}
                  </div>
                  <div>
                    <div className="font-medium">{activity.placeName}</div>
                    <div className="text-sm text-gray-600">
                      {activity.timeOfDay}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 border rounded-lg p-4">
            <div className="h-[500px] w-full">
              <MapContainer
                key={selectedLocationIndex}
                center={getMapCenter()}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {trip?.userSelection?.selectedCities[selectedLocationIndex] &&
                  isValidLatLng({
                    latitude:
                      trip.userSelection.selectedCities[selectedLocationIndex]
                        .latitude,
                    longitude:
                      trip.userSelection.selectedCities[selectedLocationIndex]
                        .longitude,
                  }) && (
                    <Marker
                      position={[
                        trip.userSelection.selectedCities[selectedLocationIndex]
                          .latitude,
                        trip.userSelection.selectedCities[selectedLocationIndex]
                          .longitude,
                      ]}
                    >
                      <Popup>
                        <div className="p-2">
                          <div className="font-bold">
                            {
                              trip.userSelection.selectedCities[
                                selectedLocationIndex
                              ].cityName
                            }
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                {allActivities
                  .filter((activity) => isValidLatLng(activity.coordinates))
                  .map((activity, index) => (
                    <Marker
                      key={index}
                      position={[
                        parseFloat(activity.coordinates.latitude),
                        parseFloat(activity.coordinates.longitude),
                      ]}
                    >
                      <Popup>
                        <div className="p-2">
                          <div className="font-bold">{activity.placeName}</div>
                          <div className="text-sm">
                            Day {activity.dayNumber} - {activity.timeOfDay}
                          </div>
                          {activity.bestTimeToVisit && (
                            <div className="text-sm text-gray-600">
                              Best time: {activity.bestTimeToVisit}
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        {[...Array(currentPlan.itinerary?.length || 0)].map((_, index) => {
          const day = currentPlan.itinerary[index];
          return (
            <div key={index} className="border rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold">Day {day.day}</h2>
                {day.theme && (
                  <span className="text-gray-600">- {day.theme}</span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Morning</h3>
                {day.morning?.activity && renderActivity(day.morning.activity)}
                {day.morning?.breakfast && (
                  <CategoryBox category="Breakfast">
                    {renderMeal(day.morning.breakfast)}
                  </CategoryBox>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Afternoon</h3>
                {day.afternoon?.activity &&
                  renderActivity(day.afternoon.activity)}
                {day.afternoon?.lunch && (
                  <CategoryBox category="Lunch">
                    {renderMeal(day.afternoon.lunch)}
                  </CategoryBox>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Evening</h3>
                {day.evening?.activity && renderActivity(day.evening.activity)}
                {day.evening?.dinner && (
                  <CategoryBox category="Dinner">
                    {renderMeal(day.evening.dinner)}
                  </CategoryBox>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewTrip;



// import React, { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { Link, useParams } from "react-router-dom";
// import { db } from "../../firebaseConfig";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import TripSummary from "./Itinerary/TripSummary";
// import EcoImpactCalculator from "../components/Itinerary/EcoImpactCalculator";
// import LocationSelector from "../components/Itinerary/LocationSelector";
// import axios from "axios";
// import { getAuth } from "firebase/auth";
// import { useTranslation } from "react-i18next"; // Import useTranslation hook

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Language dropdown component
// const LanguageSelector = () => {
//   const { i18n } = useTranslation();
//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'es', name: 'Español' },
//     { code: 'fr', name: 'Français' },
//     { code: 'de', name: 'Deutsch' },
//     { code: 'ja', name: '日本語' },
//     { code: 'hi', name: 'हिन्दी' }
//   ];

//   const changeLanguage = (e) => {
//     const langCode = e.target.value;
//     i18n.changeLanguage(langCode);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-gray-600">🌐</span>
//       <select 
//         className="border rounded py-1 px-2 bg-white" 
//         onChange={changeLanguage}
//         value={i18n.language}
//       >
//         {languages.map((lang) => (
//           <option key={lang.code} value={lang.code}>
//             {lang.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const ViewTrip = () => {
//   const { t } = useTranslation(); // Use translation hook
//   const { tripId } = useParams();
//   const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
//   const [trip, setTrip] = useState(null);
//   const [isEcoFriendly, setIsEcoFriendly] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveStatus, setSaveStatus] = useState(null); // null, 'success', 'error'
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchTrip = async () => {
//       if (!tripId) return;
//       const docRef = doc(db, "AITrips", tripId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setTrip(docSnap.data());
//         if (docSnap.data()?.tripData?.travelPlans) {
//           const tripData = docSnap.data();
//           const hasEcoFriendlyHotels = tripData.tripData.travelPlans.some(
//             (plan) =>
//               plan.hotelOptions?.some((hotel) =>
//                 hotel.description?.toLowerCase().includes("eco-friendly")
//               )
//           );

//           const hasOutdoorActivities = tripData.tripData.travelPlans.some(
//             (plan) =>
//               plan.itinerary?.some((day) =>
//                 [
//                   day.morning?.activity,
//                   day.afternoon?.activity,
//                   day.evening?.activity,
//                 ].some((activity) =>
//                   activity?.placeDetails?.toLowerCase().includes("outdoor")
//                 )
//               )
//           );

//           setIsEcoFriendly(hasEcoFriendlyHotels || hasOutdoorActivities);
//         }
//       }
//     };
//     fetchTrip();
//   }, [tripId]);

//   // Save trip ID to user's profile
//   const handleSaveTrip = async () => {
//     if (!tripId) return;

//     setIsSaving(true);
//     setSaveStatus(null);

//     try {
//       // Get current user
//       const user = auth.currentUser;

//       if (!user) {
//         // Handle not logged in case
//         alert(t('pleaseLoginToSave'));
//         setIsSaving(false);
//         return;
//       }

//       // Create save trip payload - just the tripId and userId
//       const saveData = {
//         tripId,
//         userId: user.uid,
//       };

//       // API call to save trip
//       const response = await axios.post(
//         "https://ecotravels.onrender.com/api/save-trip",
//         saveData
//       );

//       if (response.status === 200) {
//         setSaveStatus("success");

//         // Show success message
//         setTimeout(() => {
//           // Reset success status after 3 seconds
//           setSaveStatus(null);
//         }, 3000);
//       } else {
//         setSaveStatus("error");
//         alert(t('failedToSaveTrip'));
//       }
//     } catch (error) {
//       console.error("Error saving trip:", error);
//       setSaveStatus("error");
//       alert(t('errorSavingTrip'));
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const isValidCoordinate = (coord) => {
//     if (!coord) return false;
//     const num = parseFloat(coord);
//     return !isNaN(num) && typeof num === "number" && isFinite(num);
//   };

//   const isValidLatLng = (coordinates) => {
//     if (!coordinates) return false;

//     const lat = parseFloat(coordinates.latitude);
//     const lng = parseFloat(coordinates.longitude);

//     return (
//       isValidCoordinate(lat) &&
//       isValidCoordinate(lng) &&
//       lat >= -90 &&
//       lat <= 90 &&
//       lng >= -180 &&
//       lng <= 180 &&
//       coordinates.latitude !== "Not available" &&
//       coordinates.longitude !== "Not available" &&
//       coordinates.latitude !== "Varies based on venue" &&
//       coordinates.longitude !== "Varies based on venue"
//     );
//   };

//   const getAllDayActivities = (itinerary) => {
//     if (!itinerary) return [];

//     const activities = [];
//     itinerary.forEach((day, dayIndex) => {
//       if (
//         day.morning?.activity?.coordinates &&
//         isValidLatLng(day.morning.activity.coordinates)
//       ) {
//         activities.push({
//           ...day.morning.activity,
//           dayNumber: dayIndex + 1,
//           timeOfDay: "Morning",
//         });
//       }
//       if (
//         day.afternoon?.activity?.coordinates &&
//         isValidLatLng(day.afternoon.activity.coordinates)
//       ) {
//         activities.push({
//           ...day.afternoon.activity,
//           dayNumber: dayIndex + 1,
//           timeOfDay: "Afternoon",
//         });
//       }
//       if (
//         day.evening?.activity?.coordinates &&
//         isValidLatLng(day.evening.activity.coordinates)
//       ) {
//         activities.push({
//           ...day.evening.activity,
//           dayNumber: dayIndex + 1,
//           timeOfDay: "Evening",
//         });
//       }
//     });
//     return activities;
//   };

//   const handleLocationSelect = (index) => {
//     setSelectedLocationIndex(index);
//   };

//   // Update map center function
//   const getMapCenter = () => {
//     if (
//       !trip?.userSelection?.selectedCities ||
//       trip.userSelection.selectedCities.length === 0
//     ) {
//       return [20.5937, 78.9629]; // Default to India's center
//     }

//     const selectedCity =
//       trip.userSelection.selectedCities[selectedLocationIndex];
//     return [selectedCity.latitude, selectedCity.longitude];
//   };

//   useEffect(() => {
//     if (
//       trip?.userSelection?.selectedCities &&
//       trip.userSelection.selectedCities.length > 0
//     ) {
//       setSelectedLocationIndex(0);
//     }
//   }, [trip]);

//   if (!trip) return <div className="p-4">{t('loading')}</div>;

//   const currentPlan =
//     trip?.tripData?.travelPlans?.[selectedLocationIndex] || {};
//   const allActivities = getAllDayActivities(currentPlan.itinerary);
//   const mapCenter = getMapCenter(allActivities);

//   const CategoryBox = ({ category, children }) => (
//     <div className="mb-4">
//       <div className="flex items-center gap-2 mb-2">
//         <div
//           className={`w-2 h-6 rounded ${
//             category === t('breakfast')
//               ? "bg-blue-500"
//               : category === t('lunch')
//               ? "bg-green-500"
//               : category === t('dinner')
//               ? "bg-purple-500"
//               : "bg-gray-500"
//           }`}
//         />
//         <span className="text-sm font-medium text-gray-600">{category}</span>
//       </div>
//       <div className="ml-4">{children}</div>
//     </div>
//   );

//   const renderActivity = (activityData) => {
//     if (!activityData) return null;

//     return (
//       <div className="space-y-2">
//         {activityData.placeName && (
//           <div className="font-bold">{activityData.placeName}</div>
//         )}
//         {activityData.ticketPrice && (
//           <div className="text-gray-600">
//             {t('ticket')}: {activityData.ticketPrice}
//           </div>
//         )}
//         {activityData.bestTimeToVisit && (
//           <div className="text-gray-500">{activityData.bestTimeToVisit}</div>
//         )}
//         {activityData.rating && (
//           <div className="flex items-center gap-1">
//             {t('rating')}: <span className="text-yellow-500">⭐</span>{" "}
//             {activityData.rating}
//           </div>
//         )}
//         {activityData.placeDetails && (
//           <div className="text-gray-600">{activityData.placeDetails}</div>
//         )}
//         {activityData.travelTime && (
//           <div className="text-gray-500">
//             {t('travelTime')}: {activityData.travelTime}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderMeal = (mealData) => {
//     if (!mealData) return null;

//     return (
//       <div className="space-y-2">
//         {mealData.restaurantName && (
//           <div className="font-medium">{mealData.restaurantName}</div>
//         )}
//         {mealData.cuisine && (
//           <div className="text-gray-600">{t('cuisine')}: {mealData.cuisine}</div>
//         )}
//         {mealData.location && (
//           <div className="text-gray-600">{t('location')}: {mealData.location}</div>
//         )}
//         {mealData.priceRange && (
//           <div className="text-gray-600">
//             {t('priceRange')}: {mealData.priceRange}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <LocationSelector
//             trip={trip}
//             selectedLocationIndex={selectedLocationIndex}
//             onLocationSelect={handleLocationSelect}
//           />
//           <LanguageSelector />
//         </div>

//         {/* Save Itinerary Button */}
//         <button
//           onClick={handleSaveTrip}
//           disabled={isSaving}
//           className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
//             saveStatus === "success"
//               ? "bg-green-500 hover:bg-green-600 text-white"
//               : saveStatus === "error"
//               ? "bg-red-500 hover:bg-red-600 text-white"
//               : "bg-blue-500 hover:bg-blue-600 text-white"
//           }`}
//         >
//           {isSaving ? (
//             <>
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               {t('saving')}
//             </>
//           ) : saveStatus === "success" ? (
//             <>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               {t('saved')}
//             </>
//           ) : (
//             <>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
//                 />
//               </svg>
//               {t('saveItinerary')}
//             </>
//           )}
//         </button>
//       </div>

//       <TripSummary trip={trip} />
//       <EcoImpactCalculator trip={trip} isEcoFriendly={isEcoFriendly} />

//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">🏨 {t('hotelOptions')}</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
//           {currentPlan.hotelOptions?.map((hotel, index) => (
//             <div
//               key={index}
//               className="border rounded-lg p-4 hover:shadow-lg transition-shadow h-full hover:scale-110 transition-all"
//             >
//               <Link
//                 to={
//                   "https://www.google.com/maps/search/?api=1&query=" +
//                   hotel.hotelName +
//                   "," +
//                   hotel?.hotelAddress
//                 }
//                 target="_blank"
//               >
//                 <h3 className="font-bold text-lg mb-2">{hotel.hotelName}</h3>
//                 <div className="space-y-2">
//                   <p className="text-gray-600 line-clamp-2">
//                     {hotel.description}
//                   </p>
//                   <div className="text-green-600 font-semibold">
//                     💰 {t('price')}: {hotel.price}
//                   </div>
//                   <div className="flex items-center">
//                     <span>{t('rating')}: </span>
//                     <span className="ml-1"> {hotel.rating} ⭐</span>
//                   </div>
//                   <div className="text-gray-500">{hotel.hotelAddress}</div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">📍 {t('activitiesMap')}</h2>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           <div className="border rounded-lg p-4">
//             <h3 className="text-lg font-semibold mb-4">{t('activityTimeline')}</h3>
//             <div className="space-y-4">
//               {allActivities.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded"
//                 >
//                   <div
//                     className={`text-sm px-2 py-1 rounded ${
//                       activity.timeOfDay === "Morning"
//                         ? "bg-blue-100 text-blue-800"
//                         : activity.timeOfDay === "Afternoon"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-purple-100 text-purple-800"
//                     }`}
//                   >
//                     {t('day')} {activity.dayNumber}
//                   </div>
//                   <div>
//                     <div className="font-medium">{activity.placeName}</div>
//                     <div className="text-sm text-gray-600">
//                       {t(activity.timeOfDay.toLowerCase())}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="lg:col-span-2 border rounded-lg p-4">
//             <div className="h-[500px] w-full">
//               <MapContainer
//                 key={selectedLocationIndex}
//                 center={getMapCenter()}
//                 zoom={12}
//                 style={{ height: "100%", width: "100%" }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {trip?.userSelection?.selectedCities[selectedLocationIndex] &&
//                   isValidLatLng({
//                     latitude:
//                       trip.userSelection.selectedCities[selectedLocationIndex]
//                         .latitude,
//                     longitude:
//                       trip.userSelection.selectedCities[selectedLocationIndex]
//                         .longitude,
//                   }) && (
//                     <Marker
//                       position={[
//                         trip.userSelection.selectedCities[selectedLocationIndex]
//                           .latitude,
//                         trip.userSelection.selectedCities[selectedLocationIndex]
//                           .longitude,
//                       ]}
//                     >
//                       <Popup>
//                         <div className="p-2">
//                           <div className="font-bold">
//                             {
//                               trip.userSelection.selectedCities[
//                                 selectedLocationIndex
//                               ].cityName
//                             }
//                           </div>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   )}
//                 {allActivities
//                   .filter((activity) => isValidLatLng(activity.coordinates))
//                   .map((activity, index) => (
//                     <Marker
//                       key={index}
//                       position={[
//                         parseFloat(activity.coordinates.latitude),
//                         parseFloat(activity.coordinates.longitude),
//                       ]}
//                     >
//                       <Popup>
//                         <div className="p-2">
//                           <div className="font-bold">{activity.placeName}</div>
//                           <div className="text-sm">
//                             {t('day')} {activity.dayNumber} - {t(activity.timeOfDay.toLowerCase())}
//                           </div>
//                           {activity.bestTimeToVisit && (
//                             <div className="text-sm text-gray-600">
//                               {t('bestTime')}: {activity.bestTimeToVisit}
//                             </div>
//                           )}
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ))}
//               </MapContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto p-4">
//         {[...Array(currentPlan.itinerary?.length || 0)].map((_, index) => {
//           const day = currentPlan.itinerary[index];
//           return (
//             <div key={index} className="border rounded-lg p-6 mb-6">
//               <div className="flex items-center gap-2 mb-6">
//                 <h2 className="text-2xl font-bold">{t('day')} {day.day}</h2>
//                 {day.theme && (
//                   <span className="text-gray-600">- {day.theme}</span>
//                 )}
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4">{t('morning')}</h3>
//                 {day.morning?.activity && renderActivity(day.morning.activity)}
//                 {day.morning?.breakfast && (
//                   <CategoryBox category={t('breakfast')}>
//                     {renderMeal(day.morning.breakfast)}
//                   </CategoryBox>
//                 )}
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4">{t('afternoon')}</h3>
//                 {day.afternoon?.activity &&
//                   renderActivity(day.afternoon.activity)}
//                 {day.afternoon?.lunch && (
//                   <CategoryBox category={t('lunch')}>
//                     {renderMeal(day.afternoon.lunch)}
//                   </CategoryBox>
//                 )}
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-xl font-semibold mb-4">{t('evening')}</h3>
//                 {day.evening?.activity && renderActivity(day.evening.activity)}
//                 {day.evening?.dinner && (
//                   <CategoryBox category={t('dinner')}>
//                     {renderMeal(day.evening.dinner)}
//                   </CategoryBox>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ViewTrip;