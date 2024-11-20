import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateJwtToken = (userData) => {
  return jwt.sign(userData, process.env.PRIVATE_KEY, { expiresIn: "7d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;
  if (!username || !email || !phoneNumber || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash the password
  const salt = await User.bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = User.create({
    username: username.toLowerCase(),
    email,
    phoneNumber,
    password: hashedPassword,
  });

  const token = generateJwtToken({
    username: user.username,
    email: user.email,
    phoneNumer: user.phoneNumber,
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    res
      .status(500)
      .json({ message: "Something went wring during registering the user" });
  }

  return res.status(201).json({
    user: createdUser,
    message: "User register successfully",
    token: token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body();
});

export { registerUser };
