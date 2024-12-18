import orderModel from "../models/oderModel.js";
import userModel from "../models/userModel.js";
import stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const checkTransactions = async (req, res) => {
//     const scriptUrl = 'http://localhost:4000/api/proxy';

//     try {

//         const response = await fetch(scriptUrl);

//         const data = await response.json();
//         const transactions = data.data;
//         console.log(transactions);

//         const pendingOrders = await orderModel.find({ payment: false });

//         for (let transaction of transactions) {
//             const matchingOrder = pendingOrders.find(order => transaction["Mô tả"] && transaction["Mô tả"].includes(order.code));

//             if (matchingOrder && transaction["Giá trị"] <= matchingOrder.amount) {
//                 await orderModel.findByIdAndUpdate(matchingOrder._id, { payment: true, status: "Paid" });
//                 console.log(`Thanh toán thành công cho đơn hàng: ${matchingOrder.code}`);
//             }
//         }

//         res.json({ success: true, message: "Kiểm tra giao dịch thành công" });
//     } catch (error) {
//         console.error("Lỗi kiểm tra giao dịch:", error);
//         // res.status(500).json({ success: false, message: "Không thể kiểm tra giao dịch" });
//     }
// };

const checkTransactions = async (req, res = null) => {
    const scriptUrl = 'http://localhost:4000/api/proxy';

    try {
        const response = await fetch(scriptUrl);


        const data = await response.json();
        const transactions = data.data;

        // console.log('Giao dịch:', transactions);

        const pendingOrders = await orderModel.find({ payment: false });

        for (let transaction of transactions) {
            const matchingOrder = pendingOrders.find(order =>
                transaction["Mô tả"] && transaction["Mô tả"].includes(order.code)
            );

            if (matchingOrder && transaction["Giá trị"] >= matchingOrder.amount) {
                await orderModel.findByIdAndUpdate(matchingOrder._id, { payment: true, status: "Paid" });
                console.log(`Thanh toán thành công cho đơn hàng: ${matchingOrder.code}`);
            }
        }

        if (res) {
            res.json({ success: true, message: "Kiểm tra giao dịch thành công" });
        }
    } catch (error) {
        console.error("Lỗi kiểm tra giao dịch:", error);
        if (res) {
            res.status(500).json({ success: false, message: "Không thể kiểm tra giao dịch" });
        }
    }
};




//placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = `http://localhost:5174`;

    try {

        const orderCount = await orderModel.countDocuments();
        const orderCode = `ORDER${String(orderCount + 1).padStart(3, '0')}`;
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            code: orderCode
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 24000
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 2 * 100 * 2400
            },
            quantity: 1
        })

        // const session = await stripe.checkout.sessions.create({
        //     line_items: line_items,
        //     mode: 'payment',
        //     success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        // })

        //res.json({ success: true, session_url: session.url })
        res.json({ success: true, orderCode });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "not paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//user orders fo frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}); //get all orders data
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}



// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, checkTransactions }