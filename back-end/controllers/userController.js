import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"  //create authenication
import bcrypt from "bcrypt"
import validator from "validator"
import orderModel from "../models/oderModel.js";


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token, userName: user.name, userEmail: user.email })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format &store password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" })

    }
}

const listUser = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.json({ success: true, data: users })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.id)
        await orderModel.deleteMany({ userId: req.body.id })
        res.json({ success: true, message: "User removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser, listUser, deleteUser }