// Nơi định nghĩa API
import express from 'express'
import { getUser, login, resetToken, signUp, loginFacebook, forgetCheckMail, forgetCheckCode } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get("/get-user", getUser)

// API signup
userRouter.post("/sign-up", signUp)
// API login
userRouter.post("/login", login)

// API reset token
userRouter.post("/reset-token", resetToken)

// API login facebook
userRouter.post("/login-facebook", loginFacebook)

// API check mail => forget password
userRouter.post("/forget-check-mail",forgetCheckMail)

// API check CODE =>  forget password
userRouter.post("/forget-check-code",forgetCheckCode)


export default userRouter

// http://localhost:3000/'`"SELECT * FROM users`"'