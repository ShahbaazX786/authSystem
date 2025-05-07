import express from 'express';
import { LogIn, LogOut, SignUp } from '../controllers/auth.controller.js';

const Router = express.Router();

Router.post('/signup', SignUp);
Router.post('/login', LogIn);
Router.post('/logout', LogOut);

export default Router;