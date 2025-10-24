import dotenv from 'dotenv';

// ✅ Cargar variables de entorno ANTES que cualquier otra cosa
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/config/db.js';
import temporizadorRoute from './src/routes/temporizadorRoute.js';
import notificationRoute from './src/routes/notificationRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Variables de entorno cargadas:');
console.log('📧 VAPID_SUBJECT:', process.env.VAPID_SUBJECT ? '✅ Configurado' : '❌ No encontrado');
console.log('🔑 VAPID_PUBLIC_KEY:', process.env.VAPID_PUBLIC_KEY ? '✅ Configurado' : '❌ No encontrado');
console.log('🔐 VAPID_PRIVATE_KEY:', process.env.VAPID_PRIVATE_KEY ? '✅ Configurado' : '❌ No encontrado');

connectDB();

const app = express();

// Configuración CORS actualizada
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'https://feriapabellondearteaga-client-vykm.vercel.app',
        'https://*.vercel.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/temporizador', temporizadorRoute);
app.use('/notifications', notificationRoute);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Debug endpoint para verificar base de datos
app.get('/debug/db', async (req, res) => {
    try {
        const mongoose = await import('mongoose');
        const Temporizador = (await import('./src/models/Temporizador.js')).default;
        
        const dbStatus = mongoose.default.connection.readyState;
        const statusMap = {
            0: 'disconnected',
            1: 'connected', 
            2: 'connecting',
            3: 'disconnecting'
        };
        
        const count = await Temporizador.countDocuments();
        const allDocs = await Temporizador.find();
        
        res.json({
            database: {
                status: statusMap[dbStatus],
                readyState: dbStatus
            },
            temporizadores: {
                count: count,
                documents: allDocs
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
});

// Servir panel de administración
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-panel.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CORS origins:`, corsOptions.origin);
});