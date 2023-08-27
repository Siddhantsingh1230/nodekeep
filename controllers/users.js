import { userModel } from "./../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await userModel.create({ name, email, password: hashedPassword });
  sendCookie(user, res, "User created", 201);
};

export const getUser = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });
  }
  sendCookie(user, res, `Login success ${user.name}`);
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    })
    .json({ success: true, message: "Logout successfull" });
};
