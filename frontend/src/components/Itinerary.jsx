// import React, { useEffect, useState } from "react";
// import { MapPin, Loader, RefreshCcw,Clock } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
// });

// const MapCenterHandler = ({ center }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (center) {
//       map.setView(center, 12);
//     }
//   }, [center, map]);

//   return null;
// };

// const Itinerary = ({ showLoginModal }) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [activitiesByDay, setActivitiesByDay] = useState({});
//   const [selectedCityActivities, setSelectedCityActivities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const geoapifyApiKey = import.meta.env.VITE_GEO_API;

//   const distributeActivities = (activities, duration) => {
//     console.log("Raw activities:", activities);

//     if (!activities || activities.length === 0) {
//       console.log("No activities to distribute");
//       return [];
//     }

//     // Shuffle activities
//     const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

//     // Separate different types of activities
//     const restaurants = {
//       breakfast: shuffledActivities.filter((activity) =>
//         activity.properties?.categories?.some(
//           (cat) => cat.includes("cafe") || cat.includes("breakfast")
//         )
//       ),
//       lunch: shuffledActivities.filter((activity) =>
//         activity.properties?.categories?.some(
//           (cat) => cat.includes("restaurant") || cat.includes("lunch")
//         )
//       ),
//       dinner: shuffledActivities.filter((activity) =>
//         activity.properties?.categories?.some(
//           (cat) => cat.includes("restaurant") || cat.includes("dinner")
//         )
//       ),
//     };
//     const otherActivities = shuffledActivities.filter(
//       (activity) =>
//         !activity.properties?.categories?.some(
//           (cat) => cat.includes("restaurant") || cat.includes("cafe")
//         )
//     );

//     console.log("Restaurants:", restaurants);
//     console.log("Other Activities:", otherActivities);

//     const activitiesPerDay = [];
//     //   for (let day = 0; day < duration; day++) {
//     //     const dayActivities = [];

//     //     // Add a restaurant for lunch or dinner
//     //     if (restaurants.length > 0) {
//     //       const lunchOrDinner = restaurants.pop();
//     //       dayActivities.push({
//     //         ...lunchOrDinner,
//     //         day: day + 1,
//     //         type: "meal",
//     //       });
//     //     }

//     //     // Add 3-4 other activities
//     //     const dayOtherActivities = otherActivities
//     //       .splice(0, Math.min(4, otherActivities.length))
//     //       .map((activity) => ({
//     //         ...activity,
//     //         day: day + 1,
//     //         type: "activity",
//     //       }));

//     //     dayActivities.push(...dayOtherActivities);

//     //     activitiesPerDay.push(dayActivities);

//     //     console.log(`Day ${day + 1} Activities:`, dayActivities);
//     //   }

//     //   return activitiesPerDay;
//     // };
//     const timeSlots = [
//       { name: "Early Morning", time: "06:00 AM", sortOrder: 1, type: "early_morning" },
//       { name: "Breakfast", time: "08:00 AM", sortOrder: 2, type: "breakfast" },
//       { name: "Morning Activity", time: "09:30 AM", sortOrder: 3, type: "morning" },
//       { name: "Late Morning Activity", time: "11:00 AM", sortOrder: 4, type: "late_morning" },
//       { name: "Lunch", time: "01:00 PM", sortOrder: 5, type: "lunch" },
//       { name: "Afternoon Activity", time: "02:30 PM", sortOrder: 6, type: "afternoon" },
//       { name: "Late Afternoon Activity", time: "04:00 PM", sortOrder: 7, type: "late_afternoon" },
//       { name: "Evening Activity", time: "06:00 PM", sortOrder: 8, type: "evening" },
//       { name: "Dinner", time: "07:30 PM", sortOrder: 9, type: "dinner" },
//       { name: "Night Activity", time: "09:00 PM", sortOrder: 10, type: "night" }
//     ];

//     // In the distributeActivities function, modify the sorting logic

//     for (let day = 0; day < duration; day++) {
//       const dayActivities = [];

//       // Distribute meals
//       const dayMeals = [
//         {
//           type: "breakfast",
//           slot: timeSlots.find((slot) => slot.type === "breakfast"),
//         },
//         {
//           type: "lunch",
//           slot: timeSlots.find((slot) => slot.type === "lunch"),
//         },
//         {
//           type: "dinner",
//           slot: timeSlots.find((slot) => slot.type === "dinner"),
//         },
//       ];

//       dayMeals.forEach((mealType) => {
//         if (restaurants[mealType.type].length > 0) {
//           const selectedRestaurant = restaurants[mealType.type].pop();
//           dayActivities.push({
//             ...selectedRestaurant,
//             day: day + 1,
//             type: mealType.type,
//             timeSlot: mealType.slot,
//           });
//         }
//       });

//       // Distribute other activities
//       const activitySlots = [
//         {
//           type: "morning",
//           slot: timeSlots.find((slot) => slot.type === "morning"),
//         },
//         {
//           type: "late_morning",
//           slot: timeSlots.find((slot) => slot.type === "late_morning"),
//         },
//         {
//           type: "afternoon",
//           slot: timeSlots.find((slot) => slot.type === "afternoon"),
//         },
//         {
//           type: "evening",
//           slot: timeSlots.find((slot) => slot.type === "evening"),
//         },
//       ];

//       activitySlots.forEach((activitySlot) => {
//         if (otherActivities.length > 0) {
//           const selectedActivity = otherActivities.pop();
//           dayActivities.push({
//             ...selectedActivity,
//             day: day + 1,
//             type: "activity",
//             timeSlot: activitySlot.slot,
//           });
//         }
//       });

//       // Sort activities by time
//       dayActivities.sort((a, b) => {
//         const timeSlotA = a.timeSlot || { sortOrder: Infinity };
//         const timeSlotB = b.timeSlot || { sortOrder: Infinity };
//         return timeSlotA.sortOrder - timeSlotB.sortOrder;
//       });

//       activitiesPerDay.push(dayActivities);

//       console.log(`Day ${day + 1} Activities:`, dayActivities);
//     }

//     return activitiesPerDay;
//   };
//   useEffect(() => {
//     // Reset loading state and clear previous data
//     setIsLoading(true);
//     setActivitiesByDay({});
//     setSelectedCityActivities([]);

//     const storedCities =
//       JSON.parse(localStorage.getItem("selectedCities")) || [];
//     console.log("Stored Cities:", storedCities);

//     setSelectedCities(storedCities);

//     if (storedCities && storedCities.length > 0) {
//       const activitiesFetches = storedCities.map((city) => {
//         const { latitude, longitude, cityName, duration } = city;

//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=50&apiKey=${geoapifyApiKey}`;

//         return fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             console.log(`Activities for ${cityName}:`, result);

//             const distributedActivities = distributeActivities(
//               result.features,
//               duration || 3
//             );

//             return {
//               cityName,
//               distributedActivities,
//             };
//           })
//           .catch((error) => {
//             console.error(`Error fetching activities for ${cityName}:`, error);
//             return {
//               cityName,
//               distributedActivities: [],
//             };
//           });
//       });

//       Promise.all(activitiesFetches)
//         .then((citiesActivities) => {
//           console.log("Cities Activities:", citiesActivities);

//           const activitiesMap = citiesActivities.reduce((acc, city) => {
//             acc[city.cityName] = city.distributedActivities;
//             return acc;
//           }, {});

//           setActivitiesByDay(activitiesMap);

//           // Automatically select the first city when multiple cities are loaded
//           const firstCity = storedCities[0];
//           setSelectedCity(firstCity);
//           setSelectedCityActivities(activitiesMap[firstCity.cityName] || []);

//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error in activities processing:", error);
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   // const handleCitySelect = (city) => {
//   //   setSelectedCity(city);
//   //   setSelectedCityActivities(activitiesByDay[city.cityName] || []);
//   // };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <RefreshCcw className="animate-spin w-16 h-16 text-blue-500 mb-4" />
//         <p className="text-xl font-semibold text-gray-700">
//           Please wait, loading your itinerary...
//         </p>
//       </div>
//     );
//   }

//   if (selectedCities.length === 0) {
//     return (
//       <div className="p-4 text-red-500">
//         No cities selected. Please select cities first.
//       </div>
//     );
//   }
//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     setSelectedCityActivities(activitiesByDay[city.cityName] || []);
//     // Reset selected location when changing cities
//     setSelectedLocation(null);
//   };

//   const handleLocationClick = (location) => {
//     // If the location has coordinates, set it as the selected location
//     if (location.geometry?.coordinates) {
//       const [lon, lat] = location.geometry.coordinates;
//       setSelectedLocation([lat, lon]);
//     }
//   };
//   return (
//     <div className={`container mx-auto p-4 ${showLoginModal ? "blur-sm" : ""}`}>
//       {selectedCities.length > 1 && (
//         <div className="flex flex-wrap gap-4 mb-4">
//           {selectedCities.map((city, index) => (
//             <button
//               key={index}
//               onClick={() => handleCitySelect(city)}
//               className={`px-4 py-2 rounded ${
//                 selectedCity === city ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {city.cityName}
//             </button>
//           ))}
//         </div>
//       )}

//       {selectedCity && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4">
//             Itinerary for {selectedCity.cityName}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <MapContainer
//                 center={[selectedCity.latitude, selectedCity.longitude]}
//                 zoom={12}
//                 style={{ height: "400px", width: "100%" }}
//               >
//                 <MapCenterHandler
//                   center={
//                     selectedLocation || [
//                       selectedCity.latitude,
//                       selectedCity.longitude,
//                     ]
//                   }
//                 />
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />

//                 <Marker
//                   position={[selectedCity.latitude, selectedCity.longitude]}
//                 >
//                   <Popup>{selectedCity.cityName}</Popup>
//                 </Marker>

//                 {selectedCityActivities.flat().map((activity, index) => {
//                   const [lon, lat] = activity.geometry?.coordinates || [];
//                   return lon && lat ? (
//                     <Marker
//                       key={index}
//                       position={[lat, lon]}
//                       eventHandlers={{
//                         click: () => handleLocationClick(activity),
//                       }}
//                     >
//                       <Popup>
//                         <div>
//                           <h3>
//                             {activity.properties?.name || "Unnamed Place"}
//                           </h3>
//                           <p>{activity.properties?.categories?.join(", ")}</p>
//                           <button
//                             onClick={() => handleLocationClick(activity)}
//                             className="text-blue-500 underline"
//                           >
//                             Center on Map
//                           </button>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ) : null;
//                 })}
//               </MapContainer>
//             </div>

//             <div>
//               {selectedCityActivities.map((dayActivities, dayIndex) => (
//                 <div key={dayIndex} className="mb-4">
//                   <h3 className="text-xl font-semibold">Day {dayIndex + 1}</h3>
//                   {dayActivities.length === 0 ? (
//                     <p className="text-gray-500">No activities for this day</p>
//                   ) : (
//                     dayActivities.map((activity, activityIndex) => (
//                       <div
//                         key={activityIndex}
//                         className="bg-white shadow rounded-lg p-3 mb-2"
//                       >

//                         <div>
//                         {/* <Clock className="mr-3 text-blue-500" size={24} /> */}
//                           <div className="flex justify-between items-center">
//                             <h4 className="font-bold">
//                               {activity.properties?.name || "Unnamed Activity"}
//                             </h4>
//                             {activity.timeSlot && (
//                               <span className="text-sm text-gray-600">
//                                 {activity.timeSlot.time}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-600">
//                             {activity.properties?.categories?.join(", ") ||
//                               "No categories"}
//                           </p>
//                           {activity.type && (
//                             <p className="text-xs text-blue-500">
//                               {activity.type}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Itinerary;

//REAL CODE

// import React, { useEffect, useState } from "react";
// import { MapPin, Loader, RefreshCcw, Clock } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
// });

// const MapCenterHandler = ({ center }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (center) {
//       map.setView(center, 12);
//     }
//   }, [center, map]);

//   return null;
// };

// const Itinerary = ({ showLoginModal }) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [activitiesByDay, setActivitiesByDay] = useState({});
//   const [selectedCityActivities, setSelectedCityActivities] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [travelDetails, setTravelDetails] = useState({ count: 1, type: "Solo" });
//   const geoapifyApiKey = import.meta.env.VITE_GEO_API;

//   // The distributeActivities function remains the same as in your original code
//   // [Previous distributeActivities implementation]
//   const distributeActivities = (activities, duration) => {
//     console.log("Raw activities:", activities);

//     if (!activities || activities.length === 0) {
//       console.log("No activities to distribute");
//       return [];
//     }

//     // Shuffle activities
//     const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

//     // Separate different types of activities
//     const restaurants = {
//       breakfast: shuffledActivities.filter((activity) =>
//         activity.properties?.categories?.some(
//           (cat) => cat.includes("cafe") || cat.includes("breakfast")
//         )
//       ),
//       lunch: shuffledActivities.filter((activity) =>
//         activity.properties?.categories?.some(
//           (cat) => cat.includes("restaurant") || cat.includes("lunch")
//         )
//       ),
//       dinner: shuffledActivities.filter((activity) =>
//         activity.properties?.categories?.some(
//           (cat) => cat.includes("restaurant") || cat.includes("dinner")
//         )
//       ),
//     };
//     const otherActivities = shuffledActivities.filter(
//       (activity) =>
//         !activity.properties?.categories?.some(
//           (cat) => cat.includes("restaurant") || cat.includes("cafe")
//         )
//     );

//     console.log("Restaurants:", restaurants);
//     console.log("Other Activities:", otherActivities);

//     const activitiesPerDay = [];
//     //   for (let day = 0; day < duration; day++) {
//     //     const dayActivities = [];

//     //     // Add a restaurant for lunch or dinner
//     //     if (restaurants.length > 0) {
//     //       const lunchOrDinner = restaurants.pop();
//     //       dayActivities.push({
//     //         ...lunchOrDinner,
//     //         day: day + 1,
//     //         type: "meal",
//     //       });
//     //     }

//     //     // Add 3-4 other activities
//     //     const dayOtherActivities = otherActivities
//     //       .splice(0, Math.min(4, otherActivities.length))
//     //       .map((activity) => ({
//     //         ...activity,
//     //         day: day + 1,
//     //         type: "activity",
//     //       }));

//     //     dayActivities.push(...dayOtherActivities);

//     //     activitiesPerDay.push(dayActivities);

//     //     console.log(`Day ${day + 1} Activities:`, dayActivities);
//     //   }

//     //   return activitiesPerDay;
//     // };
//     const timeSlots = [
//       { name: "Early Morning", time: "06:00 AM", sortOrder: 1, type: "early_morning" },
//       { name: "Breakfast", time: "08:00 AM", sortOrder: 2, type: "breakfast" },
//       { name: "Morning Activity", time: "09:30 AM", sortOrder: 3, type: "morning" },
//       { name: "Late Morning Activity", time: "11:00 AM", sortOrder: 4, type: "late_morning" },
//       { name: "Lunch", time: "01:00 PM", sortOrder: 5, type: "lunch" },
//       { name: "Afternoon Activity", time: "02:30 PM", sortOrder: 6, type: "afternoon" },
//       { name: "Late Afternoon Activity", time: "04:00 PM", sortOrder: 7, type: "late_afternoon" },
//       { name: "Evening Activity", time: "06:00 PM", sortOrder: 8, type: "evening" },
//       { name: "Dinner", time: "07:30 PM", sortOrder: 9, type: "dinner" },
//       { name: "Night Activity", time: "09:00 PM", sortOrder: 10, type: "night" }
//     ];

//     // In the distributeActivities function, modify the sorting logic

//     for (let day = 0; day < duration; day++) {
//       const dayActivities = [];

//       // Distribute meals
//       const dayMeals = [
//         {
//           type: "breakfast",
//           slot: timeSlots.find((slot) => slot.type === "breakfast"),
//         },
//         {
//           type: "lunch",
//           slot: timeSlots.find((slot) => slot.type === "lunch"),
//         },
//         {
//           type: "dinner",
//           slot: timeSlots.find((slot) => slot.type === "dinner"),
//         },
//       ];

//       dayMeals.forEach((mealType) => {
//         if (restaurants[mealType.type].length > 0) {
//           const selectedRestaurant = restaurants[mealType.type].pop();
//           dayActivities.push({
//             ...selectedRestaurant,
//             day: day + 1,
//             type: mealType.type,
//             timeSlot: mealType.slot,
//           });
//         }
//       });

//       // Distribute other activities
//       const activitySlots = [
//         {
//           type: "morning",
//           slot: timeSlots.find((slot) => slot.type === "morning"),
//         },
//         {
//           type: "late_morning",
//           slot: timeSlots.find((slot) => slot.type === "late_morning"),
//         },
//         {
//           type: "afternoon",
//           slot: timeSlots.find((slot) => slot.type === "afternoon"),
//         },
//         {
//           type: "evening",
//           slot: timeSlots.find((slot) => slot.type === "evening"),
//         },
//       ];

//       activitySlots.forEach((activitySlot) => {
//         if (otherActivities.length > 0) {
//           const selectedActivity = otherActivities.pop();
//           dayActivities.push({
//             ...selectedActivity,
//             day: day + 1,
//             type: "activity",
//             timeSlot: activitySlot.slot,
//           });
//         }
//       });

//       // Sort activities by time
//       dayActivities.sort((a, b) => {
//         const timeSlotA = a.timeSlot || { sortOrder: Infinity };
//         const timeSlotB = b.timeSlot || { sortOrder: Infinity };
//         return timeSlotA.sortOrder - timeSlotB.sortOrder;
//       });

//       activitiesPerDay.push(dayActivities);

//       console.log(`Day ${day + 1} Activities:`, dayActivities);
//     }

//     return activitiesPerDay;
//   };
//   useEffect(() => {
//     setIsLoading(true);
//     setActivitiesByDay({});
//     setSelectedCityActivities([]);

//     // Get the updated JSON format from localStorage
//     const storedData = JSON.parse(localStorage.getItem("selectedCitiesData")) || {
//       selectedCities: [],
//       travelCount: 1,
//       travelType: "Solo"
//     };

//     const { selectedCities: cities, travelCount, travelType } = storedData;
//     console.log("Stored Data:", storedData);

//     setSelectedCities(cities);
//     setTravelDetails({ count: travelCount, type: travelType });

//     if (cities && cities.length > 0) {
//       const activitiesFetches = cities.map((city) => {
//         const { latitude, longitude, cityName, duration } = city;

//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=50&apiKey=${geoapifyApiKey}`;

//         return fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             console.log(`Activities for ${cityName}:`, result);

//             const distributedActivities = distributeActivities(
//               result.features,
//               duration // Using the duration from the city object
//             );

//             return {
//               cityName,
//               distributedActivities,
//             };
//           })
//           .catch((error) => {
//             console.error(`Error fetching activities for ${cityName}:`, error);
//             return {
//               cityName,
//               distributedActivities: [],
//             };
//           });
//       });

//       Promise.all(activitiesFetches)
//         .then((citiesActivities) => {
//           console.log("Cities Activities:", citiesActivities);

//           const activitiesMap = citiesActivities.reduce((acc, city) => {
//             acc[city.cityName] = city.distributedActivities;
//             return acc;
//           }, {});

//           setActivitiesByDay(activitiesMap);

//           if (cities.length > 0) {
//             const firstCity = cities[0];
//             setSelectedCity(firstCity);
//             setSelectedCityActivities(activitiesMap[firstCity.cityName] || []);
//           }

//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error in activities processing:", error);
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <RefreshCcw className="animate-spin w-16 h-16 text-blue-500 mb-4" />
//         <p className="text-xl font-semibold text-gray-700">
//           Please wait, loading your itinerary...
//         </p>
//       </div>
//     );
//   }

//   if (selectedCities.length === 0) {
//     return (
//       <div className="p-4 text-red-500">
//         No cities selected. Please select cities first.
//       </div>
//     );
//   }

//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     setSelectedCityActivities(activitiesByDay[city.cityName] || []);
//     setSelectedLocation(null);
//   };

//   const handleLocationClick = (location) => {
//     if (location.geometry?.coordinates) {
//       const [lon, lat] = location.geometry.coordinates;
//       setSelectedLocation([lat, lon]);
//     }
//   };

//   return (
//     <div className={`container mx-auto p-4 ${showLoginModal ? "blur-sm" : ""}`}>
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold mb-2">Your Travel Plan</h1>
//         <p className="text-gray-600">
//           {travelDetails.type} Trip • {travelDetails.count} {travelDetails.count > 1 ? 'Travelers' : 'Traveler'}
//         </p>
//       </div>

//       {selectedCities.length > 1 && (
//         <div className="flex flex-wrap gap-4 mb-4">
//           {selectedCities.map((city, index) => (
//             <button
//               key={index}
//               onClick={() => handleCitySelect(city)}
//               className={`px-4 py-2 rounded ${
//                 selectedCity === city ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {city.cityName} ({city.duration} days)
//             </button>
//           ))}
//         </div>
//       )}

//       {selectedCity && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4">
//             Itinerary for {selectedCity.cityName} - {selectedCity.duration} days
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <MapContainer
//                 center={[selectedCity.latitude, selectedCity.longitude]}
//                 zoom={12}
//                 style={{ height: "400px", width: "100%" }}
//               >
//                 <MapCenterHandler
//                   center={
//                     selectedLocation || [
//                       selectedCity.latitude,
//                       selectedCity.longitude,
//                     ]
//                   }
//                 />
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />

//                 <Marker
//                   position={[selectedCity.latitude, selectedCity.longitude]}
//                 >
//                   <Popup>{selectedCity.cityName}</Popup>
//                 </Marker>

//                 {selectedCityActivities.flat().map((activity, index) => {
//                   const [lon, lat] = activity.geometry?.coordinates || [];
//                   return lon && lat ? (
//                     <Marker
//                       key={index}
//                       position={[lat, lon]}
//                       eventHandlers={{
//                         click: () => handleLocationClick(activity),
//                       }}
//                     >
//                       <Popup>
//                         <div>
//                           <h3>
//                             {activity.properties?.name || "Unnamed Place"}
//                           </h3>
//                           <p>{activity.properties?.categories?.join(", ")}</p>
//                           <button
//                             onClick={() => handleLocationClick(activity)}
//                             className="text-blue-500 underline"
//                           >
//                             Center on Map
//                           </button>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ) : null;
//                 })}
//               </MapContainer>
//             </div>

//             <div>
//               {selectedCityActivities.map((dayActivities, dayIndex) => (
//                 <div key={dayIndex} className="mb-4">
//                   <h3 className="text-xl font-semibold">Day {dayIndex + 1}</h3>
//                   {dayActivities.length === 0 ? (
//                     <p className="text-gray-500">No activities for this day</p>
//                   ) : (
//                     dayActivities.map((activity, activityIndex) => (
//                       <div
//                         key={activityIndex}
//                         className="bg-white shadow rounded-lg p-3 mb-2"
//                       >
//                         <div>
//                           <div className="flex justify-between items-center">
//                             <h4 className="font-bold">
//                               {activity.properties?.name || "Unnamed Activity"}
//                             </h4>
//                             {activity.timeSlot && (
//                               <span className="text-sm text-gray-600">
//                                 {activity.timeSlot.time}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-600">
//                             {activity.properties?.categories?.join(", ") ||
//                               "No categories"}
//                           </p>
//                           {activity.type && (
//                             <p className="text-xs text-blue-500">
//                               {activity.type}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Itinerary;

// import React, { useEffect, useState } from "react";
// import { MapPin, Loader, RefreshCcw, Clock } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
// });

// const MapCenterHandler = ({ center }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (center) {
//       map.setView(center, 12);
//     }
//   }, [center, map]);

//   return null;
// };

// const Itinerary = ({ showLoginModal }) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [travelPlans, setTravelPlans] = useState({});
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [travelDetails, setTravelDetails] = useState({ count: 1, type: "Solo" });

//   useEffect(() => {
//     setIsLoading(true);
//     try {
//       // Get the stored travel plans from localStorage
//       const storedTravelPlans = localStorage.getItem("travelPlans");
//       console.log("Stored Travel Plans:", storedTravelPlans); // Debug log

//       const storedData = JSON.parse(localStorage.getItem("selectedCitiesData")) || {
//         selectedCities: [],
//         travelCount: 1,
//         travelType: "Solo"
//       };

//       const { selectedCities: cities, travelCount, travelType } = storedData;
//       console.log("Stored Cities Data:", storedData); // Debug log

//       if (storedTravelPlans && cities.length > 0) {
//         const parsedTravelPlans = JSON.parse(storedTravelPlans);
//         console.log("Parsed Travel Plans:", parsedTravelPlans); // Debug log

//         setTravelPlans(parsedTravelPlans);
//         setSelectedCities(cities);
//         setTravelDetails({ count: travelCount, type: travelType });

//         if (cities.length > 0) {
//           setSelectedCity(cities[0]);
//         }
//       }
//     } catch (error) {
//       console.error("Error loading travel plans:", error);
//     }
//     setIsLoading(false);
//   }, []);

//   // Add this debug log
//   useEffect(() => {
//     console.log("Current Travel Plans State:", travelPlans);
//     console.log("Selected City:", selectedCity);
//   }, [travelPlans, selectedCity]);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <RefreshCcw className="animate-spin w-16 h-16 text-blue-500 mb-4" />
//         <p className="text-xl font-semibold text-gray-700">
//           Please wait, loading your itinerary...
//         </p>
//       </div>
//     );
//   }

//   if (selectedCities.length === 0) {
//     return (
//       <div className="p-4 text-red-500">
//         No cities selected. Please select cities first.
//       </div>
//     );
//   }

//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     setSelectedLocation(null);
//   };

//   const handleLocationClick = (location) => {
//     if (location.coordinates) {
//       const [lat, lon] = location.coordinates;
//       setSelectedLocation([lat, lon]);
//     }
//   };

//   const renderDayPlan = (dayPlan, dayIndex) => {
//     return (
//       <div key={dayIndex} className="mb-6 bg-white rounded-lg shadow p-4">
//         <h3 className="text-xl font-semibold mb-4">Day {dayIndex + 1}</h3>

//         {/* Activities */}
//         {dayPlan.activities?.map((activity, index) => (
//           <div key={index} className="mb-4 border-b pb-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h4 className="font-bold text-lg">{activity.placeName}</h4>
//                 <p className="text-sm text-gray-600 mt-1">{activity.placeDetails}</p>
//                 <div className="flex items-center mt-2">
//                   <Clock className="w-4 h-4 mr-2" />
//                   <span className="text-sm">{activity.timeToVisit}</span>
//                 </div>
//                 {activity.ticketPricing && (
//                   <p className="text-sm text-gray-700 mt-1">
//                     Ticket: ${activity.ticketPricing}
//                   </p>
//                 )}
//                 {activity.rating && (
//                   <div className="flex items-center mt-1">
//                     <span className="text-yellow-500">★</span>
//                     <span className="text-sm ml-1">{activity.rating}</span>
//                   </div>
//                 )}
//               </div>
//               {activity.placeImageUrl && (
//                 <img
//                   src={activity.placeImageUrl}
//                   alt={activity.placeName}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               )}
//             </div>
//           </div>
//         ))}

//         {/* Meals */}
//         {dayPlan.meals?.map((meal, index) => (
//           <div key={index} className="mb-4">
//             <h5 className="font-semibold text-gray-700 capitalize">{meal.type}</h5>
//             <div className="bg-gray-50 rounded p-3 mt-2">
//               <p className="font-medium">{meal.restaurantName}</p>
//               <p className="text-sm text-gray-600">{meal.description}</p>
//               {meal.rating && (
//                 <div className="flex items-center mt-1">
//                   <span className="text-yellow-500">★</span>
//                   <span className="text-sm ml-1">{meal.rating}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className={`container mx-auto p-4 ${showLoginModal ? "blur-sm" : ""}`}>
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold mb-2">Your Travel Plan</h1>
//         <p className="text-gray-600">
//           {travelDetails.type} Trip • {travelDetails.count} {travelDetails.count > 1 ? 'Travelers' : 'Traveler'}
//         </p>
//       </div>

//       {selectedCities.length > 1 && (
//         <div className="flex flex-wrap gap-4 mb-4">
//           {selectedCities.map((city, index) => (
//             <button
//               key={index}
//               onClick={() => handleCitySelect(city)}
//               className={`px-4 py-2 rounded ${
//                 selectedCity === city ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {city.cityName} ({city.duration} days)
//             </button>
//           ))}
//         </div>
//       )}

//       {selectedCity && travelPlans[selectedCity.cityName] && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4">
//             Itinerary for {selectedCity.cityName} - {selectedCity.duration} days
//           </h2>

//           {/* Hotels Section */}
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">Recommended Hotels</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {travelPlans[selectedCity.cityName].hotels.map((hotel, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow p-4">
//                   <img
//                     src={hotel.hotelImageUrl}
//                     alt={hotel.hotelName}
//                     className="w-full h-48 object-cover rounded-lg mb-4"
//                   />
//                   <h4 className="font-bold text-lg">{hotel.hotelName}</h4>
//                   <p className="text-sm text-gray-600 mb-2">{hotel.hotelAddress}</p>
//                   <p className="text-lg font-semibold text-blue-600 mb-2">
//                     ${hotel.price}/night
//                   </p>
//                   <div className="flex items-center mb-2">
//                     <span className="text-yellow-500">★</span>
//                     <span className="ml-1">{hotel.rating}</span>
//                   </div>
//                   <p className="text-sm text-gray-700">{hotel.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Map Section */}
//             <div>
//               <MapContainer
//                 center={[selectedCity.latitude, selectedCity.longitude]}
//                 zoom={12}
//                 style={{ height: "400px", width: "100%" }}
//               >
//                 <MapCenterHandler
//                   center={
//                     selectedLocation || [
//                       selectedCity.latitude,
//                       selectedCity.longitude,
//                     ]
//                   }
//                 />
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />

//                 {/* City Marker */}
//                 <Marker position={[selectedCity.latitude, selectedCity.longitude]}>
//                   <Popup>{selectedCity.cityName}</Popup>
//                 </Marker>

//                 {/* Activity Markers */}
//                 {travelPlans[selectedCity.cityName].dailyPlans.flatMap((day) =>
//                   day.activities.map((activity, index) => (
//                     activity.coordinates && (
//                       <Marker
//                         key={`activity-${index}`}
//                         position={activity.coordinates}
//                         eventHandlers={{
//                           click: () => handleLocationClick(activity),
//                         }}
//                       >
//                         <Popup>
//                           <div>
//                             <h3 className="font-bold">{activity.placeName}</h3>
//                             <p className="text-sm">{activity.placeDetails}</p>
//                           </div>
//                         </Popup>
//                       </Marker>
//                     )
//                   ))
//                 )}

//                 {/* Hotel Markers */}
//                 {travelPlans[selectedCity.cityName].hotels.map((hotel, index) => (
//                   hotel.coordinates && (
//                     <Marker
//                       key={`hotel-${index}`}
//                       position={hotel.coordinates}
//                     >
//                       <Popup>
//                         <div>
//                           <h3 className="font-bold">{hotel.hotelName}</h3>
//                           <p className="text-sm">{hotel.hotelAddress}</p>
//                           <p className="text-sm font-semibold">${hotel.price}/night</p>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   )
//                 ))}
//               </MapContainer>
//             </div>

//             {/* Daily Plans Section */}
//             <div className="overflow-y-auto max-h-[600px]">
//               {travelPlans[selectedCity.cityName].dailyPlans.map((dayPlan, index) =>
//                 renderDayPlan(dayPlan, index)
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Itinerary;

// WORKING CODE FOR ONE LOCATION

import React, { useEffect, useState } from "react";
import { MapPin, Loader, RefreshCcw, Clock } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { chatSession } from "../service/AIModal";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapCenterHandler = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 12);
    }
  }, [center, map]);

  return null;
};

const Itinerary = ({ showLoginModal }) => {
  const [itineraryData, setItineraryData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = JSON.parse(localStorage.getItem("selectedCitiesData"));

        if (data && Array.isArray(data.selectedCities)) {
          const { selectedCities, travelType, travelCount } = data;

          const citiesDetails = selectedCities
            .map(
              (city) =>
                `{${city.cityName}, for ${city.duration} Days, latitude of ${city.latitude}, longitude of ${city.longitude}}`
            )
            .join(", ");

          const FINAL_PROMPT = `Generate Travel Plan for multiple location based on length of cities - for each Location: ${citiesDetails} for ${travelType} of ${travelCount} people with a Cheap budget. 
          Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel, and include some restaurants, cafes for all breakfast, lunch, dinner and snacks for each location for each city duration with each day plan with best time to visit in JSON format.`;
          console.log(FINAL_PROMPT);

          const result = await chatSession.sendMessage(FINAL_PROMPT);

          const responseText = result?.response?.text();
          console.log(responseText);
          // Try to parse the response text into JSON
          let parsedData;
          try {
            parsedData = JSON.parse(responseText);
            if (!parsedData) {
              throw new Error("Parsed data is null or undefined");
            }
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            throw new Error("Failed to parse API response");
          }

          const transformedData = transformTravelPlans(parsedData);
          if (!transformedData || !transformedData.cities) {
            throw new Error("Invalid transformed data structure");
          }
          setItineraryData(transformedData);

          if (transformedData.cities && transformedData.cities.length > 0) {
            setSelectedCity(transformedData.cities[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error);
        setError("Failed to fetch itinerary. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerary();
  }, []);

  // const transformTravelPlans = (data) => {
  //   // Check if data exists and has the expected structure
  //   if (!data) {
  //     console.error('No data provided to transformTravelPlans');
  //     return null;
  //   }

  //   // Handle single location case
  //   let travelPlans;
  //   if (data.travelPlans) {
  //     // If data comes wrapped in travelPlans array
  //     travelPlans = Array.isArray(data.travelPlans) ? data.travelPlans : [data.travelPlans];
  //   } else {
  //     // If data is direct object or array
  //     travelPlans = Array.isArray(data) ? data : [data];
  //   }
  //   const selectedCitiesData = JSON.parse(
  //     localStorage.getItem("selectedCitiesData")
  //   );
  //   return {
  //     travelType: selectedCitiesData?.travelType || "Unknown",
  //     travelCount: selectedCitiesData?.travelCount || 1,
  //     cities: travelPlans.map((plan, index) => ({
  //       cityName: plan.location || selectedCitiesData?.selectedCities[index]?.cityName || "Unknown City",
  //       duration: parseInt(plan.duration) || selectedCitiesData?.selectedCities[index]?.duration || 1,
  //       latitude: parseFloat(plan.latitude) || selectedCitiesData?.selectedCities[index]?.latitude || 0,
  //       longitude: parseFloat(plan.longitude) || selectedCitiesData?.selectedCities[index]?.longitude || 0,
  //       hotels: (plan.hotelOptions || []).map((hotel) => ({
  //         name: hotel.hotelName,
  //         address: hotel.hotelAddress,
  //         price: hotel.price,
  //         imageUrl: hotel.hotelImageUrl,
  //         coordinates: [
  //           parseFloat(hotel.geoCoordinates?.latitude),
  //           parseFloat(hotel.geoCoordinates?.longitude),
  //         ],
  //         rating: hotel.rating,
  //         description: hotel.description,
  //       })),
  //       restaurantSuggestions: {
  //         breakfastOptions: (plan.restaurantSuggestions?.breakfastOptions || []).map(option => ({
  //           name: option.name,
  //           cuisine: option.cuisine,
  //           priceRange: option.priceRange,
  //           description: option.description,
  //           locationDetails: option.locationDetails,
  //         })),
  //         cafeOptions: (plan.restaurantSuggestions?.cafeOptions || []).map(option => ({
  //           name: option.name,
  //           cuisine: option.cuisine,
  //           priceRange: option.priceRange,
  //           description: option.description,
  //           locationDetails: option.locationDetails,
  //         })),
  //         snackOptions: (plan.restaurantSuggestions?.snackOptions || []).map(option => ({
  //           name: option.name,
  //           cuisine: option.cuisine,
  //           priceRange: option.priceRange,
  //           description: option.description,
  //           locationDetails: option.locationDetails,
  //         })),
  //       },
  //       itinerary: plan.itinerary
  //         ? Object.entries(plan.itinerary)
  //             .filter(([key]) => key.startsWith("day"))
  //             .map(([key, dayData]) => {
  //               const activities = [];

  //               // Breakfast
  //               if (dayData?.morning?.breakfast) {
  //                 activities.push({
  //                   placeName: dayData.morning.breakfast,
  //                   placeDetails: dayData.morning.breakfastDetails || "Start your day with breakfast",
  //                   type: "breakfast",
  //                   timeToVisit: "8:00 AM - 9:00 AM",
  //                   order: 1
  //                 });
  //               }

  //               // Morning activity
  //               if (dayData?.morning?.activity) {
  //                 activities.push({
  //                   placeName: dayData.morning.activity,
  //                   placeDetails: dayData.morning.description || "",
  //                   imageUrl: dayData.morning.placeImageUrl,
  //                   coordinates: dayData.morning?.geoCoordinates ? [
  //                     parseFloat(dayData.morning.geoCoordinates.latitude),
  //                     parseFloat(dayData.morning.geoCoordinates.longitude),
  //                   ] : null,
  //                   ticketPrice: dayData.morning.ticketPricing,
  //                   rating: dayData.morning.rating,
  //                   type: "activity",
  //                   timeToVisit: "9:30 AM - 12:00 PM",
  //                   order: 2
  //                 });
  //               }

  //               // Lunch
  //               if (dayData?.midday?.diningSuggestion?.lunch) {
  //                 activities.push({
  //                   placeName: dayData.midday.diningSuggestion.lunch,
  //                   placeDetails: dayData.midday.diningSuggestion.lunchDetails || "Lunch break",
  //                   type: "lunch",
  //                   timeToVisit: "12:00 PM - 1:30 PM",
  //                   ticketPrice: dayData.midday.diningSuggestion.priceRange,
  //                   order: 3
  //                 });
  //               }

  //               // Afternoon activity
  //               if (dayData?.afternoon?.activity) {
  //                 activities.push({
  //                   placeName: dayData.afternoon.activity,
  //                   placeDetails: dayData.afternoon.placeDetails || "",
  //                   imageUrl: dayData.afternoon.placeImageUrl,
  //                   coordinates: dayData.afternoon?.geoCoordinates ? [
  //                     parseFloat(dayData.afternoon.geoCoordinates.latitude),
  //                     parseFloat(dayData.afternoon.geoCoordinates.longitude),
  //                   ] : null,
  //                   ticketPrice: dayData.afternoon.ticketPricing,
  //                   rating: dayData.afternoon.rating,
  //                   type: "activity",
  //                   timeToVisit: "2:00 PM - 5:00 PM",
  //                   order: 4
  //                 });
  //               }

  //               // Evening snack
  //               if (dayData?.evening?.snack) {
  //                 activities.push({
  //                   placeName: dayData.evening.snack,
  //                   placeDetails: dayData.evening.snackDetails || "Evening refreshments",
  //                   type: "snack",
  //                   timeToVisit: "5:00 PM - 5:30 PM",
  //                   order: 5
  //                 });
  //               }

  //               // Evening activity
  //               if (dayData?.evening?.activity) {
  //                 activities.push({
  //                   placeName: dayData.evening.activity,
  //                   placeDetails: dayData.evening.placeDetails || "",
  //                   imageUrl: dayData.evening.placeImageUrl,
  //                   coordinates: dayData.evening?.geoCoordinates ? [
  //                     parseFloat(dayData.evening.geoCoordinates.latitude),
  //                     parseFloat(dayData.evening.geoCoordinates.longitude),
  //                   ] : null,
  //                   ticketPrice: dayData.evening.ticketPricing,
  //                   rating: dayData.evening.rating,
  //                   type: "activity",
  //                   timeToVisit: "5:30 PM - 7:30 PM",
  //                   order: 6
  //                 });
  //               }

  //               // Dinner
  //               if (dayData?.evening?.diningSuggestion?.dinner) {
  //                 activities.push({
  //                   placeName: dayData.evening.diningSuggestion.dinner,
  //                   placeDetails: dayData.evening.diningSuggestion.dinnerDetails || "Dinner time",
  //                   type: "dinner",
  //                   timeToVisit: "7:30 PM - 9:00 PM",
  //                   ticketPrice: dayData.evening.diningSuggestion.priceRange,
  //                   order: 7
  //                 });
  //               }

  //               // Add checkout message for the last day
  //               if (parseInt(key.replace("day", "")) === plan.duration) {
  //                 activities.push({
  //                   placeName: "Hotel Checkout",
  //                   placeDetails: "Time to say goodbye! Please ensure you check out from your hotel by 11:00 AM.",
  //                   type: "checkout",
  //                   timeToVisit: "11:00 AM",
  //                   order: 8
  //                 });
  //               }

  //               return {
  //                 day: parseInt(key.replace("day", "")) || 1,
  //                 theme: dayData?.theme || "",
  //                 bestTimeToVisit: dayData?.bestTimeToVisit || "",
  //                 activities: activities.sort((a, b) => a.order - b.order)
  //               };
  //             })
  //         : [] // Return empty array if plan.itinerary is null or undefined
  //     })),
  //   };
  // };
  const transformTravelPlans = (data) => {
    // Check if data exists
    if (!data) {
      console.error("No data provided to transformTravelPlans");
      return null;
    }
  
    // Normalize the data structure
    let travelPlans;
    if (data.travelPlan) {
      // If data comes with a single travelPlan object
      travelPlans = [data.travelPlan];
    } else if (data.travelPlans) {
      // If data comes wrapped in travelPlans array
      travelPlans = Array.isArray(data.travelPlans) ? data.travelPlans : [data.travelPlans];
    } else {
      // If data is direct object or array
      travelPlans = Array.isArray(data) ? data : [data];
    }
  
    const selectedCitiesData = JSON.parse(
      localStorage.getItem("selectedCitiesData")
    );
  
    return {
      travelType: selectedCitiesData?.travelType || "Unknown",
      travelCount: selectedCitiesData?.travelCount || 1,
      cities: travelPlans.map((plan, index) => {
        // Get the corresponding city data from localStorage if available
        const cityData = selectedCitiesData?.selectedCities?.[index] || {};
  
        return {
          cityName: plan.location || cityData.cityName || "Unknown City",
          duration: parseInt(String(plan.duration)) || parseInt(cityData.duration) || 1,
          latitude: parseFloat(plan.latitude) || parseFloat(cityData.latitude) || 0,
          longitude: parseFloat(plan.longitude) || parseFloat(cityData.longitude) || 0,
          hotels: (plan.hotelOptions || []).map((hotel) => ({
            name: hotel.hotelName,
            address: hotel.hotelAddress,
            price: hotel.price,
            imageUrl: hotel.hotelImageUrl,
            coordinates: hotel.geoCoordinates ? [
              parseFloat(hotel.geoCoordinates.latitude),
              parseFloat(hotel.geoCoordinates.longitude),
            ] : null,
            rating: hotel.rating,
            description: hotel.description,
          })),
          restaurantSuggestions: {
            breakfastOptions: (plan.restaurantSuggestions?.breakfastOptions || []).map((option) => ({
              name: option.name,
              cuisine: option.cuisine,
              priceRange: option.priceRange,
              description: option.description,
              locationDetails: option.locationDetails,
            })),
            cafeOptions: (plan.restaurantSuggestions?.cafeOptions || []).map((option) => ({
              name: option.name,
              cuisine: option.cuisine,
              priceRange: option.priceRange,
              description: option.description,
              locationDetails: option.locationDetails,
            })),
            snackOptions: (plan.restaurantSuggestions?.snackOptions || []).map((option) => ({
              name: option.name,
              cuisine: option.cuisine,
              priceRange: option.priceRange,
              description: option.description,
              locationDetails: option.locationDetails,
            })),
          },
          itinerary: Object.entries(plan.itinerary || {})
            .filter(([key]) => key.startsWith("day"))
            .map(([key, dayData]) => {
              const activities = [];
  
              // Morning activities
              if (dayData?.morning?.activity) {
                activities.push({
                  placeName: dayData.morning.activity,
                  placeDetails: dayData.morning.description || "Start your day with morning activity",
                  imageUrl: dayData.morning.placeImageUrl,
                  coordinates: dayData.morning.geoCoordinates ? [
                    parseFloat(dayData.morning.geoCoordinates.latitude),
                    parseFloat(dayData.morning.geoCoordinates.longitude),
                  ] : null,
                  ticketPrice: dayData.morning.ticketPricing,
                  rating: dayData.morning.rating,
                  type: "activity",
                  timeToVisit: "8:00 AM - 9:30 PM",
                  order: 1,
                });
              }
              if (dayData?.midday?.activity) {
                activities.push({
                  placeName: dayData.midday.activity,
                  placeDetails: dayData.midday.placeDetails || "",
                  imageUrl: dayData.midday.placeImageUrl,
                  coordinates: dayData.midday.geoCoordinates
                    ? [
                        parseFloat(dayData.midday.geoCoordinates.latitude),
                        parseFloat(dayData.midday.geoCoordinates.longitude),
                      ]
                    : null,
                  ticketPrice: dayData.midday.ticketPricing,
                  rating: dayData.midday.rating,
                  type: "activity",
                  timeToVisit: "9:30 PM - 12:00 PM",
                  order: 2,
                });
              }
              // Lunch
              if (dayData?.midday?.diningSuggestion?.lunch) {
                activities.push({
                  placeName: dayData.midday.diningSuggestion.lunch,
                  placeDetails: dayData.midday.diningSuggestion.lunchDetails || "Lunch break",
                  type: "lunch",
                  timeToVisit: "12:00 PM - 1:30 PM",
                  ticketPrice: dayData.midday.diningSuggestion.priceRange,
                  order: 3,
                });
              }
  
              // Afternoon activity
              if (dayData?.afternoon?.activity) {
                activities.push({
                  placeName: dayData.afternoon.activity,
                  placeDetails: dayData.afternoon.placeDetails || "",
                  imageUrl: dayData.afternoon.placeImageUrl,
                  coordinates: dayData.afternoon.geoCoordinates ? [
                    parseFloat(dayData.afternoon.geoCoordinates.latitude),
                    parseFloat(dayData.afternoon.geoCoordinates.longitude),
                  ] : null,
                  ticketPrice: dayData.afternoon.ticketPricing,
                  rating: dayData.afternoon.rating,
                  type: "activity",
                  timeToVisit: "2:00 PM - 5:00 PM",
                  order: 4,
                });
              }
  
              // Evening activity and dinner
              if (dayData?.evening?.activity) {
                activities.push({
                  placeName: dayData.evening.activity,
                  placeDetails: dayData.evening.placeDetails || "",
                  imageUrl: dayData.evening.placeImageUrl,
                  coordinates: dayData.evening.geoCoordinates ? [
                    parseFloat(dayData.evening.geoCoordinates.latitude),
                    parseFloat(dayData.evening.geoCoordinates.longitude),
                  ] : null,
                  ticketPrice: dayData.evening.ticketPricing,
                  rating: dayData.evening.rating,
                  type: "activity",
                  timeToVisit: "5:00 PM - 7:30 PM",
                  order: 5,
                });
              }
  
              if (dayData?.evening?.diningSuggestion?.dinner) {
                activities.push({
                  placeName: dayData.evening.diningSuggestion.dinner,
                  placeDetails: dayData.evening.diningSuggestion.dinnerDetails || "Dinner time",
                  type: "dinner",
                  timeToVisit: "7:30 PM - 9:00 PM",
                  ticketPrice: dayData.evening.diningSuggestion.priceRange,
                  order: 6,
                });
              }
  
              return {
                day: parseInt(key.replace("day", "")) || 1,
                theme: dayData?.theme || "",
                bestTimeToVisit: dayData?.bestTimeToVisit || "",
                activities: activities.sort((a, b) => a.order - b.order),
              };
            }),
        };
      }),
    };
  };
  const ActivityCard = ({ activity }) => (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      {activity.imageUrl && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={activity.imageUrl}
            alt={activity.placeName}
            className="object-cover rounded-lg w-full h-48"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300";
            }}
          />
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h4 className="font-bold text-lg">{activity.placeName}</h4>
          <span
            className={`text-sm px-2 py-1 rounded ${
              activity.type === "breakfast"
                ? "bg-yellow-100 text-yellow-800"
                : activity.type === "lunch"
                ? "bg-green-100 text-green-800"
                : activity.type === "dinner"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </span>
        </div>
        <span className="text-sm text-gray-600">{activity.timeToVisit}</span>
      </div>
      <p className="text-gray-700 mb-2">{activity.placeDetails}</p>
      <div className="flex items-center justify-between">
        {activity.rating && (
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{activity.rating}</span>
          </div>
        )}
        {activity.ticketPrice && (
          <span className="text-green-600">{activity.ticketPrice}</span>
        )}
      </div>
    </div>
  );
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <RefreshCcw className="animate-spin w-16 h-16 text-blue-500 mb-4" />
        <p className="text-xl font-semibold text-gray-700">
          Please wait, generating your itinerary...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (
    !itineraryData ||
    !itineraryData.cities ||
    itineraryData.cities.length === 0
  ) {
    return (
      <div className="p-4 text-red-500">
        No itinerary data available. Please try again.
      </div>
    );
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedLocation(null);
  };

  const handleLocationClick = (location) => {
    if (location.coordinates) {
      const [lat, lon] = location.coordinates;
      setSelectedLocation([lat, lon]);
    }
  };

  return (
    <div className={`container mx-auto p-4 ${showLoginModal ? "blur-sm" : ""}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Travel Plan</h1>
        <p className="text-gray-600">
          {itineraryData.travelType} Trip • {itineraryData.travelCount}{" "}
          {itineraryData.travelCount > 1 ? "Travelers" : "Traveler"}
        </p>
      </div>

      {itineraryData.cities.length > 1 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {itineraryData.cities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded ${
                selectedCity?.cityName === city.cityName
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {city.cityName} ({city.duration} days)
            </button>
          ))}
        </div>
      )}

      {selectedCity && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Itinerary for {selectedCity.cityName} - {selectedCity.duration} days
          </h2>

          {/* Hotels Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hotels Recommendation</h3>
            <div className="flex justify-between">
              {(selectedCity.hotels || []).map((hotel, index) => (
                <div
                  key={index}
                  className="w-1/4 bg-white shadow rounded-lg p-4 mx-2"
                >
                  {hotel.imageUrl && (
                    <div className="aspect-w-1 aspect-h-1 mb-4">
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="object-cover rounded-lg w-full"
                      />
                    </div>
                  )}
                  <h4 className="font-bold text-lg">{hotel.name}</h4>
                  <p className="text-gray-600">{hotel.address}</p>
                  <p className="text-green-600 font-bold">{hotel.price}</p>
                  {hotel.rating && (
                    <p className="text-sm text-gray-600">{hotel.rating} Star</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map and Itinerary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Map */}
            <div>
              <MapContainer
                center={[selectedCity.latitude, selectedCity.longitude]}
                zoom={12}
                style={{ height: "400px", width: "100%" }}
              >
                <MapCenterHandler
                  center={
                    selectedLocation || [
                      selectedCity.latitude,
                      selectedCity.longitude,
                    ]
                  }
                />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {(selectedCity.itinerary || []).flatMap((day) =>
                  (day.activities || []).map((activity, index) => {
                    if (!activity.coordinates) return null;
                    return (
                      <Marker
                        key={`${day.day}-${index}`}
                        position={activity.coordinates}
                        eventHandlers={{
                          click: () => handleLocationClick(activity),
                        }}
                      >
                        <Popup>
                          <div>
                            <h3 className="font-bold">{activity.placeName}</h3>
                            <p className="text-sm">{activity.placeDetails}</p>
                            <p className="text-sm text-gray-600">
                              {activity.timeToVisit}
                            </p>
                            {activity.ticketPrice && (
                              <p className="text-sm text-green-600">
                                Price: {activity.ticketPrice}
                              </p>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })
                )}
              </MapContainer>
            </div>

            {/* Itinerary */}
            <div>
              {selectedCity.itinerary.map((day) => (
                <div key={day.day} className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Day {day.day}</h3>
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <ActivityCard key={index} activity={activity} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;

// {
//   /* {selectedCity && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4">
//             Itinerary for {selectedCity.cityName} - {selectedCity.duration} days
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <div className="mb-6">
//                 <h3 className="text-xl font-bold mb-4">Hotels</h3>
//                 <div className="space-y-4">
//                   {(selectedCity.hotels || []).map((hotel, index) => (
//                     <div key={index} className="bg-white shadow rounded-lg p-4">
//                       {hotel.imageUrl && (
//                         <div className="aspect-w-16 aspect-h-9 mb-4">
//                           <img
//                             src={hotel.imageUrl}
//                             alt={hotel.name}
//                             className="object-cover rounded-lg w-full h-48"
//                           />
//                         </div>
//                       )}
//                       <h4 className="font-bold text-lg">{hotel.name}</h4>
//                       <p className="text-gray-600">{hotel.address}</p>
//                       <p className="text-green-600 font-bold">{hotel.price}</p>
//                       {hotel.rating && (
//                         <div className="flex items-center mt-2">
//                           <span className="text-yellow-400">★</span>
//                           <span className="ml-1">{hotel.rating}</span>
//                         </div>
//                       )}
//                       <p className="text-gray-700 mt-2">{hotel.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <MapContainer
//                 center={[selectedCity.latitude, selectedCity.longitude]}
//                 zoom={12}
//                 style={{ height: "400px", width: "100%" }}
//               >
//                 <MapCenterHandler
//                   center={
//                     selectedLocation || [
//                       selectedCity.latitude,
//                       selectedCity.longitude,
//                     ]
//                   }
//                 />
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution="&copy; OpenStreetMap contributors"
//                 />

//                 {(selectedCity.itinerary || []).flatMap((day) =>
//                   (day.activities || []).map((activity, index) => {
//                     if (!activity.coordinates) return null;
//                     return (
//                       <Marker
//                         key={`${day.day}-${index}`}
//                         position={activity.coordinates}
//                         eventHandlers={{
//                           click: () => handleLocationClick(activity),
//                         }}
//                       >
//                         <Popup>
//                           <div>
//                             <h3 className="font-bold">{activity.placeName}</h3>
//                             <p className="text-sm">{activity.placeDetails}</p>
//                             <p className="text-sm text-gray-600">
//                               {activity.timeToVisit}
//                             </p>
//                             {activity.ticketPrice && (
//                               <p className="text-sm text-green-600">
//                                 Price: {activity.ticketPrice}
//                               </p>
//                             )}
//                           </div>
//                         </Popup>
//                       </Marker>
//                     );
//                   })
//                 )}
//               </MapContainer>
//             </div>

//             <div>
//               {(selectedCity.itinerary || []).map((day) => (
//                 <div key={day.day} className="mb-6">
//                   <h3 className="text-xl font-semibold mb-4">Day {day.day}</h3>
//                   {(day.activities || []).map((activity, index) => (
//                     <div
//                       key={index}
//                       className="bg-white shadow rounded-lg p-4 mb-4"
//                     >
//                       {activity.imageUrl && (
//                         <div className="aspect-w-16 aspect-h-9 mb-4">
//                           <img
//                             src={activity.imageUrl}
//                             alt={activity.placeName}
//                             className="object-cover rounded-lg w-full h-48"
//                             onError={(e) => {
//                               e.target.src = "/api/placeholder/400/300";
//                             }}
//                           />
//                         </div>
//                       )}
//                       <div className="flex justify-between items-center mb-2">
//                         <h4 className="font-bold text-lg">
//                           {activity.placeName}
//                         </h4>
//                         <span className="text-sm text-gray-600">
//                           {activity.timeToVisit}
//                         </span>
//                       </div>
//                       <p className="text-gray-700 mb-2">
//                         {activity.placeDetails}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         {activity.rating && (
//                           <div className="flex items-center">
//                             <span className="text-yellow-400">★</span>
//                             <span className="ml-1">{activity.rating}</span>
//                           </div>
//                         )}
//                         {activity.ticketPrice && (
//                           <span className="text-green-600">
//                             Price: {activity.ticketPrice}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )} */
// }
