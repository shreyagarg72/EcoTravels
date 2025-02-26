import express from 'express';
import User from '../model/User.js';

const router = express.Router();

router.get("/leaderboard/:tier", async (req, res) => {
    const { tier } = req.params;
    
    try {
      // Validate tier parameter
      if (!['Free', 'Standard', 'Premium'].includes(tier)) {
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
// Add this to your existing router file
router.get("/leaderboard", async (req, res) => {
  try {
    // Get top 3 users from Free tier
    const topFreeTier = await User.find({ 'ecoPoints.tier': 'Free' })
      .sort({ 'ecoPoints.total': -1 })
      .limit(3)
      .select('userName ecoPoints.total');

    // Get top 3 users from Standard tier
    const topStandardTier = await User.find({ 'ecoPoints.tier': 'Standard' })
      .sort({ 'ecoPoints.total': -1 })
      .limit(3)
      .select('userName ecoPoints.total');

    // Get top 3 users from Premium tier
    const topPremiumTier = await User.find({ 'ecoPoints.tier': 'Premium' })
      .sort({ 'ecoPoints.total': -1 })
      .limit(3)
      .select('userName ecoPoints.total');

    res.status(200).json({
      leaderboard: {
        free: topFreeTier,
        standard: topStandardTier,
        premium: topPremiumTier
      }
    });
  } catch (error) {
    console.error("Error retrieving leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;