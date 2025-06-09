import { OTPVerifiedEmailOptions } from './emailOptions.js';
import transporter from './nodemailer.js';

const sendOTPVerifiedEmail = async (name, email) => {
    const options = OTPVerifiedEmailOptions(name, email);
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent Sucessfully: ' + info.response);
        }
    });
}

export default sendOTPVerifiedEmail;