import React from 'react';

const Card = ({ image, title, description }) => {
  return (
    <div className="flex bg-green-100 shadow-lg rounded-lg overflow-hidden max-w-md">
      {/* Image on the left */}
      <img src={image} alt={title} className="w-1/3 object-cover" />

      {/* Content on the right */}
      <div className="w-2/3 p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
