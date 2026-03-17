const express = require("express")
const mongoose = require("mongoose")    
const authRouter = express.Router()
const User = require("../models/userData")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")
const passport = require("passport");
const session = require("express-session");
const googleStrategy = require("passport-google-oauth20").Strategy;
const CLIENT_URL=process.env.CLIENT_URL
const JWT_SECRET=process.env.JWT_SECRET


authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_URL+"/login"
  }),
  async (req, res) => {

    const token = jwt.sign(
      { 
        _id: req.user._id,
        role: req.user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(CLIENT_URL);
  }
);

authRouter.post("/signup", async (req, res) => {
  try {

    const { firstName, lastName, email, password, savedAddress, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const encryptedPass = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName: lastName || "",
      email,
      password: encryptedPass,
      gender: gender || "other",
      savedAddress: savedAddress || "",
      role: "user" 
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      {
        _id: savedUser._id,
        role: savedUser.role
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      message: "User Added Successfully",
      user: {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        role: savedUser.role
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundedUser = await User.findOne({ email });
    if (!foundedUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exist"
      });
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        _id: foundedUser._id,
        role: foundedUser.role
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: foundedUser._id,
        firstName: foundedUser.firstName,
        lastName: foundedUser.lastName,
        role: foundedUser.role
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


authRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/"
    });
    
    return res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

authRouter.get("/verifyUser", async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token"
      });
    }

    const decoded = jwt.verify(token,JWT_SECRET);

    const user = await User.findById(decoded._id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
});

authRouter.post("/owner/signup", async (req, res) => {
  try {

    const { firstName, lastName, email, password, savedAddress, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const encryptedPass = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName: lastName || "",
      email,
      password: encryptedPass,
      gender: gender || "other",
      savedAddress: savedAddress || "",
      role: "owner"
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      {
        _id: savedUser._id,
        role: savedUser.role
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      message: "Owner account created 🎉",
      user: {
        _id: savedUser._id,
        firstName: savedUser.firstName,
        role: savedUser.role
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = authRouter