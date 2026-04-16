const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "super-admin") {
      return res.status(403).json({ message: "Access denied. Super Admin only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = adminMiddleware;
