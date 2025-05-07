import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import generateVerificationToken from '../utils/generateVerificationToken.js';
import { get24HoursInMilliseconds } from '../utils/getSimpleThings.js';

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

        const hashedPassword = await bcryptjs.hash(password, 10);
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
    res.send("Login Page");
}

export const LogOut = async (req, res) => {
    res.send("Logout Page");
}