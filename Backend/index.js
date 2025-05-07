import express from 'express';
import { connectDB } from './db/ConnectDB.js';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.route.js';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.get('/', (req, res) => {
    res.send('Bismillah');
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})