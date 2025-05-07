import express from 'express';
import { SignUp } from '../controllers/auth.controller';

const Router = express.Router();

Router.get('/signup', SignUp);

Router.get('/login', (req, res) => {
    res.send("Login Page");
});

Router.get('/logout', (req, res) => {
    res.send("Logout Page");
});

export default Router;