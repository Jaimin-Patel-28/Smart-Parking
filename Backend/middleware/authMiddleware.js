const jwt = require("jsonwebtoken");
const User = require("../Authentication/models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.log('🔍 Verifying token:', token.substring(0, 20) + '...');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id role parking status");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log('✅ Decoded user:', user._id.toString(), user.role);
    
    req.user = {
      id: user._id.toString(),
      role: user.role,
      parking: user.parking ? user.parking.toString() : null,
      status: user.status,
    };
    
    next();

  } catch (error) {
    console.error('❌ JWT Verify error:', error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
