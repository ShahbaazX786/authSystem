import './utils/dotenvConfig.js';
import express from 'express';
import { connectDB } from './db/ConnectDB.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
    res.send('Bismillah');
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})