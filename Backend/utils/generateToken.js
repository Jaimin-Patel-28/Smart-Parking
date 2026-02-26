const jwt = require("jsonwebtoken");

exports.generateToken = (payload, type = "user") => {
  const secret =
    type === "admin"
      ? process.env.JWT_ADMIN_SECRET
      : process.env.JWT_USER_SECRET;

  return jwt.sign(payload, secret, { expiresIn: "1d" });
};