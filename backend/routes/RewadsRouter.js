import express from 'express';
import User from '../model/User.js';

const router = express.Router();

router.get("/leaderboard/:tier", async (req, res) => {
    const { tier } = req.params;
    
    try {
      // Validate tier parameter
      if (!['Basic', 'Silver', 'Gold'].includes(tier)) {
        return res.status(400).json({ error: "Invalid tier" });
      }
      
      // Find top 3 users in the specified tier
      const topUsers = await User.find({ 'ecoPoints.tier': tier })
        .sort({ 'ecoPoints.total': -1 })
        .limit(3)
        .select('userName ecoPoints')
        .lean();
      
      res.json(topUsers);
    } catch (error) {
      console.error(`Error fetching ${tier} tier leaderboard:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;