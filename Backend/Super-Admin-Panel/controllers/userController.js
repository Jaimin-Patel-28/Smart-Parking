const User = require("../../Authentication/models/User");

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
    const { name, email, phone, role } = req.body;

    const user = new User({
      name,
      email,
      phone,
      role,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
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

    user.status = user.status === "active" ? "inactive" : "active";

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
