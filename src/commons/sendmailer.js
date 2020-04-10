require('dotenv').config()
const nodemailer = require("nodemailer");

const send = async ({ from, to, subject, text }) => {

    let transporter = nodemailer.createTransport({
        host: process.env.HOST_SMTP,
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_SMTP,
            pass: process.env.PWD_SMTP,
        }
    });


    try {
        const send = await transporter.sendMail({ from, to, subject, text });
        if (send) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err.message)
        return false;
    }
}

module.exports = {
    send
}