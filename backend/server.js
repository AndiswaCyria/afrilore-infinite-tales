import express from "express";
import dotenv from "dotenv";
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

// Middleware
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:8080", "https://afrilore-infinite-tales.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/trial', trialRoutes);
app.use('/api/user', userRoutes); 

// Health check route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
