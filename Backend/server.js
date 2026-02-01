import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// 🔐 env load FIRST
dotenv.config();

// 🔗 connect MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// test route (IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("SmartPark Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
