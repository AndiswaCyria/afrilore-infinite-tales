import express from "express";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

router.get("/:socketId", async (req, res) => {
  try {
    const messages = await ChatMessage.find({ socketId: req.params.socketId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
