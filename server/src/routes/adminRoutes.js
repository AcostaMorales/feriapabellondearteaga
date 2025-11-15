// routes/adminRoutes.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminAuth from '../middlewares/adminAuth.js';
import SimpleNotificationController from '../controllers/SimpleNotificationController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Middleware para deshabilitar CSP en rutas admin
const disableCSP = (req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' http://localhost:* ws://localhost:*"
  );
  next();
};

// GET /admin - Panel de administración (requiere autenticación)
router.get('/', adminAuth, disableCSP, (req, res) => {
  try {
    const panelPath = path.join(__dirname, '../../admin-panel.html');
    res.sendFile(panelPath);
  } catch (error) {
    console.error('❌ Error sirviendo panel de administración:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor' 
    });
  }
});

// GET /admin/status - Estado básico (para verificar autenticación)
router.get('/status', adminAuth, (req, res) => {
  res.json({
    message: '✅ Autenticado correctamente',
    user: process.env.ADMIN_USER,
    timestamp: new Date().toISOString(),
    server: 'Panel de Administración - Pabellón de Arteaga'
  });
});

// === RUTAS DE NOTIFICACIONES ADMIN ===
// POST /admin/notifications - Crear notificación
router.post('/notifications', adminAuth, SimpleNotificationController.create);

// PUT /admin/notifications/:id - Actualizar notificación
router.put('/notifications/:id', adminAuth, SimpleNotificationController.update);

// DELETE /admin/notifications/:id - Eliminar notificación
router.delete('/notifications/:id', adminAuth, SimpleNotificationController.remove);

// GET /admin/notifications - Listar notificaciones (admin)
router.get('/notifications', adminAuth, SimpleNotificationController.listAdmin);

// GET /admin/notifications/:id - Obtener notificación por ID
router.get('/notifications/:id', adminAuth, SimpleNotificationController.getById);

export default router;