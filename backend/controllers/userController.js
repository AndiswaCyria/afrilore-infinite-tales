import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc Register user
export const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    
    if (!name || !surname || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    const user = await User.create({ name, surname, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// @desc Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }
    
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// @route GET /api/user/me
export const getMe = async (req, res) => {
  res.json(req.user); // user is added by authMiddleware
};

//@route Start trial
export const startTrial = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { isTrial: true }, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "Trial started", user });
};

//@route Subscribe
export const subscribeUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { isSubscribed: true }, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "Subscribed successfully", user });
};