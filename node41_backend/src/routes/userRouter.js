// Nơi định nghĩa API
import express from 'express'
import { getUser, login, resetToken, signUp, loginFacebook, forgetCheckMail, forgetCheckCode } from '../controllers/userController.js'
import { upload } from '../config/upload.js'

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
userRouter.post("/forget-check-mail", forgetCheckMail)

// API check CODE =>  forget password
userRouter.post("/forget-check-code", forgetCheckCode)


// File system
import fs from 'fs'

// API upload avatar
userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {

    // tạo file tên data.txt => hello node41
    // fs.writeFile(process.cwd() + "/data.txt", "hello node41", (err) => { })

    let file = req.file;
    fs.readFile(process.cwd() + "/public/img/" + file.filename, (err, data) => {
        let base64 = Buffer.from(data).toString("base64");

        res.send(base64);
       
    })



    // let files = req.files

    // // get token
    // let { token } = req.headers;

    // // decode user id

    // // getUser 

    // // update avatar 

    // res.send(files)
})







export default userRouter

// http://localhost:3000/'`"SELECT * FROM users`"'