import nodemailer from 'nodemailer';
import { config } from '../config/config';

const sendEmail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        host: config.email.host,
        port: 465,
        secure: true, 
        auth: {
            user: config.email.user,  
            pass: config.email.pass, 
        },
    });

    const mailOptions = {
        from: config.email.from, 
        to: to,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail