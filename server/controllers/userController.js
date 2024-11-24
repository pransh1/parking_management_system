import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwtToken = (userData) => {
  return jwt.sign(userData, process.env.PRIVATE_KEY, { expiresIn: "7d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, password, role } = req.body;
  if (!username || !email || !phoneNumber || !password || !role) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    res
      .status(500)
      .json({ message: "Something went wring during registering the user" });
  }

  const token = generateJwtToken({
    username: createdUser.username,
    email: createdUser.email,
    phoneNumber: createdUser.phoneNumber,
    role: createdUser.role,
  });

  return res.status(201).json({
    user: createdUser,
    message: "User register successfully",
    token: token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Fill all the fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "password did not match" });
  }

  const token = generateJwtToken({
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  return res.status(200).json({ message: "Login successfully", token: token });
});

export { registerUser, loginUser };
