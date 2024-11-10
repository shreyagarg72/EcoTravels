
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Activities = () => {
//   const { state } = useLocation();
//   const { selectedCities } = state || {};
//   const [activities, setActivities] = useState({});

//   const geoapifyApiKey = "eb5f940831094f09b1e6bad3018bec9c"; // Replace with your Geoapify API key

//   useEffect(() => {
//     if (selectedCities && selectedCities.length > 0) {
//       selectedCities.forEach((city) => {
//         const { latitude, longitude, cityName } = city;

//         // Construct the Geoapify Places API URL with appropriate categories and coordinates
//         const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.activity_park&lat=${latitude}&lon=${longitude}&limit=20&apiKey=${geoapifyApiKey}`;

//         // Fetch activities for the city
//         fetch(apiUrl)
//           .then((response) => response.json())
//           .then((result) => {
//             // Store the fetched activities under the city name
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
//   }, [selectedCities]);

//   return (
//     <div>
//       <h1>Activities</h1>
//       {selectedCities && selectedCities.length > 0 ? (
//         selectedCities.map((city) => (
//           <div key={city.cityName}>
//             <h2>{city.cityName}</h2>
//             {/* <p>Latitude: {city.latitude}</p>
//             <p>Longitude: {city.longitude}</p> */}

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
import React, { useEffect, useState } from "react";

const Activities = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [activities, setActivities] = useState({});
  
  const geoapifyApiKey = "eb5f940831094f09b1e6bad3018bec9c"; // Replace with your Geoapify API key

  useEffect(() => {
    // Retrieve selected cities from localStorage
    const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
    setSelectedCities(storedCities);

    if (storedCities && storedCities.length > 0) {
      storedCities.forEach((city) => {
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
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      {selectedCities && selectedCities.length > 0 ? (
        selectedCities.map((city) => (
          <div key={city.cityName}>
            <h2>{city.cityName}</h2>

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
