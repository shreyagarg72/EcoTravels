import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Tag } from "lucide-react";

const ItineraryCard = ({ activity }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h4 className="text-lg font-bold text-gray-800 mb-2">
        {activity.properties.name || "Unnamed Activity"}
      </h4>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Tag className="mr-2 w-4 h-4 text-blue-500" />
          <span>
            {activity.properties.categories && activity.properties.categories.length > 0 
              ? activity.properties.categories.join(", ") 
              : "Uncategorized"}
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 w-4 h-4 text-green-500" />
          <span>
            {activity.properties.address_line1 || "Address not available"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ItineraryCard;

