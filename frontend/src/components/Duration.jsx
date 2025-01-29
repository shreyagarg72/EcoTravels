// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { addDays, differenceInDays, isSameDay, isWithinInterval } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import "./Duration.css";

// const Duration = ({ showLoginModal }) => {
//   const [locations, setLocations] = useState([]);
//   const [selectedDates, setSelectedDates] = useState({});
//   const [disabledDates, setDisabledDates] = useState([]);
//   const [totalDuration, setTotalDuration] = useState(0); // New state for total duration
//   const [allDatesSelected, setAllDatesSelected] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load selected cities from localStorage
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
//     if (storedLocations && Array.isArray(storedLocations)) {
//       setLocations(storedLocations);
//     }
//   }, []);

//   useEffect(() => {
//     // Update localStorage with duration for each city
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities")) || [];
//     const updatedLocations = storedLocations.map((location) => {
//       const cityDuration = selectedDates[location.cityName]?.duration || 0; // Get duration if exists, else 0
//       return { ...location, duration: cityDuration }; // Add or update duration
//     });
//     localStorage.setItem("selectedCities", JSON.stringify(updatedLocations));
//     console.log("Updated selectedCities in localStorage:", updatedLocations);
//   }, [selectedDates]);

//   const handleDateChange = (cityName, date) => {
//     setSelectedDates((prevDates) => {
//       const currentCityDates = prevDates[cityName] || {};
//       const { from, to } = currentCityDates;

//       let newFrom = from;
//       let newTo = to;

//       if (!from || (from && to)) {
//         newFrom = date;
//         newTo = null;
//       } else if (from && !to) {
//         const maxDate = addDays(from, 3);
//         if (date > maxDate) {
//           alert("Please select a date range of up to 4 days.");
//           return prevDates;
//         }
//         newTo = date;

//         const range = [];
//         for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
//           range.push(d);
//         }
//         setDisabledDates([...disabledDates, ...range]);
//       }

//       const duration = newTo && newFrom ? differenceInDays(newTo, newFrom) + 1 : 0;

//       const newSelectedDates = {
//         ...prevDates,
//         [cityName]: {
//           from: newFrom,
//           to: newTo,
//           duration,
//         },
//       };

//       const totalDuration = Object.values(newSelectedDates).reduce((sum, { duration }) => sum + (duration || 0), 0);
//       setTotalDuration(totalDuration);

//       const allSelected = Object.keys(newSelectedDates).every(
//         (key) => newSelectedDates[key].from && newSelectedDates[key].to
//       );
//       setAllDatesSelected(allSelected);

//       return newSelectedDates;
//     });
//   };

//   const isDateInRange = (date, cityName) => {
//     const cityDates = selectedDates[cityName];
//     if (!cityDates || !cityDates.to || !cityDates.from) return false;

//     const { from, to } = cityDates;
//     return isWithinInterval(date, { start: from, end: to });
//   };

//   const isDateDisabled = (date) => {
//     return disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
//   };

//   const getEarliestAvailableDate = (index) => {
//     const prevLocation = locations[index - 1];
//     if (prevLocation && selectedDates[prevLocation.cityName]) {
//       const prevToDate = selectedDates[prevLocation.cityName].to;
//       if (prevToDate) {
//         return addDays(prevToDate, 1);
//       }
//     }
//     return new Date();
//   };

//   const handleReset = (cityName) => {
//     setSelectedDates((prevDates) => {
//       const newDates = { ...prevDates };
//       delete newDates[cityName];
//       return newDates;
//     });
//     setDisabledDates([]);
//     setAllDatesSelected(false);
//     setTotalDuration(0); // Reset total duration if required
//   };

//   const handleNext = () => {
//     navigate("/itinerary");
//   };

//   return (
//     <div className={`container mx-auto ${showLoginModal ? 'blur-sm' : ''}`}>
//       <div className="duration-container">
//         {locations.map((location, index) => (
//           <div key={index} className="location-section">
//             <h2 className="location-name">{location.cityName}</h2>
//             <div className="calendar-pair">
//               <div className="calendar-section">
//                 <h3 className="calendar-title">Select Dates</h3>
//                 <Calendar
//                   view="month"
//                   showDoubleView
//                   defaultValue={new Date()}
//                   onClickDay={(date) => handleDateChange(location.cityName, date)}
//                   minDate={getEarliestAvailableDate(index)}
//                   maxDate={addDays(new Date(), 60)}
//                   tileClassName={({ date, view }) => {
//                     if (view === "month" && isDateInRange(date, location.cityName)) {
//                       return "highlighted-date";
//                     }
//                     if (view === "month" && isDateDisabled(date)) {
//                       return "disabled-date";
//                     }
//                     return null;
//                   }}
//                   tileDisabled={({ date }) => isDateDisabled(date)}
//                 />
//               </div>
//             </div>
//             <div className="actions">
//               <button className="reset-btn" onClick={() => handleReset(location.cityName)}>
//                 Reset
//               </button>
//             </div>
//             {selectedDates[location.cityName]?.duration > 0 && (
//               <p>Duration: {selectedDates[location.cityName].duration} days</p>
//             )}
//           </div>
//         ))}
//         {allDatesSelected && (
//           <div className="next-btn-container">
//             <p>Total Duration: {totalDuration} days</p> {/* Display total duration */}
//             <button className="next-btn" onClick={handleNext}>
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Duration;

// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { addDays, differenceInDays, isSameDay, isWithinInterval } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import "./Duration.css";

// const Duration = ({ handleLoginClick }) => {
//   const [locations, setLocations] = useState([]);
//   const [selectedDates, setSelectedDates] = useState({});
//   const [disabledDates, setDisabledDates] = useState([]);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [allDatesSelected, setAllDatesSelected] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // Check authentication state
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
//     if (storedLocations && Array.isArray(storedLocations)) {
//       setLocations(storedLocations);
//     }
//   }, []);

//   useEffect(() => {
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities")) || [];
//     const updatedLocations = storedLocations.map((location) => {
//       const cityDuration = selectedDates[location.cityName]?.duration || 0;
//       return { ...location, duration: cityDuration };
//     });
//     localStorage.setItem("selectedCities", JSON.stringify(updatedLocations));
//   }, [selectedDates]);

//   const handleDateChange = (cityName, date) => {
//     setSelectedDates((prevDates) => {
//       const currentCityDates = prevDates[cityName] || {};
//       const { from, to } = currentCityDates;

//       let newFrom = from;
//       let newTo = to;

//       if (!from || (from && to)) {
//         newFrom = date;
//         newTo = null;
//       } else if (from && !to) {
//         const maxDate = addDays(from, 3);
//         if (date > maxDate) {
//           alert("Please select a date range of up to 4 days.");
//           return prevDates;
//         }
//         newTo = date;

//         const range = [];
//         for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
//           range.push(d);
//         }
//         setDisabledDates([...disabledDates, ...range]);
//       }

//       const duration = newTo && newFrom ? differenceInDays(newTo, newFrom) + 1 : 0;

//       const newSelectedDates = {
//         ...prevDates,
//         [cityName]: {
//           from: newFrom,
//           to: newTo,
//           duration,
//         },
//       };

//       const totalDuration = Object.values(newSelectedDates).reduce(
//         (sum, { duration }) => sum + (duration || 0),
//         0
//       );
//       setTotalDuration(totalDuration);

//       const allSelected = Object.keys(newSelectedDates).every(
//         (key) => newSelectedDates[key].from && newSelectedDates[key].to
//       );
//       setAllDatesSelected(allSelected);

//       return newSelectedDates;
//     });
//   };

//   const isDateInRange = (date, cityName) => {
//     const cityDates = selectedDates[cityName];
//     if (!cityDates || !cityDates.to || !cityDates.from) return false;
//     return isWithinInterval(date, { start: cityDates.from, end: cityDates.to });
//   };

//   const isDateDisabled = (date) => {
//     return disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
//   };

//   const getEarliestAvailableDate = (index) => {
//     const prevLocation = locations[index - 1];
//     if (prevLocation && selectedDates[prevLocation.cityName]) {
//       const prevToDate = selectedDates[prevLocation.cityName].to;
//       if (prevToDate) {
//         return addDays(prevToDate, 1);
//       }
//     }
//     return new Date();
//   };

//   const handleReset = (cityName) => {
//     setSelectedDates((prevDates) => {
//       const newDates = { ...prevDates };
//       delete newDates[cityName];
//       return newDates;
//     });
//     setDisabledDates([]);
//     setAllDatesSelected(false);
//     setTotalDuration(0);
//   };

//   const handleNext = () => {
//     if (!isLoggedIn) {
//       // If not logged in, show login modal
//       handleLoginClick();
//       return;
//     }
//     // If logged in, proceed to itinerary
//     navigate("/itinerary");
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="duration-container">
//         {locations.map((location, index) => (
//           <div key={index} className="location-section">
//             <h2 className="location-name">{location.cityName}</h2>
//             <div className="calendar-pair">
//               <div className="calendar-section">
//                 <h3 className="calendar-title">Select Dates</h3>
//                 <Calendar
//                   view="month"
//                   showDoubleView
//                   defaultValue={new Date()}
//                   onClickDay={(date) => handleDateChange(location.cityName, date)}
//                   minDate={getEarliestAvailableDate(index)}
//                   maxDate={addDays(new Date(), 60)}
//                   tileClassName={({ date, view }) => {
//                     if (view === "month" && isDateInRange(date, location.cityName)) {
//                       return "highlighted-date";
//                     }
//                     if (view === "month" && isDateDisabled(date)) {
//                       return "disabled-date";
//                     }
//                     return null;
//                   }}
//                   tileDisabled={({ date }) => isDateDisabled(date)}
//                 />
//               </div>
//             </div>
//             <div className="actions">
//               <button
//                 className="reset-btn"
//                 onClick={() => handleReset(location.cityName)}
//               >
//                 Reset
//               </button>
//             </div>
//             {selectedDates[location.cityName]?.duration > 0 && (
//               <p>Duration: {selectedDates[location.cityName].duration} days</p>
//             )}
//           </div>
//         ))}
//         {allDatesSelected && (
//           <div className="next-btn-container">
//             <p>Total Duration: {totalDuration} days</p>
//             <button
//               className="next-btn"
//               onClick={handleNext}
//             >
//               Generate Itinerary
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Duration;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  addDays,
  differenceInDays,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Duration.css";
import { AI_PROMPT } from "../constants/options";
import { chatSession } from "../service/AIModal";

const Duration = ({ handleLoginClick }) => {
  const [selectedCitiesData, setSelectedCitiesData] = useState({
    selectedCities: [],
    travelType: "",
    travelCount: 0,
  });
  const [selectedDates, setSelectedDates] = useState({});
  const [disabledDates, setDisabledDates] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [allDatesSelected, setAllDatesSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("selectedCitiesData"));
    if (storedData && Array.isArray(storedData.selectedCities)) {
      setSelectedCitiesData(storedData);
    }
  }, []);

  useEffect(() => {
    if (selectedCitiesData.selectedCities.length > 0) {
      const updatedData = {
        ...selectedCitiesData,
        selectedCities: selectedCitiesData.selectedCities.map((city) => ({
          ...city,
          duration: selectedDates[city.cityName]?.duration || 0,
        })),
      };

      localStorage.setItem("selectedCitiesData", JSON.stringify(updatedData));
      console.log("Updated localStorage with durations:", updatedData);
    }
  }, [selectedDates]);

  const handleDateChange = (cityName, date) => {
    setSelectedDates((prevDates) => {
      const currentCityDates = prevDates[cityName] || {};
      const { from, to } = currentCityDates;

      let newFrom = from;
      let newTo = to;

      if (!from || (from && to)) {
        newFrom = date;
        newTo = null;
      } else if (from && !to) {
        const maxDate = addDays(from, 3);
        if (date > maxDate) {
          alert("Please select a date range of up to 4 days.");
          return prevDates;
        }
        newTo = date;

        const range = [];
        for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
          range.push(d);
        }
        setDisabledDates([...disabledDates, ...range]);
      }

      const duration =
        newTo && newFrom ? differenceInDays(newTo, newFrom) + 1 : 0;

      const newSelectedDates = {
        ...prevDates,
        [cityName]: {
          from: newFrom,
          to: newTo,
          duration,
        },
      };

      const totalDuration = Object.values(newSelectedDates).reduce(
        (sum, { duration }) => sum + (duration || 0),
        0
      );
      setTotalDuration(totalDuration);

      const allSelected = Object.keys(newSelectedDates).every(
        (key) => newSelectedDates[key].from && newSelectedDates[key].to
      );
      setAllDatesSelected(allSelected);

      // Update selectedCitiesData with new duration
      setSelectedCitiesData((prevData) => ({
        ...prevData,
        selectedCities: prevData.selectedCities.map((city) =>
          city.cityName === cityName ? { ...city, duration: duration } : city
        ),
      }));

      return newSelectedDates;
    });
  };

  const isDateInRange = (date, cityName) => {
    const cityDates = selectedDates[cityName];
    if (!cityDates || !cityDates.to || !cityDates.from) return false;
    return isWithinInterval(date, { start: cityDates.from, end: cityDates.to });
  };

  const isDateDisabled = (date) => {
    return disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
  };

  const getEarliestAvailableDate = (index) => {
    const prevLocation = selectedCitiesData.selectedCities[index - 1];
    if (prevLocation && selectedDates[prevLocation.cityName]) {
      const prevToDate = selectedDates[prevLocation.cityName].to;
      if (prevToDate) {
        return addDays(prevToDate, 1);
      }
    }
    return new Date();
  };

  const handleReset = (cityName) => {
    setSelectedDates((prevDates) => {
      const newDates = { ...prevDates };
      delete newDates[cityName];
      return newDates;
    });

    // Reset duration in selectedCitiesData
    setSelectedCitiesData((prevData) => ({
      ...prevData,
      selectedCities: prevData.selectedCities.map((city) =>
        city.cityName === cityName ? { ...city, duration: 0 } : city
      ),
    }));

    setDisabledDates([]);
    setAllDatesSelected(false);
    setTotalDuration(0);
  };

  const handleNext = () => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }
    navigate("/itinerary");
  };

  return (
    <div className="container mx-auto">
      <div className="duration-container">
        {selectedCitiesData.selectedCities.map((location, index) => (
          <div key={index} className="location-section">
            <h2 className="location-name">{location.cityName}</h2>
            <div className="calendar-pair">
              <div className="calendar-section">
                <h3 className="calendar-title">Select Dates</h3>
                <Calendar
                  view="month"
                  showDoubleView
                  defaultValue={new Date()}
                  onClickDay={(date) =>
                    handleDateChange(location.cityName, date)
                  }
                  minDate={getEarliestAvailableDate(index)}
                  maxDate={addDays(new Date(), 60)}
                  tileClassName={({ date, view }) => {
                    if (
                      view === "month" &&
                      isDateInRange(date, location.cityName)
                    ) {
                      return "highlighted-date";
                    }
                    if (view === "month" && isDateDisabled(date)) {
                      return "disabled-date";
                    }
                    return null;
                  }}
                  tileDisabled={({ date }) => isDateDisabled(date)}
                />
              </div>
            </div>
            <div className="actions">
              <button
                className="reset-btn"
                onClick={() => handleReset(location.cityName)}
              >
                Reset
              </button>
            </div>
            {selectedDates[location.cityName]?.duration > 0 && (
              <p>Duration: {selectedDates[location.cityName].duration} days</p>
            )}
          </div>
        ))}
        {allDatesSelected && (
          <div className="next-btn-container">
            <p>Total Duration: {totalDuration} days</p>
            <button className="next-btn" onClick={handleNext}>
              Generate Itinerary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Duration;
