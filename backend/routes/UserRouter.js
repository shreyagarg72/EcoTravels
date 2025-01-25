// // UserRouter.js
// import express from 'express';
// import User from '../model/User.js';
// const router = express.Router();

// router.post("/users", async (req, res) => {
//   const { email, firebaseUid, createdAt } = req.body;

//   if (!email || !firebaseUid) {
//     return res.status(400).json({ error: "Email and Firebase UID are required" });
//   }

//   try {
//     const user = new User({ email, firebaseUid, createdAt });
//     const savedUser = await user.save();
//     console.log("User saved:", savedUser);
//     res.status(201).json({ message: "User created successfully", user: savedUser });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;
import express from 'express';
import User from '../model/User.js';

const router = express.Router();

router.post("/users", async (req, res) => {
  const { email, firebaseUid, createdAt } = req.body;

  if (!email || !firebaseUid) {
    return res.status(400).json({ error: "Email and Firebase UID are required" });
  }

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ 
      $or: [{ email }, { firebaseUid }] 
    });

    if (existingUser) {
      // Update existing user if needed
      if (existingUser.email !== email || existingUser.firebaseUid !== firebaseUid) {
        existingUser.email = email;
        existingUser.firebaseUid = firebaseUid;
        await existingUser.save();
        return res.status(200).json({ message: "User updated", user: existingUser });
      }
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    // Create new user if not exists
    const user = new User({ email, firebaseUid, createdAt });
    const savedUser = await user.save();
    
    console.log("User saved:", savedUser);
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error saving user:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(409).json({ error: "User with this email or UID already exists" });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;