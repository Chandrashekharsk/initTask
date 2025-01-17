import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { email, password, phone1, firstName, lastName } = req.body;

    if (!email || !password || !phone1 || !firstName || !lastName) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      phone1,
      firstName,
      lastName,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Login successful.",
      api_key: user.api_key,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login. Please try again later." });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "An error occurred during logout. Please try again later." });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "An error occurred while fetching the profile." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    const { firstName, lastName, phone1, phone2, company, city, country, website } = req.body;

    const updatedData = {};

    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;
    if (phone1) updatedData.phone1 = phone1;
    if (phone2) updatedData.phone2 = phone2;
    if (company) updatedData.company = company;
    if (city) updatedData.city = city;
    if (country) updatedData.country = country;
    if (website) updatedData.website = website;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true, runValidators: true }
    ).select("-password -__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Profile updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "An error occurred while updating the profile." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await UserModel.find()
      .select("-password -__v -api_key")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalUsers = await UserModel.countDocuments();

    res.status(200).json({
      message: "Users fetched successfully.",
      users,
      pagination: {
        totalUsers,
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "An error occurred while fetching users." });
  }
};

export const generateApiKey = async (userId) => {
  try {
    const apiKey = crypto.randomBytes(32).toString("hex");

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { api_key: apiKey },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found.");
    }

    return apiKey;
  } catch (error) {
    console.error("Error generating API key:", error);
    throw new Error("Failed to generate API key.");
  }
};
