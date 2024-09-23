
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [inputFields, setInputFields] = useState([
    { id: Date.now(), value: "", showDropdown: false },
  ]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cities from API on component mount
  useEffect(() => {
    const fetchCities = async () => {
      const headers = new Headers();
      headers.append("X-CSCAPI-KEY", "V2xQekpMdk9SWkdjSmQ1NjRrd0FEM2JQdmo3TnBjUjNyVFhoT0lmVw=="); // Replace with your actual API key

      const requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      setLoading(true); // Show loading state
      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries/IN/cities", // Fetch city names
          requestOptions
        );
        const data = await response.json();
        setCities(data); // Set cities from API
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchCities();
  }, []);

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

  const handleCitySelect = (id, cityName) => {
    setSelectedCities((prev) => [...prev, cityName]);
    setInputFields(
      inputFields.map((field) =>
        field.id === id ? { ...field, value: cityName, showDropdown: false } : field
      )
    );
  };

  const handlePlusClick = () => {
    setInputFields([
      ...inputFields,
      { id: Date.now(), value: "", showDropdown: false },
    ]);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="relative w-1/3 flex flex-col items-center">
        {inputFields.map((field, index) => (
          <div key={field.id} className="relative w-full mb-4">
            <input
              type="text"
              className="w-full p-3 pl-12 pr-12 rounded-full border-2 border-black"
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
                  className="w-6 h-6"
                />
              </div>
            )}

            {/* Arrow between input boxes */}
            {index > 0 && field.value === "" && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6">➔</div>
              </div>
            )}

            {/* Plus icon */}
            {field.value && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="w-6 h-6 cursor-pointer"
                  onClick={handlePlusClick}
                />
              </div>
            )}

            {/* Dropdown with city options */}
            {field.showDropdown && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-[calc(100%-90px)] max-h-60 overflow-y-auto left-12">
                {loading ? (
                  <div className="p-2">Loading cities...</div>
                ) : (
                  cities
                    .filter(
                      (city) =>
                        city.name && // Ensure city.name is defined
                        city.name.toLowerCase().includes(field.value.toLowerCase()) && // Match with input
                        !selectedCities.includes(city.name) // Exclude already selected cities
                    )
                    .map((city) => (
                      <div
                        key={city.id} // Use city.id as the unique key
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleCitySelect(field.id, city.name)}
                      >
                        {city.name} {/* Display city name */}
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        ))}

        {selectedCities.length > 0 && (
          <button className="mt-4 bg-green-700 text-white py-2 px-4 rounded-full">
            Search
          </button>
        )}

        {selectedCities.length > 0 && (
          <div className="mt-4 text-center">
            <p>Want to travel to more than one city?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
