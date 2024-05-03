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
let model = new PrismaClient();

app.get("/get-video", async (req, res) => {

    let id = 2

    // SELECT * FROM video
    // findAll()
    // findOne()
    let data = await model.video.findFirst({
        where: {
            video_id: id
        },
        include: {
            video_comment: {
                include: {
                    users: true
                }
            }
        }
    });

    // sequelize : .destroy()
    // prisma: model.video.delete()

    // sequelize => video.create({video_id ,video_name,thumbnail,...})

    // prisma
    // model.video.create(
    //     {
    //         data: { video_id, video_name, thumbnail }
    //     }
    // )

    // model.video.update({
    //     data: { video_id, video_name, thumbnail },
    //     where: {}
    // })

    res.send(data)

})