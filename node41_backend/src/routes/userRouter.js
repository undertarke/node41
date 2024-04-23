// Nơi định nghĩa API
import express from 'express'
import { getUser, login, resetToken, signUp } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get("/get-user", getUser)

// API signup
userRouter.post("/sign-up", signUp)
// API login
userRouter.post("/login", login)

// API reset token
userRouter.post("/reset-token", resetToken)

export default userRouter

// http://localhost:3000/'`"SELECT * FROM users`"'