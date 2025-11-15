// routes/pushRoutes.js
import { Router } from 'express';
import SubscriptionController from '../controllers/SubscriptionController.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = Router();

// Público
router.post('/subscribe', SubscriptionController.subscribe);

// Admin (requiere autenticación)
router.post('/broadcast', adminAuth, SubscriptionController.broadcast);
router.get('/subscriptions', adminAuth, SubscriptionController.listSubscriptions);

// --- Opcionales ---
router.post('/unsubscribe', SubscriptionController.unsubscribe);
router.delete('/unsubscribe/:deviceId', SubscriptionController.unsubscribeByDevice);
router.post('/touch', SubscriptionController.touch);
router.post('/to-device', adminAuth, SubscriptionController.sendToDevice);

export default router;
