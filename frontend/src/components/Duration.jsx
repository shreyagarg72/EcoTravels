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
import { chatSession } from "../service/AIModal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";

const Duration = ({ handleLoginClick }) => {
  const [selectedCitiesData, setSelectedCitiesData] = useState({
    selectedCities: [],
    travelType: "",
    travelCount: 0,
    budget: "cheap", // Add budget state with default value
    isEcoFriendly: false, // Add eco-fr
  });
  const [selectedDates, setSelectedDates] = useState({});
  const [disabledDates, setDisabledDates] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [allDatesSelected, setAllDatesSelected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      // Determine max days allowed based on number of selected cities
      const maxDays = selectedCitiesData.selectedCities.length > 2 ? 2 : 3;
      const maxDate = addDays(from || date, maxDays - 1);

      if (!from || (from && to)) {
        newFrom = date;
        newTo = null;
      } else if (from && !to) {
        if (date > maxDate) {
          if (selectedCitiesData.selectedCities.length > 2) {
            toast.warning(
              "For trips with more than 2 locations, you can select up to 2 days.",
              {
                position: "top-center",
                autoClose: 3000,
              }
            );
          } else {
            toast.info(
              "For trips with 1-2 locations, you can select up to 3 days.",
              {
                position: "top-center",
                autoClose: 3000,
              }
            );
          }
          //alert(`Please select a date range of up to ${maxDays} days.`);
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

  // const handleNext = async () => {
  //   if (!isLoggedIn) {
  //     handleLoginClick();
  //     return;
  //   }
  //   setLoading(true);
  const handleBudgetChange = (budget) => {
    setSelectedCitiesData((prev) => ({
      ...prev,
      budget,
    }));
  };

  const handleEcoFriendlyToggle = () => {
    setSelectedCitiesData((prev) => ({
      ...prev,
      isEcoFriendly: !prev.isEcoFriendly,
    }));
  };

  const handleNext = async () => {
    if (!isLoggedIn) {
      // Save current URL and dates before redirecting to login
      localStorage.setItem("returnUrl", window.location.pathname);
      localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
      handleLoginClick();
      return;
    }

    setLoading(true);
    // Generate travel plan prompt
//     const citiesDetails = selectedCitiesData.selectedCities
//       .map(
//         (city) =>
//           `{${city.cityName}, for ${city.duration} Days, latitude of ${city.latitude}, longitude of ${city.longitude}}`
//       )
//       .join(", ");

//     const FINAL_PROMPT = `Generate Travel Plan for multiple locations based on length of cities - for each Location:  ${citiesDetails} for ${
//       selectedCitiesData.travelType
//     } of ${selectedCitiesData.travelCount} people with a ${
//       selectedCitiesData.budget
//     } budget${
//       selectedCitiesData.isEcoFriendly ? " and eco-friendly options" : ""
//     }. 
// ${
//   selectedCitiesData.isEcoFriendly
//     ? "Please prioritize sustainable accommodations, eco-friendly activities, and environmentally conscious transportation options. "
//     : ""
// }
// Give me a list of hotel options with Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates, Rating, and Description.\nSuggest an itinerary including Place Name, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, Rating, Travel Time, and include daily food recommendations for meals (breakfast, lunch, dinner) for each location per city duration.\nFor each day in the itinerary, provide:
// - Morning activity with breakfast details
// - Midday activity with lunch details
// - Afternoon activity 
// - Evening activity with dinner details
// Provide a daily plan with the best time to visit each place in JSON format.
// Please provide the response in the following strict JSON format:\n\"travelPlans\": [\n\n\"location\": \"Goa\",\n\"duration\": \"3 Days\",\"travelerType\": \"Solo\",\"budget\": \"cheap\",\n\"hotelOptions\": [{\"hotelName\": \"\",\"hotelAddress\": \"\",\"price\": \"\",\"hotelImageUrl\": \"\",\"coordinates\": {\"latitude\": 0,\"longitude\": 0},\"rating\": 0,\"description\": \"\"}],\n\"itinerary\": [{\"day\": 1,\"theme\": \"Day Theme\",\n\"morning\": {\n\"activity\": {\"placeName\": \"\",\"placeDetails\": \"\",\"imageUrl\": \"\",\"coordinates\": {\"latitude\": 0,\"longitude\": 0},\"ticketPrice\": \"\",\"rating\": 0,\"bestTimeToVisit\": \"\",\"travelTime\": \"\"},\n\"breakfast\": {\"restaurantName\": \"\",\"cuisine\": \"\",\"priceRange\": \"\",\"location\": \"\"}},\n\"afternoon\": {\"activity\": {\"placeName\": \"\",\"placeDetails\": \"\",\"imageUrl\": \"\",\"coordinates\": {\"latitude\": 0,\"longitude\": 0},\"ticketPrice\": \"\",\"rating\": 0,\"bestTimeToVisit\": \"\",\"travelTime\": \"\"},\n\"lunch\": {\"restaurantName\": \"\",\"cuisine\": \"\",\"priceRange\": \"\",\"location\": \"\"}},\n\"evening\": {\"activity\": {\"placeName\": \"\",\"placeDetails\": \"\",\"imageUrl\": \"\",\"coordinates\": {\"latitude\": 0,\"longitude\": 0},\"ticketPrice\": \"\",\"rating\": 0,\"bestTimeToVisit\": \"\",\"travelTime\": \"\"},\n\"dinner\": {\"restaurantName\": \"\",\"cuisine\": \"\",\"priceRange\": \"\",\"location\": \"\"}}}]\ntotalCostEstimation:\"\" for ${
//       selectedCitiesData.travelType
//     } of ${
//       selectedCitiesData.travelCount
//     }}]Please ensure each field follows this exact structure and naming convention. Fields should not be empty - use \"Not available\" if information is not applicable.\n\n`;

const citiesDetails = selectedCitiesData.selectedCities
.map(
  (city) =>
    `{${city.cityName}, for ${city.duration} Days, latitude of ${city.latitude}, longitude of ${city.longitude}}`
)
.join(", ");

// Format activities array as a string for JSON inclusion
const activitiesString = JSON.stringify(selectedCitiesData.activities);

const FINAL_PROMPT = `Generate Travel Plan for multiple locations based on length of cities - for each Location: ${citiesDetails} for ${
selectedCitiesData.travelType
} of ${selectedCitiesData.travelCount} people with a ${
selectedCitiesData.budget
} budget${
selectedCitiesData.isEcoFriendly ? " and eco-friendly options" : ""
}. ${
selectedCitiesData.isEcoFriendly
  ? "Please prioritize sustainable accommodations, eco-friendly activities, and environmentally conscious transportation options. "
  : ""
} Give me a list of hotel options based on ${selectedCitiesData.locationPreference} with Hotel Name, Hotel Address, Price, Hotel Image URL, Geo Coordinates, Rating, and Description.
Suggest an itinerary based on ${selectedCitiesData.pacePreference} including Place Name, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, Rating, Travel Time, and include daily food recommendations for meals (breakfast, lunch, dinner) for each location per city duration.
For each day in the itinerary, provide: - Morning activity with breakfast details - Midday activity with lunch details - Afternoon activity - Evening activity with dinner details
Provide a daily plan with the best time to visit each place in JSON format.

Please provide the response in the following strict JSON format:
"travelPlans": [

"location": "Goa",
"duration": "3 Days","travelerType": "Solo","budget": "cheap",
"activities": ${activitiesString},
"locationPreference": "${selectedCitiesData.locationPreference}",
"pacePreference": "${selectedCitiesData.pacePreference}",
"hotelOptions": [{"hotelName": "","hotelAddress": "","price": "","hotelImageUrl": "","coordinates": {"latitude": 0,"longitude": 0},"rating": 0,"description": ""}],
"itinerary": [{"day": 1,"theme": "Day Theme",
"morning": {
"activity": {"placeName": "","placeDetails": "","imageUrl": "","coordinates": {"latitude": 0,"longitude": 0},"ticketPrice": "","rating": 0,"bestTimeToVisit": "","travelTime": ""},
"breakfast": {"restaurantName": "","cuisine": "","priceRange": "","location": ""}},
"afternoon": {"activity": {"placeName": "","placeDetails": "","imageUrl": "","coordinates": {"latitude": 0,"longitude": 0},"ticketPrice": "","rating": 0,"bestTimeToVisit": "","travelTime": ""},
"lunch": {"restaurantName": "","cuisine": "","priceRange": "","location": ""}},
"evening": {"activity": {"placeName": "","placeDetails": "","imageUrl": "","coordinates": {"latitude": 0,"longitude": 0},"ticketPrice": "","rating": 0,"bestTimeToVisit": "","travelTime": ""},
"dinner": {"restaurantName": "","cuisine": "","priceRange": "","location": ""}}}]
totalCostEstimation:"" for ${selectedCitiesData.travelType} of ${selectedCitiesData.travelCount}}]

Please ensure each field follows this exact structure and naming convention. Fields should not be empty - use "Not available" if information is not applicable. Also make sure the activities provided are incorporated into the itinerary if possible.
Also make sure daywise activities are near to each other like day 1 activities are close to travel`;
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      console.log("Response:", responseText);
      setLoading(false);

      // Save the trip and get the ID
      const tripId = await SaveAiTrip(responseText);

      // Navigate to view-trip with the new trip ID
      navigate(`/view-trip/${tripId}`);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setLoading(false);
      toast.error("Failed to generate itinerary. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated.");
        return null;
      }

      setLoading(true);
      const userEmail = user.email;
      const docId = Date.now().toString();
      const data = JSON.parse(localStorage.getItem("selectedCitiesData"));

      await setDoc(doc(db, "AITrips", docId), {
        id: docId,
        userEmail: userEmail,
        tripData: JSON.parse(TripData),
        userSelection: data,
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      return docId; // Return the document ID
    } catch (error) {
      console.error("Error saving trip:", error);
      return null;
    }
  };

  // Add useEffect to restore saved dates when component mounts
  useEffect(() => {
    const savedDates = localStorage.getItem("selectedDates");
    if (savedDates) {
      setSelectedDates(JSON.parse(savedDates));
      localStorage.removeItem("selectedDates"); // Clear saved dates after restoring
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-sb mt-4 text-green-800 ">
        Select the start date and end date of your trip
      </div>
      <div className="duration-container">
        {selectedCitiesData.selectedCities.map((location, index) => (
          <div key={index} className="location-section">
            <h2 className="location-name">{location.cityName}</h2>
            <div className="calendar-pair">
              <div className="calendar-section">
                <h3 className="calendar-title">Select Dates</h3>
                <Calendar
                  view="month"
                  showDoubleView={!isMobile}
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
                  className={isMobile ? "mobile-calendar" : "desktop-calendar"}
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
