// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const FlightDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [flightData, setFlightData] = useState([]);
//   const [departureDate, setDepartureDate] = useState("");
//   const [departureCity, setDepartureCity] = useState("");
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [airports, setAirports] = useState({});

//   // AeroDataBox API credentials
//   const RAPID_API_KEY = "d30cb59e3amsh3b90c450af3cdf7p1de5e3jsn27da58a468c9";
//   const RAPID_API_HOST = "aerodatabox.p.rapidapi.com";

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get trip data from location state or local storage
//     const tripData =
//       location.state?.trip || JSON.parse(localStorage.getItem("tripData"));

//     if (
//       tripData &&
//       tripData.userSelection &&
//       tripData.userSelection.selectedCities
//     ) {
//       setSelectedCities(tripData.userSelection.selectedCities);

//       // Pre-fill departure city if available
//       if (tripData.userSelection.departureCity) {
//         setDepartureCity(tripData.userSelection.departureCity);
//       }

//       // Set a default departure date (today)
//       const today = new Date();
//       setDepartureDate(today.toISOString().split("T")[0]);
//     } else {
//       setError("No trip data found. Please go back and try again.");
//     }

//     setLoading(false);
//   }, [location]);

//   // Search for airport by city name
//   const searchAirport = async (cityName) => {
//     try {
//       // Check if we already have this airport in cache
//       if (airports[cityName]) {
//         return airports[cityName];
//       }

//       const options = {
//         method: "GET",
//         headers: {
//           "X-RapidAPI-Key": RAPID_API_KEY,
//           "X-RapidAPI-Host": RAPID_API_HOST,
//         },
//       };

//       // Use the search endpoint to find airport by city name
//       const response = await fetch(
//         `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${encodeURIComponent(
//           cityName
//         )}`,
//         options
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Airport search API returned status ${response.status}`
//         );
//       }

//       const data = await response.json();

//       if (data.items && data.items.length > 0) {
//         // Get the first result which is usually the main airport
//         const airport = data.items[0];

//         // Make sure we have both ICAO and IATA codes
//         if (!airport.icao) {
//           throw new Error(`Missing ICAO code for airport in ${cityName}`);
//         }

//         // Update the airports cache
//         const airportData = {
//           icao: airport.icao,
//           iata: airport.iata,
//           name: airport.name,
//           shortName: airport.shortName,
//           municipality: airport.municipality,
//           location: airport.location,
//         };

//         setAirports((prev) => ({
//           ...prev,
//           [cityName]: airportData,
//         }));

//         return airportData;
//       }

//       throw new Error(`No airport found for ${cityName}`);
//     } catch (error) {
//       console.error(`Error searching for airport in ${cityName}:`, error);
//       throw error;
//     }
//   };

//   // Fetch flights for a specific route and date
//   // Fetch flights for a specific route and date
//   const fetchFlightsForRoute = async (departureIcao, date) => {
//     try {
//       // Create time ranges for the day split into two 12-hour periods
//       const dateObj = new Date(date);

//       // First half of the day: 00:00 to 11:59
//       const fromLocal1 = `${formatDateForApi(dateObj)}T00:00`;
//       const toLocal1 = `${formatDateForApi(dateObj)}T11:59`;

//       // Second half of the day: 12:00 to 23:59
//       const fromLocal2 = `${formatDateForApi(dateObj)}T12:00`;
//       const toLocal2 = `${formatDateForApi(dateObj)}T23:59`;

//       const options = {
//         method: "GET",
//         headers: {
//           "X-RapidAPI-Key": RAPID_API_KEY,
//           "X-RapidAPI-Host": RAPID_API_HOST,
//         },
//       };

//       // Make two separate API calls for the two time periods
//       const [firstHalfResponse, secondHalfResponse] = await Promise.all([
//         fetch(
//           `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${departureIcao}/${fromLocal1}/${toLocal1}?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false`,
//           options
//         ),
//         fetch(
//           `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${departureIcao}/${fromLocal2}/${toLocal2}?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false`,
//           options
//         ),
//       ]);

//       // Check if both responses are OK
//       if (!firstHalfResponse.ok) {
//         throw new Error(
//           `API returned status ${
//             firstHalfResponse.status
//           }: ${await firstHalfResponse.text()}`
//         );
//       }

//       if (!secondHalfResponse.ok) {
//         throw new Error(
//           `API returned status ${
//             secondHalfResponse.status
//           }: ${await secondHalfResponse.text()}`
//         );
//       }

//       // Parse both responses
//       const firstHalfData = await firstHalfResponse.json();
//       const secondHalfData = await secondHalfResponse.json();

//       // Combine departures from both responses
//       const allDepartures = [
//         ...(firstHalfData.departures || []),
//         ...(secondHalfData.departures || []),
//       ];

//       return allDepartures;
//     } catch (error) {
//       console.error(`Error fetching flights from ${departureIcao}:`, error);
//       throw error;
//     }
//   };
//   // Format date for API requests (YYYY-MM-DD)
//   const formatDateForApi = (date) => {
//     const d = new Date(date);
//     return d.toISOString().split("T")[0];
//   };

//   const fetchFlights = async () => {
//     if (!departureCity || !departureDate || selectedCities.length < 1) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setFlightData([]);

//     try {
//       // Get departure airport information
//       const departureAirport = await searchAirport(departureCity);

//       if (!departureAirport || !departureAirport.icao) {
//         throw new Error(
//           `Could not find airport information for ${departureCity}`
//         );
//       }

//       // Create date objects for each leg
//       const flightRoutes = [];

//       // Fetch flights for each destination
//       for (let i = 0; i < selectedCities.length; i++) {
//         const destinationCity = selectedCities[i];

//         try {
//           // Get destination airport
//           const destinationAirport = await searchAirport(
//             destinationCity.cityName
//           );

//           if (!destinationAirport) {
//             throw new Error(
//               `Could not find airport for ${destinationCity.cityName}`
//             );
//           }

//           // Calculate the date for this leg
//           const legDepartureDate = new Date(departureDate);
//           if (i > 0) {
//             legDepartureDate.setDate(
//               legDepartureDate.getDate() + calculateTotalDays(selectedCities, i)
//             );
//           }

//           // Fetch flights for this specific route
//           const flights = await fetchFlightsForRoute(
//             departureAirport.icao,
//             legDepartureDate
//           );

//           // Filter flights going to this destination
//           const destinationFlights = flights.filter((flight) => {
//             // Check if the arrival airport matches our destination
//             return (
//               flight.arrival &&
//               (flight.arrival.airport.icao === destinationAirport.icao ||
//                 (flight.arrival.airport.iata &&
//                   flight.arrival.airport.iata === destinationAirport.iata))
//             );
//           });

//           if (destinationFlights.length > 0) {
//             flightRoutes.push({
//               from: departureCity,
//               fromCode: departureAirport.iata || departureAirport.icao,
//               to: destinationCity.cityName,
//               toCode: destinationAirport.iata || destinationAirport.icao,
//               flights: destinationFlights.slice(0, 5), // Limit to top 5 flights
//             });
//           } else {
//             flightRoutes.push({
//               from: departureCity,
//               fromCode: departureAirport.iata || departureAirport.icao,
//               to: destinationCity.cityName,
//               toCode: destinationAirport.iata || destinationAirport.icao,
//               flights: [],
//               message:
//                 "No direct flights found for this route on the selected date.",
//             });
//           }
//         } catch (error) {
//           console.error(
//             `Error processing flights to ${destinationCity.cityName}:`,
//             error
//           );
//           flightRoutes.push({
//             from: departureCity,
//             fromCode: departureAirport.iata || departureAirport.icao,
//             to: destinationCity.cityName,
//             toCode: "N/A",
//             flights: [],
//             message: `Error finding flights: ${error.message}`,
//           });
//         }
//       }

//       setFlightData(flightRoutes);
//     } catch (err) {
//       console.error("Error fetching flight data:", err);
//       setError(
//         "Failed to fetch flight data. " +
//           (err.response
//             ? `Error: ${err.response.status} - ${err.response.statusText}`
//             : err.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to calculate total days before a specific city index
//   const calculateTotalDays = (cities, currentIndex) => {
//     let totalDays = 0;
//     for (let i = 0; i < currentIndex; i++) {
//       totalDays += cities[i].durationInDays || 2; // Default to 2 days if not specified
//     }
//     return totalDays;
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const options = { year: "numeric", month: "short", day: "numeric" };
//       return new Date(dateString).toLocaleDateString(undefined, options);
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   // Format time for display
//   const formatTime = (timeString) => {
//     if (!timeString) return "N/A";

//     try {
//       const date = new Date(timeString);
//       return date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (error) {
//       console.error("Error formatting time:", error);
//       return timeString;
//     }
//   };

//   // Calculate flight duration
//   const calculateDuration = (departure, arrival) => {
//     if (!departure || !arrival) return "N/A";

//     try {
//       const depTime = new Date(departure);
//       const arrTime = new Date(arrival);

//       if (isNaN(depTime.getTime()) || isNaN(arrTime.getTime())) {
//         return "N/A";
//       }

//       const durationMs = arrTime - depTime;
//       const hours = Math.floor(durationMs / (1000 * 60 * 60));
//       const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

//       return `${hours}h ${minutes}m`;
//     } catch (error) {
//       console.error("Error calculating duration:", error);
//       return "N/A";
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//           Back to Trip
//         </button>
//       </div>

//       <h1 className="text-3xl font-bold mb-6">🛫 Flight Options</h1>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Departure City
//             </label>
//             <input
//               type="text"
//               value={departureCity}
//               onChange={(e) => setDepartureCity(e.target.value)}
//               placeholder="Enter city name (e.g. Delhi, New York)"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Departure Date
//             </label>
//             <input
//               type="date"
//               value={departureDate}
//               onChange={(e) => setDepartureDate(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mb-4">
//           <button
//             onClick={fetchFlights}
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
//           >
//             {loading ? "Searching..." : "Search Flights"}
//           </button>
//         </div>

//         {selectedCities.length > 0 && (
//           <div className="mt-4">
//             <h3 className="font-medium text-gray-700 mb-2">Trip Cities:</h3>
//             <div className="flex flex-wrap gap-2">
//               {selectedCities.map((city, index) => (
//                 <div
//                   key={index}
//                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                 >
//                   {city.cityName}
//                   {city.durationInDays && ` (${city.durationInDays} days)`}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
//             <div className="font-medium mb-1">Error:</div>
//             {error}
//           </div>
//         )}
//       </div>

//       {flightData.length > 0 && (
//         <div className="space-y-8">
//           {flightData.map((route, routeIndex) => (
//             <div
//               key={routeIndex}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <div className="p-4 border-b bg-gray-100">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold">
//                     {route.fromCode} → {route.toCode}
//                   </h2>
//                   <div className="text-sm text-gray-600">
//                     {routeIndex === 0
//                       ? formatDate(departureDate)
//                       : `Estimated: ${formatDate(
//                           new Date(departureDate).setDate(
//                             new Date(departureDate).getDate() +
//                               calculateTotalDays(selectedCities, routeIndex - 1)
//                           )
//                         )}`}
//                   </div>
//                 </div>
//               </div>

//               {route.message ? (
//                 <div className="p-6 text-center text-gray-500">
//                   {route.message}
//                   <div className="mt-2 text-sm">
//                     Try different cities or dates.
//                   </div>
//                 </div>
//               ) : route.flights.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">
//                   No flights found from {route.from} to {route.to} on the
//                   selected date.
//                   <div className="mt-2 text-sm">
//                     Try a different date or check different cities.
//                   </div>
//                 </div>
//               ) : (
//                 <div className="divide-y">
//                   {route.flights.map((flight, flightIndex) => (
//                     <div
//                       key={flightIndex}
//                       className="p-4 hover:bg-gray-50 transition-colors"
//                     >
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
//                         <div className="flex items-center gap-3 mb-2 md:mb-0">
//                           <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full">
//                             ✈️
//                           </div>
//                           <div>
//                             <div className="font-bold">
//                               {flight.number?.default || "Flight"}{" "}
//                               {flight.aircraft?.model || ""}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {flight.airline?.name ||
//                                 "Airline info not available"}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div
//                             className={`text-sm px-2 py-1 rounded ${
//                               flight.status === "Scheduled" ||
//                               flight.status === "Expected"
//                                 ? "bg-green-100 text-green-800"
//                                 : flight.status === "Delayed"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                           >
//                             {flight.status || "Status unavailable"}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div>
//                           <div className="text-sm text-gray-500">Departure</div>
//                           <div className="font-bold text-lg">
//                             {formatTime(
//                               flight.departure?.scheduledTimeLocal ||
//                                 flight.departure?.scheduledTimeUtc
//                             )}
//                           </div>
//                           <div className="text-gray-700">
//                             {flight.departure?.airport?.name || route.from}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Terminal: {flight.departure?.terminal || "N/A"}
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-sm text-gray-500">Arrival</div>
//                           <div className="font-bold text-lg">
//                             {formatTime(
//                               flight.arrival?.scheduledTimeLocal ||
//                                 flight.arrival?.scheduledTimeUtc
//                             )}
//                           </div>
//                           <div className="text-gray-700">
//                             {flight.arrival?.airport?.name || route.to}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Terminal: {flight.arrival?.terminal || "N/A"}
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-sm text-gray-500">Duration</div>
//                           <div className="font-bold">
//                             {calculateDuration(
//                               flight.departure?.scheduledTimeLocal ||
//                                 flight.departure?.scheduledTimeUtc,
//                               flight.arrival?.scheduledTimeLocal ||
//                                 flight.arrival?.scheduledTimeUtc
//                             )}
//                           </div>
//                           {flight.number?.default && (
//                             <div className="text-sm text-gray-500">
//                               Flight: {flight.number.default}
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex items-center justify-end">
//                           <button
//                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
//                             onClick={() => {
//                               // This would typically link to a booking site or show more details
//                               alert(
//                                 `Flight selected: ${
//                                   flight.airline?.name || "Airline"
//                                 } ${flight.number?.default || "N/A"} from ${
//                                   route.fromCode
//                                 } to ${route.toCode}`
//                               );
//                             }}
//                           >
//                             Select
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
//         <div className="font-bold mb-2">Flight Search Guide:</div>
//         <ul className="list-disc list-inside space-y-1">
//           <li>
//             Enter your departure city name (e.g., "Delhi", "New York", "London")
//           </li>
//           <li>Select a departure date to find available flights</li>
//           <li>
//             The system will find airports for your cities and search for direct
//             flights
//           </li>
//           <li>
//             For multi-city trips, the system automatically calculates dates
//             based on your stay duration
//           </li>
//           <li>
//             Common airport searches: Delhi, Mumbai, Bangalore, Chennai, Kolkata,
//             Jaipur, New York, London, Paris, Tokyo, Dubai, Singapore
//           </li>
//           <li>
//             If no flights are found, try a different departure date or check the
//             city spelling
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FlightDetails;

//SAFE CODE

// Add debugging function to inspect time structure
//   const inspectTimeData = (flight) => {
//     console.log("Flight data structure:", flight);

//     // Inspect departure time
//     console.log("Departure time data:", {
//       scheduledTimeLocal: flight.departure?.scheduledTimeLocal,
//       scheduledTimeUtc: flight.departure?.scheduledTimeUtc,
//       scheduledTime: flight.departure?.scheduledTime,
//       time: flight.departure?.time,
//       timestamp: flight.departure?.timestamp,
//       departure: flight.departure
//     });

//     // Inspect arrival time
//     console.log("Arrival time data:", {
//       scheduledTimeLocal: flight.arrival?.scheduledTimeLocal,
//       scheduledTimeUtc: flight.arrival?.scheduledTimeUtc,
//       scheduledTime: flight.arrival?.scheduledTime,
//       time: flight.arrival?.time,
//       timestamp: flight.arrival?.timestamp,
//       arrival: flight.arrival
//     });
//   };import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const FlightDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [flightData, setFlightData] = useState([]);
//   const [departureDate, setDepartureDate] = useState("");
//   const [departureCity, setDepartureCity] = useState("");
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [airports, setAirports] = useState({});

//   // AeroDataBox API credentials
//   const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
//   const RAPID_API_HOST = "aerodatabox.p.rapidapi.com";

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get trip data from location state or local storage
//     const tripData =
//       location.state?.trip || JSON.parse(localStorage.getItem("tripData"));

//     if (
//       tripData &&
//       tripData.userSelection &&
//       tripData.userSelection.selectedCities
//     ) {
//       setSelectedCities(tripData.userSelection.selectedCities);

//       // Pre-fill departure city if available
//       if (tripData.userSelection.departureCity) {
//         setDepartureCity(tripData.userSelection.departureCity);
//       }

//       // Set a default departure date (today)
//       const today = new Date();
//       setDepartureDate(today.toISOString().split("T")[0]);
//     } else {
//       setError("No trip data found. Please go back and try again.");
//     }

//     setLoading(false);
//   }, [location]);

//   // Search for airport by city name
//   const searchAirport = async (cityName) => {
//     try {
//       // Check if we already have this airport in cache
//       if (airports[cityName]) {
//         return airports[cityName];
//       }

//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key': RAPID_API_KEY,
//           'X-RapidAPI-Host': RAPID_API_HOST
//         }
//       };

//       // Use the search endpoint to find airport by city name
//       const response = await fetch(
//         `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${encodeURIComponent(cityName)}`,
//         options
//       );

//       if (!response.ok) {
//         throw new Error(`Airport search API returned status ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.items && data.items.length > 0) {
//         // Get the first result which is usually the main airport
//         const airport = data.items[0];

//         // Make sure we have both ICAO and IATA codes
//         if (!airport.icao) {
//           throw new Error(`Missing ICAO code for airport in ${cityName}`);
//         }

//         // Update the airports cache
//         const airportData = {
//           icao: airport.icao,
//           iata: airport.iata,
//           name: airport.name,
//           shortName: airport.shortName,
//           municipality: airport.municipality,
//           location: airport.location
//         };

//         setAirports(prev => ({
//           ...prev,
//           [cityName]: airportData
//         }));

//         return airportData;
//       }

//       throw new Error(`No airport found for ${cityName}`);
//     } catch (error) {
//       console.error(`Error searching for airport in ${cityName}:`, error);
//       throw error;
//     }
//   };

//   // Fetch flights for a specific route and date
//   const fetchFlightsForRoute = async (departureIcao, date) => {
//     try {
//       // Create time ranges for the day split into two 12-hour periods
//       const dateObj = new Date(date);

//       // First half of the day: 00:00 to 11:59
//       const fromLocal1 = `${formatDateForApi(dateObj)}T00:00`;
//       const toLocal1 = `${formatDateForApi(dateObj)}T11:59`;

//       // Second half of the day: 12:00 to 23:59
//       const fromLocal2 = `${formatDateForApi(dateObj)}T12:00`;
//       const toLocal2 = `${formatDateForApi(dateObj)}T23:59`;

//       const options = {
//         method: 'GET',
//         headers: {
//           'X-RapidAPI-Key': RAPID_API_KEY,
//           'X-RapidAPI-Host': RAPID_API_HOST
//         }
//       };

//       // Make two separate API calls for the two time periods
//       const [firstHalfResponse, secondHalfResponse] = await Promise.all([
//         fetch(
//           `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${departureIcao}/${fromLocal1}/${toLocal1}?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false`,
//           options
//         ),
//         fetch(
//           `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${departureIcao}/${fromLocal2}/${toLocal2}?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false`,
//           options
//         )
//       ]);

//       // Check if both responses are OK
//       if (!firstHalfResponse.ok) {
//         throw new Error(`API returned status ${firstHalfResponse.status}: ${await firstHalfResponse.text()}`);
//       }

//       if (!secondHalfResponse.ok) {
//         throw new Error(`API returned status ${secondHalfResponse.status}: ${await secondHalfResponse.text()}`);
//       }

//       // Parse both responses
//       const firstHalfData = await firstHalfResponse.json();
//       const secondHalfData = await secondHalfResponse.json();

//       // Combine departures from both responses
//       const allDepartures = [
//         ...(firstHalfData.departures || []),
//         ...(secondHalfData.departures || [])
//       ];

//       return allDepartures;
//     } catch (error) {
//       console.error(`Error fetching flights from ${departureIcao}:`, error);
//       throw error;
//     }
//   };

//   // Format date for API requests (YYYY-MM-DD)
//   const formatDateForApi = (date) => {
//     const d = new Date(date);
//     return d.toISOString().split('T')[0];
//   };

//   const fetchFlights = async () => {
//     if (!departureCity || !departureDate || selectedCities.length < 1) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setFlightData([]);

//     try {
//       // Get departure airport information
//       const departureAirport = await searchAirport(departureCity);

//       if (!departureAirport || !departureAirport.icao) {
//         throw new Error(`Could not find airport information for ${departureCity}`);
//       }

//       // Create date objects for each leg
//       const flightRoutes = [];

//       // Fetch flights for each destination
//       for (let i = 0; i < selectedCities.length; i++) {
//         const destinationCity = selectedCities[i];

//         try {
//           // Get destination airport
//           const destinationAirport = await searchAirport(destinationCity.cityName);

//           if (!destinationAirport) {
//             throw new Error(`Could not find airport for ${destinationCity.cityName}`);
//           }

//           // Calculate the date for this leg
//           const legDepartureDate = new Date(departureDate);
//           if (i > 0) {
//             legDepartureDate.setDate(
//               legDepartureDate.getDate() + calculateTotalDays(selectedCities, i)
//             );
//           }

//           // Fetch flights for this specific route
//           const flights = await fetchFlightsForRoute(departureAirport.icao, legDepartureDate);

//           // Filter flights going to this destination
//           const destinationFlights = flights.filter(flight => {
//             // Check if the arrival airport matches our destination
//             return flight.arrival &&
//                   (flight.arrival.airport.icao === destinationAirport.icao ||
//                    (flight.arrival.airport.iata && flight.arrival.airport.iata === destinationAirport.iata));
//           });

//           if (destinationFlights.length > 0) {
//             flightRoutes.push({
//               from: departureCity,
//               fromCode: departureAirport.iata || departureAirport.icao,
//               to: destinationCity.cityName,
//               toCode: destinationAirport.iata || destinationAirport.icao,
//               flights: destinationFlights.slice(0, 5), // Limit to top 5 flights
//             });
//           } else {
//             flightRoutes.push({
//               from: departureCity,
//               fromCode: departureAirport.iata || departureAirport.icao,
//               to: destinationCity.cityName,
//               toCode: destinationAirport.iata || destinationAirport.icao,
//               flights: [],
//               message: "No direct flights found for this route on the selected date.",
//             });
//           }
//         } catch (error) {
//           console.error(
//             `Error processing flights to ${destinationCity.cityName}:`,
//             error
//           );
//           flightRoutes.push({
//             from: departureCity,
//             fromCode: departureAirport.iata || departureAirport.icao,
//             to: destinationCity.cityName,
//             toCode: "N/A",
//             flights: [],
//             message: `Error finding flights: ${error.message}`,
//           });
//         }
//       }

//       setFlightData(flightRoutes);
//     } catch (err) {
//       console.error("Error fetching flight data:", err);
//       setError(
//         "Failed to fetch flight data. " +
//           (err.response
//             ? `Error: ${err.response.status} - ${err.response.statusText}`
//             : err.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to calculate total days before a specific city index
//   const calculateTotalDays = (cities, currentIndex) => {
//     let totalDays = 0;
//     for (let i = 0; i < currentIndex; i++) {
//       totalDays += cities[i].durationInDays || 2; // Default to 2 days if not specified
//     }
//     return totalDays;
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const options = { year: "numeric", month: "short", day: "numeric" };
//       return new Date(dateString).toLocaleDateString(undefined, options);
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return dateString;
//     }
//   };

//   // Format time for display
//   const formatTime = (timeString) => {
//     if (!timeString) return "N/A";

//     try {
//       // Handle different possible formats
//       let date;

//       // Check if it's a string (ISO format)
//       if (typeof timeString === 'string') {
//         date = new Date(timeString);
//       }
//       // Check if it's an object with a dateUtc property
//       else if (timeString && typeof timeString === 'object' && timeString.dateUtc) {
//         date = new Date(timeString.dateUtc);
//       }
//       // Check if it's an object with a dateLocal property
//       else if (timeString && typeof timeString === 'object' && timeString.dateLocal) {
//         date = new Date(timeString.dateLocal);
//       }
//       // Default fallback
//       else {
//         return "N/A";
//       }

//       // Check if date is valid
//       if (isNaN(date.getTime())) {
//         return "N/A";
//       }

//       return date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (error) {
//       console.error("Error formatting time:", error, "Value:", timeString);
//       return "N/A";
//     }
//   };

//   // Calculate flight duration
//   const calculateDuration = (departure, arrival) => {
//     if (!departure || !arrival) return "N/A";

//     try {
//       const depTime = new Date(departure);
//       const arrTime = new Date(arrival);

//       if (isNaN(depTime.getTime()) || isNaN(arrTime.getTime())) {
//         return "N/A";
//       }

//       const durationMs = arrTime - depTime;
//       const hours = Math.floor(durationMs / (1000 * 60 * 60));
//       const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

//       return `${hours}h ${minutes}m`;
//     } catch (error) {
//       console.error("Error calculating duration:", error);
//       return "N/A";
//     }
//   };
// return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//           Back to Trip
//         </button>
//       </div>

//       <h1 className="text-3xl font-bold mb-6">🛫 Available Flights</h1>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Departure City
//             </label>
//             <input
//               type="text"
//               value={departureCity}
//               onChange={(e) => setDepartureCity(e.target.value)}
//               placeholder="Enter city name (e.g. Delhi, New York)"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Departure Date
//             </label>
//             <input
//               type="date"
//               value={departureDate}
//               onChange={(e) => setDepartureDate(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end mb-4">
//           <button
//             onClick={fetchFlights}
//             disabled={loading}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
//           >
//             {loading ? "Searching..." : "Search Flights"}
//           </button>
//         </div>

//         {selectedCities.length > 0 && (
//           <div className="mt-4">
//             <h3 className="font-medium text-gray-700 mb-2">Trip Cities:</h3>
//             <div className="flex flex-wrap gap-2">
//               {selectedCities.map((city, index) => (
//                 <div
//                   key={index}
//                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
//                 >
//                   {city.cityName}
//                   {city.durationInDays && ` (${city.durationInDays} days)`}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
//             <div className="font-medium mb-1">Error:</div>
//             {error}
//           </div>
//         )}
//       </div>

//       {flightData.length > 0 && (
//         <div className="space-y-8">
//           {flightData.map((route, routeIndex) => (
//             <div
//               key={routeIndex}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <div className="p-4 border-b bg-gray-100">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold">
//                     {route.fromCode} → {route.toCode}
//                   </h2>
//                   <div className="text-sm text-gray-600">
//                     {routeIndex === 0
//                       ? formatDate(departureDate)
//                       : `Estimated: ${formatDate(
//                           new Date(departureDate).setDate(
//                             new Date(departureDate).getDate() +
//                               calculateTotalDays(selectedCities, routeIndex - 1)
//                           )
//                         )}`}
//                   </div>
//                 </div>
//               </div>

//               {route.message ? (
//                 <div className="p-6 text-center text-gray-500">
//                   {route.message}
//                   <div className="mt-2 text-sm">
//                     Try different cities or dates.
//                   </div>
//                 </div>
//               ) : route.flights.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">
//                   No flights found from {route.from} to {route.to} on the selected date.
//                   <div className="mt-2 text-sm">
//                     Try a different date or check different cities.
//                   </div>
//                 </div>
//               ) : (
//                 <div className="divide-y">
//                   {route.flights.map((flight, flightIndex) => {
//                     // Debug log for the first flight
//                     if (flightIndex === 0) {
//                       inspectTimeData(flight);
//                     }
//                     return (
//                     <div
//                       key={flightIndex}
//                       className="p-4 hover:bg-gray-50 transition-colors"
//                     >
//                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
//                         <div className="flex items-center gap-3 mb-2 md:mb-0">
//                           <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full">
//                             ✈️
//                           </div>
//                           <div>
//                             <div className="font-bold">
//                               {flight.number?.default || "Flight"} {" "}
//                               {flight.aircraft?.model || ""}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {flight.airline?.name || "Airline info not available"}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div
//                             className={`text-sm px-2 py-1 rounded ${
//                               flight.status === "Scheduled" || flight.status === "Expected"
//                                 ? "bg-green-100 text-green-800"
//                                 : flight.status === "Delayed"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                           >
//                             {flight.status || "Status unavailable"}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                           <div className="text-sm text-gray-500">Departure</div>
//                           <div className="font-bold text-lg">
//                             {/* Try multiple possible formats for time */}
//                             {formatTime(
//                               flight.departure?.scheduledTimeLocal ||
//                               flight.departure?.scheduledTimeUtc ||
//                               (flight.departure?.scheduledTime && flight.departure.scheduledTime.local) ||
//                               (flight.departure?.scheduledTime && flight.departure.scheduledTime.utc) ||
//                               flight.departure?.scheduledTime ||
//                               flight.departure?.time
//                             )}
//                           </div>
//                           <div className="text-gray-700">
//                             {flight.departure?.airport?.name || route.from}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Terminal: {flight.departure?.terminal || "N/A"}
//                           </div>
//                           {/* Display raw time for debugging */}
//                           <div className="text-xs text-gray-400 mt-1">
//                             Raw time: {typeof flight.departure === 'object' ?
//                               JSON.stringify(flight.departure?.scheduledTimeLocal ||
//                                              flight.departure?.scheduledTimeUtc ||
//                                              flight.departure?.scheduledTime ||
//                                              flight.departure?.time).substring(0, 30) : 'No data'}
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-sm text-gray-500">Arrival</div>
//                           <div className="font-bold text-lg">
//                             {/* Try multiple possible formats for time */}
//                             {formatTime(
//                               flight.arrival?.scheduledTimeLocal ||
//                               flight.arrival?.scheduledTimeUtc ||
//                               (flight.arrival?.scheduledTime && flight.arrival.scheduledTime.local) ||
//                               (flight.arrival?.scheduledTime && flight.arrival.scheduledTime.utc) ||
//                               flight.arrival?.scheduledTime ||
//                               flight.arrival?.time
//                             )}
//                           </div>
//                           <div className="text-gray-700">
//                             {flight.arrival?.airport?.name || route.to}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             Terminal: {flight.arrival?.terminal || "N/A"}
//                           </div>
//                           {/* Display raw time for debugging */}
//                           <div className="text-xs text-gray-400 mt-1">
//                             Raw time: {typeof flight.arrival === 'object' ?
//                               JSON.stringify(flight.arrival?.scheduledTimeLocal ||
//                                              flight.arrival?.scheduledTimeUtc ||
//                                              flight.arrival?.scheduledTime ||
//                                              flight.arrival?.time).substring(0, 30) : 'No data'}
//                           </div>
//                         </div>

//                         <div>
//                           <div className="text-sm text-gray-500">Duration</div>
//                           <div className="font-bold">
//                             {calculateDuration(
//                               flight.departure?.scheduledTimeLocal ||
//                               flight.departure?.scheduledTimeUtc ||
//                               (flight.departure?.scheduledTime && flight.departure.scheduledTime.local) ||
//                               (flight.departure?.scheduledTime && flight.departure.scheduledTime.utc) ||
//                               flight.departure?.scheduledTime ||
//                               flight.departure?.time,

//                               flight.arrival?.scheduledTimeLocal ||
//                               flight.arrival?.scheduledTimeUtc ||
//                               (flight.arrival?.scheduledTime && flight.arrival.scheduledTime.local) ||
//                               (flight.arrival?.scheduledTime && flight.arrival.scheduledTime.utc) ||
//                               flight.arrival?.scheduledTime ||
//                               flight.arrival?.time
//                             )}
//                           </div>
//                           {flight.number?.default && (
//                             <div className="text-sm text-gray-500">
//                               Flight: {flight.number.default}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                   })}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
//         <div className="font-bold mb-2">Flight Search Guide:</div>
//         <ul className="list-disc list-inside space-y-1">
//           <li>
//             Enter your departure city name (e.g., "Delhi", "New York", "London")
//           </li>
//           <li>
//             Select a departure date to find available flights
//           </li>
//           <li>
//             The system will find airports for your cities and search for direct flights
//           </li>
//           <li>
//             For multi-city trips, the system automatically calculates dates based on your stay duration
//           </li>
//           <li>
//             Common airport searches: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Jaipur,
//             New York, London, Paris, Tokyo, Dubai, Singapore
//           </li>
//           <li>
//             If no flights are found, try a different departure date or check the city spelling
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FlightDetails;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FlightDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [airports, setAirports] = useState({});

  // Additional form fields for FlightAPI.io
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfInfants, setNumberOfInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");

  // API credentials
  const FLIGHT_API_KEY = import.meta.env.VITE_FLIGHT_API_KEY;
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPID_API_KEY;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get trip data from location state or local storage
    const tripData =
      location.state?.trip || JSON.parse(localStorage.getItem("tripData"));

    if (
      tripData &&
      tripData.userSelection &&
      tripData.userSelection.selectedCities
    ) {
      setSelectedCities(tripData.userSelection.selectedCities);

      // Pre-fill departure city if available
      if (tripData.userSelection.departureCity) {
        setDepartureCity(tripData.userSelection.departureCity);
      }

      // Set a default departure date (today)
      const today = new Date();
      setDepartureDate(today.toISOString().split("T")[0]);
    } else {
      setError("No trip data found. Please go back and try again.");
    }

    setLoading(false);
  }, [location]);

  // Convert city name to IATA airport code using AeroDataBox API
  const getAirportCode = async (cityName) => {
    try {
      // Check if we already have this airport code in cache
      if (airports[cityName]) {
        return airports[cityName];
      }

      console.log(`Looking up airport code for: ${cityName}`);

      // First, search for airports by city name using AeroDataBox
      const searchUrl = `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${encodeURIComponent(
        cityName
      )}&limit=10`;

      const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error(`AeroDataBox API returned status ${response.status}`);
      }

      const searchResults = await response.json();
      console.log("Airport search results:", searchResults);

      if (
        !searchResults ||
        !searchResults.items ||
        searchResults.items.length === 0
      ) {
        throw new Error(`No airports found for ${cityName}`);
      }

      // Find the best match (prefer airports with IATA codes in the same city)
      let bestMatch = null;

      for (const airport of searchResults.items) {
        // Skip if no IATA code
        if (!airport.iata) continue;

        // Prefer exact city name matches
        if (
          airport.municipalityName &&
          airport.municipalityName
            .toLowerCase()
            .includes(cityName.toLowerCase())
        ) {
          bestMatch = airport;
          break;
        }

        // Fallback to any airport with IATA code
        if (!bestMatch) {
          bestMatch = airport;
        }
      }

      if (!bestMatch || !bestMatch.iata) {
        throw new Error(`No airport with IATA code found for ${cityName}`);
      }

      // Create airport data object
      const airportData = {
        iata_code: bestMatch.iata,
        icao_code: bestMatch.icao,
        name: bestMatch.shortName || bestMatch.fullName,
        city: bestMatch.municipalityName || cityName,
        country: bestMatch.country?.name || "Unknown",
      };

      console.log("Successfully found airport:", airportData);

      // Cache the result
      setAirports((prev) => ({
        ...prev,
        [cityName]: airportData,
      }));

      return airportData;
    } catch (error) {
      console.error(`Error getting airport code for ${cityName}:`, error);
      throw error;
    }
  };

  // Fetch flights using FlightAPI.io
  const fetchFlightsForRoute = async (departureCode, arrivalCode, date) => {
    try {
      // Format date as YYYY-MM-DD for the API
      const formattedDate = new Date(date).toISOString().split("T")[0];

      const url = `https://api.flightapi.io/onewaytrip/${FLIGHT_API_KEY}/${departureCode}/${arrivalCode}/${formattedDate}/${numberOfAdults}/${numberOfChildren}/${numberOfInfants}/${cabinClass}/INR`;

      console.log("Fetching flights from URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Flight API returned status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Flight API response:", data);
      return data;
    } catch (error) {
      console.error(
        `Error fetching flights from ${departureCode} to ${arrivalCode}:`,
        error
      );
      throw error;
    }
  };

  const fetchFlights = async () => {
    if (!departureCity || !departureDate || selectedCities.length < 1) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate API keys
    if (!FLIGHT_API_KEY) {
      setError(
        "Flight API key is not configured. Please check your environment variables."
      );
      return;
    }

    if (!RAPIDAPI_KEY) {
      setError("RapidAPI key is not configured.");
      return;
    }

    setLoading(true);
    setError(null);
    setFlightData([]);

    try {
      console.log(
        `Starting flight search for departure city: ${departureCity}`
      );

      // Get departure airport code using AeroDataBox
      const departureAirport = await getAirportCode(departureCity);

      if (!departureAirport || !departureAirport.iata_code) {
        throw new Error(`Could not find airport code for ${departureCity}`);
      }

      console.log(
        `Found departure airport: ${departureAirport.iata_code} for ${departureCity}`
      );

      // Create flight routes array
      const flightRoutes = [];

      // Fetch flights for each destination
      for (let i = 0; i < selectedCities.length; i++) {
        const destinationCity = selectedCities[i];

        try {
          console.log(
            `Processing destination ${i + 1}/${selectedCities.length}: ${
              destinationCity.cityName
            }`
          );

          // Get destination airport code using AeroDataBox
          const destinationAirport = await getAirportCode(
            destinationCity.cityName
          );

          if (!destinationAirport || !destinationAirport.iata_code) {
            throw new Error(
              `Could not find airport code for ${destinationCity.cityName}`
            );
          }

          console.log(
            `Found destination airport: ${destinationAirport.iata_code} for ${destinationCity.cityName}`
          );

          // Calculate the date for this leg
          const legDepartureDate = new Date(departureDate);
          if (i > 0) {
            legDepartureDate.setDate(
              legDepartureDate.getDate() + calculateTotalDays(selectedCities, i)
            );
          }

          // Fetch flights for this specific route
          const flightResponse = await fetchFlightsForRoute(
            departureAirport.iata_code,
            destinationAirport.iata_code,
            legDepartureDate
          );

          if (
            flightResponse &&
            flightResponse.itineraries &&
            flightResponse.itineraries.length > 0
          ) {
            flightRoutes.push({
              from: departureCity,
              fromCode: departureAirport.iata_code,
              to: destinationCity.cityName,
              toCode: destinationAirport.iata_code,
              flightData: flightResponse,
              departureDate: legDepartureDate.toISOString().split("T")[0],
            });
          } else {
            flightRoutes.push({
              from: departureCity,
              fromCode: departureAirport.iata_code,
              to: destinationCity.cityName,
              toCode: destinationAirport.iata_code,
              flightData: null,
              message: "No flights found for this route on the selected date.",
              departureDate: legDepartureDate.toISOString().split("T")[0],
            });
          }
        } catch (error) {
          console.error(
            `Error processing flights to ${destinationCity.cityName}:`,
            error
          );
          flightRoutes.push({
            from: departureCity,
            fromCode: departureAirport.iata_code || "N/A",
            to: destinationCity.cityName,
            toCode: "N/A",
            flightData: null,
            message: `Error finding flights: ${error.message}`,
            departureDate: new Date(departureDate).toISOString().split("T")[0],
          });
        }
      }

      setFlightData(flightRoutes);
      console.log("Flight search completed successfully");
    } catch (err) {
      console.error("Error fetching flight data:", err);
      setError("Failed to fetch flight data. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate total days before a specific city index
  const calculateTotalDays = (cities, currentIndex) => {
    let totalDays = 0;
    for (let i = 0; i < currentIndex; i++) {
      totalDays += cities[i].durationInDays || 2; // Default to 2 days if not specified
    }
    return totalDays;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";

    try {
      const date = new Date(timeString);

      if (isNaN(date.getTime())) {
        return "N/A";
      }

      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting time:", error);
      return "N/A";
    }
  };

  // Calculate flight duration in minutes to hours and minutes
  const formatDuration = (durationMinutes) => {
    if (!durationMinutes) return "N/A";

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  // Get carrier name from carriers data
  const getCarrierName = (carrierId, carriersData) => {
    if (!carriersData || !carrierId) return "Unknown Airline";

    const carrier = carriersData[carrierId];
    return carrier ? carrier.name : "Unknown Airline";
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Trip
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">🛫 Available Flights</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure City
            </label>
            <input
              type="text"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              placeholder="Enter city name (e.g. Delhi, New York)"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Date
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adults
            </label>
            <input
              type="number"
              min="1"
              max="9"
              value={numberOfAdults}
              onChange={(e) => setNumberOfAdults(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children (2-11 years)
            </label>
            <input
              type="number"
              min="0"
              max="9"
              value={numberOfChildren}
              onChange={(e) =>
                setNumberOfChildren(parseInt(e.target.value) || 0)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Infants (Under 2)
            </label>
            <input
              type="number"
              min="0"
              max="9"
              value={numberOfInfants}
              onChange={(e) =>
                setNumberOfInfants(parseInt(e.target.value) || 0)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cabin Class
            </label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={fetchFlights}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search Flights"}
          </button>
        </div>

        {selectedCities.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Trip Cities:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCities.map((city, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {city.cityName}
                  {city.durationInDays && ` (${city.durationInDays} days)`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show cached airports for debugging */}
        {Object.keys(airports).length > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">Found Airports:</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(airports).map(([city, airport]) => (
                <div key={city} className="text-green-700">
                  {city} → {airport.iata_code} ({airport.name})
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            <div className="font-medium mb-1">Error:</div>
            {error}
          </div>
        )}
      </div>

      {flightData.length > 0 && (
        <div className="space-y-8">
          {flightData.map((route, routeIndex) => (
            <div
              key={routeIndex}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 border-b bg-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {route.fromCode} → {route.toCode}
                  </h2>
                  <div className="text-sm text-gray-600">
                    {formatDate(route.departureDate)}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {route.from} to {route.to}
                </div>
              </div>

              {route.message ? (
                <div className="p-6 text-center text-gray-500">
                  {route.message}
                  <div className="mt-2 text-sm">
                    Try different cities or dates.
                  </div>
                </div>
              ) : !route.flightData ? (
                <div className="p-6 text-center text-gray-500">
                  No flights found from {route.from} to {route.to} on the
                  selected date.
                  <div className="mt-2 text-sm">
                    Try a different date or check different cities.
                  </div>
                </div>
              ) : (
                <div className="divide-y">
                  {route.flightData.itineraries
                    ?.slice(0, 5)
                    .map((itinerary, itineraryIndex) => {
                      const leg = route.flightData.legs?.find(
                        (l) => l.id === itinerary.leg_ids[0]
                      );
                      const segment = route.flightData.segments?.find((s) =>
                        leg?.segment_ids?.includes(s.id)
                      );
                      const bestPrice = itinerary.pricing_options?.[0]?.price;
                      const carrierName = getCarrierName(
                        segment?.marketing_carrier_id,
                        route.flightData.carriers
                      );

                      return (
                        <div
                          key={itineraryIndex}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div className="flex items-center gap-3 mb-2 md:mb-0">
                              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full">
                                ✈️
                              </div>
                              <div>
                                <div className="font-bold">
                                  {carrierName}{" "}
                                  {segment?.marketing_flight_number}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {leg?.stop_count === 0
                                    ? "Direct Flight"
                                    : `${leg?.stop_count} Stop${
                                        leg?.stop_count > 1 ? "s" : ""
                                      }`}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-green-600">
                                ₹{bestPrice?.amount?.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                per person
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">
                                Departure
                              </div>
                              <div className="font-bold text-lg">
                                {formatTime(leg?.departure)}
                              </div>
                              <div className="text-gray-700">
                                {route.fromCode} - {route.from}
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500">
                                Arrival
                              </div>
                              <div className="font-bold text-lg">
                                {formatTime(leg?.arrival)}
                              </div>
                              <div className="text-gray-700">
                                {route.toCode} - {route.to}
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-500">
                                Duration
                              </div>
                              <div className="font-bold">
                                {formatDuration(leg?.duration)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Flight {segment?.marketing_flight_number}
                              </div>
                            </div>
                          </div>

                          {bestPrice?.last_updated && (
                            <div className="mt-3 text-xs text-gray-400">
                              Price last updated:{" "}
                              {formatDate(bestPrice.last_updated)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
        <div className="font-bold mb-2">Flight Search Guide:</div>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Enter your departure city name (e.g., "Delhi", "Mumbai", "New York",
            "London")
          </li>
          <li>
            The system uses AeroDataBox API to find airport codes for cities
            automatically
          </li>
          <li>Select a departure date and specify the number of passengers</li>
          <li>
            Choose your preferred cabin class (Economy, Premium Economy,
            Business, First)
          </li>
          <li>
            For multi-city trips, flights are calculated based on your stay
            duration in each city
          </li>
          <li>All prices are displayed in Indian Rupees (INR)</li>
          <li>
            If no flights are found, try a different departure date or check the
            city spelling
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FlightDetails;
