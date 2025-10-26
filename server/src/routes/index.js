// Pruebas/server/src/routes/index.js
// Aqui se definen las rutas principales de la aplicacion
// y se importan las rutas de notificaciones push
import { Router } from 'express';
import pushRoutes from './pushRoutes.js';
import adminRoutes from './adminRoutes.js';
import temporizadorRoute from './temporizadorRoute.js';
const router = Router();

router.use('/push', pushRoutes);
router.use('/admin', adminRoutes);
router.use('/temporizador', temporizadorRoute);
export default router;