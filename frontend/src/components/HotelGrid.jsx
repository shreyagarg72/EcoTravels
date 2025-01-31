import React from 'react';

const HotelGrid = ({ hotels }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {hotels.map((hotel, index) => (
        <div key={index} className="hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={hotel.name}
            className="rounded-xl w-full h-48 object-cover"
          />
          <div className="my-2 flex flex-col gap-2">
            <h2 className="font-medium ">{hotel.name}</h2>
            <h2 className="text-xs text-gray-500">{hotel.address}</h2>
            <h2 className="text-sm text-green-800">{hotel.price}</h2>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm">{hotel.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelGrid;