import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"  
import bcrypt from "bcrypt"


//login admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return res.json({ success: false, message: "Sai tài khoản" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Sai mật khẩu" })
        }

        const token = createToken(admin._id);
        res.json({ success: true, token, adminEmail: admin.email })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" })
    }
}

// const registerAdmin = async (req, res) => {
//     const {  password, email } = req.body;
//     try {


//         const salt = await bcrypt.genSalt(10)
//         const hashPassword = await bcrypt.hash(password, salt);

//         const newAdmin = new adminModel({
//             email: email,
//             password: hashPassword
//         })

//         const admin = await newAdmin.save()
//         const token = createToken(admin._id)
//         res.json({ success: true, token });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "ERROR" })

//     }
// }

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

 export { loginAdmin }