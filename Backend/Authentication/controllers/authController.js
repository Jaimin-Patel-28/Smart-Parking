const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateOTP = require("../../utils/generateOTP");
const hashOTP = require("../../utils/hashOTP");
const sendOTP = require("../../utils/sendOTP");
const generateTokens = require("../../utils/generateTokens");
const generateUserId = require("../../utils/generateUserId");

// ================= REGISTER (USER ONLY) =================
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, mobile, vehicleNumber, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    user = new User({
      fullName,
      email,
      mobile,
      vehicleNumber,
      password,
      role: "user", // ✅ FIXED
      otpHash,
      otpExpire: Date.now() + 5 * 60 * 1000,
    });

    await user.save();

    try {
      await sendOTP(email, otp, fullName);
    } catch (error) {
      console.log("Email sending failed:", error.message);
    }

    return res.status(200).json({
      message: "OTP sent to email",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= VERIFY OTP =================
exports.verifyOTP = async (req, res) => {
  const { email, otp, purpose = "register" } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const hashedOTP = hashOTP(otp);

  if (user.otpHash !== hashedOTP)
    return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpire < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  if (purpose === "register") {
    user.isVerified = true;
    user.userId = await generateUserId();
  } else if (purpose === "reset") {
    // Permit password reset only for a short window after OTP verification.
    user.passwordResetVerifiedUntil = new Date(Date.now() + 10 * 60 * 1000);
  }

  user.otpHash = null;
  user.otpExpire = null;

  await user.save();

  res.json({
    message: purpose === "register" ? "Registration complete" : "OTP verified",
  });
};

// ================= RESEND OTP =================
exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();

  user.otpHash = hashOTP(otp);
  user.otpExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendOTP(email, otp, user.fullName);

  res.json({ message: "OTP resent" });
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "user" && !user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    const match = await user.matchPassword(password);

    if (!match) {
      // 🔥 try fixing double-hash case
      const singleHash = await bcrypt.hash(password, 10);

      if (await bcrypt.compare(singleHash, user.password)) {
        // fix password
        user.password = password;
        await user.save();
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        vehicleNumber: user.vehicleNumber,
        parking: user.parking, // ✅ IMPORTANT
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= REFRESH TOKEN =================
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.refreshToken || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token is invalid" });
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json(tokens);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    return res.status(500).json({ message: "Failed to refresh token" });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();

  user.otpHash = hashOTP(otp);
  user.otpExpire = Date.now() + 5 * 60 * 1000;
  user.passwordResetVerifiedUntil = null;

  await user.save();

  await sendOTP(email, otp, user.fullName);

  res.json({ message: "Password reset OTP sent" });
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.passwordResetVerifiedUntil) {
    return res.status(403).json({ message: "OTP verification required" });
  }

  if (user.passwordResetVerifiedUntil < new Date()) {
    user.passwordResetVerifiedUntil = null;
    await user.save();
    return res.status(403).json({ message: "OTP verification expired" });
  }

  user.password = password;
  user.passwordResetVerifiedUntil = null;
  await user.save();

  res.json({ message: "Password reset successful" });
};

// ================= CREATE ADMIN (SUPER ADMIN ONLY) =================
exports.createAdmin = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "super-admin") {
      return res.status(403).json({ message: "Super Admin access required" });
    }

    const { fullName, email, password, parking } = req.body;

    const existing = await User.findOne({ email });

    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const admin = await User.create({
      fullName,
      email,
      password: password.trim(),
      role: "admin",
      parking, // ✅ ASSIGN PARKING
      isVerified: true,
      createdBy: req.user.id,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
