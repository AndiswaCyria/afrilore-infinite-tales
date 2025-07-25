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

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

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
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Helper function for bot replies
function generateBotReplies() {
  return [
    {
      text: "Hi! Thank you for reaching out. How can we help you today?",
      from: "Bot",
      timestamp: new Date()
    },
    {
      text: "Thanks! A support agent will join shortly.",
      from: "Bot",
      timestamp: new Date()
    }
  ];
}

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

      // Generate bot replies
      const botReplies = generateBotReplies();

      for (let reply of botReplies) {
        const botMessage = new ChatMessage({
          text: reply.text,
          from: reply.from,
          socketId: socket.id,
          timestamp: reply.timestamp
        });

        await botMessage.save();

        // Emit bot message back to client
        socket.emit("botMessage", {
          text: botMessage.text,
          timestamp: botMessage.timestamp,
          from: botMessage.from
        });
      }

    } catch (error) {
      console.error("❌ Error handling chat message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// ✅ API Routes
app.use("/api/books", bookRoutes);
app.use("/api/trial", trialRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Afrilore API is running...");
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on http://localhost:${PORT}`);
});

