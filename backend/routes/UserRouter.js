

// import express from 'express';
// import User from '../model/User.js';

// const router = express.Router();

// router.post("/users", async (req, res) => {
//   const { email, firebaseUid, userName, createdAt } = req.body;

//   if (!email || !firebaseUid || !userName) {
//     return res.status(400).json({ 
//       error: "Email, Firebase UID, and username are required" 
//     });
//   }

//   try {
//     // Check if user already exists
//     let existingUser = await User.findOne({
//       $or: [{ email }, { firebaseUid }]
//     });

//     if (existingUser) {
//       // Update existing user if needed
//       if (
//         existingUser.email !== email || 
//         existingUser.firebaseUid !== firebaseUid ||
//         existingUser.userName !== userName
//       ) {
//         existingUser.email = email;
//         existingUser.firebaseUid = firebaseUid;
//         existingUser.userName = userName;
//         await existingUser.save();
//         return res.status(200).json({ 
//           message: "User updated", 
//           user: existingUser 
//         });
//       }
//       return res.status(200).json({ 
//         message: "User already exists", 
//         user: existingUser 
//       });
//     }

//     // Create new user if not exists
//     const user = new User({ 
//       email, 
//       firebaseUid, 
//       userName, 
//       createdAt: createdAt || new Date()
//     });
//     const savedUser = await user.save();

//     console.log("User saved:", savedUser);
//     res.status(201).json({ 
//       message: "User created successfully", 
//       user: savedUser 
//     });
//   } catch (error) {
//     console.error("Error saving user:", error);

//     // Handle duplicate key error specifically
//     if (error.code === 11000) {
//       return res.status(409).json({ 
//         error: "User with this email, username, or UID already exists" 
//       });
//     }

//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

import express from 'express';
import User from '../model/User.js';

const router = express.Router();

// Add the new check endpoint
router.get("/users/check/:firebaseUid", async (req, res) => {
  const { firebaseUid } = req.params;
  
  try {
    const user = await User.findOne({ firebaseUid });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get('/users/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    
    if (!uid) {
      return res.status(400).json({ error: 'Firebase UID is required' });
    }
    
    const user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return user data with specifically formatted fields to match frontend expectations
    return res.status(200).json({
      id: user._id,
      email: user.email,
      displayName: user.userName, // Map userName from MongoDB to displayName for frontend
      firebaseUid: user.firebaseUid,
      ecoPoints: user.ecoPoints,
      paymentMethods: user.paymentMethods,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});


router.post("/users", async (req, res) => {
  const { email, firebaseUid, userName, createdAt, ecoPoints } = req.body;
  
  if (!email || !firebaseUid || !userName) {
    return res.status(400).json({
      error: "Email, Firebase UID, and username are required"
    });
  }
  
  try {
    // Check if user already exists
    let existingUser = await User.findOne({
      $or: [{ email }, { firebaseUid }]
    });
    
    if (existingUser) {
      // Update existing user if needed
      if (
        existingUser.email !== email || 
        existingUser.firebaseUid !== firebaseUid ||
        existingUser.userName !== userName
      ) {
        existingUser.email = email;
        existingUser.firebaseUid = firebaseUid;
        existingUser.userName = userName;
        await existingUser.save();
        return res.status(200).json({
          message: "User updated",
          user: existingUser
        });
      }
      return res.status(200).json({
        message: "User already exists",
        user: existingUser
      });
    }
    
    // Create new user if not exists
    const user = new User({
      email,
      firebaseUid,
      userName,
      createdAt: createdAt || new Date(),
      ecoPoints: ecoPoints || {
        total: 0,
        tier: 'Free',
        history: []
      }
    });
    const savedUser = await user.save();
    
    console.log("User saved:", savedUser);
    res.status(201).json({
      message: "User created successfully",
      user: savedUser
    });
  } catch (error) {
    console.error("Error saving user:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(409).json({
        error: "User with this email, username, or UID already exists"
      });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
});

// New endpoint to add EcoPoints to user account
router.post("/users/:firebaseUid/addpoints", async (req, res) => {
  const { firebaseUid } = req.params;
  const { points, activityType, description } = req.body;
  
  if (!points || !activityType) {
    return res.status(400).json({
      error: "Points and activity type are required"
    });
  }
  
  try {
    // Find the user by Firebase UID
    const user = await User.findOne({ firebaseUid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Initialize ecoPoints if it doesn't exist
    if (!user.ecoPoints) {
      user.ecoPoints = {
        total: 0,
        tier: 'Free',
        history: []
      };
    }
    
    // Add points to user's total
    user.ecoPoints.total += Number(points);
    
    // Add to history
    user.ecoPoints.history.push({
      points: Number(points),
      activityType,
      description: description || `${points} points for ${activityType}`,
      timestamp: new Date()
    });
    
    // Update user tier based on total points
    if (user.ecoPoints.total >= 5000) {
      user.ecoPoints.tier = 'Premium';
    } else if (user.ecoPoints.total >= 1000) {
      user.ecoPoints.tier = 'Standard';
    } else {
      user.ecoPoints.tier = 'Free';
    }
    
    // Save the updated user
    const updatedUser = await user.save();
    
    res.status(200).json({
      message: `${points} EcoPoints added successfully`,
      currentPoints: updatedUser.ecoPoints.total,
      tier: updatedUser.ecoPoints.tier
    });
  } catch (error) {
    console.error("Error adding EcoPoints:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// New endpoint to get user's EcoPoints
router.get("/users/:firebaseUid/points", async (req, res) => {
  const { firebaseUid } = req.params;
  
  try {
    const user = await User.findOne({ firebaseUid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (!user.ecoPoints) {
      user.ecoPoints = {
        total: 0,
        tier: 'Free',
        history: []
      };
      await user.save();
    }
    
    res.status(200).json({
      ecoPoints: user.ecoPoints
    });
  } catch (error) {
    console.error("Error retrieving EcoPoints:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add this route to your Express router file

router.get("/users/:firebaseUid/tier", async (req, res) => {
  const { firebaseUid } = req.params;
  
  try {
    const user = await User.findOne({ firebaseUid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // If user exists but doesn't have ecoPoints field initialized yet
    if (!user.ecoPoints) {
      user.ecoPoints = {
        total: 0,
        tier: 'Free',
        history: []
      };
      await user.save();
    }
    
    // Return just the tier information
    res.status(200).json({
      tier: user.ecoPoints.tier
    });
  } catch (error) {
    console.error("Error retrieving user tier:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Add this route to your Express router file

router.post("/users/:firebaseUid/updateTier", async (req, res) => {
  const { firebaseUid } = req.params;
  const { tier, description } = req.body;
  
  // Validate tier input
  if (!tier || !['Free', 'Standard', 'Premium'].includes(tier)) {
    return res.status(400).json({ error: "Invalid tier. Must be 'Free', 'Standard', or 'Premium'" });
  }
  
  try {
    const user = await User.findOne({ firebaseUid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Initialize ecoPoints if it doesn't exist
    if (!user.ecoPoints) {
      user.ecoPoints = {
        total: 0,
        tier: 'Free',
        history: []
      };
    }
    
    // Get the previous tier before updating
    const previousTier = user.ecoPoints.tier;
    
    // Update the user's tier
    user.ecoPoints.tier = tier;
    
    // Add entry to history for tier change
    user.ecoPoints.history.push({
      points: 0, // No points for tier change, it's a subscription
      activityType: "payments",
      description: description || `Subscription changed from ${previousTier} to ${tier}`,
      timestamp: new Date()
    });
    
    await user.save();
    
    res.status(200).json({
      success: true,
      tier: user.ecoPoints.tier,
      message: `Subscription updated to ${tier} plan`
    });
  } catch (error) {
    console.error("Error updating user tier:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;