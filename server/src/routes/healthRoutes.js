import { Router } from 'express';
import mongoose from 'mongoose';
import notificationScheduler from '../services/notificationScheduler.js';

const router = Router();

router.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const schedulerStatus = notificationScheduler.getStatus();
  
  res.json({ 
    ok: true, 
    status: 'healthy',
    env: process.env.NODE_ENV, 
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      database: dbStatus,
      scheduler: schedulerStatus.isRunning ? 'running' : 'stopped'
    },
    uptime: process.uptime()
  });
});

export default router;
