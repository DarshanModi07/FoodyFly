const User = require("../models/userData");

const isAdmin = async (req, res, next) => {
  const admin = await User.findById(req.user._id);
  if (!admin || admin.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only Admin Can Access"
    });
  }
  next();
};

module.exports = isAdmin;