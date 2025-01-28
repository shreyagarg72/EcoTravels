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

  // const distributeActivities = (activities, duration) => {
  //   console.log("Raw activities:", activities);

  //   if (!activities || activities.length === 0) {
  //     console.log("No activities to distribute");
  //     return [];
  //   }

  //   // Shuffle activities
  //   const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

  //   // Separate different types of activities
  //   const restaurants = {
  //     breakfast: shuffledActivities.filter((activity) =>
  //       activity.properties?.categories?.some(
  //         (cat) => cat.includes("cafe") || cat.includes("breakfast")
  //       )
  //     ),
  //     lunch: shuffledActivities.filter((activity) =>
  //       activity.properties?.categories?.some(
  //         (cat) => cat.includes("restaurant") || cat.includes("lunch")
  //       )
  //     ),
  //     dinner: shuffledActivities.filter((activity) =>
  //       activity.properties?.categories?.some(
  //         (cat) => cat.includes("restaurant") || cat.includes("dinner")
  //       )
  //     ),
  //   };
  //   const otherActivities = shuffledActivities.filter(
  //     (activity) =>
  //       !activity.properties?.categories?.some(
  //         (cat) => cat.includes("restaurant") || cat.includes("cafe")
  //       )
  //   );

  //   console.log("Restaurants:", restaurants);
  //   console.log("Other Activities:", otherActivities);

  //   const activitiesPerDay = [];
  //   //   for (let day = 0; day < duration; day++) {
  //   //     const dayActivities = [];

  //   //     // Add a restaurant for lunch or dinner
  //   //     if (restaurants.length > 0) {
  //   //       const lunchOrDinner = restaurants.pop();
  //   //       dayActivities.push({
  //   //         ...lunchOrDinner,
  //   //         day: day + 1,
  //   //         type: "meal",
  //   //       });
  //   //     }

  //   //     // Add 3-4 other activities
  //   //     const dayOtherActivities = otherActivities
  //   //       .splice(0, Math.min(4, otherActivities.length))
  //   //       .map((activity) => ({
  //   //         ...activity,
  //   //         day: day + 1,
  //   //         type: "activity",
  //   //       }));

  //   //     dayActivities.push(...dayOtherActivities);

  //   //     activitiesPerDay.push(dayActivities);

  //   //     console.log(`Day ${day + 1} Activities:`, dayActivities);
  //   //   }

  //   //   return activitiesPerDay;
  //   // };
  //   const timeSlots = [
  //     { name: "Early Morning", time: "06:00 AM", sortOrder: 1, type: "early_morning" },
  //     { name: "Breakfast", time: "08:00 AM", sortOrder: 2, type: "breakfast" },
  //     { name: "Morning Activity", time: "09:30 AM", sortOrder: 3, type: "morning" },
  //     { name: "Late Morning Activity", time: "11:00 AM", sortOrder: 4, type: "late_morning" },
  //     { name: "Lunch", time: "01:00 PM", sortOrder: 5, type: "lunch" },
  //     { name: "Afternoon Activity", time: "02:30 PM", sortOrder: 6, type: "afternoon" },
  //     { name: "Late Afternoon Activity", time: "04:00 PM", sortOrder: 7, type: "late_afternoon" },
  //     { name: "Evening Activity", time: "06:00 PM", sortOrder: 8, type: "evening" },
  //     { name: "Dinner", time: "07:30 PM", sortOrder: 9, type: "dinner" },
  //     { name: "Night Activity", time: "09:00 PM", sortOrder: 10, type: "night" }
  //   ];
    
  //   // In the distributeActivities function, modify the sorting logic
  

  //   for (let day = 0; day < duration; day++) {
  //     const dayActivities = [];

  //     // Distribute meals
  //     const dayMeals = [
  //       {
  //         type: "breakfast",
  //         slot: timeSlots.find((slot) => slot.type === "breakfast"),
  //       },
  //       {
  //         type: "lunch",
  //         slot: timeSlots.find((slot) => slot.type === "lunch"),
  //       },
  //       {
  //         type: "dinner",
  //         slot: timeSlots.find((slot) => slot.type === "dinner"),
  //       },
  //     ];

  //     dayMeals.forEach((mealType) => {
  //       if (restaurants[mealType.type].length > 0) {
  //         const selectedRestaurant = restaurants[mealType.type].pop();
  //         dayActivities.push({
  //           ...selectedRestaurant,
  //           day: day + 1,
  //           type: mealType.type,
  //           timeSlot: mealType.slot,
  //         });
  //       }
  //     });

  //     // Distribute other activities
  //     const activitySlots = [
  //       {
  //         type: "morning",
  //         slot: timeSlots.find((slot) => slot.type === "morning"),
  //       },
  //       {
  //         type: "late_morning",
  //         slot: timeSlots.find((slot) => slot.type === "late_morning"),
  //       },
  //       {
  //         type: "afternoon",
  //         slot: timeSlots.find((slot) => slot.type === "afternoon"),
  //       },
  //       {
  //         type: "evening",
  //         slot: timeSlots.find((slot) => slot.type === "evening"),
  //       },
  //     ];

  //     activitySlots.forEach((activitySlot) => {
  //       if (otherActivities.length > 0) {
  //         const selectedActivity = otherActivities.pop();
  //         dayActivities.push({
  //           ...selectedActivity,
  //           day: day + 1,
  //           type: "activity",
  //           timeSlot: activitySlot.slot,
  //         });
  //       }
  //     });

  //     // Sort activities by time
  //     dayActivities.sort((a, b) => {
  //       const timeSlotA = a.timeSlot || { sortOrder: Infinity };
  //       const timeSlotB = b.timeSlot || { sortOrder: Infinity };
  //       return timeSlotA.sortOrder - timeSlotB.sortOrder;
  //     });

  //     activitiesPerDay.push(dayActivities);

  //     console.log(`Day ${day + 1} Activities:`, dayActivities);
  //   }

  //   return activitiesPerDay;
  // };
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


import React, { useEffect, useState } from "react";
import { MapPin, RefreshCcw, Clock } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";

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
  const [travelPlans, setTravelPlans] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedTravelPlans = JSON.parse(localStorage.getItem("travelPlans")) || {};
      console.log("Loaded Travel Plans:", storedTravelPlans);
      
      if (Object.keys(storedTravelPlans).length > 0) {
        setTravelPlans(storedTravelPlans);
        const firstCity = Object.keys(storedTravelPlans)[0];
        setSelectedCity(storedTravelPlans[firstCity]);
      }
    } catch (error) {
      console.error("Error loading travel plans:", error);
    }
    setIsLoading(false);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedLocation(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <RefreshCcw className="animate-spin w-16 h-16 text-blue-500 mb-4" />
        <p className="text-xl font-semibold text-gray-700">
          Please wait, loading your itinerary...
        </p>
      </div>
    );
  }

  if (!selectedCity) {
    return (
      <div className="p-4 text-red-500">
        No travel plans found. Please select a city first.
      </div>
    );
  }

  const renderDayPlan = (dayPlan, dayIndex) => (
    <div key={dayIndex} className="mb-6 bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4">Day {dayIndex + 1}</h3>

      {["morning", "midday", "afternoon", "evening"].map((timeOfDay) => {
        const activity = dayPlan[timeOfDay];
        if (!activity) return null;

        return (
          <div key={timeOfDay} className="mb-4 border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{activity.activity}</h4>
                {activity.placeDetails && (
                  <p className="text-sm text-gray-600 mt-1">{activity.placeDetails}</p>
                )}
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{activity.bestTimeToVisit || "Anytime"}</span>
                </div>
                {activity.ticketPricing && (
                  <p className="text-sm text-gray-700 mt-1">Ticket: {activity.ticketPricing}</p>
                )}
              </div>
              {activity.placeImageUrl && (
                <img
                  src={activity.placeImageUrl}
                  alt={activity.activity}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`container mx-auto p-4 ${showLoginModal ? "blur-sm" : ""}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Travel Plan</h1>
        <p className="text-gray-600">
          {selectedCity.travelers} Traveler{selectedCity.travelers > 1 ? "s" : ""} • {selectedCity.duration}
        </p>
      </div>

      {Object.keys(travelPlans).length > 1 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.values(travelPlans).map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded ${selectedCity.location === city.location ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {city.location} ({city.duration})
            </button>
          ))}
        </div>
      )}

      {selectedCity && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Itinerary for {selectedCity.location} - {selectedCity.duration}
          </h2>

          {/* Hotels Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Recommended Hotels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCity.hotelOptions.map((hotel, index) => (
                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel.hotelAddress} target='_blank'>
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <img src="/ecotravel_globe.png" alt={hotel.hotelName} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h4 className="font-bold text-lg">{hotel.hotelName}</h4>
                  <p className="text-sm text-gray-600 mb-2">{hotel.hotelAddress}</p>
                  <p className="text-lg font-semibold text-blue-600 mb-2">${hotel.price}/night</p>
                </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map Section */}
            <div>
              <MapContainer center={[selectedCity.latitude, selectedCity.longitude]} zoom={12} style={{ height: "400px", width: "100%" }}>
                <MapCenterHandler center={selectedLocation || [selectedCity.latitude, selectedCity.longitude]} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

                <Marker position={[selectedCity.latitude, selectedCity.longitude]}>
                  <Popup>{selectedCity.location}</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Daily Plans Section */}
            <div className="overflow-y-auto max-h-[600px]">
              {Object.keys(selectedCity.itinerary).map((day, index) =>
                renderDayPlan(selectedCity.itinerary[day], index)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
