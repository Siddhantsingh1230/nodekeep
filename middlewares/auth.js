import { userModel } from "./../models/users.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Logged out",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const id = decoded._id;
  const user = await userModel.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "unable to find",
    });
  }
  req.user= user;
  next();
};
