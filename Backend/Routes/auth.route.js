import express from 'express';
import { LogIn, LogOut, SignUp } from '../controllers/auth.controller';

const Router = express.Router();

Router.get('/signup', SignUp);
Router.get('/login', LogIn);
Router.get('/logout', LogOut);

export default Router;