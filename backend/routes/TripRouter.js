import express from "express";
import Trip from "../model/Trip.js";

const router = express.Router();

// Get all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trips", error: err });
  }
});

export default router;
