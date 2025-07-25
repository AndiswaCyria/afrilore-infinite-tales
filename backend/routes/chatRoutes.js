import express from "express";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

// Fetch all chat messages (or limit to last N)
router.get("/", async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 }).limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Fetch messages by socketId
router.get("/:socketId", async (req, res) => {
  try {
    const messages = await ChatMessage.find({ socketId: req.params.socketId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
