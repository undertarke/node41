import Video from "../models/video.js";

import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { response } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";

const model = initModels(sequelize)

const getVideo = async (req, res) => {

    // SELECT * FROM video WHERE user_id = 5
    // [{} , {}]
    let data = await model.video.findAll({
        where: {
            video_id: 5
        }
    })

    data = await model.video.findByPk(5)

    // SELECT * FROM video LIMIT 1
    // {}
    data = await model.video.findOne();

    // SELECT * FROM video JOIN video_type JOIN user
    data = await model.video.findAll({
        include: ["type", "user"]
        // include: [model.video_type, model.users]
    })

    response(res, data, "Thành công", 200)

}

const createVideo = (req, res) => {

}

const updateVideo = (req, res) => {

}

const getVideoType = async (req, res) => {
    try {
        let data = await model.video_type.findAll();
        // res.send(data)
        response(res, data, "Thành công", 200)

    } catch (exption) {

        response(res, "", "Lỗi hệ thống", 500)

    }
}


const getVideoWithType = async (req, res) => {
    try {


        let { typeId } = req.params;

        // SELECT * FROM video where type_id = typeId
        let data = await model.video.findAll({
            where: {
                type_id: typeId
            },
            include: ["type", "user"]
        })

        response(res, data, "Thành công", 200)

    } catch (exption) {

        response(res, "", "Lỗi hệ thống", 500)

    }

}

const getVideoPage = async (req, res) => {

    try {

        let { page } = req.params
        let pageSize = 3;

        let index = (page - 1) * pageSize;

        // SELECT * FROM video LIMIT index , pageSize

        let data = await model.video.findAll({
            offset: index,
            limit: pageSize
        })

        let totalItem = await model.video.count()

        let totalPage = Math.ceil(totalItem / pageSize)

        response(res, { listVideo: data, totalPage }, "Thành công", 200)

    } catch (exption) {

        response(res, "", "Lỗi hệ thống", 500)

    }

}


const getVideoDetail = async (req, res) => {
    let { videoId } = req.params;

    let data = await model.video.findByPk(videoId, {
        include: ["type", "user"]
    })

    response(res, data, "Thành công", 200)
}


const getComment = async (req, res) => {

    let { videoId } = req.params;

    let data = await model.video_comment.findAll({
        where: {
            video_id: videoId
        },
        include: ["user", "video"],
        order: [
            ["date_create", "DESC"]
        ]

    });

    response(res, data, "Thành công", 200)
}

const createComment = async (req, res) => {
    let { videoId, content } = req.body

    let { token } = req.headers;
    let { data } = decodeToken(token)

    // liên quan đến datetime => lấy từ server => BE
    let dateComment = new Date();

    let newData = {
        user_id: data.userId,
        video_id: videoId,
        content: content,
        date_create: dateComment
    }

    await model.video_comment.create(newData);

    response(res, "", "Bình luận thành", 200)


}

export {
    getVideo,
    createVideo,
    updateVideo,
    getVideoType,
    getVideoWithType,
    getVideoPage,
    getVideoDetail,
    getComment,
    createComment
}