import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { MapPin, Coffee, Utensils, Moon } from "lucide-react";
//import InfoSection from "./InfoSection";
const viewTrip = () => {
  const { tripId } = useParams();
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    setTrip(docSnap.data());

    if (docSnap.exists()) {
      console.log("document:", docSnap.data());
    } else {
      console.log("No such document");
    }
  };
  if (!trip) return <div className="p-4">Loading...</div>;
  const currentPlan = trip.tripData?.[selectedLocationIndex] || {};
  console.log(currentPlan);
  const locations = trip.userSelection?.selectedCities || [];
  const CategoryBox = ({ category, children }) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-6 rounded ${
          category === 'Breakfast' ? 'bg-blue-500' :
          category === 'Lunch' ? 'bg-green-500' :
          category === 'Dinner' ? 'bg-purple-500' :
          'bg-gray-500'
        }`} />
        <span className="text-sm font-medium text-gray-600">{category}</span>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  const renderMealInfo = (data, mealType) => {
    if (!data || !data[mealType]) return null;
    const meal = data[mealType];
    
    return (
      <div className="space-y-2">
        <div className="font-medium">{meal}</div>
        {data[`${mealType}Details`] && (
          <div className="text-gray-600">{data[`${mealType}Details`]}</div>
        )}
        {data.cuisine && (
          <div className="text-gray-600">Cuisine: {data.cuisine}</div>
        )}
        {data.locationDetails && (
          <div className="text-gray-600">Location: {data.locationDetails}</div>
        )}
        {data.priceRange && (
          <div className="text-gray-600">Price Range: {data.priceRange}</div>
        )}
      </div>
    );
  };

  const renderActivity = (data) => {
    if (!data?.activity) return null;
    return (
      <div className="space-y-2">
        <div className="font-bold">{data.activity}</div>
        {data.placeDetails && (
          <div className="text-gray-600">{data.placeDetails}</div>
        )}
        {data.timeTravel && (
          <div className="text-gray-500">{data.timeTravel}</div>
        )}
        {data.rating && (
          <div className="flex items-center gap-1">
            Rating: <span className="text-yellow-500">⭐</span> {data.rating}
          </div>
        )}
        {data.ticketPricing && (
          <div className="text-gray-600">Ticket: {data.ticketPricing}</div>
        )}
      </div>
    );
  };

  const sortedDays = Object.entries(currentPlan.itinerary || {}).sort((a, b) => {
    const dayNumA = parseInt(a[0].replace('day', ''));
    const dayNumB = parseInt(b[0].replace('day', ''));
    return dayNumA - dayNumB;
  });


  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Location Swap Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => setSelectedLocationIndex(index)}
            className={`px-4 py-2 rounded-lg ${
              selectedLocationIndex === index
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            📍 {location.cityName}
          </button>
        ))}
      </div>
      {/* hotel Option */}

      <div>
          <h2 className="text-2xl font-bold mb-4">🏨 Hotel Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlan.hotelOptions?.map((hotel, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2">{hotel.hotelName}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">{hotel.description}</p>
                  <div className="text-green-600 font-semibold">
                    Price: {hotel.price}
                  </div>
                  <div className="flex items-center">
                    <span>Rating: </span>
                    <span className="ml-1">⭐ {hotel.rating}</span>
                  </div>
                  <div className="text-gray-500">
                    {hotel.hotelAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Section */}
       
    

      <div className="max-w-4xl mx-auto p-4">
        {sortedDays.map(([day, dayData]) => (
          <div key={day} className="border rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Day {day.replace('day', '')}</h2>
            
            {/* Morning Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Morning</h3>
              <CategoryBox category="Breakfast">
                {renderMealInfo(dayData.morning, 'breakfast')}
              </CategoryBox>
              {renderActivity(dayData.morning)}
            </div>


            {/* Midday Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Midday</h3>
              {renderActivity(dayData.midday)}
              <CategoryBox category="Lunch">
                {renderMealInfo(dayData.midday, 'lunch')}
              </CategoryBox>
            </div>

            {/* Afternoon Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Afternoon</h3>
              {renderActivity(dayData.afternoon)}
            </div>

            {/* Evening Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Evening</h3>
              {renderActivity(dayData.evening)}
              <CategoryBox category="Dinner">
                {renderMealInfo(dayData.evening, 'dinner')}
              </CategoryBox>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default viewTrip;
