import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import trialRoutes from "./routes/trial.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api/trial", trialRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
