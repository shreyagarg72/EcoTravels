import React, { useState, useEffect } from 'react';
import { Leaf, Home, Utensils, MapPin, AlertCircle } from 'lucide-react';

const EcoImpactCalculator = ({ trip }) => {
  const [showImpact, setShowImpact] = useState(false);
  const [impact, setImpact] = useState({
    savedCarbon: 0,
    potentialSavings: 0,
    treesSaved: 0,
    breakdown: {
      hotel: 0,
      activities: 0,
      dining: 0
    },
    ecoChoices: []
  });

  const emissionFactors = {
    hotel: {
      standard: 25.5,
      eco: 8.5,
      saving: 17
    },
    activities: {
      standard: 5.0,
      eco: 2.5,
      saving: 2.5
    },
    dining: {
      standard: 8.5,
      local: 4.5,
      saving: 4
    }
  };

  useEffect(() => {
    if (!trip) return;

    const calculateImpact = () => {
      let hotelSavings = 0;
      let activitySavings = 0;
      let diningSavings = 0;
      let potentialHotelSavings = 0;
      let potentialActivitySavings = 0;
      let potentialDiningSavings = 0;
      const ecoChoices = [];

      // Calculate hotel savings with expanded eco-friendly criteria
      trip.tripData.travelPlans.forEach(plan => {
        const hotelOptions = plan.hotelOptions || [];
        const duration = parseInt(plan.duration || "1");
        
        hotelOptions.forEach(hotel => {
          // Updated to check for both eco-friendly and sustainable
          const isGreenHotel = hotel.description?.toLowerCase().includes('eco-friendly') ||
                              hotel.description?.toLowerCase().includes('sustainable') ||
                              hotel.hotelName?.toLowerCase().includes('eco') ||
                              hotel.hotelName?.toLowerCase().includes('green');
          
          if (isGreenHotel) {
            hotelSavings += emissionFactors.hotel.saving * duration;
            ecoChoices.push(`Green hotel: ${hotel.hotelName}`);
          } else {
            potentialHotelSavings += emissionFactors.hotel.saving * duration;
          }
        });
      });

      // Calculate activities savings with expanded outdoor criteria
      trip.tripData.travelPlans.forEach(plan => {
        plan.itinerary?.forEach(day => {
          const activities = [
            day.morning?.activity,
            day.afternoon?.activity,
            day.evening?.activity
          ].filter(Boolean);

          activities.forEach(activity => {
            if (activity) {
              // Updated eco-activity criteria to include heritage sites and lake gardens
              const isEcoActivity = 
                activity.placeDetails?.toLowerCase().includes('outdoor') ||
                activity.placeName?.toLowerCase().includes('park') ||
                activity.placeName?.toLowerCase().includes('garden') ||
                activity.placeDetails?.toLowerCase().includes('walk') ||
                activity.placeName?.toLowerCase().includes('heritage') ||
                activity.placeName?.toLowerCase().includes('monument') ||
                activity.placeName?.toLowerCase().includes('lake');
              const duration = activity.bestTimeToVisit ? 
                parseInt(activity.bestTimeToVisit.split(' - ')[1]) - 
                parseInt(activity.bestTimeToVisit.split(' - ')[0]) : 2;

              if (isEcoActivity) {
                activitySavings += emissionFactors.activities.saving * duration;
                ecoChoices.push(`Green activity: ${activity.placeName}`);
              } else {
                potentialActivitySavings += emissionFactors.activities.saving * duration;
              }
            }
          });
        });
      });

      // Calculate dining savings (unchanged)
      trip.tripData.travelPlans.forEach(plan => {
        plan.itinerary?.forEach(day => {
          const meals = [
            day.morning?.breakfast,
            day.afternoon?.lunch,
            day.evening?.dinner
          ].filter(Boolean);

          meals.forEach(meal => {
            if (meal) {
              const isLocalFood = 
                meal.cuisine?.toLowerCase().includes('local') ||
                meal.restaurantName?.toLowerCase().includes('organic');

              if (isLocalFood) {
                diningSavings += emissionFactors.dining.saving;
                ecoChoices.push(`Local dining: ${meal.restaurantName}`);
              } else {
                potentialDiningSavings += emissionFactors.dining.saving;
              }
            }
          });
        });
      });

      const totalSaved = hotelSavings + activitySavings + diningSavings;
      const potentialSavings = potentialHotelSavings + potentialActivitySavings + potentialDiningSavings;

      setImpact({
        savedCarbon: totalSaved,
        potentialSavings,
        treesSaved: Math.ceil(totalSaved / 25),
        breakdown: {
          hotel: hotelSavings,
          activities: activitySavings,
          dining: diningSavings
        },
        ecoChoices: ecoChoices.slice(0, 3)
      });
    };

    calculateImpact();
  }, [trip]);

  // Rest of the component remains the same
  return (
    <div className="w-full mb-6">
      <button
        onClick={() => setShowImpact(!showImpact)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors mb-4"
      >
        <Leaf size={20} />
        {showImpact ? 'Hide Environmental Impact' : 'Show Environmental Impact'}
      </button>

      {showImpact && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Rest of the JSX remains exactly the same */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-green-500" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Environmental Impact Savings</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg shadow-sm border border-green-100">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(impact.savedCarbon)} kg
              </div>
              <div className="text-sm text-green-600">CO₂ Emissions Saved</div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(impact.potentialSavings)} kg
              </div>
              <div className="text-sm text-gray-600">
                Additional potential CO₂ savings
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-800">
                {impact.treesSaved} trees
              </div>
              <div className="text-sm text-gray-600">
                Equivalent to planting these many trees
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Home className="text-blue-500" size={20} />
              <div>
                <div className="text-sm font-medium">Accommodation Savings</div>
                <div className="text-lg text-green-600">{Math.round(impact.breakdown.hotel)} kg CO₂</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="text-purple-500" size={20} />
              <div>
                <div className="text-sm font-medium">Activities Savings</div>
                <div className="text-lg text-green-600">{Math.round(impact.breakdown.activities)} kg CO₂</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Utensils className="text-orange-500" size={20} />
              <div>
                <div className="text-sm font-medium">Dining Savings</div>
                <div className="text-lg text-green-600">{Math.round(impact.breakdown.dining)} kg CO₂</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
            <div className="flex items-start gap-2">
              <Leaf className="text-green-500 mt-1" size={20} />
              <div>
                <div className="text-sm font-medium mb-2 text-green-800">
                  Your Eco-Friendly Choices:
                </div>
                {impact.ecoChoices.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {impact.ecoChoices.map((choice, index) => (
                      <li key={index} className="text-sm text-green-700">{choice}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">
                    Consider choosing eco-friendly hotels, outdoor activities, and local dining options to increase your environmental savings!
                  </p>
                )}
                {impact.potentialSavings > 0 && !trip?.userSelection?.isEcoFriendly && (
                  <p className="mt-2 text-sm text-orange-600">
                    You could save an additional {Math.round(impact.potentialSavings)} kg of CO₂ by choosing more eco-friendly options!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoImpactCalculator;