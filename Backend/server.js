require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");

// Super Admin Routes
const parkingRoutes = require("./Super-Admin-Panel/routes/parkingRoutes");
const dashboardRoutes = require("./Super-Admin-Panel/routes/dashboardRoutes");
const slotRoutes = require("./Super-Admin-Panel/routes/slotRoutes");
const bookingRoutes = require("./Super-Admin-Panel/routes/bookingRoutes");
const userRoutes = require("./Super-Admin-Panel/routes/userRoutes");
const walletRoutes = require("./Super-Admin-Panel/routes/walletRoutes");
const transactionRoutes = require("./Super-Admin-Panel/routes/transactionRoutes");
const reportRoutes = require("./Super-Admin-Panel/routes/reportRoutes");
const settingsAdminRoutes = require("./Super-Admin-Panel/routes/settingsRoutes");
const auditTrailRoutes = require("./Super-Admin-Panel/routes/auditTrailRoutes");
const adminPaymentRoutes = require("./Super-Admin-Panel/routes/paymentRoutes");
const adminBookingRoutes = require("./Admin-Panel/routes/adminBookingRoutes");

// Authentication
const authRoutes = require("./Authentication/routes/authRoutes");
const createSuperAdmin = require("./utils/createSuperAdmin");

// User Routes
const userParkingRoutes = require("./User-Panel/routes/parkingRoutes");
const profileRoutes = require("./User-Panel/routes/profileRoutes");
const settingsRoutes = require("./User-Panel/routes/settingsRoutes");
const userWalletRoutes = require("./User-Panel/routes/walletRoutes");
const notificationRoutes = require("./User-Panel/routes/notificationRoutes");
const paymentRoutes = require("./User-Panel/routes/paymentRoutes");
const webhookRoutes = require("./User-Panel/routes/webhookRoutes");

// Contact Routes
const contactRoutes = require("./Shared/routes/contactRoutes");
const supportRoutes = require("./Shared/routes/supportRoutes");

const app = express();
app.use(morgan("dev"));

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser clients (Postman, server-to-server) and configured frontends.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

// Connect to Database
connectDB().then(() => {
  createSuperAdmin();
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Webhook routes (must be before auth middleware)
app.use("/api", webhookRoutes);

// Super Admin Routes (existing)
// app.use("/super-admin/dashboard", dashboardRoutes);
// app.use("/api/super-admin/bookings", bookingRoutes);
// app.use("/api/admin/parking", parkingRoutes);
// app.use("/api/admin/slots", slotRoutes);
// app.use("/api/admin/users", userRoutes);

// Super Admin shorthand routes used by frontend
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/super-admin/parking", parkingRoutes);
app.use("/api/super-admin/slots", slotRoutes);
app.use("/api/super-admin/bookings", bookingRoutes);
app.use("/api/super-admin/users", userRoutes);
app.use("/api/super-admin/wallet", walletRoutes);
app.use("/api/super-admin/transactions", transactionRoutes);
app.use("/api/super-admin/reports", reportRoutes);
app.use("/api/super-admin/settings", settingsAdminRoutes);
app.use("/api/super-admin/audit-trail", auditTrailRoutes);
app.use("/api/super-admin/payments", adminPaymentRoutes);

// Staff Admin routes
app.use("/api/admin", adminBookingRoutes);

// Authentication Routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api", userParkingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/wallet", userWalletRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payment", paymentRoutes);

// Contact Routes
app.use("/api/contact", contactRoutes);
app.use("/api/support", supportRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
