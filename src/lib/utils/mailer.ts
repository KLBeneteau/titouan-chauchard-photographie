
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const {EMAIL, EMAIL_PASS } = process.env;

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : EMAIL,
        pass : EMAIL_PASS,
    }
})


export function sendMail(to:string,subject:string,content:string){
    let mailOptions = {
        from: EMAIL,
        to: to,
        subject: subject,
        html: content
    };

    return new Promise((successCallback, failureCallback) => {
        transporter.sendMail(mailOptions, (err) => {
            if(err) {
                console.error(err)
                failureCallback(false);
            }
            else successCallback(true)
        });
    })
}