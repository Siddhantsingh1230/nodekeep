import express from "express";
import {
  getUser,
  registerUser,
  login,
  logout,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me",isAuthenticated, getUser);

export default router;
