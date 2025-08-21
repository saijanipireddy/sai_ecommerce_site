import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { genToken } from "../config/token.js";

// ==================== USER REGISTRATION ====================
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    if (!validator.isEmail(email)) return res.status(400).json({ message: "Enter a valid email" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });
    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ user, token });
  } catch (error) {
    console.error("registration error", error.message);
    return res.status(500).json({ message: "Registration Error" });
  }
};

// ==================== USER LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Login error", error.message);
    return res.status(500).json({ message: "Login Error" });
  }
};

// ==================== LOGOUT ====================
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Logout error", error.message);
    return res.status(500).json({ message: "Logout Error" });
  }
};

// ==================== GOOGLE LOGIN ====================
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ name, email, password: "" });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Google Login error", error.message);
    return res.status(500).json({ message: "Google Login Error" });
  }
};

// ==================== ADMIN LOGIN ====================

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Admin Login Attempt:", email, password);

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      console.error("Missing environment variables. Check .env file.");
      return res.status(500).json({ message: "Server not configured correctly" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,   
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      console.log("Admin login success, token issued:", token);
      return res.status(200).json({ message: "Admin login successful" });
    } else {
      console.warn("Invalid Admin Credentials:", email, password);
      return res.status(401).json({ message: "Invalid Admin Credentials" });
    }
  } catch (error) {
    console.error("Admin Login error:", error.message);
    return res.status(500).json({ message: "Admin Login Error" });
  }
};
