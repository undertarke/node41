// Nơi định nghĩa API
import express from 'express'
import { createVideo, getVideo, updateVideo } from '../controllers/videoController.js'

const videoRouter = express.Router()

videoRouter.get("/get-video", getVideo)
videoRouter.post("/create-video",createVideo)

videoRouter.put("/update-video",updateVideo)

export default videoRouter