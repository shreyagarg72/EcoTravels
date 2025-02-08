import React from 'react';

const LocationSelector = ({ trip, selectedLocationIndex, onLocationSelect }) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {trip?.userSelection?.selectedCities?.map((location, index) => (
          <button
            key={index}
            onClick={() => onLocationSelect(index)}
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
      {/* Cost estimation display below buttons */}
      {trip?.tripData?.travelPlans?.[selectedLocationIndex]?.totalCostEstimation && (
        <div className="mt-2 text-lg font-medium">
          💰 Total Cost Estimation: {trip.tripData.travelPlans[selectedLocationIndex].totalCostEstimation}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;