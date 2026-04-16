const User = require("../../Authentication/models/User");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");
const generateOTP = require("../../utils/generateOTP");
const hashOTP = require("../../utils/hashOTP");
const sendOTP = require("../../utils/sendOTP");
const Booking = require("../../Super-Admin-Panel/models/Booking");
const Wallet = require("../../Super-Admin-Panel/models/Wallet");
const Transaction = require("../../Super-Admin-Panel/models/Transaction");

console.log("[PROFILE] Loading profileController.js");

/*
Get Complete User Profile + Vehicles
*/
exports.getProfile = async (req, res) => {
  console.log(
    `[PROFILE] GET /profile called. User ID: ${req.user?.id}, Role: ${req.user?.role}`,
  );
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "-password -otpHash -otpExpire -refreshToken -refreshToken",
    );

    if (!user) {
      console.log("[PROFILE] User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's vehicles
    const vehicles = await Vehicle.find({ user: userId }).sort({
      isPrimary: -1,
      createdAt: -1,
    });

    console.log(
      `[PROFILE] Profile sent for user ${userId}. Vehicles count: ${vehicles.length}`,
    );

    res.json({
      profile: user,
      vehicles,
    });
  } catch (error) {
    console.error("[PROFILE] Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
Update User Profile (name, mobile, add address)
*/
exports.updateProfile = async (req, res) => {
  console.log("[PROFILE] PATCH /profile called");
  try {
    const userId = req.user.id;
    const { fullName, mobile, address, photoUrl } = req.body;

    const updateData = {};
    if (fullName) updateData.fullName = fullName.trim();
    if (mobile) updateData.mobile = mobile;
    if (address) updateData.address = address;
    if (photoUrl) updateData.photoUrl = photoUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
Add New Vehicle
*/
exports.addVehicle = async (req, res) => {
  console.log("[PROFILE] POST /vehicles called");
  try {
    const userId = req.user.id;
    const { vehicleType, vehicleNumber, color, model } = req.body;

    if (!vehicleType || !vehicleNumber) {
      return res
        .status(400)
        .json({ message: "vehicleType and vehicleNumber required" });
    }

    if (!["2wheel", "4wheel"].includes(vehicleType)) {
      return res
        .status(400)
        .json({ message: "vehicleType must be '2wheel' or '4wheel'" });
    }

    // Check if vehicleNumber already exists for user
    const existing = await Vehicle.findOne({
      user: userId,
      vehicleNumber: vehicleNumber.toUpperCase(),
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Vehicle number already registered" });
    }

    const vehicle = await Vehicle.create({
      user: userId,
      vehicleType,
      vehicleNumber: vehicleNumber.toUpperCase(),
      color: color || "",
      model: model || "",
    });

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Add vehicle error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
Update Vehicle
*/
exports.updateVehicle = async (req, res) => {
  console.log("[PROFILE] PATCH /vehicles/:id called");
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { vehicleType, vehicleNumber, isPrimary, isActive, color, model } =
      req.body;

    // Verify ownership
    const vehicle = await Vehicle.findOne({ _id: id, user: userId });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const updateData = {};
    if (vehicleType !== undefined) updateData.vehicleType = vehicleType;
    if (vehicleNumber !== undefined)
      updateData.vehicleNumber = vehicleNumber.toUpperCase();
    if (isPrimary !== undefined) updateData.isPrimary = isPrimary;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (color !== undefined) updateData.color = color;
    if (model !== undefined) updateData.model = model;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("Update vehicle error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
Delete Vehicle (soft delete via isActive=false)
*/
exports.deleteVehicle = async (req, res) => {
  console.log("[PROFILE] DELETE /vehicles/:id called");
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const vehicle = await Vehicle.findOne({ _id: id, user: userId });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (!vehicle.isActive) {
      return res.status(400).json({ message: "Vehicle already deleted" });
    }

    await Vehicle.findByIdAndUpdate(id, { isActive: false });

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
Send Delete Account OTP
*/
exports.sendDeleteOTP = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();

    user.otpHash = hashOTP(otp);
    user.otpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendOTP(user.email, otp, user.fullName);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Send delete OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyDeleteOTP = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otp } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedOTP = hashOTP(otp);

    if (user.otpHash !== hashedOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Clear OTP after verification
    user.otpHash = null;
    user.otpExpire = null;
    user.isDeleteVerified = true;

    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify delete OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
Delete Account
*/
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // ❗ Check active bookings
    const activeBooking = await Booking.findOne({
      user: userId,
      status: { $in: ["pending", "confirmed", "active"] },
    });

    const user = await User.findById(userId);

    if (!user.isDeleteVerified) {
      return res.status(403).json({
        message: "OTP verification required before deleting account",
      });
    }

    if (activeBooking) {
      return res.status(400).json({
        message: "Cannot delete account while parking is active",
      });
    }

    // 🧹 Delete transactions
    await Transaction.deleteMany({ user: userId });

    // 🧹 Delete wallet
    await Wallet.findOneAndDelete({ user: userId });

    // 🧹 Delete bookings
    await Booking.deleteMany({ user: userId });

    // 🧹 Delete vehicles
    await Vehicle.deleteMany({ user: userId });

    // ❌ Delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
