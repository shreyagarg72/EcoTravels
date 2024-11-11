import React from 'react';
import Card from './Card'; // Assuming Card is in the same folder

const trips = [
  {
    title: 'Goa',
    description: 'A tropical paradise known for its sandy beaches, lively parties, and Portuguese-influenced architecture.',
    image: '/goa_trip.jpg'
  },
  {
    title: 'Jaipur',
    description: 'The "Pink City" is a gateway to India’s royal history, featuring opulent palaces and majestic forts.',
    image: '/jaipur_trip.jpg'
  },
  {
    title: 'Kerala',
    description: 'A lush haven with tranquil backwaters, serene hill stations, and tea-covered mountains.',
    image: '/kerala_image.jpg'
  },
  {
    title: 'Agra',
    description: 'Home to the world-famous Taj Mahal, a symbol of love and architectural grandeur.',
    image: '/agra_trip.jpg'
  },
  {
    title: 'Ladakh',
    description: 'A high-altitude desert offering breathtaking landscapes, monasteries, and thrilling adventures.',
    image: '/ladhakh_trip.jpeg'
  },
  {
    title: 'Varanasi',
    description: 'The spiritual heart of India, known for its sacred ghats and deep cultural and religious significance.',
    image: '/varanasi_trip.jpg'
  }
];

const PopularTrips = ({ showLoginModal }) => {
  return (
    <div className={`container mx-auto ${showLoginModal ? 'blur-sm' : ''}`}>
      <h2 className="text-3xl font-bold mb-6">Popular Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip, index) => (
          <Card
            key={index}
            title={trip.title}
            description={trip.description}
            image={trip.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularTrips;
