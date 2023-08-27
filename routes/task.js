import express from "express";
import { createTask, getAllTask ,updateStatus,deleteTask } from "../controllers/task.js";
import { isAuthenticated } from './../middlewares/auth.js';
const router = express.Router();

router.post("/new",isAuthenticated,createTask);
router.get("/all",isAuthenticated,getAllTask);
router.route("/:id").put(isAuthenticated,updateStatus).delete(isAuthenticated,deleteTask);
export default router;