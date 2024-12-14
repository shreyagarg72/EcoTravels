import { connect, disconnect } from "mongoose";
import { insertMany } from "../model/Trip";

const tripsData = [
  {
    tripName: "Scenic Delhi Getaway",
    locations: [{ cityName: "Delhi", latitude: 28.6139, longitude: 77.209 }],
    duration: 3,
    description: "Explore the cultural heritage and bustling markets of Delhi.",
  },
  {
    tripName: "Golden Triangle Adventure",
    locations: [
      { cityName: "Delhi", latitude: 28.6139, longitude: 77.209 },
      { cityName: "Agra", latitude: 27.1767, longitude: 78.0081 },
      { cityName: "Jaipur", latitude: 26.9124, longitude: 75.7873 },
    ],
    duration: 7,
    description:
      "A week-long journey covering Delhi, Agra, and Jaipur, showcasing the best of India’s heritage.",
  },
  {
    tripName: "Beachside Bliss in Goa",
    locations: [{ cityName: "Goa", latitude: 15.2993, longitude: 74.124 }],
    duration: 4,
    description: "Relax and unwind with pristine beaches and vibrant nightlife.",
  },
];

const addTripsToDatabase = async () => {
  try {
    await connect("mongodb://localhost:27017/travel", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await insertMany(tripsData);
    console.log("Trips added successfully!");
    disconnect();
  } catch (error) {
    console.error("Error adding trips: ", error);
  }
};

addTripsToDatabase();
