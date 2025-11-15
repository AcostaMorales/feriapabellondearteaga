// routes/pushRoutes.js
import { Router } from 'express';
import SimpleSubscriptionController from '../controllers/SimpleSubscriptionController.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = Router();

// Público
router.post('/subscribe', SimpleSubscriptionController.subscribe);

// Admin (requiere autenticación)
router.post('/broadcast', adminAuth, SimpleSubscriptionController.broadcast);
router.get('/subscriptions', adminAuth, SimpleSubscriptionController.listSubscriptions);

// --- Opcionales ---
router.post('/unsubscribe', SimpleSubscriptionController.unsubscribe);
router.delete('/unsubscribe/:deviceId', SimpleSubscriptionController.unsubscribeByDevice);
router.post('/touch', SimpleSubscriptionController.touch);
router.post('/to-device', adminAuth, SimpleSubscriptionController.sendToDevice);

export default router;
