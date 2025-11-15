// routes/notificationRoutes.js
import { Router } from 'express';
import SimpleNotificationController from '../controllers/SimpleNotificationController.js';

const router = Router();

/** Rutas públicas para notificaciones */
router.get('/', SimpleNotificationController.listPublic);
router.get('/has-new', SimpleNotificationController.hasNew);
router.get('/unread-count', SimpleNotificationController.getUnreadCount);
router.patch('/mark-read', SimpleNotificationController.markAllAsRead);
router.delete('/:id', SimpleNotificationController.deleteNotification);

export default router;
