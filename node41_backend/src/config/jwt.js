// yarn add jsonwebtoken
import jwt from 'jsonwebtoken';

// tạo token
export const createToken = (data) => {
    return jwt.sign({ data: data }, "BI_MAT", { expiresIn: "5m" })
}



// kiểm tra token
export const checkToken = (token) => {

}


// giải mã token

export const decodeToken = (token) => {
    return jwt.decode(token)
}