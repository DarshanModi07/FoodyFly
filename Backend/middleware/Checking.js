const User = require("../models/userData");
const jwt = require("jsonwebtoken");

const Checking = async (req, res, next) => {
  try {
    console.log("All Cookies:", req.cookies);

    const token = req.cookies?.token;
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).send("No token found. Please Login.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).send("User not found.");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).send("Auth Error: " + err.message);
  }
};

module.exports = Checking;
