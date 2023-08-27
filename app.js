import express from "express";
import userRouter  from "./routes/users.js";
import taskRouter  from "./routes/task.js";
export const app = express();
import { configDotenv } from "dotenv";
import { connectDB } from './data/todo_db.js';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/task", taskRouter);
app.use(cors({
  origin:[process.env.FRONTEND_URI],
  method:["GET","POST","DELETE","PUT"],
  credentials:true
}));

//environment variables
configDotenv({
  path: "./data/config.env",
});
// Db connection
connectDB();
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    api_status: "online",
  });
});

app.use(errorMiddleware);