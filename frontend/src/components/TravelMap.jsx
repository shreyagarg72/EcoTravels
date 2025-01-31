// TravelMap.js
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// MapCenterHandler component
const MapCenterHandler = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 12);
    }
  }, [center, map]);

  return null;
};

// Main TravelMap component
const TravelMap = ({ 
  selectedCity, 
  selectedLocation, 
  handleLocationClick 
}) => {
  return (
    <MapContainer
      center={[selectedCity.latitude, selectedCity.longitude]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <MapCenterHandler
        center={
          selectedLocation || [
            selectedCity.latitude,
            selectedCity.longitude,
          ]
        }
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {(selectedCity.itinerary || []).flatMap((day) =>
        (day.activities || []).map((activity, index) => {
          if (!activity.coordinates) return null;
          return (
            <Marker
              key={`${day.day}-${index}`}
              position={activity.coordinates}
              eventHandlers={{
                click: () => handleLocationClick(activity),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-base mb-1">{activity.placeName}</h3>
                  <p className="text-sm mb-1">{activity.placeDetails}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    {activity.timeToVisit}
                  </p>
                  {activity.ticketPrice && (
                    <p className="text-sm text-green-600">
                      Price: {activity.ticketPrice}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })
      )}
    </MapContainer>
  );
};

export default TravelMap;