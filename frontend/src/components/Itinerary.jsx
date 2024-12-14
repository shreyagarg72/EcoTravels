
import React, { useEffect, useState } from "react";
import { MapPin, Loader, RefreshCcw } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

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
  const [selectedCities, setSelectedCities] = useState([]);
  const [activitiesByDay, setActivitiesByDay] = useState({});
  const [selectedCityActivities, setSelectedCityActivities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const geoapifyApiKey = import.meta.env.VITE_GEO_API;

  const distributeActivities = (activities, duration) => {
    console.log("Raw activities:", activities);

    if (!activities || activities.length === 0) {
      console.log("No activities to distribute");
      return [];
    }

    // Shuffle activities
    const shuffledActivities = [...activities].sort(() => 0.5 - Math.random());

    // Separate different types of activities
    const restaurants = shuffledActivities.filter((activity) =>
      activity.properties?.categories?.some(
        (cat) => cat.includes("restaurant") || cat.includes("cafe")
      )
    );

    const otherActivities = shuffledActivities.filter(
      (activity) =>
        !activity.properties?.categories?.some(
          (cat) => cat.includes("restaurant") || cat.includes("cafe")
        )
    );

    console.log("Restaurants:", restaurants);
    console.log("Other Activities:", otherActivities);

    const activitiesPerDay = [];
    for (let day = 0; day < duration; day++) {
      const dayActivities = [];

      // Add a restaurant for lunch or dinner
      if (restaurants.length > 0) {
        const lunchOrDinner = restaurants.pop();
        dayActivities.push({
          ...lunchOrDinner,
          day: day + 1,
          type: "meal",
        });
      }

      // Add 3-4 other activities
      const dayOtherActivities = otherActivities
        .splice(0, Math.min(4, otherActivities.length))
        .map((activity) => ({
          ...activity,
          day: day + 1,
          type: "activity",
        }));

      dayActivities.push(...dayOtherActivities);

      activitiesPerDay.push(dayActivities);

      console.log(`Day ${day + 1} Activities:`, dayActivities);
    }

    return activitiesPerDay;
  };

  useEffect(() => {
    // Reset loading state and clear previous data
    setIsLoading(true);
    setActivitiesByDay({});
    setSelectedCityActivities([]);

    const storedCities =
      JSON.parse(localStorage.getItem("selectedCities")) || [];
    console.log("Stored Cities:", storedCities);

    setSelectedCities(storedCities);

    if (storedCities && storedCities.length > 0) {
      const activitiesFetches = storedCities.map((city) => {
        const { latitude, longitude, cityName, duration } = city;

        const apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,catering.cafe,entertainment.culture,entertainment.zoo,entertainment.activity_park,national_park,tourism.sights,tourism.attraction,heritage.unesco,production.pottery,religion.place_of_worship&lat=${latitude}&lon=${longitude}&limit=50&apiKey=${geoapifyApiKey}`;

        return fetch(apiUrl)
          .then((response) => response.json())
          .then((result) => {
            console.log(`Activities for ${cityName}:`, result);

            const distributedActivities = distributeActivities(
              result.features,
              duration || 3
            );

            return {
              cityName,
              distributedActivities,
            };
          })
          .catch((error) => {
            console.error(`Error fetching activities for ${cityName}:`, error);
            return {
              cityName,
              distributedActivities: [],
            };
          });
      });

      Promise.all(activitiesFetches)
        .then((citiesActivities) => {
          console.log("Cities Activities:", citiesActivities);

          const activitiesMap = citiesActivities.reduce((acc, city) => {
            acc[city.cityName] = city.distributedActivities;
            return acc;
          }, {});

          setActivitiesByDay(activitiesMap);

          // Automatically select the first city when multiple cities are loaded
          const firstCity = storedCities[0];
          setSelectedCity(firstCity);
          setSelectedCityActivities(activitiesMap[firstCity.cityName] || []);

          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error in activities processing:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // const handleCitySelect = (city) => {
  //   setSelectedCity(city);
  //   setSelectedCityActivities(activitiesByDay[city.cityName] || []);
  // };

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

  if (selectedCities.length === 0) {
    return (
      <div className="p-4 text-red-500">
        No cities selected. Please select cities first.
      </div>
    );
  }
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedCityActivities(activitiesByDay[city.cityName] || []);
    // Reset selected location when changing cities
    setSelectedLocation(null);
  };

  const handleLocationClick = (location) => {
    // If the location has coordinates, set it as the selected location
    if (location.geometry?.coordinates) {
      const [lon, lat] = location.geometry.coordinates;
      setSelectedLocation([lat, lon]);
    }
  };
  return (
    <div className={`container mx-auto p-4 ${showLoginModal ? "blur-sm" : ""}`}>
      {selectedCities.length > 1 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {selectedCities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className={`px-4 py-2 rounded ${
                selectedCity === city ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {city.cityName}
            </button>
          ))}
        </div>
      )}

      {selectedCity && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Itinerary for {selectedCity.cityName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <MapContainer
                center={[selectedCity.latitude, selectedCity.longitude]}
                zoom={12}
                style={{ height: "400px", width: "100%" }}
              >
                <MapCenterHandler 
                  center={selectedLocation || 
                    [selectedCity.latitude, selectedCity.longitude]} 
                />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker
                  position={[selectedCity.latitude, selectedCity.longitude]}
                >
                  <Popup>{selectedCity.cityName}</Popup>
                </Marker>

                {selectedCityActivities.flat().map((activity, index) => {
                  const [lon, lat] = activity.geometry?.coordinates || [];
                  return lon && lat ? (
                    <Marker 
                    key={index} 
                    position={[lat, lon]}
                    eventHandlers={{
                      click: () => handleLocationClick(activity)
                    }}
                  >
                      <Popup>
                        <div>
                          <h3>
                            {activity.properties?.name || "Unnamed Place"}
                          </h3>
                          <p>{activity.properties?.categories?.join(", ")}</p>
                          <button 
                            onClick={() => handleLocationClick(activity)}
                            className="text-blue-500 underline"
                          >
                            Center on Map
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null;
                })}
              </MapContainer>
            </div>

            <div>
              {selectedCityActivities.map((dayActivities, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                  <h3 className="text-xl font-semibold">Day {dayIndex + 1}</h3>
                  {dayActivities.length === 0 ? (
                    <p className="text-gray-500">No activities for this day</p>
                  ) : (
                    dayActivities.map((activity, activityIndex) => (
                      <div
                        key={activityIndex}
                        className="bg-white shadow rounded-lg p-3 mb-2"
                      >
                        <h4 className="font-bold">
                          {activity.properties?.name || "Unnamed Activity"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {activity.properties?.categories?.join(", ") ||
                            "No categories"}
                        </p>
                        {activity.type && (
                          <p className="text-xs text-blue-500">
                            {activity.type}
                          </p>
                        )}
                      </div>
                    ))
                  )}
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
