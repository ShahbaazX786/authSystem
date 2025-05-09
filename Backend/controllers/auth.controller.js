import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import generateVerificationToken from '../utils/generateVerificationToken.js';
import { get24HoursInMilliseconds } from '../utils/getSimpleThings.js';
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
        const user = new User({ email, password: hashedPassword, name, verificationToken, verificationTokenExpiresAt: get24HoursInMilliseconds() });
        await user.save();

        generateTokenAndSetCookie(res, user._id);
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

export const refreshToken = async (req, res) => {
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