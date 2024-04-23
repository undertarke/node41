// Nơi định nghĩa API
import express from 'express'
import {
    createComment,
    createVideo, getComment, getVideo,
    getVideoDetail,
    getVideoPage, getVideoType,
    getVideoWithType,
    updateVideo
} from '../controllers/videoController.js'
import { checkToken, verifyToken } from '../config/jwt.js';

const videoRouter = express.Router()

videoRouter.get("/get-video", verifyToken, getVideo)

// API get video page
videoRouter.get("/get-video-page/:page", verifyToken, getVideoPage)


videoRouter.post("/create-video", createVideo)
videoRouter.put("/update-video", updateVideo)


// API get video type
videoRouter.get("/get-video-type", getVideoType)

// API get video with type
videoRouter.get("/get-video-with-type/:typeId", getVideoWithType)


// API get video detail
videoRouter.get("/get-video-detail/:videoId", getVideoDetail)

// API get comment
videoRouter.get("/get-comment/:videoId", getComment)

// API create comment
videoRouter.post("/comment", createComment)

export default videoRouter