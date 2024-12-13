import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  description:{ type: String, required: true },
  latitude: { type: Number, required: true },
  longitude:  { type: Number, required: true },
  image:  { type: String, required: true },
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
