
// import React, { useEffect, useState } from "react";

// const Activities = ({showLoginModal}) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [activities, setActivities] = useState({});
  
//   const geoapifyApiKey = import.meta.env.VITE_GEO_API; // Replace with your Geoapify API key

//   useEffect(() => {
//     // Retrieve selected cities from localStorage
//     const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
//     setSelectedCities(storedCities);

//     if (storedCities && storedCities.length > 0) {
//       storedCities.forEach((city) => {
//         const { latitude, longitude, cityName } = city;

//         // Construct the Geoapify Places API URL with appropriate categories and coordinates
//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.activity_park&lat=${latitude}&lon=${longitude}&limit=20&apiKey=${geoapifyApiKey}`;

//         // Fetch activities for the city
//         fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             // Store the fetched activities under the city name
//             console.log(result)
//             setActivities((prevActivities) => ({
//               ...prevActivities,
//               [cityName]: result.features,
//             }));
//           })
//           .catch((error) => {
//             console.log(`Error fetching activities for ${cityName}:`, error);
//           });
//       });
//     }
//   }, []);

//   return (
//     <div className={`container mx-auto ${showLoginModal ? 'blur-sm' : ''}`}>
//       <h1>Activities</h1>
//       {selectedCities && selectedCities.length > 0 ? (
//         selectedCities.map((city) => (
//           <div key={city.cityName}>
//             <h2>{city.cityName}</h2>

//             {/* Displaying activities for each city */}
//             {activities[city.cityName] ? (
//               <div>
//                 <h3>Activities:</h3>
//                 <ul>
//                   {activities[city.cityName].map((activity, index) => (
//                     <li key={index}>
//                       <h4>{activity.properties.name}</h4>
//                       <p>Category: {activity.properties.categories.join(", ")}</p>
//                       <p>Address: {activity.properties.address_line1}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p>Loading activities...</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No cities selected.</p>
//       )}
//     </div>
//   );
// };

// export default Activities;


// import React, { useEffect, useState } from "react";
// import { getDistance } from "geolib";

// const Activities = ({ showLoginModal }) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [activities, setActivities] = useState({});
//   const [clusteredActivities, setClusteredActivities] = useState({});
//   const geoapifyApiKey = import.meta.env.VITE_GEO_API;

//   useEffect(() => {
//     const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
//     setSelectedCities(storedCities);

//     if (storedCities && storedCities.length > 0) {
//       storedCities.forEach((city) => {
//         const { latitude, longitude, cityName } = city;
//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=20&apiKey=${geoapifyApiKey}`;

//         fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             setActivities((prevActivities) => ({
//               ...prevActivities,
//               [cityName]: result.features,
//             }));
//           })
//           .catch((error) => {
//             console.log(`Error fetching activities for ${cityName}:`, error);
//           });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (Object.keys(activities).length > 0) {
//       const clustered = {};

//       Object.keys(activities).forEach((cityName) => {
//         const cityActivities = activities[cityName];
//         const cityDuration = selectedCities.find((city) => city.cityName === cityName)?.days || 1; // Default to 1 day

//         // Distribute activities evenly across the specified duration
//         const clusters = distributeActivitiesEvenly(cityActivities, cityDuration);
//         clustered[cityName] = clusters;
//       });

//       setClusteredActivities(clustered);
//     }
//   }, [activities, selectedCities]);

//   const distributeActivitiesEvenly = (activityList, days) => {
//     const clusters = new Array(days).fill(null).map(() => []);

//     activityList.forEach((activity, index) => {
//       const dayIndex = index % days; // Distribute activities across days
//       clusters[dayIndex].push(activity);
//     });

//     return clusters;
//   };

//   return (
//     <div className={`container mx-auto ${showLoginModal ? "blur-sm" : ""}`}>
//       <h1>Itinerary</h1>
//       {selectedCities.length > 0 ? (
//         selectedCities.map((city) => (
//           <div key={city.cityName}>
//             <h2>{city.cityName}</h2>

//             {clusteredActivities[city.cityName] ? (
//               clusteredActivities[city.cityName].map((dayActivities, dayIndex) => (
//                 <div key={dayIndex}>
//                   <h3>Day {dayIndex + 1}</h3>
//                   <ul>
//                     {dayActivities.map((activity, index) => (
//                       <li key={index}>
//                         <h4>{activity.properties.name}</h4>
//                         <p>Category: {activity.properties.categories.join(", ")}</p>
//                         <p>Address: {activity.properties.address_line1}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))
//             ) : (
//               <p>Loading activities...</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No cities selected.</p>
//       )}
//     </div>
//   );
// };

// export default Activities;
// import React, { useEffect, useState } from "react";

// const Activities = ({ showLoginModal }) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [activitiesByDay, setActivitiesByDay] = useState({});

//   const geoapifyApiKey = import.meta.env.VITE_GEO_API;

//   const distributeActivities = (activities, duration) => {
//     if (!activities || activities.length === 0) return [];

//     // Shuffle activities to ensure random distribution
//     const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

//     // Distribute activities across days
//     const activitiesPerDay = [];
//     for (let day = 0; day < duration; day++) {
//       // Select 3-5 activities per day, ensuring we don't exceed available activities
//       const dayActivities = shuffledActivities
//         .slice(day * 3, day * 3 + 5)
//         .map(activity => ({
//           ...activity,
//           day: day + 1 // Day numbering starts from 1
//         }));

//       activitiesPerDay.push(dayActivities);
//     }

//     return activitiesPerDay;
//   };

//   useEffect(() => {
//     // Retrieve selected cities from localStorage
//     const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
//     setSelectedCities(storedCities);

//     if (storedCities && storedCities.length > 0) {
//       const activitiesFetches = storedCities.map((city) => {
//         const { latitude, longitude, cityName, duration } = city;

//         // Construct the Geoapify Places API URL with appropriate categories and coordinates
//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=50&apiKey=${geoapifyApiKey}`;

//         // Fetch activities for the city
//         return fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             // Distribute activities across days
//             const distributedActivities = distributeActivities(
//               result.features, 
//               duration || 3 // Default to 3 days if no duration specified
//             );

//             return {
//               cityName,
//               distributedActivities
//             };
//           })
//           .catch((error) => {
//             console.log(`Error fetching activities for ${cityName}:`, error);
//             return {
//               cityName,
//               distributedActivities: []
//             };
//           });
//       });

//       // Wait for all city activities to be fetched and distributed
//       Promise.all(activitiesFetches).then((citiesActivities) => {
//         // Convert to object for easy lookup
//         const activitiesMap = citiesActivities.reduce((acc, city) => {
//           acc[city.cityName] = city.distributedActivities;
//           return acc;
//         }, {});

//         setActivitiesByDay(activitiesMap);
//       });
//     }
//   }, []);

//   return (
//     <div className={`container mx-auto ${showLoginModal ? 'blur-sm' : ''}`}>
//       <h1 className="text-2xl font-bold mb-4">Itinerary Activities</h1>
//       {selectedCities && selectedCities.length > 0 ? (
//         selectedCities.map((city) => (
//           <div key={city.cityName} className="mb-6">
//             <h2 className="text-xl font-semibold mb-3">{city.cityName}</h2>
            
//             {activitiesByDay[city.cityName] ? (
//               <div>
//                 {activitiesByDay[city.cityName].map((dayActivities, dayIndex) => (
//                   <div key={dayIndex} className="mb-4">
//                     <h3 className="font-medium mb-2">Day {dayIndex + 1}</h3>
//                     {dayActivities.length > 0 ? (
//                       <ul className="space-y-2">
//                         {dayActivities.map((activity, index) => (
//                           <li 
//                             key={index} 
//                             className="border p-3 rounded-lg"
//                           >
//                             <h4 className="font-semibold">{activity.properties.name}</h4>
//                             <p className="text-sm text-gray-600">
//                               Category: {activity.properties.categories.join(", ")}
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               Address: {activity.properties.address_line1}
//                             </p>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="text-gray-500">No activities found for this day</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">Loading activities...</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No cities selected.</p>
//       )}
//     </div>
//   );
// };

// export default Activities;
// import React, { useEffect, useState } from "react";
// import { MapPin, Calendar, Tag } from "lucide-react";
// import ItineraryCard from "./ItineraryCard";
// // const ItineraryCard = ({ activity }) => {
// //   return (
// //     <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
// //       <h4 className="text-lg font-bold text-gray-800 mb-2">
// //         {activity.properties.name || "Unnamed Activity"}
// //       </h4>
// //       <div className="space-y-2 text-sm text-gray-600">
// //         <div className="flex items-center">
// //           <Tag className="mr-2 w-4 h-4 text-blue-500" />
// //           <span>
// //             {activity.properties.categories && activity.properties.categories.length > 0 
// //               ? activity.properties.categories.join(", ") 
// //               : "Uncategorized"}
// //           </span>
// //         </div>
// //         <div className="flex items-center">
// //           <MapPin className="mr-2 w-4 h-4 text-green-500" />
// //           <span>
// //             {activity.properties.address_line1 || "Address not available"}
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const Itinerary = ({ showLoginModal }) => {
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [activitiesByDay, setActivitiesByDay] = useState({});

//   const geoapifyApiKey = import.meta.env.VITE_GEO_API;

//   const distributeActivities = (activities, duration) => {
//     if (!activities || activities.length === 0) return [];

//     // Shuffle activities to ensure random distribution
//     const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

//     // Distribute activities across days
//     const activitiesPerDay = [];
//     for (let day = 0; day < duration; day++) {
//       // Select 3-5 activities per day, ensuring we don't exceed available activities
//       const dayActivities = shuffledActivities
//         .slice(day * 3, day * 3 + 5)
//         .map(activity => ({
//           ...activity,
//           day: day + 1 // Day numbering starts from 1
//         }));

//       activitiesPerDay.push(dayActivities);
//     }

//     return activitiesPerDay;
//   };

//   useEffect(() => {
//     // Retrieve selected cities from localStorage
//     const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
//     setSelectedCities(storedCities);

//     if (storedCities && storedCities.length > 0) {
//       const activitiesFetches = storedCities.map((city) => {
//         const { latitude, longitude, cityName, duration } = city;

//         // Construct the Geoapify Places API URL with appropriate categories and coordinates
//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=50&apiKey=${geoapifyApiKey}`;

//         // Fetch activities for the city
//         return fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             // Distribute activities across days
//             const distributedActivities = distributeActivities(
//               result.features, 
//               duration || 3 // Default to 3 days if no duration specified
//             );

//             return {
//               cityName,
//               distributedActivities
//             };
//           })
//           .catch((error) => {
//             console.log(`Error fetching activities for ${cityName}:`, error);
//             return {
//               cityName,
//               distributedActivities: []
//             };
//           });
//       });

//       // Wait for all city activities to be fetched and distributed
//       Promise.all(activitiesFetches).then((citiesActivities) => {
//         // Convert to object for easy lookup
//         const activitiesMap = citiesActivities.reduce((acc, city) => {
//           acc[city.cityName] = city.distributedActivities;
//           return acc;
//         }, {});

//         setActivitiesByDay(activitiesMap);
//       });
//     }
//   }, []);

//   return (
//     <div className={`container mx-auto px-4 ${showLoginModal ? 'blur-sm' : ''}`}>
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Travel Itinerary</h1>
      
//       {selectedCities && selectedCities.length > 0 ? (
//         selectedCities.map((city) => (
//           <div key={city.cityName} className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center text-gray-700">
//               <MapPin className="mr-2 w-6 h-6 text-blue-500" />
//               {city.cityName}
//             </h2>
            
//             {activitiesByDay[city.cityName] ? (
//               <div className="grid md:grid-cols-3 gap-6">
//                 {activitiesByDay[city.cityName].map((dayActivities, dayIndex) => (
//                   <div 
//                     key={dayIndex} 
//                     className="bg-gray-50 rounded-lg p-4 border border-gray-200"
//                   >
//                     <h3 className="text-xl font-medium mb-3 flex items-center text-gray-600">
//                       <Calendar className="mr-2 w-5 h-5 text-green-500" />
//                       Day {dayIndex + 1}
//                     </h3>
                    
//                     {dayActivities.length > 0 ? (
//                       <div className="space-y-4">
//                         {dayActivities.map((activity, index) => (
//                           <ItineraryCard 
//                             key={index} 
//                             activity={activity} 
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-center">No activities found for this day</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center">Loading activities...</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-center">No cities selected.</p>
//       )}
//     </div>
//   );
// };

// export default Itinerary;


import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Tag } from "lucide-react";
import ItineraryCard from "./ItineraryCard";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});


const Itinerary = ({ showLoginModal }) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [activitiesByDay, setActivitiesByDay] = useState({});
  const [selectedCityActivities, setSelectedCityActivities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const geoapifyApiKey = import.meta.env.VITE_GEO_API;

  const distributeActivities = (activities, duration) => {
    if (!activities || activities.length === 0) return [];

    // Shuffle activities to ensure random distribution
    const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

    // Distribute activities across days
    const activitiesPerDay = [];
    for (let day = 0; day < duration; day++) {
      // Select 3-5 activities per day, ensuring we don't exceed available activities
      const dayActivities = shuffledActivities
        .slice(day * 3, day * 3 + 5)
        .map(activity => ({
          ...activity,
          day: day + 1 // Day numbering starts from 1
        }));

      activitiesPerDay.push(dayActivities);
    }

    return activitiesPerDay;
  };

  useEffect(() => {
    // Retrieve selected cities from localStorage
    const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
    setSelectedCities(storedCities);

    if (storedCities && storedCities.length > 0) {
      const activitiesFetches = storedCities.map((city) => {
        const { latitude, longitude, cityName, duration } = city;

        // Construct the Geoapify Places API URL with appropriate categories and coordinates
        const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=50&apiKey=${geoapifyApiKey}`;

        // Fetch activities for the city
        return fetch(apiUrl)
          .then((response) => response.json())
          .then((result) => {
            // Distribute activities across days
            const distributedActivities = distributeActivities(
              result.features, 
              duration || 3 // Default to 3 days if no duration specified
            );

            return {
              cityName,
              distributedActivities
            };
          })
          .catch((error) => {
            console.log(`Error fetching activities for ${cityName}:`, error);
            return {
              cityName,
              distributedActivities: []
            };
          });
      });

      // Wait for all city activities to be fetched and distributed
      Promise.all(activitiesFetches).then((citiesActivities) => {
        // Convert to object for easy lookup
        const activitiesMap = citiesActivities.reduce((acc, city) => {
          acc[city.cityName] = city.distributedActivities;
          return acc;
        }, {});

        setActivitiesByDay(activitiesMap);
        if (storedCities.length > 0) {
          setSelectedCity(storedCities[0]);
          setSelectedCityActivities(activitiesMap[storedCities[0].cityName] || []);
        }
      });
    }
  }, []);
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedCityActivities(activitiesByDay[city.cityName] || []);
  };

  if (selectedCities.length === 0) {
    return <div>No cities selected. Please select cities first.</div>;
  }

  return (
    <div className={`container mx-auto p-4 ${showLoginModal ? 'blur-sm' : ''}`}>
      <div className="flex flex-wrap gap-4 mb-4">
        {selectedCities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCitySelect(city)}
            className={`px-4 py-2 rounded ${
              selectedCity === city ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {city.cityName}
          </button>
        ))}
      </div>

      {selectedCity && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Itinerary for {selectedCity.cityName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map Section */}
            <div>
              <MapContainer 
                center={[selectedCity.latitude, selectedCity.longitude]} 
                zoom={12} 
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                
                {/* City center marker */}
                <Marker position={[selectedCity.latitude, selectedCity.longitude]}>
                  <Popup>{selectedCity.cityName}</Popup>
                </Marker>

                {/* Activity markers */}
                {selectedCityActivities.flat().map((activity, index) => {
                  const [lon, lat] = activity.geometry?.coordinates || [];
                  return lon && lat ? (
                    <Marker key={index} position={[lat, lon]}>
                      <Popup>
                        <div>
                          <h3>{activity.properties?.name || 'Unnamed Place'}</h3>
                          <p>{activity.properties?.categories?.join(', ')}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null;
                })}
              </MapContainer>
            </div>

            {/* Itinerary Details */}
            <div>
              {selectedCityActivities.map((dayActivities, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                  <h3 className="text-xl font-semibold">Day {dayIndex + 1}</h3>
                  {dayActivities.map((activity, activityIndex) => (
                    <div 
                      key={activityIndex} 
                      className="bg-white shadow rounded-lg p-3 mb-2"
                    >
                      <h4 className="font-bold">
                        {activity.properties?.name || 'Unnamed Activity'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.properties?.categories?.join(', ')}
                      </p>
                    </div>
                  ))}
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