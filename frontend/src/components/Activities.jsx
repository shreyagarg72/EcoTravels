// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const Activities = () => {
// //   const [activities, setActivities] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const selectedTravelType = localStorage.getItem("selectedTravelType");
// //   const cities = JSON.parse(localStorage.getItem("selectedCities"))||[];

// // //   useEffect(() => {
// // //     const fetchActivities = async () => {
// // //       if (selectedCities.length === 0) return;

// // //       setLoading(true);
// // //       const newActivities = {};

// // //       try {
// // //         for (const city of selectedCities) {
// // //           const response = await fetch(
// // //             `https://api.youractivityapi.com/activities?location=${city}`
// // //           );
// // //           const data = await response.json();
// // //           newActivities[city] = data;
// // //         }
// // //         setActivities(newActivities);
// // //       } catch (error) {
// // //         console.error("Error fetching activities:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchActivities();
// // //   }, [selectedCities]);
// // const fetchActivities = async () => {
// //     setLoading(true);
// //     const newActivities = {};

// //     try {
// //       for (const city of selectedCities) {
// //         // Fetch activities for each city using its latitude and longitude
// //         const response = await fetch(
// //           `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${city.latitude}&longitude=${city.longitude}&radius=10`,
// //           {
// //             headers: {
// //               Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual access token
// //             },
// //           }
// //         );
// //         const data = await response.json();
// //         newActivities[city.name] = data.data;
// //       }
// //       setActivities(newActivities);
// //     } catch (error) {
// //       console.error("Error fetching activities:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchActivities();
// //   }, []);

// //   return (
// //    <div className="p-8">
// //       <h2 className="text-3xl font-semibold mb-6">Activities for Your Selected Cities</h2>

// //       <div>
// //       {loading ? (
// //         <p>Loading activities...</p>
// //       ) : (
// //         <div>
// //           {Object.keys(activities).map((cityName) => (
// //             <div key={cityName}>
// //               <h2>Activities in {cityName}</h2>
// //               <ul>
// //                 {activities[cityName].map((activity) => (
// //                   <li key={activity.id}>{activity.name}</li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //     </div>
// //   );
// // };

// // export default Activities;
// // import React, { useEffect, useState } from "react";

// // const Activities = () => {
// //   const [activities, setActivities] = useState({});
// //   const [loading, setLoading] = useState(false);

// //   // Get the selected cities from local storage or set to an empty array
// //   const cities = JSON.parse(localStorage.getItem("selectedCities")) || [];

// //   // Function to obtain the access token
// //   const getAccessToken = async () => {
// //     const clientId = "BaaDClhNPHKQu4ymrhfOApDpR7PTR3iq"; // Your API Key
// //     const clientSecret = "Td16Q5XC1Wi2ArvW"; // Replace with your actual API Secret

// //     try {
// //       const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/x-www-form-urlencoded",
// //         },
// //         body: new URLSearchParams({
// //           grant_type: "client_credentials",
// //           client_id: clientId,
// //           client_secret: clientSecret,
// //         }),
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         return data.access_token;
// //       } else {
// //         console.error("Error fetching access token:", data);
// //       }
// //     } catch (error) {
// //       console.error("Error during authentication:", error);
// //     }
// //   };

// //   // Function to fetch activities for each city
// //   const fetchActivities = async () => {
// //     if (cities.length === 0) return;

// //     setLoading(true);
// //     const newActivities = {};

// //     try {
// //       const accessToken = await getAccessToken();

// //       if (!accessToken) {
// //         console.error("Access token retrieval failed.");
// //         setLoading(false);
// //         return;
// //       }

// //       for (const city of cities) {
// //         // Fetch activities for each city using latitude and longitude
// //         const response = await fetch(
// //           `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${city.latitude}&longitude=${city.longitude}&radius=10`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${accessToken}`,
// //             },
// //           }
// //         );
// //         const data = await response.json();
// //         newActivities[city.name] = data.data; // store the activities under the city's name
// //       }
// //       setActivities(newActivities);
// //     } catch (error) {
// //       console.error("Error fetching activities:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // useEffect to trigger the fetch activities function
// //   useEffect(() => {
// //     fetchActivities();
// //   }, []);

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-3xl font-semibold mb-6">Activities for Your Selected Cities</h2>

// //       {loading ? (
// //         <p>Loading activities...</p>
// //       ) : (
// //         <div>
// //           {Object.keys(activities).map((cityName) => (
// //             <div key={cityName}>
// //               <h2 className="text-2xl font-semibold mt-4">Activities in {cityName}</h2>
// //               <ul>
// //                 {activities[cityName].map((activity) => (
// //                   <li key={activity.id}>{activity.name}</li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Activities;
// import React, { useEffect, useState } from "react";

// const Activities = () => {
//   const [activities, setActivities] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Get the selected cities from local storage or set to an empty array
//   const cities = JSON.parse(localStorage.getItem("selectedCities")) || [];

//   // Function to obtain the access token
//   const getAccessToken = async () => {
//     const clientId = "BaaDClhNPHKQu4ymrhfOApDpR7PTR3iq"; // Your API Key
//     const clientSecret = "YOUR_API_SECRET"; // Replace with your actual API Secret

//     try {
//       const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           grant_type: "client_credentials",
//           client_id: clientId,
//           client_secret: clientSecret,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         return data.access_token;
//       } else {
//         console.error("Error fetching access token:", data);
//       }
//     } catch (error) {
//       console.error("Error during authentication:", error);
//     }
//   };

//   // Function to fetch activities for each city
//   const fetchActivities = async () => {
//     if (cities.length === 0) return;

//     setLoading(true);
//     const newActivities = {};

//     try {
//       const accessToken = await getAccessToken();

//       if (!accessToken) {
//         console.error("Access token retrieval failed.");
//         setLoading(false);
//         return;
//       }

//       for (const city of cities) {
//         // Fetch activities for each city using latitude and longitude
//         const response = await fetch(
//           `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${city.latitude}&longitude=${city.longitude}&radius=10`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         const data = await response.json();
//         newActivities[city.name] = data.data; // store the activities under the city's name
//       }
//       setActivities(newActivities);
//     } catch (error) {
//       console.error("Error fetching activities:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect to trigger the fetch activities function
//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-semibold mb-6">Activities for Your Selected Cities</h2>

//       {loading ? (
//         <p>Loading activities...</p>
//       ) : (
//         <div>
//           {Object.keys(activities).map((cityName) => (
//             <div key={cityName}>
//               <h2 className="text-2xl font-semibold mt-4">Activities in {cityName}</h2>
//               <ul>
//                 {activities[cityName].map((activity) => (
//                   <li key={activity.id || `${cityName}-${activity.name}`}>{activity.name}</li> 
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Activities;
// import React from "react";
// import { useLocation } from "react-router-dom";

// const Activities = () => {
//   const { state } = useLocation();
//   const { selectedCities } = state || {};

//   // Now you can use selectedCities to fetch activities for each city
//   console.log("Selected Cities with Coordinates:", selectedCities);

//   return (
//     <div>
//       <h1>Activities</h1>
//       {selectedCities.map((city) => (
//         <div key={city.cityName}>
//           <h2>{city.cityName}</h2>
//           <p>Latitude: {city.latitude}</p>
//           <p>Longitude: {city.longitude}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Activities;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Activities = () => {
  const { state } = useLocation();
  const { selectedCities } = state || {};
  const [activities, setActivities] = useState({});

  const geoapifyApiKey = "eb5f940831094f09b1e6bad3018bec9c"; // Replace with your Geoapify API key

  useEffect(() => {
    if (selectedCities && selectedCities.length > 0) {
      selectedCities.forEach((city) => {
        const { latitude, longitude, cityName } = city;

        // Construct the Geoapify Places API URL with appropriate categories and coordinates
        const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.activity_park&lat=${latitude}&lon=${longitude}&limit=20&apiKey=${geoapifyApiKey}`;

        // Fetch activities for the city
        fetch(apiUrl)
          .then((response) => response.json())
          .then((result) => {
            // Store the fetched activities under the city name
            setActivities((prevActivities) => ({
              ...prevActivities,
              [cityName]: result.features,
            }));
          })
          .catch((error) => {
            console.log(`Error fetching activities for ${cityName}:`, error);
          });
      });
    }
  }, [selectedCities]);

  return (
    <div>
      <h1>Activities</h1>
      {selectedCities && selectedCities.length > 0 ? (
        selectedCities.map((city) => (
          <div key={city.cityName}>
            <h2>{city.cityName}</h2>
            <p>Latitude: {city.latitude}</p>
            <p>Longitude: {city.longitude}</p>

            {/* Displaying activities for each city */}
            {activities[city.cityName] ? (
              <div>
                <h3>Activities:</h3>
                <ul>
                  {activities[city.cityName].map((activity, index) => (
                    <li key={index}>
                      <h4>{activity.properties.name}</h4>
                      <p>Category: {activity.properties.categories.join(", ")}</p>
                      <p>Address: {activity.properties.address_line1}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading activities...</p>
            )}
          </div>
        ))
      ) : (
        <p>No cities selected.</p>
      )}
    </div>
  );
};

export default Activities;
