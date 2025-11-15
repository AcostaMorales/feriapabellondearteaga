import dotenv from 'dotenv';
import http from 'http';
import express from 'express';

import app from './app.js';
import connectDB from './config/db.js';
import './config/webpush.js';
import notificationScheduler from './services/notificationScheduler.js';

dotenv.config();
await connectDB();

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  
  // 🕒 Iniciar el scheduler de notificaciones automáticas
  console.log('🔔 Iniciando sistema de notificaciones automáticas...');
  notificationScheduler.start('*/2 * * * *'); // Cada 2 minutos
});

// 🛑 Graceful shutdown - Detener scheduler al cerrar servidor
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor graciosamente...');
  notificationScheduler.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM recibido, cerrando servidor...');
  notificationScheduler.stop();
  process.exit(0);
});