import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import sendPasswordResetEmail from '../nodemailer/sendPasswordResetEmail.js';
import sendWelcomeEmail from '../nodemailer/sendWelcomeEmail.js';
import sendOTPVerifiedEmail from '../nodemailer/sendOTPVerifiedEmail.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import generateVerificationToken from '../utils/generateVerificationToken.js';
import { getVerificationTokenExpireTime } from '../utils/getSimpleThings.js';
import { refreshCurrentToken } from '../utils/refreshToken.js';

export const SignUp = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('All Fields are required');
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({ email, password: hashedPassword, name, verificationToken, verificationTokenExpiresAt: getVerificationTokenExpireTime() });
        await user.save();

        generateTokenAndSetCookie(res, user._id);
        await sendWelcomeEmail(name, email, verificationToken);
        res.status(201).json({
            success: true, message: "User Created Sucessfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const LogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Email and Password are required');
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Email or User not Found" });
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(404).json({ success: false, message: "Invalid Password" });
        }
        generateTokenAndSetCookie(res, user._id);
        return res.status(200).json({
            success: true, message: "User LoggedIn Sucessfully"
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const LogOut = async (_req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({ success: true, message: "User Logged Out Sucessfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const RefreshToken = async (req, res) => {
    const { currentToken, email } = req.body;

    if (!currentToken || !email) {
        return res.status(400).json({ message: 'Token and email are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { refreshed, token, tokenValidTill } = refreshCurrentToken(currentToken, user._id.toString());

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({ token, refreshed, tokenValidTill });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export const DeleteUser = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            throw new Error('Bruh just give an email');
        }
        const userAlreadyExists = await User.findOne({ email });
        if (!userAlreadyExists) {
            throw new Error('Bruh this email is not registered');
        } else {
            const result = await User.findOneAndDelete({ email });
            if (result) {
                res.status(200).json({ success: true, message: "Deleted that User" });
            }
        }

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const VerifyOTP = async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        return res.status(404).json({ success: false, message: "Valid OTP is Required" });
    }
    try {
        const userExists = await User.findOne({ verificationToken: otp });
        if (!userExists) {
            return res.status(404).json({ success: false, message: `An account associated with ${email} is not found` });
        }
        if (otp !== userExists.verificationToken || userExists.verificationTokenExpiresAt <= Date.now()) {
            return res.status(400).json({ success: false, message: "The OTP you entered is not Valid or Expired" });
        }
        await User.findByIdAndUpdate(userExists._id, { $set: { isVerified: true } })

        generateTokenAndSetCookie(res, userExists._id, true);
        await sendOTPVerifiedEmail(userExists?.name, userExists?.email);
        return res.status(200).json({ success: true, message: "OTP Verified Sucessfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const VerifyEmail = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    if (!email) {
        return res.status(404).json({ success: false, message: "Email is Required" });
    }
    try {
        const userExists = await User.findOne({ email });
        console.log(userExists)
        if (!userExists) {
            return res.status(404).json({ success: false, message: `An account associated with ${email} is not found` });
        }
        const verificationToken = generateVerificationToken();
        await User.findByIdAndUpdate(userExists._id, { $set: { verificationToken, verificationTokenExpiresAt: getVerificationTokenExpireTime() } }, { new: true });
        sendPasswordResetEmail(userExists.name, email, verificationToken);
        return res.status(200).json({ success: true, message: "User is Valid, Password Reset Email has been sent" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword, token } = req.body;
        if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match or are invalid." });
        }
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized or token missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.verificationToken = "";
        user.verificationTokenExpiresAt = "";
        await user.save();
        res.status(200).json({ success: true, message: "Password has been reset successfully." });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
}

export const CheckAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(400).json({ success: false, message: 'User not found' })
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log('Error in Checking User Authentication', error);
        res.status(400).json({ success: false, message: error.message });
    }

}