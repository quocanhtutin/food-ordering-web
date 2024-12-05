import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";

//app config
const app = express();
const port = 4000;

//middleware
app.use(cors());
app.use(express.json());

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter); 

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => { 
    console.log(`Server is running on port: http://localhost:${port}`);
});

