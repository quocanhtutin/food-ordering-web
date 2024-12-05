import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://CNPM:HustFood@project.v4uum.mongodb.net/hustfood")
    .then(() => console.log("DB connected"));
};
