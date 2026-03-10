const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminRoutes = require('./routes/adminRoutes');

// 🔐 env load FIRST
dotenv.config();

// 🔗 connect MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use('/api/admin', adminRoutes);

// test route (IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("SmartPark Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});