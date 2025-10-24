import webpush from 'web-push';
import Subscription from '../models/Subscription.js';

// Validar variables VAPID
const validateVapidConfig = () => {
    const { VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;
    
    if (!VAPID_SUBJECT) {
        throw new Error('VAPID_SUBJECT no está configurado en las variables de entorno');
    }
    if (!VAPID_PUBLIC_KEY) {
        throw new Error('VAPID_PUBLIC_KEY no está configurado en las variables de entorno');
    }
    if (!VAPID_PRIVATE_KEY) {
        throw new Error('VAPID_PRIVATE_KEY no está configurado en las variables de entorno');
    }
    
    console.log('✅ Configuración VAPID validada correctamente');
    console.log('📧 VAPID_SUBJECT:', VAPID_SUBJECT);
};

// Configurar VAPID con validación
try {
    validateVapidConfig();
    webpush.setVapidDetails(
        process.env.VAPID_SUBJECT,
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
    console.log('🚀 Web Push configurado correctamente');
} catch (error) {
    console.error('❌ Error configurando VAPID:', error.message);
    console.error('🔧 Verifica tu archivo .env');
}

// Suscribir dispositivo
export const subscribe = async (req, res) => {
    try {
        const { subscription, deviceId } = req.body;

        // Verificar si ya existe el dispositivo
        const existingDevice = await Subscription.findOne({ deviceId });
        
        if (existingDevice) {
            // Actualizar suscripción existente
            existingDevice.endpoint = subscription.endpoint;
            existingDevice.keys = subscription.keys;
            existingDevice.lastUsed = new Date();
            existingDevice.isActive = true;
            await existingDevice.save();
        } else {
            // Crear nueva suscripción
            const newSubscription = new Subscription({
                deviceId,
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                userAgent: req.headers['user-agent']
            });
            await newSubscription.save();
        }

        res.status(201).json({ success: true, message: 'Dispositivo suscrito correctamente' });
    } catch (error) {
        console.error('Error suscribiendo dispositivo:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Enviar notificación a todos los dispositivos
export const sendNotification = async (req, res) => {
    try {
        const { title, body, icon, badge, url } = req.body;

        // Obtener todas las suscripciones activas
        const subscriptions = await Subscription.find({ isActive: true });

        if (subscriptions.length === 0) {
            return res.status(404).json({ success: false, message: 'No hay dispositivos suscritos' });
        }

        const payload = JSON.stringify({
            title: title || 'Feria de Pabellón de Arteaga',
            body: body || 'Nueva notificación',
            icon: icon || '/pwa-192x192.png',
            badge: badge || '/pwa-192x192.png',
            url: url || '/',
            timestamp: Date.now(),
            tag: 'feria-notification'
        });

        const notificationPromises = subscriptions.map(async (sub) => {
            try {
                await webpush.sendNotification({
                    endpoint: sub.endpoint,
                    keys: sub.keys
                }, payload);
                
                // Actualizar último uso
                sub.lastUsed = new Date();
                await sub.save();
                
                return { deviceId: sub.deviceId, success: true };
            } catch (error) {
                // Si la suscripción es inválida, marcarla como inactiva
                if (error.statusCode === 410 || error.statusCode === 404) {
                    sub.isActive = false;
                    await sub.save();
                }
                console.error(`Error enviando a ${sub.deviceId}:`, error);
                return { deviceId: sub.deviceId, success: false, error: error.message };
            }
        });

        const results = await Promise.all(notificationPromises);
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;

        res.json({
            success: true,
            message: `Notificación enviada a ${successful} dispositivos`,
            details: {
                total: subscriptions.length,
                successful,
                failed,
                results
            }
        });
    } catch (error) {
        console.error('Error enviando notificaciones:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Desuscribir dispositivo
export const unsubscribe = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const subscription = await Subscription.findOne({ deviceId });
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Dispositivo no encontrado' });
        }

        subscription.isActive = false;
        await subscription.save();

        res.json({ success: true, message: 'Dispositivo desuscrito correctamente' });
    } catch (error) {
        console.error('Error desuscribiendo dispositivo:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener estadísticas de suscripciones
export const getStats = async (req, res) => {
    try {
        const activeSubscriptions = await Subscription.countDocuments({ isActive: true });
        const totalSubscriptions = await Subscription.countDocuments();
        const recentSubscriptions = await Subscription.countDocuments({ 
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            isActive: true 
        });

        res.json({
            success: true,
            stats: {
                active: activeSubscriptions,
                total: totalSubscriptions,
                recent24h: recentSubscriptions
            }
        });
    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};