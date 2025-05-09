import { welcomeEmailOptions } from './emailOptions.js';
import transporter from './nodemailer.js';

const sendWelcomeEmail = async (name, email, otp) => {
    const options = welcomeEmailOptions(name, email, otp);
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent Sucessfully: ' + info.response);
        }
    });
}

export default sendWelcomeEmail;