import express from 'express';
import { connectDB } from './db/ConnectDB.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.get('/', (req, res) => {
    res.send('Bismillah');
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})