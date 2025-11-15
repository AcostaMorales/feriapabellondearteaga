// controllers/SimpleSchedulerController.js
// Controlador simplificado para el scheduler

import simpleNotificationScheduler from '../services/SimpleNotificationScheduler.js';

export const getSchedulerStatus = async (req, res) => {
  try {
    const status = simpleNotificationScheduler.getStatus();
    
    res.json({
      success: true,
      data: {
        ...status,
        message: status.status === 'running' ? 
          'Scheduler funcionando correctamente' : 
          'Scheduler detenido',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo estado del scheduler:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estado del scheduler',
      error: error.message
    });
  }
};

export const startScheduler = async (req, res) => {
  try {
    const { cronExpression } = req.body;
    
    simpleNotificationScheduler.start(cronExpression || '*/5 * * * *');
    
    res.json({
      success: true,
      message: 'Scheduler iniciado correctamente',
      data: simpleNotificationScheduler.getStatus()
    });
    
  } catch (error) {
    console.error('❌ Error iniciando scheduler:', error);
    res.status(500).json({
      success: false,
      message: 'Error iniciando scheduler',
      error: error.message
    });
  }
};

export const stopScheduler = async (req, res) => {
  try {
    simpleNotificationScheduler.stop();
    
    res.json({
      success: true,
      message: 'Scheduler detenido correctamente',
      data: simpleNotificationScheduler.getStatus()
    });
    
  } catch (error) {
    console.error('❌ Error deteniendo scheduler:', error);
    res.status(500).json({
      success: false,
      message: 'Error deteniendo scheduler',
      error: error.message
    });
  }
};

export const runSchedulerNow = async (req, res) => {
  try {
    await simpleNotificationScheduler.runNow();
    
    res.json({
      success: true,
      message: 'Scheduler ejecutado manualmente',
      data: simpleNotificationScheduler.getStatus()
    });
    
  } catch (error) {
    console.error('❌ Error ejecutando scheduler:', error);
    res.status(500).json({
      success: false,
      message: 'Error ejecutando scheduler',
      error: error.message
    });
  }
};