// import React from "react";
// import { MapPin, Calendar } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const tripsData = [
//   {
//     id: 1,
//     tripName: "Scenic Delhi Getaway",
//     locations: [{ cityName: "Delhi", latitude: 28.6139, longitude: 77.209 }],
//     duration: 3,
//     description: "Explore the cultural heritage and bustling markets of Delhi.",
//   },
//   {
//     id: 2,
//     tripName: "Golden Triangle Adventure",
//     locations: [
//       { cityName: "Delhi", latitude: 28.6139, longitude: 77.209 },
//       { cityName: "Agra", latitude: 27.1767, longitude: 78.0081 },
//       { cityName: "Jaipur", latitude: 26.9124, longitude: 75.7873 },
//     ],
//     duration: 7,
//     description:
//       "A week-long journey covering Delhi, Agra, and Jaipur, showcasing the best of India’s heritage.",
//   },
//   {
//     id: 3,
//     tripName: "Beachside Bliss in Goa",
//     locations: [{ cityName: "Goa", latitude: 15.2993, longitude: 74.124 }],
//     duration: 4,
//     description: "Relax and unwind with pristine beaches and vibrant nightlife.",
//   },
// ];

// const InbuiltTrip = () => {
//   const navigate = useNavigate();

//   const handleTripSelect = (trip) => {
//     // Store the selected trip in localStorage for itinerary generation
//     localStorage.setItem("selectedCities", JSON.stringify(trip.locations));
//     localStorage.setItem("tripDuration", trip.duration);
//     navigate("/itinerary"); // Navigate to the Itinerary page
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Explore Inbuilt Trips
//       </h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tripsData.map((trip) => (
//           <div
//             key={trip.id}
//             className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
//             onClick={() => handleTripSelect(trip)}
//           >
//             <h2 className="text-lg font-bold text-gray-800 mb-2">
//               {trip.tripName}
//             </h2>
//             <p className="text-sm text-gray-600 mb-4">{trip.description}</p>
//             <div className="space-y-2 text-sm text-gray-600">
//               <div className="flex items-center">
//                 <MapPin className="mr-2 w-4 h-4 text-green-500" />
//                 <span>
//                   {trip.locations.map((loc) => loc.cityName).join(", ")}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <Calendar className="mr-2 w-4 h-4 text-blue-500" />
//                 <span>{trip.duration} Days</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InbuiltTrip;
import React, { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InbuiltTrip = () => {
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
    <div className="container mx-auto px-4 py-8">
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
