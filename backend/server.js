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
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if using cookies or auth headers
  })
);


// ✅ Helper function for bot replies
function getGreetingMessage() {
  return {
    text: "Hi! Thank you for reaching out. How can we help you today?",
    from: "Bot",
    timestamp: new Date()
  };
}

function getFollowUpMessage() {
  return {
    text: "Thanks! A support agent will join shortly.",
    from: "Bot",
    timestamp: new Date()
  };
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

      // Check if this is the first user message for this socket
      const previousMessages = await ChatMessage.find({ 
        socketId: socket.id,
        from: "User"
      }).countDocuments();

      let botReply;
      if (previousMessages === 1) {
        // First message - send greeting
        botReply = getGreetingMessage();
      } else {
        // Subsequent messages - send follow-up
        botReply = getFollowUpMessage();
      }

      const botMessage = new ChatMessage({
        text: botReply.text,
        from: botReply.from,
        socketId: socket.id,
        timestamp: botReply.timestamp
      });

      await botMessage.save();

      // Emit bot message back to client
      socket.emit("botMessage", {
        text: botMessage.text,
        timestamp: botMessage.timestamp,
        from: botMessage.from
      });

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

