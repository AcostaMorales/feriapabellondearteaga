import express from 'express';
import { subscribe, sendNotification, unsubscribe, getStats } from '../controllers/notificationController.js';

const router = express.Router();

// POST /api/notifications/subscribe - Suscribir dispositivo
router.post('/subscribe', subscribe);

// POST /api/notifications/send - Enviar notificación a todos
router.post('/send', sendNotification);

// DELETE /api/notifications/unsubscribe/:deviceId - Desuscribir dispositivo
router.delete('/unsubscribe/:deviceId', unsubscribe);

// GET /api/notifications/stats - Obtener estadísticas
router.get('/stats', getStats);

export default router;