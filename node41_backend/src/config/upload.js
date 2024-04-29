

// yarn add multer

import multer, { diskStorage } from 'multer';

// khai báo nơi lưu
// đổi tên file

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img",    // quy định url chưa lưu file
        filename: (req, file, callback) => {


            // DD / MM / YYYY hh:mm:ss:ms
            // get milisecond => 1/1/1970
            let mSecond = new Date().getTime();

            //  đổi tên file
            callback(null, mSecond + "-" + Math.round(Math.random() * 1E9) + "_" + file.originalname);  // 1714396769235.jpg => funcition convert char special
        }
    })

    // dest: process.cwd() + "/public/img"    // quy định url chưa lưu file
})
