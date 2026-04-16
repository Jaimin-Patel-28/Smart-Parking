exports.isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "User access required" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

exports.isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(403).json({ message: "Super Admin access required" });
  }
  next();
};

exports.isAdminOrSuperAdmin = (req, res, next) => {
  if (!["admin", "super-admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};
