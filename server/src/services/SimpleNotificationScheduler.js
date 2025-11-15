// services/SimpleNotificationScheduler.js
// Scheduler simplificado sin dependencias externas

class SimpleNotificationScheduler {
  constructor() {
    this.status = 'stopped';
    this.cronExpression = null;
    this.intervalId = null;
    this.lastRun = null;
    this.nextRun = null;
    this.runCount = 0;
    this.errors = [];
  }

  // Iniciar el scheduler
  start(cronExpression = '*/5 * * * *') {
    try {
      if (this.status === 'running') {
        console.log('📅 Scheduler ya está en ejecución');
        return;
      }

      this.cronExpression = cronExpression;
      this.status = 'running';
      
      // Simular ejecución cada 5 minutos (simplificado)
      const intervalMinutes = this.parseCronToMinutes(cronExpression);
      
      this.intervalId = setInterval(() => {
        this.runScheduledTasks();
      }, intervalMinutes * 60 * 1000);

      this.calculateNextRun(intervalMinutes);
      
      console.log(`📅 Scheduler iniciado con expresión: ${cronExpression}`);
      console.log(`⏰ Próxima ejecución: ${this.nextRun}`);
      
    } catch (error) {
      console.error('❌ Error iniciando scheduler:', error);
      this.errors.push({
        timestamp: new Date().toISOString(),
        error: error.message
      });
      this.status = 'error';
    }
  }

  // Detener el scheduler
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.status = 'stopped';
    this.cronExpression = null;
    this.nextRun = null;
    
    console.log('🛑 Scheduler detenido');
  }

  // Ejecutar manualmente
  async runNow() {
    console.log('🚀 Ejecutando scheduler manualmente...');
    await this.runScheduledTasks();
  }

  // Obtener estado del scheduler
  getStatus() {
    return {
      status: this.status,
      cronExpression: this.cronExpression,
      lastRun: this.lastRun,
      nextRun: this.nextRun,
      runCount: this.runCount,
      recentErrors: this.errors.slice(-5), // Últimos 5 errores
      uptime: this.status === 'running' ? this.calculateUptime() : 0
    };
  }

  // Ejecutar tareas programadas (simulado)
  async runScheduledTasks() {
    try {
      this.lastRun = new Date().toISOString();
      this.runCount++;

      console.log(`📋 Ejecutando tareas programadas #${this.runCount}...`);
      
      // Simular procesamiento de notificaciones programadas
      await this.processScheduledNotifications();
      
      // Calcular próxima ejecución
      if (this.status === 'running') {
        const intervalMinutes = this.parseCronToMinutes(this.cronExpression);
        this.calculateNextRun(intervalMinutes);
      }

      console.log(`✅ Tareas completadas. Próxima: ${this.nextRun}`);
      
    } catch (error) {
      console.error('❌ Error ejecutando tareas:', error);
      this.errors.push({
        timestamp: new Date().toISOString(),
        error: error.message
      });
    }
  }

  // Procesar notificaciones programadas (simulado)
  async processScheduledNotifications() {
    // Simular procesamiento
    console.log('📱 Verificando notificaciones programadas...');
    console.log('✉️ 0 notificaciones pendientes de envío');
    console.log('🧹 0 notificaciones expiradas limpiadas');
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Convertir expresión cron simple a minutos (muy básico)
  parseCronToMinutes(cronExpression) {
    try {
      // Parsear expresiones básicas como "*/5 * * * *" (cada 5 minutos)
      const parts = cronExpression.split(' ');
      const minutePart = parts[0];
      
      if (minutePart.includes('*/')) {
        const interval = parseInt(minutePart.split('*/')[1]);
        return interval || 5;
      }
      
      return 5; // Default: cada 5 minutos
    } catch (error) {
      console.warn('⚠️ Error parseando cron, usando 5 minutos por defecto');
      return 5;
    }
  }

  // Calcular próxima ejecución
  calculateNextRun(intervalMinutes) {
    if (this.status === 'running') {
      const next = new Date();
      next.setMinutes(next.getMinutes() + intervalMinutes);
      this.nextRun = next.toISOString();
    }
  }

  // Calcular tiempo de actividad
  calculateUptime() {
    if (!this.lastRun) return 0;
    const start = new Date(this.lastRun);
    const now = new Date();
    return Math.floor((now - start) / 1000); // segundos
  }
}

// Instancia singleton
const simpleNotificationScheduler = new SimpleNotificationScheduler();

export default simpleNotificationScheduler;