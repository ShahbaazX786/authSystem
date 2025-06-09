export const welcomeEmailOptions = (name, email, otp) => {
    const app = process.env.APP_NAME;
    const WelcomeEmailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Welcome To ${app}`,
        text: `Your OTP is ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                <td align="center" style="padding: 40px 0;">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                        <h1 style="color: #333;">Welcome to ${app}!</h1>
                        <p style="font-size: 16px; color: #555;">
                            Hello <strong>${name}</strong>,
                        </p>
                        <p style="font-size: 16px; color: #555;">
                            Thank you for registering with us. To complete your registration, please use the OTP below:
                        </p>
                        <p style="font-size: 24px; color: #000; font-weight: bold; margin: 20px 0;">
                            ${otp}
                        </p>
                        <p style="font-size: 14px; color: #999;">
                            This OTP is valid for 5 minutes. Please do not share it with anyone.
                        </p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="font-size: 14px; color: #aaa;">
                            If you did not register, you can safely ignore this email.
                        </p>
                        Regards
                        <br/>
                        <p style="font-size: 14px; color: #aaa;">
                            – ${app} Team
                        </p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </div>
            `
    }
    return WelcomeEmailOptions;
}

export const passwordResetEmailOptions = (name, email, otp) => {
    const app = process.env.APP_NAME;
    const PasswordResetEmailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Password Reset Request`,
        text: `Hi ${name},\n\nYou requested to reset your password. Use the following OTP to proceed:\n\nOTP: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nIf you didn’t request a password reset, you can ignore this email.\n\n– ${app} Team`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 40px 0;">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h1 style="color: #333;">Password Reset Request</h1>
                                        <p style="font-size: 16px; color: #555;">
                                            Hello <strong>${name}</strong>,
                                        </p>
                                        <p style="font-size: 16px; color: #555;">
                                            We received a request to reset your password for your ${app} account. Use the OTP below to continue:
                                        </p>
                                        <p style="font-size: 24px; color: #000; font-weight: bold; margin: 20px 0;">
                                            ${otp}
                                        </p>
                                        <p style="font-size: 14px; color: #999;">
                                            This OTP is valid for 5 minutes. Please do not share it with anyone.
                                        </p>
                                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                                        <p style="font-size: 14px; color: #aaa;">
                                            If you didn’t request a password reset, you can safely ignore this email.
                                        </p>
                                        <br/>
                                        <p style="font-size: 14px; color: #aaa;">
                                            – ${app} Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        `
    };

    return PasswordResetEmailOptions;
}

export const OTPVerifiedEmailOptions = (name, email) => {
    const app = process.env.APP_NAME;
    const OTPVerifiedEmailOption = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: `Email Verified Sucessfully`,
        text: `Hi ${name},\n\nYou have sucessfully verified your Email using one time passcode`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 40px 0;">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h1 style="color: #333;">Your Account is Now Verified!</h1>
                                        <p style="font-size: 16px; color: #555;">
                                            Hello <strong>${name}</strong>,
                                        </p>
                                        <p style="font-size: 16px; color: #555;">
                                            Welcome To AuthSystems, A safe place to be secure.
                                        </p>
                                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                                        <br/>
                                        <p style="font-size: 14px; color: #aaa;">
                                            – ${app} Team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        `
    };

    return OTPVerifiedEmailOption;
}
