import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  tripName: { type: String, required: true },
  locations: [
    {
      cityName: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
  duration: { type: Number, required: true },
  description: { type: String, required: true },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
