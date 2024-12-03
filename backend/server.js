import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
// app config
const app = express();
const port = 4000;

// middeWare
app.use(express.json()); // get request from the frontend to backend that passed using json
app.use(cors()); // access the backend from any frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
/*http method to get data from the server

*/
app.get("/", (req, res) => {
  res.send("API Working");
});

// run the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

//mongodb+srv://CNPM:<db_password>@project.v4uum.mongodb.net/?
