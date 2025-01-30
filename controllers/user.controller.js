import { json } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// userRegister
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    
    const hashPass = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      password: hashPass,
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User Not created Sucessfully",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// userLogin
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "User Not Found" });
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword)
      res.status(400).json({ message: "Invalid Credential", success: false });

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.status(201).json({
      message: "User login Sucessfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};

// getAlluser

export const userDetails = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};


// specific user profile

export const userProfile =async (req,res)=>{
  const user = req.user
  res.status(201).json({
    success:true,
    message:"user profile ",
    user
  })
}