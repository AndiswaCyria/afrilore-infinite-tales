import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import cors from "cors";
import morgan from "morgan";

// Routes & Models
import trialRoutes from "./routes/trial.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ChatMessage from "./models/ChatMessage.js";
import chatRoutes from "./routes/chatRoutes.js";
import chatBotService from "./services/chatBotService.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["https://afrilore-infinite-tales.vercel.app"];

// ✅ Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "https://afrilore-infinite-tales.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Middleware
app.use(morgan("dev"));
app.use(cors({
  origin: ["http://localhost:8080", "http://localhost:5173", "https://afrilore-infinite-tales.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Socket.io logic
io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on("chatMessage", async (messageText) => {
    try {
      // Save user message
      const userMessage = new ChatMessage({
        text: messageText,
        from: "User",
        socketId: socket.id
      });
      await userMessage.save();

      // Emit back to sender
      socket.emit("userMessage", {
        text: userMessage.text,
        timestamp: userMessage.timestamp,
        from: userMessage.from
      });

      // Process message through intelligent bot
      const botResponse = await chatBotService.processMessage(socket.id, messageText);

      const botMessage = new ChatMessage({
        text: botResponse.text,
        from: "Bot",
        socketId: socket.id,
        timestamp: new Date()
      });

      await botMessage.save();

      // Emit bot message back to client
      socket.emit("botMessage", {
        text: botMessage.text,
        timestamp: botMessage.timestamp,
        from: botMessage.from
      });

      // If escalated, send escalation notification
      if (botResponse.shouldEscalate) {
        setTimeout(() => {
          socket.emit("escalationNotification", {
            text: "✅ Your query has been escalated to our support team. They will contact you shortly.",
            timestamp: new Date()
          });
        }, 1000);
      }

    } catch (error) {
      console.error("❌ Error handling chat message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    chatBotService.clearConversation(socket.id);
  });
});

// ✅ API Routes
app.use("/api/books", bookRoutes);
app.use("/api/trial", trialRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Afrilore API is running...");
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on http://localhost:${PORT}`);
});

