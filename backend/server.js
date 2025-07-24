import express from "express";
import dotenv from "dotenv";
import http from "http"; // ✅ Required for Socket.io
import { Server } from "socket.io"; // ✅ Correct import
import connectDB from "./db.js";
import cors from "cors";
import morgan from "morgan";

import trialRoutes from "./routes/trial.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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
  origin: ["http://localhost:8080", "https://afrilore-infinite-tales.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chatMessage", (message) => {
    console.log("User says:", message);
    socket.emit("botMessage", "Thanks! A support agent will join shortly.");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Routes
app.use("/api/books", bookRoutes);
app.use("/api/trial", trialRoutes);
app.use("/api/user", userRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});
