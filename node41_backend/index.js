//setup server BE nodejs

// ctrl + J => mở terminal
// yarn init => enter tới chết

// yarn add express 

import express from 'express'

const app = express()
// mở chặn CORS
// yarn add cors
import cors from 'cors'
app.use(cors())
// app.use(cors({
//     origin:["http://localhost:3000","https://google.com"]
// }))

// chèn middle ware khi FE  request BE
app.use(express.json())

// khởi tạo server với port
app.listen(8080)

// ctrl+ C => tắt server
// yarn add nodemon => watching => auto restart server => developer

// định nghĩa API
// endpoint => GET: demo 
// rest params: function(...rest)

app.get("/demo/:id", (request, response) => {

    // trả data trên URL
    // + Query string: localhost:8080/demo?id=1&hoTen=John Cena
    let { hoTen } = request.query
    // + query params: localhost:8080/demo/1
    let { id } = request.params

    // trả json (body)
    let { email, phone, address } = request.body
    /*
        {
            "email":"john@gmail.com",
            "phone":"0909090",
            "address":"111 DPB"
        }
    */

    // 100 - 599
    response.status(209).send({ id, hoTen, email, phone, address }) // string, object, list, list object,.. trừ number

})

// yarn add mysql2
import mysql from 'mysql2';

// chuỗi kết nối CSDL
const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3306",
    database: "db_youtube"
})

// API 
// endpoint: viết thường, cách nhau bởi gạch ngang, kiểu dữ kiệu luôn luôn là string
app.get("/get-video", (req, res) => {

    connect.query("SELECT * FROM video", (err, result) => {

        res.send(result); // []
    });

})


// MVC  MC Routes