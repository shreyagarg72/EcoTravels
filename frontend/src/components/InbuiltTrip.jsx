import React, { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Plane,
  Globe,
  Mountain,
  Sunset,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TripCard from "../components/TripCard";

const InbuiltTrip = ({ showLoginModal }) => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/trips`);
        setTrips(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleTripSelect = (trip) => {
    const tripId = trip.tripId?.toString() || trip._id?.toString();
    if (tripId) {
      navigate(`/view-trip/${tripId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-green-200">
        <div className="text-center">
          <Mountain className="w-24 h-24 mx-auto text-green-600 animate-bounce" />
          <p className="text-2xl font-semibold text-gray-700 mt-4">
            Crafting Your Perfect Journey...
          </p>
          <p className="text-gray-500 mt-2">Discovering amazing destinations</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 py-16 px-4 ${
        showLoginModal ? "blur-sm" : ""
      }`}
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-6">
            Discover Your Dream Escape
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore handpicked journeys designed to inspire and awaken your
            adventurous spirit.
          </p>
        </div>

        {trips.length === 0 ? (
          <div className="text-center">
            <Sunset className="w-24 h-24 mx-auto text-gray-400 mb-6" />
            <p className="text-2xl text-gray-600">
              No trips available right now
            </p>
            <p className="text-gray-500 mt-2">
              Check back soon for new adventures!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard
                key={trip.tripId || trip._id}
                trip={trip}
                onSelect={() => handleTripSelect(trip)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InbuiltTrip;