import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';

import app from './app.js';
import connectDB from './config/db.js';
import './config/webpush.js';

dotenv.config();
await connectDB();

const PORT = process.env.PORT || 4000;

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    console.log(`🔔 Admin panel: http://localhost:${PORT}/api/admin/notify`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
});
