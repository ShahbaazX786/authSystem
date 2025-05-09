import { passwordResetEmailOptions } from './emailOptions.js';
import transporter from './nodemailer.js';

const sendPasswordResetEmail = async (name, email, otp) => {
    const options = passwordResetEmailOptions(name, email, otp);
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Reset Password Email sent Sucessfully: ' + info.response);
        }
    });
}

export default sendPasswordResetEmail;