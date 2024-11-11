// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { addDays, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
// import "./Duration.css"; // Custom styling for matching UI

// const Duration = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedDates, setSelectedDates] = useState({});
//   const [disabledDates, setDisabledDates] = useState([]);

//   useEffect(() => {
//     // Load selected cities from localStorage
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
//     if (storedLocations && Array.isArray(storedLocations)) {
//       setLocations(storedLocations);
//     }
//   }, []);

//   const handleDateChange = (cityName, date) => {
//     setSelectedDates((prevDates) => {
//       const currentCityDates = prevDates[cityName] || {};
//       const { from, to } = currentCityDates;

//       // Determine if we're setting the "FROM" or "TO" date
//       let newFrom = from;
//       let newTo = to;

//       if (!from || (from && to)) {
//         // Start a new selection range
//         newFrom = date;
//         newTo = null;
//       } else if (from && !to) {
//         // Set the "TO" date and enforce max range of 4 days
//         const maxDate = addDays(from, 3);
//         if (date > maxDate) {
//           alert("Please select a date range of up to 4 days.");
//           return prevDates;
//         }
//         newTo = date;

//         // Add selected range to disabled dates to prevent overlap with other locations
//         const range = [];
//         for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
//           range.push(d);
//         }
//         setDisabledDates([...disabledDates, ...range]);
//       }

//       return {
//         ...prevDates,
//         [cityName]: {
//           from: newFrom,
//           to: newTo,
//         },
//       };
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

//   return (
//     <div className="duration-container">
//       {locations.map((location, index) => (
//         <div key={index} className="location-section">
//           <h2 className="location-name">{location.cityName}</h2>
//           <div className="calendar-pair">
//             <div className="calendar-section">
//               <h3 className="calendar-title">Select Dates</h3>
//               <Calendar
//                 view="month"
//                 showDoubleView // This displays two months side by side (current and next)
//                 defaultValue={new Date()}
//                 onClickDay={(date) => handleDateChange(location.cityName, date)}
//                 minDate={startOfMonth(new Date())}
//                 maxDate={addDays(new Date(), 60)} // Limit to current and next month
//                 tileClassName={({ date, view }) => {
//                   if (view === "month" && isDateInRange(date, location.cityName)) {
//                     return "highlighted-date";
//                   }
//                   if (view === "month" && isDateDisabled(date)) {
//                     return "disabled-date";
//                   }
//                   return null;
//                 }}
//                 tileDisabled={({ date }) => isDateDisabled(date)}
//               />
//             </div>
//           </div>
//           <div className="actions">
//             <button
//               className="reset-btn"
//               onClick={() => setSelectedDates((prevDates) => ({ ...prevDates, [location.cityName]: { from: null, to: null } }))}
//             >
//               Reset
//             </button>
//             <button className="apply-btn">Apply</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Duration;
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { addDays, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
// import "./Duration.css"; // Custom styling for matching UI

// const Duration = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedDates, setSelectedDates] = useState({});
//   const [disabledDates, setDisabledDates] = useState([]);

//   useEffect(() => {
//     // Load selected cities from localStorage
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
//     if (storedLocations && Array.isArray(storedLocations)) {
//       setLocations(storedLocations);
//     }
//   }, []);

//   const handleDateChange = (cityName, date) => {
//     setSelectedDates((prevDates) => {
//       const currentCityDates = prevDates[cityName] || {};
//       const { from, to } = currentCityDates;

//       // Determine if we're setting the "FROM" or "TO" date
//       let newFrom = from;
//       let newTo = to;

//       if (!from || (from && to)) {
//         // Start a new selection range
//         newFrom = date;
//         newTo = null;
//       } else if (from && !to) {
//         // Set the "TO" date and enforce max range of 4 days
//         const maxDate = addDays(from, 3);
//         if (date > maxDate) {
//           alert("Please select a date range of up to 4 days.");
//           return prevDates;
//         }
//         newTo = date;

//         // Add selected range to disabled dates to prevent overlap with other locations
//         const range = [];
//         for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
//           range.push(d);
//         }
//         setDisabledDates([...disabledDates, ...range]);
//       }

//       // Enforce the rule that the next location date should not be before the selected date of the current location
//       if (locations.indexOf(cityName) < locations.length - 1) {
//         const nextCityName = locations[locations.indexOf(cityName) + 1].cityName;
//         const nextCityFromDate = prevDates[nextCityName]?.from;
//         if (nextCityFromDate && date < nextCityFromDate) {
//           alert(`Please select a date for ${nextCityName} that is after ${cityName}'s selected date.`);
//           return prevDates;
//         }
//       }

//       return {
//         ...prevDates,
//         [cityName]: {
//           from: newFrom,
//           to: newTo,
//         },
//       };
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

//   return (
//     <div className="duration-container">
//       {locations.map((location, index) => (
//         <div key={index} className="location-section">
//           <h2 className="location-name">{location.cityName}</h2>
//           <div className="calendar-pair">
//             <div className="calendar-section">
//               <h3 className="calendar-title">Select Dates</h3>
//               <Calendar
//                 view="month"
//                 showDoubleView // This displays two months side by side (current and next)
//                 defaultValue={new Date()}
//                 onClickDay={(date) => handleDateChange(location.cityName, date)}
//                 minDate={startOfMonth(new Date())}
//                 maxDate={addDays(new Date(), 60)} // Limit to current and next month
//                 tileClassName={({ date, view }) => {
//                   if (view === "month" && isDateInRange(date, location.cityName)) {
//                     return "highlighted-date";  // Highlighted date range
//                   }
//                   if (view === "month" && isDateDisabled(date)) {
//                     return "disabled-date";  // Disabled dates
//                   }
//                   return null;
//                 }}
//                 tileDisabled={({ date }) => isDateDisabled(date)}
//               />
//             </div>
//           </div>
//           <div className="actions">
//             <button
//               className="reset-btn"
//               onClick={() => setSelectedDates((prevDates) => ({ ...prevDates, [location.cityName]: { from: null, to: null } }))}>
//               Reset
//             </button>
//             <button className="apply-btn">Apply</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Duration;
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { addDays, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
// import "./Duration.css"; // Custom styling for matching UI

// const Duration = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedDates, setSelectedDates] = useState({});
//   const [disabledDates, setDisabledDates] = useState([]);
//   const [allDatesSelected, setAllDatesSelected] = useState(false); // Track if dates are selected for all locations

//   useEffect(() => {
//     // Load selected cities from localStorage
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
//     if (storedLocations && Array.isArray(storedLocations)) {
//       setLocations(storedLocations);
//     }
//   }, []);

//   const handleDateChange = (cityName, date) => {
//     setSelectedDates((prevDates) => {
//       const currentCityDates = prevDates[cityName] || {};
//       const { from, to } = currentCityDates;

//       // Determine if we're setting the "FROM" or "TO" date
//       let newFrom = from;
//       let newTo = to;

//       if (!from || (from && to)) {
//         // Start a new selection range
//         newFrom = date;
//         newTo = null;
//       } else if (from && !to) {
//         // Set the "TO" date and enforce max range of 4 days
//         const maxDate = addDays(from, 3);
//         if (date > maxDate) {
//           alert("Please select a date range of up to 4 days.");
//           return prevDates;
//         }
//         newTo = date;

//         // Add selected range to disabled dates to prevent overlap with other locations
//         const range = [];
//         for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
//           range.push(d);
//         }
//         setDisabledDates([...disabledDates, ...range]);
//       }

//       const newSelectedDates = {
//         ...prevDates,
//         [cityName]: {
//           from: newFrom,
//           to: newTo,
//         },
//       };

//       // Check if all dates are selected for all locations
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

//   const handleReset = (cityName) => {
//     setSelectedDates((prevDates) => {
//       const newDates = { ...prevDates };
//       delete newDates[cityName];
//       return newDates;
//     });
//     setDisabledDates([]);
//     setAllDatesSelected(false);
//   };

//   return (
//     <div className="duration-container">
//       {locations.map((location, index) => (
//         <div key={index} className="location-section">
//           <h2 className="location-name">{location.cityName}</h2>
//           <div className="calendar-pair">
//             <div className="calendar-section">
//               <h3 className="calendar-title">Select Dates</h3>
//               <Calendar
//                 view="month"
//                 showDoubleView
//                 defaultValue={new Date()}
//                 onClickDay={(date) => handleDateChange(location.cityName, date)}
//                 minDate={startOfMonth(new Date())}
//                 maxDate={addDays(new Date(), 60)}
//                 tileClassName={({ date, view }) => {
//                   if (view === "month" && isDateInRange(date, location.cityName)) {
//                     return "highlighted-date";
//                   }
//                   if (view === "month" && isDateDisabled(date)) {
//                     return "disabled-date";
//                   }
//                   return null;
//                 }}
//                 tileDisabled={({ date }) => isDateDisabled(date)}
//               />
//             </div>
//           </div>
//           <div className="actions">
//             <button
//               className="reset-btn"
//               onClick={() => handleReset(location.cityName)}
//             >
//               Reset
//             </button>
//             {allDatesSelected && (
//               <button className="next-btn">Next</button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Duration;
// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import { addDays, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
// import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
// import "./Duration.css"; // Custom styling for matching UI

// const Duration = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedDates, setSelectedDates] = useState({});
//   const [disabledDates, setDisabledDates] = useState([]);
//   const [allDatesSelected, setAllDatesSelected] = useState(false); // Track if dates are selected for all locations
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     // Load selected cities from localStorage
//     const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
//     if (storedLocations && Array.isArray(storedLocations)) {
//       setLocations(storedLocations);
//     }
//   }, []);

//   const handleDateChange = (cityName, date) => {
//     setSelectedDates((prevDates) => {
//       const currentCityDates = prevDates[cityName] || {};
//       const { from, to } = currentCityDates;

//       // Determine if we're setting the "FROM" or "TO" date
//       let newFrom = from;
//       let newTo = to;

//       if (!from || (from && to)) {
//         // Start a new selection range
//         newFrom = date;
//         newTo = null;
//       } else if (from && !to) {
//         // Set the "TO" date and enforce max range of 4 days
//         const maxDate = addDays(from, 3);
//         if (date > maxDate) {
//           alert("Please select a date range of up to 4 days.");
//           return prevDates;
//         }
//         newTo = date;

//         // Add selected range to disabled dates to prevent overlap with other locations
//         const range = [];
//         for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
//           range.push(d);
//         }
//         setDisabledDates([...disabledDates, ...range]);
//       }

//       const newSelectedDates = {
//         ...prevDates,
//         [cityName]: {
//           from: newFrom,
//           to: newTo,
//         },
//       };

//       // Check if all dates are selected for all locations
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

//   const handleReset = (cityName) => {
//     setSelectedDates((prevDates) => {
//       const newDates = { ...prevDates };
//       delete newDates[cityName];
//       return newDates;
//     });
//     setDisabledDates([]);
//     setAllDatesSelected(false);
//   };

//   const handleNext = () => {
//     // Navigate to the /activities page when the "Next" button is clicked
//     navigate("/activities");
//   };

//   return (
//     <div className="duration-container">
//       {locations.map((location, index) => (
//         <div key={index} className="location-section">
//           <h2 className="location-name">{location.cityName}</h2>
//           <div className="calendar-pair">
//             <div className="calendar-section">
//               <h3 className="calendar-title">Select Dates</h3>
//               <Calendar
//                 view="month"
//                 showDoubleView
//                 defaultValue={new Date()}
//                 onClickDay={(date) => handleDateChange(location.cityName, date)}
//                 minDate={startOfMonth(new Date())}
//                 maxDate={addDays(new Date(), 60)}
//                 tileClassName={({ date, view }) => {
//                   if (view === "month" && isDateInRange(date, location.cityName)) {
//                     return "highlighted-date";
//                   }
//                   if (view === "month" && isDateDisabled(date)) {
//                     return "disabled-date";
//                   }
//                   return null;
//                 }}
//                 tileDisabled={({ date }) => isDateDisabled(date)}
//               />
//             </div>
//           </div>
//           <div className="actions">
//             <button
//               className="reset-btn"
//               onClick={() => handleReset(location.cityName)}
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       ))}
//       {allDatesSelected && (
//         <div className="next-btn-container">
//           <button className="next-btn" onClick={handleNext}>
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Duration;
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { addDays, isSameDay, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./Duration.css";

const Duration = () => {
  const [locations, setLocations] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [disabledDates, setDisabledDates] = useState([]);
  const [allDatesSelected, setAllDatesSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load selected cities from localStorage
    const storedLocations = JSON.parse(localStorage.getItem("selectedCities"));
    if (storedLocations && Array.isArray(storedLocations)) {
      setLocations(storedLocations);
    }
  }, []);

  const handleDateChange = (cityName, date) => {
    setSelectedDates((prevDates) => {
      const currentCityDates = prevDates[cityName] || {};
      const { from, to } = currentCityDates;

      // Determine if we're setting the "FROM" or "TO" date
      let newFrom = from;
      let newTo = to;

      if (!from || (from && to)) {
        // Start a new selection range
        newFrom = date;
        newTo = null;
      } else if (from && !to) {
        // Set the "TO" date
        const maxDate = addDays(from, 3);
        if (date > maxDate) {
          alert("Please select a date range of up to 4 days.");
          return prevDates;
        }
        newTo = date;

        // Add selected range to disabled dates to prevent overlap with other locations
        const range = [];
        for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
          range.push(d);
        }
        setDisabledDates([...disabledDates, ...range]);
      }

      const newSelectedDates = {
        ...prevDates,
        [cityName]: {
          from: newFrom,
          to: newTo,
        },
      };

      // Check if all dates are selected for all locations
      const allSelected = Object.keys(newSelectedDates).every(
        (key) => newSelectedDates[key].from && newSelectedDates[key].to
      );
      setAllDatesSelected(allSelected);

      return newSelectedDates;
    });
  };

  const isDateInRange = (date, cityName) => {
    const cityDates = selectedDates[cityName];
    if (!cityDates || !cityDates.to || !cityDates.from) return false;

    const { from, to } = cityDates;
    return isWithinInterval(date, { start: from, end: to });
  };

  const isDateDisabled = (date) => {
    return disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
  };

  // This function will return the earliest possible date for the current location
  const getEarliestAvailableDate = (index) => {
    const prevLocation = locations[index - 1];
    if (prevLocation && selectedDates[prevLocation.cityName]) {
      const prevToDate = selectedDates[prevLocation.cityName].to;
      if (prevToDate) {
        return addDays(prevToDate, 1); // Set the earliest date for the next location as the day after the previous location's "TO" date
      }
    }
    return new Date(); // Default to today if no previous location
  };

  const handleReset = (cityName) => {
    setSelectedDates((prevDates) => {
      const newDates = { ...prevDates };
      delete newDates[cityName];
      return newDates;
    });
    setDisabledDates([]);
    setAllDatesSelected(false);
  };

  const handleNext = () => {
    // Navigate to the /activities page when the "Next" button is clicked
    navigate("/activities");
  };

  return (
    <div className="duration-container">
      {locations.map((location, index) => (
        <div key={index} className="location-section">
          <h2 className="location-name">{location.cityName}</h2>
          <div className="calendar-pair">
            <div className="calendar-section">
              <h3 className="calendar-title">Select Dates</h3>
              <Calendar
                view="month"
                showDoubleView
                defaultValue={new Date()}
                onClickDay={(date) => handleDateChange(location.cityName, date)}
                minDate={getEarliestAvailableDate(index)} // Set the earliest available date dynamically
                maxDate={addDays(new Date(), 60)}
                tileClassName={({ date, view }) => {
                  if (view === "month" && isDateInRange(date, location.cityName)) {
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
        </div>
      ))}
      {allDatesSelected && (
        <div className="next-btn-container">
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Duration;
