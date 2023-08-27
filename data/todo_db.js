import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("DB Online");
    })
    .catch((e) => {
      console.log("Error", e);
    });
};
