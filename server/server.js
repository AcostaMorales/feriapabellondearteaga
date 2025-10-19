import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import temporizadorRoute from './src/routes/temporizadorRoute.js';

dotenv.config();
connectDB();

const app = express();

// Configuración CORS para Vercel + Render
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://feriapabellondearteaga-client-vykm.vercel.app',
        'https://*.vercel.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/temporizador', temporizadorRoute);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});