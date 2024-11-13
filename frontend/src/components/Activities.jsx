
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


import React, { useEffect, useState } from "react";
import { getDistance } from "geolib";

const Activities = ({ showLoginModal }) => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [activities, setActivities] = useState({});
  const [clusteredActivities, setClusteredActivities] = useState({});
  const geoapifyApiKey = import.meta.env.VITE_GEO_API;

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("selectedCities")) || [];
    setSelectedCities(storedCities);

    if (storedCities && storedCities.length > 0) {
      storedCities.forEach((city) => {
        const { latitude, longitude, cityName } = city;
        const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.activity_park&lat=${latitude}&lon=${longitude}&limit=20&apiKey=${geoapifyApiKey}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((result) => {
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

  useEffect(() => {
    if (Object.keys(activities).length > 0) {
      const clustered = {};

      Object.keys(activities).forEach((cityName) => {
        const cityActivities = activities[cityName];

        // Here we will cluster activities by proximity
        const clusters = clusterActivitiesByProximity(cityActivities);
        clustered[cityName] = clusters;
      });

      setClusteredActivities(clustered);
    }
  }, [activities]);

  const clusterActivitiesByProximity = (activityList) => {
    const maxDistance = 3000; // max distance in meters between activities for them to be grouped on the same day
    const clusters = [];

    activityList.forEach((activity) => {
      const { lat, lon } = activity.properties;
      let addedToCluster = false;

      // Try to add the activity to an existing cluster
      for (let cluster of clusters) {
        if (
          cluster.some((existingActivity) =>
            getDistance(
              { latitude: existingActivity.properties.lat, longitude: existingActivity.properties.lon },
              { latitude: lat, longitude: lon }
            ) <= maxDistance
          )
        ) {
          cluster.push(activity);
          addedToCluster = true;
          break;
        }
      }

      // If not added to any cluster, create a new cluster
      if (!addedToCluster) {
        clusters.push([activity]);
      }
    });

    return clusters;
  };

  return (
    <div className={`container mx-auto ${showLoginModal ? 'blur-sm' : ''}`}>
      <h1>Itinerary</h1>
      {selectedCities.length > 0 ? (
        selectedCities.map((city) => (
          <div key={city.cityName}>
            <h2>{city.cityName}</h2>

            {clusteredActivities[city.cityName] ? (
              clusteredActivities[city.cityName].map((dayActivities, dayIndex) => (
                <div key={dayIndex}>
                  <h3>Day {dayIndex + 1}</h3>
                  <ul>
                    {dayActivities.map((activity, index) => (
                      <li key={index}>
                        <h4>{activity.properties.name}</h4>
                        <p>Category: {activity.properties.categories.join(", ")}</p>
                        <p>Address: {activity.properties.address_line1}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
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
