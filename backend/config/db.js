import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://doxhuy2104:wqqpwppr2104@cluster0.7egt2.mongodb.net/food-delivery').then(()=>console.log('Database connected'));

}
