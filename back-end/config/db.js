import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://quocanhtutin:Qa161004@cluster0.o0uqv.mongodb.net/food-del').then(() => console.log("db connected"));
}