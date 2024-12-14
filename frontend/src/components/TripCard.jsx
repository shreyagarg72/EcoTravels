import React from "react";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const TripCard = ({ trip, onSelect }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={onSelect}
    >
      {/* Background Image from Database */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50 group-hover:brightness-75 transition-all duration-300"
        style={{ backgroundImage: `url(${trip.image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />

      {/* Content */}
      <div className="relative z-10 p-6 text-white flex flex-col justify-end h-96">
        <div className="transform transition-transform duration-300 group-hover:translate-y-0">
          <h2 className="text-2xl font-bold mb-3 text-shadow-lg">
            {trip.tripName}
          </h2>
          <p className="text-sm mb-4 opacity-75 line-clamp-2">
            {trip.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <MapPin className="mr-2 w-5 h-5 text-green-400" />
              <span className="text-sm">
                {trip.locations.map((loc) => loc.cityName).join(", ")}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 w-5 h-5 text-blue-400" />
              <span className="text-sm">{trip.duration} Days Adventure</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium opacity-75">Explore Trip</span>
            <ArrowRight className="w-6 h-6 text-white transform transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;