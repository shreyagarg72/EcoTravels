


// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMapMarkerAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { Trash } from 'lucide-react';

// const SearchBar = ({ showLoginModal }) => {
//   const navigate = useNavigate();
//   const [inputFields, setInputFields] = useState([
//     { id: Date.now(), value: "", showDropdown: false },
//   ]);
//   const [selectedCitiesData, setSelectedCitiesData] = useState({
//     selectedCities: []
//   });
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch cities from API on component mount
//   useEffect(() => {
//     const fetchCities = async () => {
//       const headers = new Headers();
//       headers.append("X-CSCAPI-KEY", `${import.meta.env.VITE_CITY_SECRET}`);

//       const requestOptions = {
//         method: "GET",
//         headers: headers,
//         redirect: "follow",
//       };

//       setLoading(true);
//       try {
//         const response = await fetch(
//           "https://api.countrystatecity.in/v1/countries/IN/cities",
//           requestOptions
//         );
//         const data = await response.json();
//         setCities(data);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCities();
//   }, []);

//   // Fetch coordinates for a selected city using Geoapify Geocoding API
//   const fetchCoordinates = async (cityName) => {
//     const apiKey = import.meta.env.VITE_GEO_API;
//     const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${cityName}&country=India&type=city&apiKey=${apiKey}`;
//     try {
//       const response = await fetch(geocodeUrl);
//       const data = await response.json();
//       if (data.features && data.features.length > 0) {
//         const city = data.features[0];
//         return {
//           cityName,
//           latitude: city.geometry.coordinates[1],
//           longitude: city.geometry.coordinates[0],
//         };
//       } else {
//         throw new Error("City not found");
//       }
//     } catch (error) {
//       console.error("Error fetching city coordinates:", error);
//     }
//   };

//   const handleInputFocus = (id) => {
//     setInputFields(
//       inputFields.map((field) =>
//         field.id === id ? { ...field, showDropdown: true } : field
//       )
//     );
//   };

//   const handleInputChange = (id, value) => {
//     setInputFields(
//       inputFields.map((field) =>
//         field.id === id ? { ...field, value } : field
//       )
//     );
//   };

//   const handleCitySelect = async (id, cityName) => {
//     const cityCoordinates = await fetchCoordinates(cityName);
//     if (cityCoordinates) {
//       const updatedCitiesData = {
//         selectedCities: [...selectedCitiesData.selectedCities, cityCoordinates]
//       };
//       setSelectedCitiesData(updatedCitiesData);
//       setInputFields(
//         inputFields.map((field) =>
//           field.id === id ? { ...field, value: cityName, showDropdown: false } : field
//         )
//       );

//       localStorage.setItem("selectedCitiesData", JSON.stringify(updatedCitiesData));
//       console.log("Selected Cities Data:", updatedCitiesData);
//     }
//   };

//   const handlePlusClick = () => {
//     setInputFields([
//       ...inputFields,
//       { id: Date.now(), value: "", showDropdown: false },
//     ]);
//   };

//   const handleSearchClick = () => {
//     if (selectedCitiesData.selectedCities.length > 0) {
//       localStorage.setItem("selectedCitiesData", JSON.stringify(selectedCitiesData));
//       navigate("/travel-options", { state: { selectedCitiesData } });
//     }
//   };
//   const handleCityRemove = (cityToRemove) => {
//     const updatedCitiesData = {
//       selectedCities: selectedCitiesData.selectedCities.filter(
//         city => city.cityName !== cityToRemove
//       )
//     };
  
//     setSelectedCitiesData(updatedCitiesData);
    
//     // Remove the input field for the deleted city and ensure at least one empty field
//     setInputFields(prevFields => {
//       const remainingFields = prevFields.filter(field => field.value !== cityToRemove);
//       // If no fields remain, add an empty one
//       if (remainingFields.length === 0) {
//         return [{ id: Date.now(), value: "", showDropdown: false }];
//       }
//       return remainingFields;
//     });
  
//     // Update localStorage with the updated cities data
//     localStorage.setItem("selectedCitiesData", JSON.stringify(updatedCitiesData));
//   };
//   return (
//     <div className={`mt-5 mb-5 flex flex-col items-center px-4 ${showLoginModal ? 'blur-sm' : ''}`}>
//       <div className="relative w-full md:w-1/3 flex flex-col items-center">
//         {inputFields.map((field, index) => (
//           <div key={field.id} className="relative w-full mb-4">
//             <input
//               type="text"
//               className="w-full p-3 pl-12 pr-12 rounded-full border-2 border-black text-sm md:text-base"
//               placeholder="Places to go, things to do, hotels..."
//               value={field.value}
//               onFocus={() => handleInputFocus(field.id)}
//               onChange={(e) => handleInputChange(field.id, e.target.value)}
//             />

//             {/* Airplane icon in the first input box */}
//             {index === 0 && field.value === "" && (
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                 <img
//                   src="/airplane-search.png"
//                   alt="Plane"
//                   className="w-5 h-5 md:w-6 md:h-6"
//                 />
//               </div>
//             )}
// {/* Delete icon for selected cities */}
// {field.value && selectedCitiesData.selectedCities.some(
//               city => city.cityName === field.value
//             ) && (
//               <div 
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200 text-red-500"
//                 onClick={() => handleCityRemove(field.value)}
//               >
//                <Trash/>
//               </div>
//             )}
//             {/* Plus icon */}
//             {field.value && (
//               <div 
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
//                 onClick={handlePlusClick}
//               >
//                 <FontAwesomeIcon
//                   icon={faPlus}
//                   className="w-5 h-5 md:w-6 md:h-6 text-green-900"
//                 />
//               </div>
//             )}

//             {/* Dropdown with city options */}
//             {field.showDropdown && (
//               <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full md:w-[calc(100%-90px)] max-h-60 overflow-y-auto left-0 md:left-12 shadow-lg">
//                 {loading ? (
//                   <div className="p-2 text-gray-500">Loading cities...</div>
//                 ) : (
//                   cities
//                     .filter(
//                       (city) =>
//                         city.name &&
//                         city.name.toLowerCase().includes(field.value.toLowerCase()) &&
//                         !selectedCitiesData.selectedCities.some((selectedCity) => selectedCity.cityName === city.name)
//                     )
//                     .map((city) => (
//                       <div
//                         key={city.id}
//                         className="cursor-pointer p-2 hover:bg-blue-50 transition duration-200 flex items-center text-sm md:text-base"
//                         onClick={() => handleCitySelect(field.id, city.name)}
//                       >
//                         {city.name}
//                       </div>
//                     ))
//                 )}
//               </div>
//             )}
//           </div>
//         ))}

//         {selectedCitiesData.selectedCities.length > 0 && (
//           <>
//             <button 
//               onClick={handleSearchClick} 
//               className="mt-4 bg-green-700 text-white py-2 px-4 rounded-full text-sm md:text-base w-full md:w-auto"
//             >
//               Search
//             </button>

//             <div className="mt-4 text-center text-sm md:text-base">
//               <p>Want to travel to more than one city?</p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMapMarkerAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Trash } from 'lucide-react';
import { auth } from "../../firebaseConfig"; // Import auth from your firebase config
import { toast } from "react-toastify"; // Import toast for notifications

const SearchBar = ({ showLoginModal }) => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([
    { id: Date.now(), value: "", showDropdown: false },
  ]);
  const [selectedCitiesData, setSelectedCitiesData] = useState({
    selectedCities: []
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cities from API on component mount
  useEffect(() => {
    const fetchCities = async () => {
      const headers = new Headers();
      headers.append("X-CSCAPI-KEY", `${import.meta.env.VITE_CITY_SECRET}`);

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      setLoading(true);
      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries/IN/cities",
          requestOptions
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Fetch coordinates for a selected city using Geoapify Geocoding API
  const fetchCoordinates = async (cityName) => {
    const apiKey = import.meta.env.VITE_GEO_API;
    const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${cityName}&country=India&type=city&apiKey=${apiKey}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const city = data.features[0];
        return {
          cityName,
          latitude: city.geometry.coordinates[1],
          longitude: city.geometry.coordinates[0],
        };
      } else {
        throw new Error("City not found");
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  const handleInputFocus = (id) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, showDropdown: true } : field
      )
    );
  };

  const handleInputChange = (id, value) => {
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const handleCitySelect = async (id, cityName) => {
    const cityCoordinates = await fetchCoordinates(cityName);
    if (cityCoordinates) {
      const updatedCitiesData = {
        selectedCities: [...selectedCitiesData.selectedCities, cityCoordinates]
      };
      setSelectedCitiesData(updatedCitiesData);
      setInputFields(
        inputFields.map((field) =>
          field.id === id ? { ...field, value: cityName, showDropdown: false } : field
        )
      );

      localStorage.setItem("selectedCitiesData", JSON.stringify(updatedCitiesData));
      console.log("Selected Cities Data:", updatedCitiesData);
    }
  };

  const handlePlusClick = () => {
    setInputFields([
      ...inputFields,
      { id: Date.now(), value: "", showDropdown: false },
    ]);
  };

  // Updated handleSearchClick to add EcoPoints
  const handleSearchClick = async () => {
    if (selectedCitiesData.selectedCities.length > 0) {
      localStorage.setItem("selectedCitiesData", JSON.stringify(selectedCitiesData));
      
      // Add 5 points to the user's account for clicking search if logged in
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        try {
          // Add points using the API endpoint for adding EcoPoints
          const response = await fetch(`http://localhost:5000/api/users/${currentUser.uid}/addpoints`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              points: 5,
              activityType: "search",
              description: "Reward for performing a city search"
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            toast.success("🪙 +5 reward points earned!", {
              position: "top-center",
              autoClose: 3000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.log("Points added successfully:", data);
          } else {
            console.error("Failed to add points");
          }
        } catch (error) {
          console.error("Error adding EcoPoints:", error);
        }
      } else {
        console.log("User not logged in, points not added");
      }
      
      // Navigate to travel options page
      navigate("/travel-options", { state: { selectedCitiesData } });
    }
  };

  const handleCityRemove = (cityToRemove) => {
    const updatedCitiesData = {
      selectedCities: selectedCitiesData.selectedCities.filter(
        city => city.cityName !== cityToRemove
      )
    };
  
    setSelectedCitiesData(updatedCitiesData);
    
    // Remove the input field for the deleted city and ensure at least one empty field
    setInputFields(prevFields => {
      const remainingFields = prevFields.filter(field => field.value !== cityToRemove);
      // If no fields remain, add an empty one
      if (remainingFields.length === 0) {
        return [{ id: Date.now(), value: "", showDropdown: false }];
      }
      return remainingFields;
    });
  
    // Update localStorage with the updated cities data
    localStorage.setItem("selectedCitiesData", JSON.stringify(updatedCitiesData));
  };
  return (
    <div className={`mt-5 mb-5 flex flex-col items-center px-4 ${showLoginModal ? 'blur-sm' : ''}`}>
      <div className="relative w-full md:w-1/3 flex flex-col items-center">
        {inputFields.map((field, index) => (
          <div key={field.id} className="relative w-full mb-4">
            <input
              type="text"
              className="w-full p-3 pl-12 pr-12 rounded-full border-2 border-black text-sm md:text-base"
              placeholder="Places to go, things to do, hotels..."
              value={field.value}
              onFocus={() => handleInputFocus(field.id)}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />

            {/* Airplane icon in the first input box */}
            {index === 0 && field.value === "" && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <img
                  src="/airplane-search.png"
                  alt="Plane"
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              </div>
            )}
{/* Delete icon for selected cities */}
{field.value && selectedCitiesData.selectedCities.some(
              city => city.cityName === field.value
            ) && (
              <div 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200 text-red-500"
                onClick={() => handleCityRemove(field.value)}
              >
               <Trash/>
              </div>
            )}
            {/* Plus icon */}
            {field.value && (
              <div 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={handlePlusClick}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="w-5 h-5 md:w-6 md:h-6 text-green-900"
                />
              </div>
            )}

            {/* Dropdown with city options */}
            {field.showDropdown && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full md:w-[calc(100%-90px)] max-h-60 overflow-y-auto left-0 md:left-12 shadow-lg">
                {loading ? (
                  <div className="p-2 text-gray-500">Loading cities...</div>
                ) : (
                  cities
                    .filter(
                      (city) =>
                        city.name &&
                        city.name.toLowerCase().includes(field.value.toLowerCase()) &&
                        !selectedCitiesData.selectedCities.some((selectedCity) => selectedCity.cityName === city.name)
                    )
                    .map((city) => (
                      <div
                        key={city.id}
                        className="cursor-pointer p-2 hover:bg-blue-50 transition duration-200 flex items-center text-sm md:text-base"
                        onClick={() => handleCitySelect(field.id, city.name)}
                      >
                        {city.name}
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        ))}

        {selectedCitiesData.selectedCities.length > 0 && (
          <>
            <button 
              onClick={handleSearchClick} 
              className="mt-4 bg-green-700 text-white py-2 px-4 rounded-full text-sm md:text-base w-full md:w-auto"
            >
              Search
            </button>

            <div className="mt-4 text-center text-sm md:text-base">
              <p>Want to travel to more than one city?</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;