import express from 'express';

const Router = express.Router();

Router.get('/signup', (req, res) => {
    res.send("Signup Page");
});

Router.get('/login', (req, res) => {
    res.send("Login Page");
});

Router.get('/logout', (req, res) => {
    res.send("Logout Page");
});

export default Router;