// yarn add jsonwebtoken
import jwt from 'jsonwebtoken';

// tạo token
export const createToken = (data) => {
    return jwt.sign({ data: data }, "BI_MAT", { expiresIn: "5s" })
}


// kiểm tra token
// export const checkToken = (token) => {

//    return jwt.verify(token, "BI_MAT", (error) => {
//         return error
//     })

// }

export const checkToken = token => jwt.verify(token, "BI_MAT", error => error)



// create refresh token
export const createTokenRef = (data) => {
    return jwt.sign({ data: data }, "BI_MAT_REF", { expiresIn: "60d" })
}
// check refresh token
export const checkTokenRef = token => jwt.verify(token, "BI_MAT_REF", error => error)




// giải mã token
export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const verifyToken = (req, res, next) => {

    let { token } = req.headers;
    let error = checkToken(token)
    if (error == null) {
        // check token        
        next()
        return;
    }

    //
    res.status(401).send(error.name)

}