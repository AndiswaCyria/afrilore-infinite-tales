import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/trial
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Trial started successfully" });
  } catch (error) {
    console.error("Error in /api/trial:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


