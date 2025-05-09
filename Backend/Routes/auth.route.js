import express from 'express';
import { DeleteUser, LogIn, LogOut, RefreshToken, ResetPassword, SignUp, VerifyEmail, VerifyOTP } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post('/signup', SignUp);
Router.post('/login', LogIn);
Router.post('/logout', LogOut);
Router.post('/refreshToken', RefreshToken);
Router.post('/deleteUser', DeleteUser);
Router.post('/verifyEmail', VerifyEmail);
Router.post('/verifyOtp', VerifyOTP);
Router.post('/resetPassword', ResetPassword);

export default Router;