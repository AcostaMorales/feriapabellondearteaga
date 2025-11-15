// routes/schedulerRoute.js
// Rutas simplificadas para el scheduler

import express from 'express';
import { 
  getSchedulerStatus, 
  startScheduler, 
  stopScheduler, 
  runSchedulerNow 
} from '../controllers/SimpleSchedulerController.js';
import { basicAuthMiddleware } from '../middlewares/basicAuth.js';

const router = express.Router();

// Rutas públicas
router.get('/status', getSchedulerStatus);

// Rutas protegidas (requieren autenticación)
router.post('/start', basicAuthMiddleware, startScheduler);
router.post('/stop', basicAuthMiddleware, stopScheduler);
router.post('/run-now', basicAuthMiddleware, runSchedulerNow);

export default router;