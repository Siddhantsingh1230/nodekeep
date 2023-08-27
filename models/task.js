import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleteted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const taskModel = mongoose.model("tasks", taskSchema);
