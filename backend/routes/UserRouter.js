// UserRouter.js
import express from 'express';
import User from '../model/User.js';
const router = express.Router();

router.post("/users", async (req, res) => {
  const { email, firebaseUid, createdAt } = req.body;

  if (!email || !firebaseUid) {
    return res.status(400).json({ error: "Email and Firebase UID are required" });
  }

  try {
    const user = new User({ email, firebaseUid, createdAt });
    const savedUser = await user.save();
    console.log("User saved:", savedUser);
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;