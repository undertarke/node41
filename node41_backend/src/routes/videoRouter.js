// Nơi định nghĩa API
import express from 'express'
import {
    createVideo, getVideo,
    getVideoPage, getVideoType,
    getVideoWithType,
    updateVideo
} from '../controllers/videoController.js'

const videoRouter = express.Router()

videoRouter.get("/get-video", getVideo)
videoRouter.post("/create-video", createVideo)
videoRouter.put("/update-video", updateVideo)


// API get video type
videoRouter.get("/get-video-type", getVideoType)

// API get video with type
videoRouter.get("/get-video-with-type/:typeId", getVideoWithType)

// API get video page
videoRouter.get("/get-video-page/:page", getVideoPage)

export default videoRouter