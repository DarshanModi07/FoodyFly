const authService = require("../services/auth.service");
const { sendToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const user = await authService.signupUser(req.body, "user");
    sendToken(res, user);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.ownerSignup = async (req, res) => {
  try {
    const user = await authService.signupUser(req.body, "owner");
    sendToken(res, user);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body);
    sendToken(res, user);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await authService.verifyUser(req.cookies.token);
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

exports.googleCallback = async (req, res) => {
  sendToken(res, req.user);
  res.redirect("http://localhost:1234/");
};