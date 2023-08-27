import CustomError from "../middlewares/error.js";
import { taskModel } from "./../models/task.js";
export const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  await taskModel.create({
    title,
    description,
    user: req.user,
  });
  res.status(201).json({
    success: true,
    message: "Task added successfully",
    user: req.user.name,
  });
};

export const getAllTask = async (req, res, next) => {
  const id = req.user._id;
  const tasks = await taskModel.find({ user: id });
  res.status(200).json({
    success: true,
    tasks,
  });
};
export const updateStatus = async (req, res, next) => {
  const id = req.params.id;
  const task = await taskModel.findById(id);
  if (!task) {
    return next(new CustomError("invalid id",404));
  }
  task.isCompleteted = !task.isCompleteted;
  await task.save();
  res.status(200).json({
    success: true,
    message: "updated successfully",
  });
};
export const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  const task = await taskModel.findById(id);
  if (!task) {
    return next(new CustomError("invalid id",404));
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
};
