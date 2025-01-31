// utils/travelTransformer.js

/**
 * Transforms raw travel plan data into a structured format
 * @param {Object|Array} data - Raw travel plan data
 * @returns {Object} Transformed travel data with cities, itineraries, and details
 */
export const transformTravelPlans = (data) => {
    // Check if data exists
    if (!data) {
      console.error("No data provided to transformTravelPlans");
      return null;
    }
  
    // Normalize the data structure
    let travelPlans;
    if (data.travelPlan) {
      // If data comes with a single travelPlan object
      travelPlans = [data.travelPlan];
    } else if (data.travelPlans) {
      // If data comes wrapped in travelPlans array
      travelPlans = Array.isArray(data.travelPlans)
        ? data.travelPlans
        : [data.travelPlans];
    } else {
      // If data is direct object or array
      travelPlans = Array.isArray(data) ? data : [data];
    }
  
    const selectedCitiesData = JSON.parse(
      localStorage.getItem("selectedCitiesData")
    );
  
    return {
      travelType: selectedCitiesData?.travelType || "Unknown",
      travelCount: selectedCitiesData?.travelCount || 1,
      cities: travelPlans.map((plan, index) => {
        // Get the corresponding city data from localStorage if available
        const cityData = selectedCitiesData?.selectedCities?.[index] || {};
        console.log("Hotel options for city:", plan.hotelOptions);
        
        return {
          cityName: plan.location || cityData.cityName || "Unknown City",
          duration:
            parseInt(String(plan.duration)) || parseInt(cityData.duration) || 1,
          latitude:
            parseFloat(plan.latitude) || parseFloat(cityData.latitude) || 0,
          longitude:
            parseFloat(plan.longitude) || parseFloat(cityData.longitude) || 0,
          hotels: transformHotels(plan.hotelOptions),
          restaurantSuggestions: transformRestaurants(plan.restaurantSuggestions),
          itinerary: transformItinerary(plan.itinerary),
        };
      }),
    };
  };
  
  /**
   * Transforms hotel data
   * @param {Array} hotelOptions - Raw hotel data
   * @returns {Array} Transformed hotel data
   */
  const transformHotels = (hotelOptions = []) => {
    return hotelOptions.map((hotel) => ({
      name: hotel.hotelName,
      address: hotel.hotelAddress,
      price: hotel.price,
      imageUrl: hotel.hotelImageUrl,
      coordinates: hotel.geoCoordinates
        ? [
            parseFloat(hotel.geoCoordinates.latitude),
            parseFloat(hotel.geoCoordinates.longitude),
          ]
        : null,
      rating: hotel.rating,
      description: hotel.description,
    }));
  };
  
  /**
   * Transforms restaurant suggestions
   * @param {Object} suggestions - Raw restaurant suggestions
   * @returns {Object} Transformed restaurant data
   */
  const transformRestaurants = (suggestions = {}) => {
    const transformOptions = (options = []) => 
      options.map((option) => ({
        name: option.name,
        cuisine: option.cuisine,
        priceRange: option.priceRange,
        description: option.description,
        locationDetails: option.locationDetails,
      }));
  
    return {
      breakfastOptions: transformOptions(suggestions?.breakfastOptions),
      cafeOptions: transformOptions(suggestions?.cafeOptions),
      snackOptions: transformOptions(suggestions?.snackOptions),
    };
  };
  
  /**
   * Transforms itinerary data
   * @param {Object} itinerary - Raw itinerary data
   * @returns {Array} Transformed itinerary data
   */
  const transformItinerary = (itinerary = {}) => {
    return Object.entries(itinerary)
      .filter(([key]) => key.startsWith("day"))
      .map(([key, dayData]) => {
        const activities = [];
  
        // Morning activities
        if (dayData?.morning?.activity) {
          activities.push(createActivity({
            ...dayData.morning,
            timeToVisit: "8:00 AM - 9:30 PM",
            order: 1,
          }));
        }
  
        if (dayData?.midday?.activity) {
          activities.push(createActivity({
            ...dayData.midday,
            timeToVisit: "9:30 PM - 12:00 PM",
            order: 2,
          }));
        }
  
        // Lunch
        if (dayData?.midday?.diningSuggestion?.lunch) {
          activities.push(createDiningActivity({
            name: dayData.midday.diningSuggestion.lunch,
            details: dayData.midday.diningSuggestion.lunchDetails,
            type: "lunch",
            timeToVisit: "12:00 PM - 1:30 PM",
            price: dayData.midday.diningSuggestion.priceRange,
            order: 3,
          }));
        }
  
        // Afternoon activity
        if (dayData?.afternoon?.activity) {
          activities.push(createActivity({
            ...dayData.afternoon,
            timeToVisit: "2:00 PM - 5:00 PM",
            order: 4,
          }));
        }
  
        // Evening activity
        if (dayData?.evening?.activity) {
          activities.push(createActivity({
            ...dayData.evening,
            timeToVisit: "5:00 PM - 7:30 PM",
            order: 5,
          }));
        }
  
        // Dinner
        if (dayData?.evening?.diningSuggestion?.dinner) {
          activities.push(createDiningActivity({
            name: dayData.evening.diningSuggestion.dinner,
            details: dayData.evening.diningSuggestion.dinnerDetails,
            type: "dinner",
            timeToVisit: "7:30 PM - 9:00 PM",
            price: dayData.evening.diningSuggestion.priceRange,
            order: 6,
          }));
        }
  
        return {
          day: parseInt(key.replace("day", "")) || 1,
          theme: dayData?.theme || "",
          bestTimeToVisit: dayData?.bestTimeToVisit || "",
          activities: activities.sort((a, b) => a.order - b.order),
        };
      });
  };
  
  /**
   * Creates an activity object
   * @param {Object} data - Activity data
   * @returns {Object} Formatted activity object
   */
  const createActivity = ({
    activity,
    description,
    placeDetails,
    placeImageUrl,
    geoCoordinates,
    ticketPricing,
    rating,
    timeToVisit,
    order,
  }) => ({
    placeName: activity,
    placeDetails: placeDetails || description || "",
    imageUrl: placeImageUrl,
    coordinates: geoCoordinates
      ? [
          parseFloat(geoCoordinates.latitude),
          parseFloat(geoCoordinates.longitude),
        ]
      : null,
    ticketPrice: ticketPricing,
    rating,
    type: "activity",
    timeToVisit,
    order,
  });
  
  /**
   * Creates a dining activity object
   * @param {Object} data - Dining activity data
   * @returns {Object} Formatted dining activity object
   */
  const createDiningActivity = ({
    name,
    details,
    type,
    timeToVisit,
    price,
    order,
  }) => ({
    placeName: name,
    placeDetails: details || `${type.charAt(0).toUpperCase() + type.slice(1)} time`,
    type,
    timeToVisit,
    ticketPrice: price,
    order,
  });
  
  export default transformTravelPlans;