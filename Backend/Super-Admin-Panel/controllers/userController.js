const User = require("../../Authentication/models/User");
const bcrypt = require("bcryptjs");
const { logAuditTrail } = require("../utils/auditLogger");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^\+?[0-9]{10,15}$/;
const VEHICLE_REGEX = /^[A-Z0-9-]{4,15}$/;

const validatePasswordStrength = (password = "") => {
  if (typeof password !== "string" || password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) return "Password must contain one uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain one lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain one digit";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain one special character";
  return null;
};

const validateEmail = (email = "") => EMAIL_REGEX.test(String(email).trim().toLowerCase());

// Get current authenticated profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otpHash -refreshToken");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update current authenticated profile
exports.updateMyProfile = async (req, res) => {
  try {
    const allowedFields = ["fullName", "mobile", "address", "vehicleNumber"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Object.prototype.hasOwnProperty.call(updates, "fullName")) {
      updates.fullName = String(updates.fullName || "").trim();
      if (updates.fullName.length < 3 || updates.fullName.length > 80) {
        return res.status(400).json({ message: "Full name must be between 3 and 80 characters" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "mobile")) {
      updates.mobile = String(updates.mobile || "").trim();
      if (updates.mobile && !MOBILE_REGEX.test(updates.mobile)) {
        return res.status(400).json({ message: "Invalid mobile number format" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "address")) {
      updates.address = String(updates.address || "").trim();
      if (updates.address.length > 250) {
        return res.status(400).json({ message: "Address must be 250 characters or less" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "vehicleNumber")) {
      updates.vehicleNumber = String(updates.vehicleNumber || "")
        .trim()
        .toUpperCase();
      if (!VEHICLE_REGEX.test(updates.vehicleNumber)) {
        return res.status(400).json({ message: "Invalid vehicle number format" });
      }
    }

    Object.assign(user, updates);
    await user.save();

    void logAuditTrail({
      actor: req.user.id,
      action: "profile_update",
      module: "user-management",
      targetType: "user",
      targetId: user._id,
      metadata: { updatedFields: Object.keys(updates) },
      req,
    });

    const safeUser = await User.findById(user._id).select("-password -otpHash -refreshToken");
    return res.json(safeUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all users + search
exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        fullName: { $regex: search, $options: "i" },
      };
    }

    const users = await User.find(query)
      .select("-password -otpHash -refreshToken")
      .sort({ createdAt: -1 });

    console.log("USERS FROM DB:", users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { fullName, name, email, mobile, phone, role, password, vehicleNumber } = req.body;

    const finalName = String(fullName || name || "").trim();
    const finalEmail = String(email || "").trim().toLowerCase();
    const finalMobile = String(mobile || phone || "").trim();
    const finalVehicle = String(vehicleNumber || "").trim().toUpperCase();

    if (finalName.length < 3 || finalName.length > 80) {
      return res.status(400).json({ message: "Full name must be between 3 and 80 characters" });
    }
    if (!validateEmail(finalEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (finalMobile && !MOBILE_REGEX.test(finalMobile)) {
      return res.status(400).json({ message: "Invalid mobile number format" });
    }
    if (!VEHICLE_REGEX.test(finalVehicle)) {
      return res.status(400).json({ message: "Invalid vehicle number format" });
    }

    const passwordValidationError = validatePasswordStrength(password);
    if (passwordValidationError) {
      return res.status(400).json({ message: passwordValidationError });
    }

    const user = new User({
      fullName: finalName,
      email: finalEmail,
      mobile: finalMobile,
      role,
      password,
      vehicleNumber: finalVehicle,
      isVerified: true,
    });

    const savedUser = await user.save();

    void logAuditTrail({
      actor: req.user.id,
      action: "user_create",
      module: "user-management",
      targetType: "user",
      targetId: savedUser._id,
      metadata: { role: savedUser.role },
      req,
    });

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const allowedFields = [
      "fullName",
      "email",
      "mobile",
      "address",
      "role",
      "status",
      "parking",
      "vehicleNumber",
    ];
    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    });

    if (Object.prototype.hasOwnProperty.call(updates, "email")) {
      updates.email = String(updates.email || "").trim().toLowerCase();
      if (!validateEmail(updates.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "mobile")) {
      updates.mobile = String(updates.mobile || "").trim();
      if (updates.mobile && !MOBILE_REGEX.test(updates.mobile)) {
        return res.status(400).json({ message: "Invalid mobile number format" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "fullName")) {
      updates.fullName = String(updates.fullName || "").trim();
      if (updates.fullName.length < 3 || updates.fullName.length > 80) {
        return res.status(400).json({ message: "Full name must be between 3 and 80 characters" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "role")) {
      if (!["user", "admin", "super-admin"].includes(updates.role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "status")) {
      if (!["active", "inactive"].includes(updates.status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "vehicleNumber")) {
      updates.vehicleNumber = String(updates.vehicleNumber || "")
        .trim()
        .toUpperCase();
      if (!VEHICLE_REGEX.test(updates.vehicleNumber)) {
        return res.status(400).json({ message: "Invalid vehicle number format" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    void logAuditTrail({
      actor: req.user.id,
      action: "user_update",
      module: "user-management",
      targetType: "user",
      targetId: updatedUser._id,
      metadata: { updatedFields: Object.keys(updates) },
      req,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle user status
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = user.status === "active" ? "inactive" : "active";

    await user.save();

    void logAuditTrail({
      actor: req.user.id,
      action: "user_toggle_status",
      module: "user-management",
      targetType: "user",
      targetId: user._id,
      metadata: { status: user.status },
      req,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    void logAuditTrail({
      actor: req.user.id,
      action: "user_delete",
      module: "user-management",
      targetType: "user",
      targetId: deletedUser._id,
      metadata: { email: deletedUser.email, role: deletedUser.role },
      req,
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { fullName, email, password, parking, vehicleNumber } = req.body;

    const safeName = String(fullName || "").trim();
    const safeEmail = String(email || "").trim().toLowerCase();
    const safeVehicle = String(vehicleNumber || "").trim().toUpperCase();

    if (safeName.length < 3 || safeName.length > 80) {
      return res.status(400).json({ message: "Full name must be between 3 and 80 characters" });
    }
    if (!validateEmail(safeEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!parking) {
      return res.status(400).json({ message: "Parking assignment is required" });
    }
    if (!VEHICLE_REGEX.test(safeVehicle)) {
      return res.status(400).json({ message: "Invalid vehicle number format" });
    }

    const passwordValidationError = validatePasswordStrength(password);
    if (passwordValidationError) {
      return res.status(400).json({ message: passwordValidationError });
    }

    // check existing
    const existing = await User.findOne({ email: safeEmail });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      fullName: safeName,
      email: safeEmail,
      password, // plain text, will be hashed by pre-save hook
      role: "admin",
      parking, // assign parking
      vehicleNumber: safeVehicle,
      isVerified: true,
    });

    void logAuditTrail({
      actor: req.user.id,
      action: "admin_create",
      module: "user-management",
      targetType: "user",
      targetId: admin._id,
      metadata: { email: admin.email, parking: admin.parking },
      req,
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
