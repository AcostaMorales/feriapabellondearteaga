import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    // === Contenido a mostrar en la notificación ===
    //titulo
    title: { type: String, required: true, trim: true },
    //cuerpo / mensaje
    message: { type: String, required: true, trim: true },
    //cuerpo (alias para compatibilidad)
    body: { type: String, trim: true },
    //icono
    icon: { type: String, default: '/icon.png', trim: true },
    //url a abrir al hacer clic en la notificación
    url: { type: String, default: '/', trim: true },
    // datos adicionales que se pueden enviar con la notificación
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    // tipo de notificación para mostrar iconos diferentes
    type: { 
      type: String, 
      enum: ['info', 'event', 'update', 'warning', 'success'], 
      default: 'info' 
    },
    // campo para marcar como leída
    read: { type: Boolean, default: false },

    // === Destino: a todos o a una lista de deviceIds ===
    // objetivo de la notificación
    target: {
      type: {
        type: String,
        // todos o dispositivo
        enum: ['all', 'device'],
        // default es todos
        default: 'all',
      },
    // lista de deviceIds a los que se enviará la notificación (si target.type es 'device')
    deviceIds: {
        type: [String],
        default: [],
        validate: {
          validator(arr) {
            return this.target.type === 'all' || (Array.isArray(arr) && arr.length > 0);
          },
          message: 'deviceIds requerido cuando target.type = "device"',
        },
      },
    },

    // === Programación ===
    // cuándo enviar la notificación
    startAt: { type: Date, default: () => new Date() },     // primer intento
    // cada cuántas horas repetir, se escribe por horas
    repeatEveryHours: { type: Number, default: 0, min: 0 }, // 0 => no repetir
    // cuándo dejar de intentar enviar la notificación
    expireAt: { type: Date, required: true },               // fecha límite

    // === Control de ejecución ===
    status: {
      type: String,
      // schedulced: programada
      // running: en ejecución
      // completed: completada
      // cancelled: cancelada
      enum: ['scheduled', 'running', 'completed', 'cancelled'],
      default: 'scheduled',
      index: true,
    },

    // nextRunAt es la próxima corrida planificada
    // osea la próxima vez que se intentará enviar la notificación
    nextRunAt: { type: Date, default: null, index: true }, // próxima corrida planificada
    // lastSentAt es la última vez que se envió la notificación
    lastSentAt: { type: Date, default: null },

    // === Metadatos opcionales ===
    // quien creó la notificación
    createdBy: { type: String, trim: true },
  },
  { timestamps: true },
)
// Índice para optimizar consultas por nextRunAt
// osea para encontrar las notificaciones que deben ejecutarse pronto
NotificationSchema.index({ nextRunAt: 1 });
// Índice para eliminar notificaciones expiradas automáticamente
// osea para limpiar notificaciones que ya no son válidas
// expireAt: 1 significa que se ordenará por la fecha de expiración
NotificationSchema.index({ expireAt: 1 });

// Index para eliminar notificaciones expiradas automáticamente
// expireAfterSeconds: 0 significa que se eliminará inmediatamente después de la fecha expireAt
//NotificationSchema.index({expireAt: 1}, {expireAfterSeconds: 0});


// Método para convertir la notificación a una carga útil JSON
// que puede ser enviada a través de web push
NotificationSchema.methods.toPayLoad = function toPayLoad() {
    return JSON.stringify({
        title: this.title,
        body: this.message || this.body, // usar message primero, luego body como fallback
        icon: this.icon,
        url: this.url,
        data: this.data,
    });
}

// Método para calcular la próxima ejecución basada en la configuración de repetición

NotificationSchema.methods.computeNextRun = function computerNextRun(now = new Date()){
    // Recuperar los valores de inicio y repetición
    const {startAt, repeatEveryHours} = this;
    // Si no hay una hora de inicio, no se puede calcular la próxima ejecución
    if (!startAt) {
        // Si no hay hora de inicio
        return null;
    }

    // msPerHour es milisegundos por hora
    const msPerHour = 3600_000;

    // Si no hay repetición, la próxima ejecución es la hora de inicio o ahora, lo que sea mayor
    if (!repeatEveryHours || repeatEveryHours <= 0){
        return startAt > now ? startAt : now;
    }

    // Calcular la diferencia en milisegundos entre ahora y el inicio
    const diff = now.getTime() - startAt.getTime();

    // Si la diferencia es menor o igual a cero regresa la hora de inicio
    if (diff <=0 ) {
        return startAt;
    }

    // Calcular cuántos intervalos de repetición han pasado desde el inicio
    const intervals = Math.ceil(diff / (repeatEveryHours * msPerHour));

    // Regresa la próxima ejecucion sumando los intervalos al inicio
    return new Date(startAt.getTime() + intervals * repeatEveryHours * msPerHour);

}

// Gancho pre-validación para asegurar que nextRunAt esté correctamente calculado antes de guardar
NotificationSchema.pre('validate', function preValidate(next){

    // Si nextRunAt no esta definido lo calculamos
    // osea si no tiene un valor le asignamos el valor calculado
    if (!this.nextRunAt){
        this.nextRunAt = this.computeNextRun(new Date());
    }

    // Si expireAt existe y nextRunAt existe y nextRunAt es mayor que expireAt
    // osea si la proxima ejecucion es despues de la expiracion
    if (this.expireAt && this.nextRunAt && this.nextRunAt > this.expireAt){
        // entonces no hay proxima ejecucion
        this.nextRunAt = null;
        // si hay repeticion y es menor o igual a 0
        if (this.repeatEveryHours && this.repeatEveryHours <= 0){
            // marcamos la notificacion como completada
            this.status = 'completed';
        }
    }

    // Continuar con la validación
    next();
})

export default mongoose.model('Notification', NotificationSchema);