import React from 'react';

const TripSummary = ({ trip }) => {
  // Calculate total duration from all cities
  const totalDuration = trip?.userSelection?.selectedCities?.reduce(
    (sum, city) => sum + (parseInt(city.duration) || 0),
    0
  );

  return (
    <div className="flex justify-between items-center">
      <div className="my-5 flex flex-col gap-2">
        <div className="flex gap-5">
          {/* Show individual city durations */}
          {/* Show total duration if multiple cities */}
          {trip?.userSelection?.selectedCities?.length > 1 && (
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📅 Total: {totalDuration} Days
            </h2>
          )}

          {/* Show traveler count */}
          <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
            🥂 {trip?.userSelection.travelCount} Traveller{trip?.userSelection.travelCount > 1 ? 's' : ''}
          </h2>

          {/* Show travel type only if not solo */}
          {trip?.userSelection.travelType !== 'Solo' && (
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              👪 {trip?.userSelection.travelType}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripSummary;