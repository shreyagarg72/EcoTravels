import { Router } from 'express';
const router = Router();
import Trip from '../model/Trip.js'; // Ensure this path is correct

// Endpoint to fetch trips
router.get('/trips', async (req, res) => {
  try {
    // Use Trip model to fetch all trips
    const trips = await Trip.find(); // Ensure Trip is a Mongoose model
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).send({ message: 'Error fetching trips', error: error.message });
  }
});

export default router;
