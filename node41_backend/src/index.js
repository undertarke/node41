import express from 'express'
import cors from 'cors'
import rootRouter from './routes/rootRouter.js'

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.static(".")) // định vị đường dẫn BE để load file

app.use(rootRouter)

app.listen(8080)



// yarn add swagger-ui-express swagger-jsdoc

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        info: {
            title: "api",
            version: "1.0.0"
        }
    },
    apis: ["src/swagger/index.js"]
}


const specs = swaggerJsDoc(options);


app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));




// B1: yarn add prisma @prisma/client

// B2: yarn prisma init

// B3: Update lại chuỗi kết nối CSDL trong .env và file schema.prisma

// B4: Database First => yarn prisma db pull

// B5: yarn prisma generate

import { PrismaClient } from '@prisma/client'
let prisma = new PrismaClient();

app.get("/user/get-all-user", async (req, res) => {

    let id = 2

    // SELECT * FROM video
    // findAll()
    // findOne()
    let data = await prisma.users.findMany();

    // sequelize : .destroy()
    // prisma: prisma.video.delete()

    // sequelize => video.create({video_id ,video_name,thumbnail,...})

    // prisma
    // prisma.video.create(
    //     {
    //         data: { video_id, video_name, thumbnail }
    //     }
    // )

    // prisma.video.update({
    //     data: { video_id, video_name, thumbnail },
    //     where: {}
    // })

    res.send(data)

})





// yarn add socket.io

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);


// đối tượng socket server
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

// lắng nghe key: connection => khi client kết nối vào server
io.on("connection", (socket) => {

    // app chat
    // 6-8
    socket.on("join-room", async (roomId) => {

        // leave all room
        socket.rooms.forEach(roomId => socket.leave(roomId))

        socket.join(roomId)

        // lấy lịch sử chat
        let lstChat = await prisma.chat.findMany({
            where: {
                room_id: roomId
            }
        })

        io.to(roomId).emit("load-chat", lstChat)

    })


    // { userId, txtChat }
    socket.on("send-mess", async (data) => {

        let newChat = {
            user_id: data.userId,
            content: data.txtChat,
            room_id: data.roomId,
            date: new Date()
        }

        await prisma.chat.create({ data: newChat })

        io.to(data.roomId).emit("mess-server", data)

    })











    // // add vào room => room key
    // socket.join("room-1")

    // // xử lý các sự kiện liên quan đến realtime

    // // key , value
    // // chỉ có client nào gửi thì client đó nhận
    // // socket.emit("send-data", socket.id)

    // // toàn bộ client nhận
    // io.to("room-1").to("room-2").emit("send-data", socket.id)

    // socket.on("client-data", (data) => {
    //     console.log(data)
    // })


});


// port dành cho socket.io
httpServer.listen(8081);