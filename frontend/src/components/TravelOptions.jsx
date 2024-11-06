import React from 'react';

const TravelOptions = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-semibold mb-6">Travel Options</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg shadow-md text-center">
          <h3 className="font-bold text-xl">Solo</h3>
          <p>Explore the world at your own pace.</p>
        </div>
        <div className="border p-4 rounded-lg shadow-md text-center">
          <h3 className="font-bold text-xl">Family</h3>
          <p>Create unforgettable memories with your family.</p>
        </div>
        <div className="border p-4 rounded-lg shadow-md text-center">
          <h3 className="font-bold text-xl">Friends</h3>
          <p>Enjoy adventures with your friends.</p>
        </div>
        <div className="border p-4 rounded-lg shadow-md text-center">
          <h3 className="font-bold text-xl">School</h3>
          <p>Educational trips for students.</p>
        </div>
      </div>

      {/* You can add a route or any additional details here */}
      
    </div>
  );
};

export default TravelOptions;
