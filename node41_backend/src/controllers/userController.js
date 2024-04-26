import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { response } from '../config/response.js';
import bcrypt from 'bcrypt';
import { checkToken, checkTokenRef, createToken, createTokenRef, decodeToken } from '../config/jwt.js';
import { sendMail } from '../config/mail.js';


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

const generateRandomString = () => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < 6; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
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

            let key = generateRandomString(); // ABC123

            // response không có chức năng ngưng lệnh
            let token = createToken({ userId: checkEmail.dataValues.user_id, key });

            let tokenRef = createTokenRef({ userId: checkEmail.dataValues.user_id, key });
            // update lại talbe user

            checkEmail.refresh_token = tokenRef;

            // UPDATE users SET refresh_token = tokenRef WHERE user_id = 
            model.users.update(checkEmail.dataValues, {
                where: {
                    user_id: checkEmail.dataValues.user_id
                }
            })

            response(res, token, "Đăng nhập thành công", 200);
        }
        else {
            response(res, "", "Mật khẩu không đúng", 400);
        }


    } else {

        response(res, "", "Email không đúng", 400);
    }



}


const resetToken = async (req, res) => {
    // check lại token 
    let { token } = req.headers;


    let errorToken = checkToken(token)
    if (errorToken != null && errorToken.name != "TokenExpiredError") {
        response(res, "", "Not Authorized", 401);
        return;
    }

    let { data } = decodeToken(token)
    let getUser = await model.users.findByPk(data.userId);

    let tokenRef = decodeToken(getUser.dataValues.refresh_token);

    if (data.key != tokenRef.data.key) {
        response(res, "", "Not Authorized", 401);
        return;
    }

    // check refresh token => expired
    // userId
    if (checkTokenRef(getUser.dataValues.refresh_token) != null) {
        response(res, "", "Not Authorized", 401);
        return;
    }

    // create token
    let tokenNew = createToken({ userId: getUser.dataValues.user_id, key: tokenRef.data.key });

    response(res, tokenNew, "", 200);

}

const loginFacebook = async (req, res) => {

    let { userID, name, email } = req.body;

    let checkUser = await model.users.findOne({
        where: {
            face_app_id: userID
        }
    })

    let user_id = ""

    if (checkUser) {
        // tồn tại
        user_id = checkUser.dataValues.user_id

    } else {

        // check tồn tại email


        // chưa tồn tại
        let newData = {
            full_name: name,
            email: email,
            avatar: "",
            pass_word: "",
            face_app_id: userID,
            role: "USER",
            refresh_token: ""
        }


        let data = await model.users.create(newData);

        user_id = data.dataValues.user_id;
    }

    // tồn tại
    let key = generateRandomString(); // ABC123
    // response không có chức năng ngưng lệnh
    let token = createToken({ userId: user_id, key });
    let tokenRef = createTokenRef({ userId: user_id, key });
    // update refToken
    response(res, token, "", 200);

}

const forgetCheckMail = async (req, res) => {
    let { email } = req.body
    // check mail
    let checkEmail = await model.users.findOne({
        where: { email: email }
    })
    if (!checkEmail) {
        response(res, "", "Email không tồn tại", 404);
        return;
    }

    let dNow = new Date();
    let code = generateRandomString()

    // tạo code
    let newCode = {
        code: code,
        expired: dNow.setMinutes(dNow.getMinutes() + 10)
    }

    model.code.create(newCode);

    // send mail code
    sendMail(email, "Lấy lại mật khẩu", code);


    response(res, true, "", 200);

}



const forgetCheckCode = async (req, res) => {
    // check code
    let { code } = req.body

    let checkCode = await model.code.findOne({
        where: {
            code: code
        }
    })



    if (checkCode) {
        model.code.destroy({
            where: {
                id: checkCode.dataValues.id
            }
        })
        response(res, true, "", 200);
    }
    else {
        response(res, false, "Code không đúng", 403);
    }

    // remove code


}

export {
    getUser,
    signUp,
    login,
    resetToken,
    loginFacebook,
    forgetCheckCode,
    forgetCheckMail
}