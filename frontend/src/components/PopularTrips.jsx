
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Card from './Card';

// const trips = [
//   {
//     cityName: "Goa",
//     description: "A tropical paradise known for its sandy beaches, lively parties, and Portuguese-influenced architecture.",
//     latitude: 15.60444125,
//     longitude: 74.00172406307475,
//     image: "/goa_trip.jpg",
//   },
//   {
//     cityName: "Jaipur",
//     description: 'The "Pink City" is a gateway to India\'s royal history, featuring opulent palaces and majestic forts.',
//     latitude: 26.9154576,
//     longitude: 75.8189817,
//     image: "/jaipur_trip.jpg",
//   },
//   {
//     cityName: "Udaipur",
//     description: "A lush haven with tranquil backwaters, serene hill stations, and tea-covered mountains.",
//     latitude: 24.578721,
//     longitude: 73.6862571,
//     image: "/kerala_image.jpg",
//   },
//   {
//     cityName: "Agra",
//     description: "Home to the world-famous Taj Mahal, a symbol of love and architectural grandeur.",
//     latitude: 27.1752554,
//     longitude: 78.0098161,
//     image: "/agra_trip.jpg",
//   },
//   {
//     cityName: "Ladakh",
//     description: "A high-altitude desert offering breathtaking landscapes, monasteries, and thrilling adventures.",
//     latitude: 33.9456407,
//     longitude: 77.6568576,
//     image: "/ladhakh_trip.jpeg",
//   },
//   {
//     cityName: "Varanasi",
//     description: "The spiritual heart of India, known for its sacred ghats and deep cultural and religious significance.",
//     latitude: 25.3356491,
//     longitude: 83.0076292,
//     image: "/varanasi_trip.jpg",
//   },
// ];

// const PopularTrips = ({ showLoginModal }) => {
//   const navigate = useNavigate();

//   const handleCardClick = (trip) => {
//     // Clear previous selections completely
//     localStorage.removeItem('selectedCities');
//     localStorage.removeItem('selectedLocation');

//     // Create a new selected city object
//     const newSelectedCity = {
//       cityName: trip.cityName,
//       latitude: trip.latitude,
//       longitude: trip.longitude,
//       duration: 0
//     };

//     // Save to local storage with new, clean data
//     localStorage.setItem('selectedCities', JSON.stringify([newSelectedCity]));

//     // Navigate to duration selection page
//     navigate('/duration');
//   };

//   return (
//     <div>
//       <h2>Popular Trips</h2>
//       <div className="flex flex-wrap gap-4">
//         {trips.map((trip, index) => (
//           <div 
//             key={index} 
//             onClick={() => handleCardClick(trip)}
//             className="cursor-pointer"
//           >
//             <Card 
//               image={trip.image}
//               title={trip.cityName}
//               description={trip.description}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularTrips;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const trips = [
  {
    cityName: "Goa",
    description: "A tropical paradise known for its sandy beaches, lively parties, and Portuguese-influenced architecture.",
    latitude: 15.60444125,
    longitude: 74.00172406307475,
    image: "https://media.assettype.com/outlooktraveller%2F2023-12%2Fbf0c153f-ad5b-4dd1-a907-746955df6754%2Fshutterstock_5396278.jpeg?w=1024&auto=format%2Ccompress&fit=max.jpg",
  },
  {
    cityName: "Jaipur",
    description: 'The "Pink City" is a gateway to India\'s royal history, featuring opulent palaces and majestic forts.',
    latitude: 26.9154576,
    longitude: 75.8189817,
    image: "https://static.wanderon.in/wp-content/uploads/2024/01/4b93633f-cc7c-42de-94b2-5ce9ac735fce.jpg",
  },
  {
    cityName: "Udaipur",
    description: "A lush haven with tranquil backwaters, serene hill stations, and tea-covered mountains.",
    latitude: 24.578721,
    longitude: 73.6862571,
    image: "https://cdn.sanity.io/images/ocl5w36p/prod2/3d010a1e5876782d43c0a1f4c79df391e977a0ee-3840x1860.jpg",
  },
  {
    cityName: "Agra",
    description: "Home to the world-famous Taj Mahal, a symbol of love and architectural grandeur.",
    latitude: 27.1752554,
    longitude: 78.0098161,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Taj_Mahal%2C_Agra%2C_India.jpg",
  },
  {
    cityName: "Ladakh",
    description: "A high-altitude desert offering breathtaking landscapes, monasteries, and thrilling adventures.",
    latitude: 33.9456407,
    longitude: 77.6568576,
    image: "https://media.istockphoto.com/id/1046313926/photo/indian-bikers-travel-on-national-highway-with-scenic-landscape-at-ladakh-india.jpg?s=612x612&w=0&k=20&c=WjPBCZMD93SFckiZq7b3QdVhgpTkp19QLiuWANT4NuI=",
  },
  {
    cityName: "Varanasi",
    description: "The spiritual heart of India, known for its sacred ghats and deep cultural and religious significance.",
    latitude: 25.3356491,
    longitude: 83.0076292,
    image: "https://media.istockphoto.com/id/537988165/photo/varanasi.jpg?s=612x612&w=0&k=20&c=fFpEL17MiQJx5NkkNIVrTsesd2E8b04SCgzjfhUmQ7g=",
  },
];

const PopularTrips = ({ showLoginModal }) => {
  const navigate = useNavigate();

  const handleCardClick = (trip) => {
    // Clear previous selections completely
    localStorage.removeItem('selectedCities');
    localStorage.removeItem('selectedLocation');

    // Create a new selected city object
    const newSelectedCity = {
      cityName: trip.cityName,
      latitude: trip.latitude,
      longitude: trip.longitude,
      duration: 0
    };

    // Save to local storage with new, clean data
    localStorage.setItem('selectedCities', JSON.stringify([newSelectedCity]));

    // Navigate to duration selection page
    navigate('/travel-options');
  };

  return (
    <div className={`container mx-auto ${showLoginModal ? "blur-sm" : ""}`}>
       <h2 className="text-3xl font-bold mb-6">Popular Trips</h2>
      <div className="flex flex-wrap gap-4">
        {trips.map((trip, index) => (
          <div 
            key={index} 
            onClick={() => handleCardClick(trip)}
            className="cursor-pointer"
          >
            <Card 
              image={trip.image}
              title={trip.cityName}
              description={trip.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTrips;