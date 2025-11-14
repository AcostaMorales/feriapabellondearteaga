// routes/schedulerRoutes.js
import express from 'express';
import notificationScheduler from '../services/notificationScheduler.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = express.Router();

// GET /scheduler/status - Ver estado del scheduler
router.get('/status', adminAuth, (req, res) => {
  try {
    const status = notificationScheduler.getStatus();
    res.json({
      message: 'Scheduler status',
      ...status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting scheduler status', error: error.message });
  }
});

// POST /scheduler/run-now - Ejecutar manualmente (testing)
router.post('/run-now', adminAuth, async (req, res) => {
  try {
    await notificationScheduler.runNow();
    res.json({ 
      message: 'Scheduler executed manually',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error running scheduler', error: error.message });
  }
});

// POST /scheduler/start - Iniciar scheduler
router.post('/start', adminAuth, (req, res) => {
  try {
    const { cronExpression = '*/2 * * * *' } = req.body;
    notificationScheduler.start(cronExpression);
    res.json({ 
      message: 'Scheduler started',
      cronExpression,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error starting scheduler', error: error.message });
  }
});

// POST /scheduler/stop - Detener scheduler
router.post('/stop', adminAuth, (req, res) => {
  try {
    notificationScheduler.stop();
    res.json({ 
      message: 'Scheduler stopped',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error stopping scheduler', error: error.message });
  }
});

export default router;