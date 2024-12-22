import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import adminRouter from "./routes/adminRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import fetch from "node-fetch"
import { checkTransactions } from "./controllers/orderController.js"


//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/admin", adminRouter)



app.get("/", (req, res) => {
    res.send("API Working")
});
app.get('/api/proxy', async (req, res) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxTSaN2QBUKLparKXAP49b5TNpFQUv5IlJjmfqnWCx9sqsJx6Jt4WaJDOdb6Jjk0Zrh/exec';

    try {
        const response = await fetch(scriptUrl); // Gọi đến Google Apps Script
        const data = await response.json(); // Chuyển đổi dữ liệu thành JSON
        res.setHeader('Access-Control-Allow-Origin', '*'); // Cho phép CORS
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Phương thức được phép
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Header được phép
        res.json(data); // Trả về dữ liệu JSON cho client
    } catch (error) {
        console.error('Lỗi proxy:', error);
        res.status(500).json({ error: 'Không thể lấy dữ liệu từ Google Apps Script' });
    }
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

// kiểm tra giao dịch
setInterval(async () => {
    console.log("Đang kiểm tra giao dịch...");
    await checkTransactions();
}, 30000);

// setInterval(async () => {
//     console.log("Đang kiểm tra giao dịch...");
//     try {
//         await checkTransactions({}); // Không cần đối tượng `res` trong `setInterval`
//     } catch (error) {
//         console.error("Lỗi trong quá trình kiểm tra giao dịch định kỳ:", error);
//     }
// }, 30000);


