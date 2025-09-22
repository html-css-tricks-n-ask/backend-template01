import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import generateToken from "../utils/genrateToken.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};





const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });

  // 2️⃣ Check password (assuming you have bcrypt compare here)
  // const isMatch = await user.matchPassword(password);



  // if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // 3️⃣ Generate token
  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    email: user.email,
    token,   // send JWT back
  });
}







const getUsers = async (req, res) => {
  
  try {

    console.log(req , res , "----------")
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { registerUser, loginUser, getUsers };
















    // "token": "
    // 
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNhZTA3ODk0YzY2MWUyNDdhMjVkNjUiLCJpYXQiOjE3NTgxMjYzMDEsImV4cCI6MTc1ODE1MTUwMX0.isnvI1tjKS3cmYHZL64LTx0d8I4SO8qcNrh2JB9VO8I
    // 
    // ",