import express from 'express';
import { DeleteUser, LogIn, LogOut, refreshToken, SignUp } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post('/signup', SignUp);
Router.post('/login', LogIn);
Router.post('/logout', LogOut);
Router.post('/refreshToken', refreshToken);
Router.post('/deleteUser', DeleteUser);

export default Router;