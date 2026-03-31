const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserStatus,
  deleteUser,
} = require("../controllers/userController");

// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUserById);

// Create user
router.post("/", createUser);

// Update user
router.put("/:id", updateUser);

// Toggle status
router.patch("/:id/status", toggleUserStatus);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
