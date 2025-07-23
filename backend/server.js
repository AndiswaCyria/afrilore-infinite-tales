import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import trialRoutes from "./routes/trial.js";
import cors from "cors";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));


app.use(cors({
    origin: ["http://localhost:8080", "https://afrilore-infinite-tales.vercel.app"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRoutes);
connectDB();
// Routes
app.post("/api/users", (req, res) => {
    const { name, email, password } = req.body;
    // Handle user creation logic here
    res.json({ message: `User ${name} created successfully`, user: { name, email } });
});
app.use("/api/trial", trialRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
