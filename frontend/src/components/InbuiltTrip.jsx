
import React, { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InbuiltTrip = ({ showLoginModal }) => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/trips");
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const handleTripSelect = (trip) => {
    localStorage.setItem("selectedCities", JSON.stringify(trip.locations));
    localStorage.setItem("tripDuration", trip.duration);
    navigate("/itinerary");
  };

  return (
    <div className={`container mx-auto px-4 py-4 ${showLoginModal ? "blur-sm" : ""}`}>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Explore Inbuilt Trips
      </h1>
      {trips.length === 0 ? (
        <p className="text-center text-gray-500">Loading trips...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
              onClick={() => handleTripSelect(trip)}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {trip.tripName}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{trip.description}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="mr-2 w-4 h-4 text-green-500" />
                  <span>
                    {trip.locations.map((loc) => loc.cityName).join(", ")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 w-4 h-4 text-blue-500" />
                  <span>{trip.duration} Days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InbuiltTrip;
