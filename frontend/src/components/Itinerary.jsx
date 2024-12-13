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