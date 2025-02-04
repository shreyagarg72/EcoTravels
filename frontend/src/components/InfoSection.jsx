import React from 'react'

function InfoSection  ({trip}) {
  return (
<div>
<div className="flex space-x-4 mb-4">
        {trip.travelPlans.map((plan, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`px-4 py-2 rounded ${
              activePlanIndex === index ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {plan.location}
          </button>
        ))}
      </div>
</div>)
}

export default InfoSection;