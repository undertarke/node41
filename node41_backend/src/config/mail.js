import nodemailer from 'nodemailer';


export const sendMail = (to, subject, text) => {

    let configMail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sangrom2003@gmail.com",
            pass: "fuhhagtwepdqpobu"
        }
    })
    let infoMail = {
        from: "sangrom2003@gmail.com",
        to,
        subject,
        text
    }

    return configMail.sendMail(infoMail, error => error);

}