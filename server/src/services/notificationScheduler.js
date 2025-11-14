// services/notificationScheduler.js
import cron from 'node-cron';
import Notification from '../models/Notification.js';
import Subscription from '../models/Subscription.js';
import webpush from '../config/webpush.js';

class NotificationScheduler {
  constructor() {
    this.tasks = new Map(); // Para almacenar tareas cron activas
    this.isRunning = false;
  }

  /**
   * 🕒 FUNCIÓN PRINCIPAL: Procesa notificaciones programadas
   * Se ejecuta cada X minutos buscando notificaciones listas para enviar
   */
  async processScheduledNotifications() {
    try {
      const now = new Date();
      
      // 1️⃣ Buscar notificaciones listas para enviar
      const readyNotifications = await Notification.find({
        nextRunAt: { $lte: now },
        status: 'scheduled',
        $or: [
          { expireAt: { $exists: false } },
          { expireAt: { $gt: now } }
        ]
      }).sort({ nextRunAt: 1 }); // Más antiguas primero

      if (readyNotifications.length === 0) {
        console.log('⏰ No hay notificaciones programadas para enviar');
        return;
      }

      console.log(`📨 Procesando ${readyNotifications.length} notificaciones programadas...`);

      // 2️⃣ Procesar cada notificación secuencialmente
      for (const notification of readyNotifications) {
        await this.sendScheduledNotification(notification);
        await this.updateNextRun(notification, now);
      }
      
    } catch (error) {
      console.error('❌ Error en processScheduledNotifications:', error);
    }
  }

  /**
   * 📤 ENVIAR NOTIFICACIÓN: Envía la notificación a todos los dispositivos suscritos
   */
  async sendScheduledNotification(notification) {
    try {
      console.log(`🚀 Enviando: "${notification.title}"`);

      // 1️⃣ Obtener suscripciones activas
      const subscriptions = await Subscription.find({}, {
        endpoint: 1,
        keys: 1,
        deviceId: 1
      });

      if (subscriptions.length === 0) {
        console.log(`⚠️ No hay suscripciones activas para: "${notification.title}"`);
        return { successful: 0, failed: 0, removed: 0 };
      }

      // 2️⃣ Preparar payload de la notificación
      const payload = JSON.stringify({
        title: notification.title,
        body: notification.body,
        icon: notification.icon || '/icon.png',
        url: notification.url || '/',
        data: {
          notificationId: notification._id.toString(),
          timestamp: new Date().toISOString(),
          ...notification.data
        }
      });

      // 3️⃣ Envío masivo a todas las suscripciones
      const results = await Promise.allSettled(
        subscriptions.map(sub => 
          webpush.sendNotification(
            { endpoint: sub.endpoint, keys: sub.keys }, 
            payload
          )
        )
      );

      // 4️⃣ Limpiar suscripciones expiradas automáticamente
      const toDelete = results
        .map((result, index) => ({ result, sub: subscriptions[index] }))
        .filter(x => x.result.status === 'rejected' && 
                    [404, 410].includes(x.result.reason?.statusCode))
        .map(x => ({ deviceId: x.sub.deviceId }));

      if (toDelete.length > 0) {
        await Subscription.deleteMany({ $or: toDelete });
        console.log(`🗑️ Eliminadas ${toDelete.length} suscripciones expiradas`);
      }

      // 5️⃣ Calcular estadísticas
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`✅ "${notification.title}" enviado a ${successful}/${subscriptions.length} dispositivos`);
      if (failed > 0) {
        console.log(`⚠️ ${failed} envíos fallaron (dispositivos probablemente desinstalados)`);
      }

      // 6️⃣ Actualizar estadísticas de la notificación
      await this.updateNotificationStats(notification, successful, failed, toDelete.length);

      return { successful, failed, removed: toDelete.length };
      
    } catch (error) {
      console.error(`❌ Error enviando "${notification.title}":`, error);
      return { successful: 0, failed: 0, removed: 0 };
    }
  }

  /**
   * 📊 ACTUALIZAR ESTADÍSTICAS: Guarda métricas del envío
   */
  async updateNotificationStats(notification, successful, failed, removed) {
    try {
      notification.lastSentAt = new Date();
      notification.sentCount = (notification.sentCount || 0) + 1;
      notification.successfulSends = (notification.successfulSends || 0) + successful;
      notification.failedSends = (notification.failedSends || 0) + failed;
      
      await notification.save();
    } catch (error) {
      console.error(`❌ Error actualizando estadísticas para "${notification.title}":`, error);
    }
  }

  /**
   * ⏰ CALCULAR PRÓXIMA EJECUCIÓN: Determina cuándo enviar la siguiente notificación
   */
  async updateNextRun(notification, now) {
    try {
      // 1️⃣ Si no es repetitiva, marcar como completada
      if (!notification.repeatEveryHours || notification.repeatEveryHours <= 0) {
        notification.status = 'completed';
        notification.nextRunAt = null;
        await notification.save();
        console.log(`🏁 Notificación completada: "${notification.title}"`);
        return;
      }

      // 2️⃣ Calcular siguiente ejecución para notificaciones repetitivas
      const msPerCycle = notification.repeatEveryHours * 60 * 60 * 1000;
      const nextRun = new Date(notification.nextRunAt.getTime() + msPerCycle);

      // 3️⃣ Verificar si ya expiró
      if (notification.expireAt && nextRun >= notification.expireAt) {
        notification.status = 'completed';
        notification.nextRunAt = null;
        console.log(`⏰ Notificación expirada y completada: "${notification.title}"`);
      } else {
        notification.nextRunAt = nextRun;
        console.log(`⏰ Próximo envío de "${notification.title}": ${nextRun.toLocaleString('es-ES')}`);
      }

      await notification.save();
      
    } catch (error) {
      console.error(`❌ Error actualizando nextRun para "${notification.title}":`, error);
    }
  }

  /**
   * 🚀 INICIAR SCHEDULER: Configura y arranca el cron job
   */
  start(cronExpression = '*/2 * * * *') {
    if (this.isRunning) {
      console.log('⚠️ Scheduler ya está ejecutándose');
      return;
    }

    // Crear tarea cron principal
    const mainTask = cron.schedule(cronExpression, () => {
      this.processScheduledNotifications();
    }, {
      scheduled: false // No iniciar automáticamente
    });

    this.tasks.set('main', mainTask);
    
    // Iniciar la tarea
    mainTask.start();
    this.isRunning = true;

    // Ejecutar inmediatamente al iniciar (opcional)
    setTimeout(() => {
      this.processScheduledNotifications();
    }, 5000); // Esperar 5 segundos después del inicio
    
    console.log(`🚀 Notification Scheduler iniciado`);
    console.log(`⏰ Ejecutándose cada: ${this.parseCronExpression(cronExpression)}`);
    console.log(`📋 Próxima ejecución: ${this.getNextExecutionTime(cronExpression)}`);
  }

  /**
   * ⏹️ PARAR SCHEDULER: Detiene todas las tareas cron
   */
  stop() {
    if (!this.isRunning) {
      console.log('⚠️ Scheduler no está ejecutándose');
      return;
    }

    this.tasks.forEach((task, name) => {
      task.stop();
      console.log(`⏹️ Tarea "${name}" detenida`);
    });
    
    this.tasks.clear();
    this.isRunning = false;
    console.log('⏹️ Notification Scheduler completamente detenido');
  }

  /**
   * 📊 ESTADO DEL SCHEDULER: Información del estado actual
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      activeTasks: this.tasks.size,
      taskNames: Array.from(this.tasks.keys())
    };
  }

  /**
   * 🔧 UTILIDADES: Parsear expresión cron
   */
  parseCronExpression(expression) {
    const parts = expression.split(' ');
    if (parts[0].startsWith('*/')) {
      const minutes = parts[0].replace('*/', '');
      return `${minutes} minutos`;
    }
    return expression;
  }

  getNextExecutionTime(expression) {
    // Cálculo simple para */X casos
    const parts = expression.split(' ');
    if (parts[0].startsWith('*/')) {
      const minutes = parseInt(parts[0].replace('*/', ''));
      const next = new Date();
      next.setMinutes(next.getMinutes() + minutes);
      return next.toLocaleString('es-ES');
    }
    return 'Calculando...';
  }

  /**
   * 🧪 EJECUTAR MANUALMENTE (para testing)
   */
  async runNow() {
    console.log('🧪 Ejecutando scheduler manualmente...');
    await this.processScheduledNotifications();
  }
}

// Exportar instancia singleton
export default new NotificationScheduler();