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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatSession } from "../service/AIModal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
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

  // const handleDateChange = (cityName, date) => {
  //   setSelectedDates((prevDates) => {
  //     const currentCityDates = prevDates[cityName] || {};
  //     const { from, to } = currentCityDates;

  //     let newFrom = from;
  //     let newTo = to;

  //     if (!from || (from && to)) {
  //       newFrom = date;
  //       newTo = null;
  //     } else if (from && !to) {
  //       const maxDate = addDays(from, 3);
  //       if (date > maxDate) {
  //         alert("Please select a date range of up to 4 days.");
  //         return prevDates;
  //       }
  //       newTo = date;

  //       const range = [];
  //       for (let d = newFrom; d <= newTo; d = addDays(d, 1)) {
  //         range.push(d);
  //       }
  //       setDisabledDates([...disabledDates, ...range]);
  //     }

  //     const duration =
  //       newTo && newFrom ? differenceInDays(newTo, newFrom) + 1 : 0;

  //     const newSelectedDates = {
  //       ...prevDates,
  //       [cityName]: {
  //         from: newFrom,
  //         to: newTo,
  //         duration,
  //       },
  //     };

  //     const totalDuration = Object.values(newSelectedDates).reduce(
  //       (sum, { duration }) => sum + (duration || 0),
  //       0
  //     );
  //     setTotalDuration(totalDuration);

  //     const allSelected = Object.keys(newSelectedDates).every(
  //       (key) => newSelectedDates[key].from && newSelectedDates[key].to
  //     );
  //     setAllDatesSelected(allSelected);

  //     // Update selectedCitiesData with new duration
  //     setSelectedCitiesData((prevData) => ({
  //       ...prevData,
  //       selectedCities: prevData.selectedCities.map((city) =>
  //         city.cityName === cityName ? { ...city, duration: duration } : city
  //       ),
  //     }));

  //     return newSelectedDates;
  //   });
  // };

  const handleDateChange = (cityName, date) => {
    setSelectedDates((prevDates) => {
      const currentCityDates = prevDates[cityName] || {};
      const { from, to } = currentCityDates;

      let newFrom = from;
      let newTo = to;

      // Determine max days allowed based on number of selected cities
      const maxDays = selectedCitiesData.selectedCities.length > 2 ? 2 : 3;
      const maxDate = addDays(from || date, maxDays - 1);

      if (!from || (from && to)) {
        newFrom = date;
        newTo = null;
      } else if (from && !to) {
        if (date > maxDate) {
          alert(`Please select a date range of up to ${maxDays} days.`);
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

  // const handleNext = () => {
  //   if (!isLoggedIn) {
  //     handleLoginClick();
  //     return;
  //   }

  //   navigate("/itinerary");
  // };

  const handleNext = async () => {
    if (!isLoggedIn) {
      handleLoginClick();
      return;
    }
    setLoading(true);
    // Generate travel plan prompt
    const citiesDetails = selectedCitiesData.selectedCities
      .map(
        (city) =>
          `{${city.cityName}, for ${city.duration} Days, latitude of ${city.latitude}, longitude of ${city.longitude}}`
      )
      .join(", ");

    const FINAL_PROMPT = `Generate Travel Plan for multiple locations based on length of cities - for each Location: ${citiesDetails} for ${selectedCitiesData.travelType} of ${selectedCitiesData.travelCount} people with a Cheap budget. 
    Give me a list of hotel options with Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates, Rating, and Description.

Suggest an itinerary including Place Name, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, Rating, Travel Time, and include daily food recommendations for meals (breakfast, lunch, dinner) for each location per city duration.

For each day in the itinerary, provide:

Morning activity with breakfast details

Midday activity with lunch details

Afternoon activity

Evening activity or any place to visit 

Night activity with dinner details

Provide a daily plan with the best time to visit each place in JSON format.`;

    console.log("Prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      console.log("Response:", responseText);
      setLoading(false);
      SaveAiTrip(responseText);
      // Store the response for use in the itinerary page
      localStorage.setItem("generatedItinerary", responseText);

      // Navigate to the itinerary page
      // navigate("/itinerary");
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated.");
        return;
      }
      setLoading(true);
      const userEmail = user.email;
      const docId = Date.now().toString(); // Unique ID for the trip
      const data = JSON.parse(localStorage.getItem("selectedCitiesData"));
      await setDoc(doc(db, "AITrips", docId), {
        id: docId,
        userEmail: userEmail, // Save user's email
        tripData: JSON.parse(TripData),
        userSelection: data, // Save the itinerary data
        createdAt: new Date().toISOString(), // Timestamp for tracking
      });
      setLoading(false);
      console.log("Trip saved successfully!");
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
    }
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
            <button
              className="next-btn"
              disabled={loading}
              onClick={handleNext}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              ) : (
                "Generate Itinerary"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Duration;
