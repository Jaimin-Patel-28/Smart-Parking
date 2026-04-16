const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserStatus,
  deleteUser,
} = require("../controllers/userController");

const { createAdmin } = require("../controllers/userController");
const auth = require("../../middleware/authMiddleware");
const { isSuperAdmin } = require("../../middleware/roleMiddleware");

// Profile routes for logged-in super admin
router.get("/me", auth, isSuperAdmin, getMyProfile);
router.patch("/me", auth, isSuperAdmin, updateMyProfile);

// Get all users
router.get("/", auth, isSuperAdmin, getUsers);

// Get single user
router.get("/:id", auth, isSuperAdmin, getUserById);

// Create user
router.post("/", auth, isSuperAdmin, createUser);

// Update user
router.put("/:id", auth, isSuperAdmin, updateUser);

// Toggle status
router.patch("/:id/status", auth, isSuperAdmin, toggleUserStatus);

// Delete user
router.delete("/:id", auth, isSuperAdmin, deleteUser);

router.post("/create-admin", auth, isSuperAdmin, createAdmin);

module.exports = router;
