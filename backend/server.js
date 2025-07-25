import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import cors from "cors";
import morgan from "morgan";

import trialRoutes from "./routes/trial.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ChatMessage from "./models/ChatMessage.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "https://afrilore-infinite-tales.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Middleware
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Helper function for bot replies
function generateBotReply(message) {
  return {
    text: message,
    timestamp: new Date(),
    from: "Bot"
  };
}

// ✅ Socket.io logic
socket.on("chatMessage", async (messageText) => {
  const userMessage = new ChatMessage({
    text: messageText,
    from: "User",
    socketId: socket.id
  });

  await userMessage.save();
  console.log("Saved user message:", messageText);

  const botReplies = [
    "Hi! Thank you for reaching out. How can we help you today?",
    "Thanks! A support agent will join shortly."
  ];

  for (let replyText of botReplies) {
    const botReply = new ChatMessage({
      text: replyText,
      from: "Bot",
      socketId: socket.id
    });

    await botReply.save();
    socket.emit("botMessage", {
      text: botReply.text,
      timestamp: botReply.timestamp,
      from: botReply.from
    });
  }
});


// ✅ Routes
app.use("/api/books", bookRoutes);
app.use("/api/trial", trialRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});
