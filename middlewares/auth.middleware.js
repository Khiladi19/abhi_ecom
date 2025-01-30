import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) {
    res.status(401).json({
      sucess: false,
      message: "Login First",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const id = decoded.userId;
  const user = await User.findById(id);
  if (!user) {
    res.status(401).json({
      sucess: false,
      message: "User not exits",
    });
  }

  req.user = user;
  next();
};
