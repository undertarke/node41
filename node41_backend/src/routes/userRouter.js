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
import compress_images from 'compress-images'

// yarn add compress-images
// yarn add pngquant-bin@6.0.1
// yarn add  gifsicle@5.2.1 

// image > 900Kb

// API upload avatar
userRouter.post("/upload-avatar", upload.single("avatar"), (req, res) => {


    let file = req.file;

    // đường dẫn hình cần tối ưu
    let input = process.cwd() + "/public/img/" + file.filename;

    // đường dẫn hình đã được tối ưu
    let output = process.cwd() + "/public/file/";
    
    compress_images(input, output,

        { compress_force: false, statistic: true, autoupdate: true }, false,

        { jpg: { engine: "mozjpeg", command: ["-quality", "15"] } },

        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },

        function (error, completed, statistic) {

            // xóa hình chưa tối ưu

            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );

    res.send("OK")






    // tạo file tên data.txt => hello node41
    // fs.writeFile(process.cwd() + "/data.txt", "hello node41", (err) => { })

    // fs.readFile(process.cwd() + "/public/img/" + file.filename, (err, data) => {
    //     let base64 = Buffer.from(data).toString("base64");

    //     res.send(base64);

    // })



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