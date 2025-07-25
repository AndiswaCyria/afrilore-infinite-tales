import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: String, enum: ["User", "Bot"], required: true },
  timestamp: { type: Date, default: Date.now },
  socketId: { type: String } // To track conversations per user
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
export default ChatMessage;
