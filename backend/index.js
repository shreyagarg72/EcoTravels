import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tripRoutes from './routes/TripRouter.js'

import User from './model/User.js';
import UserRouter from './routes/UserRouter.js';
import RewardsRouter from './routes/RewadsRouter.js';
dotenv.config();
const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",  // Use frontend URL from environment
    credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());
connectDB();
const port = process.env.PORT || 5000;

app.listen(process.env.PORT,()=>{
    console.log("Server started on port 5000")
})

 // Adjust the path as necessary
 app.use("/trips", tripRoutes);
app.use("/api",UserRouter);

app.use("/api",RewardsRouter);