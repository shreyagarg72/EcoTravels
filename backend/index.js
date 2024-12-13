import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tripRoutes from './routes/TripRouter.js'
dotenv.config();

const app = express();
connectDB();
const port = process.env.PORT || 5000;

app.listen(process.env.PORT,()=>{
    console.log("Server started on port 5000")
})

 // Adjust the path as necessary
app.use('/api', tripRoutes);


