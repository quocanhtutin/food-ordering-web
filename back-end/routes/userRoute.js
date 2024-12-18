import express from "express"
import { deleteUser, listUser, loginUser, registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/listUsers", listUser)
userRouter.post("/deleteUser", deleteUser)

export default userRouter;