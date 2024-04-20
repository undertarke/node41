import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { response } from '../config/response.js';
import bcrypt from 'bcrypt';
import { createToken } from '../config/jwt.js';


let model = initModels(sequelize);

const getUser = (req, res) => {
    res.send("get user")
}

// yarn add bcrypt
const signUp = async (req, res) => {
    let { fullName, email, password } = req.body;

    // check email trùng
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {

        // response không có chức năng ngưng lệnh
        response(res, "", "Email đã tồn tại", 400);
        return;
    }

    // INSERT INTO user (....) VALUE (......)
    let newData = {
        full_name: fullName,
        email: email,
        avatar: "",
        pass_word: bcrypt.hashSync(password, 10),
        face_app_id: "",
        role: "USER",
        refresh_token: ""
    }

    model.users.create(newData);

    response(res, "", "Đăng ký thành công", 200);



}



const login = async (req, res) => {
    let { email, password } = req.body;

    // check email trùng
    // email = email AND pass_word=password
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {

        // if (checkEmail.pass_word == password) 
        if (bcrypt.compareSync(password, checkEmail.pass_word)) {
            // response không có chức năng ngưng lệnh
            let token = createToken({ userId: checkEmail.dataValues.user_id });
            response(res, token, "Đăng nhập thành công", 200);
        }
        else {
            response(res, "", "Mật khẩu không đúng", 400);
        }


    } else {

        response(res, "", "Email không đúng", 400);
    }



}

export {
    getUser,
    signUp,
    login
}