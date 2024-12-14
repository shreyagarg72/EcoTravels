import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tripRoutes from './routes/TripRouter.js'
import Trip from './model/Trip.js';
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
connectDB();
const port = process.env.PORT || 5000;

app.listen(process.env.PORT,()=>{
    console.log("Server started on port 5000")
})

 // Adjust the path as necessary
 app.use("/trips", tripRoutes);

// Backend route example (Node.js/Express)
// app.get('/trip-images/:id', async (req, res) => {
//     try {
//       const trip = await Trip.findById(req.params.id); // Assuming Trip is your model
//       res.json({ image: trip.image }); // Send the image URL
//     } catch (error) {
//       res.status(500).send('Error fetching trip image');
//     }
//   });
  
