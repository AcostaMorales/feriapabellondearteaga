// controllers/SimpleSubscriptionController.js
// Controlador simplificado para suscripciones push sin dependencias de Mongoose

let subscriptions = [];

const SimpleSubscriptionController = {
  // POST /push/subscribe
  async subscribe(req, res, next) {
    try {
      const { deviceId, subscription } = req.body || {};

      if (!deviceId || !subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
        return res.status(400).json({ message: 'Invalid subscription data' });
      }

      // Buscar suscripción existente
      const existingIndex = subscriptions.findIndex(sub => sub.deviceId === deviceId);
      
      const subscriptionData = {
        deviceId,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        lastSeen: new Date().toISOString(),
        userAgent: req.get('user-agent') || 'Unknown',
        createdAt: existingIndex === -1 ? new Date().toISOString() : subscriptions[existingIndex].createdAt
      };

      if (existingIndex !== -1) {
        // Actualizar existente
        subscriptions[existingIndex] = subscriptionData;
      } else {
        // Crear nueva
        subscriptions.push(subscriptionData);
      }

      return res.status(201).json({ message: 'Subscription saved successfully' });
    } catch (err) {
      console.error('Error in subscribe:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // POST /push/broadcast
  async broadcast(req, res, next) {
    try {
      console.log('📢 Iniciando broadcast...');
      console.log('Request body:', req.body);
      console.log('Número de suscripciones:', subscriptions.length);

      // Simular broadcast exitoso (sin envío real de notificaciones)
      const payload = {
        title: req.body.title || 'Notificación',
        body: req.body.body || 'Tienes una nueva notificación',
        icon: req.body.icon || '/icon.png',
        url: req.body.url || '/',
        data: req.body.data || {},
      };

      console.log('📢 Simulando broadcast de notificación:', payload);
      console.log(`📱 Enviando a ${subscriptions.length} suscripciones`);

      // Simular resultados
      const successful = subscriptions.length;
      const failed = 0;
      const removed = 0;

      const response = {
        message: 'Broadcast completed (simulated)',
        total: subscriptions.length,
        successful,
        failed,
        removed,
        payload
      };

      console.log('✅ Respuesta del broadcast:', response);
      return res.status(200).json(response);
    } catch (err) {
      console.error('❌ Error in broadcast:', err);
      return res.status(500).json({ 
        message: 'Error interno del servidor',
        error: err.message 
      });
    }
  },

  // POST /push/unsubscribe
  async unsubscribe(req, res, next) {
    try {
      const { deviceId, endpoint } = req.body || {};
      if (!deviceId && !endpoint) {
        return res.status(400).json({ message: 'deviceId or endpoint required' });
      }

      const initialLength = subscriptions.length;
      
      if (deviceId) {
        subscriptions = subscriptions.filter(sub => sub.deviceId !== deviceId);
      } else if (endpoint) {
        subscriptions = subscriptions.filter(sub => sub.endpoint !== endpoint);
      }

      const deleted = initialLength - subscriptions.length;

      return res.status(200).json({ 
        message: 'Unsubscribed', 
        deleted 
      });
    } catch (err) {
      console.error('Error in unsubscribe:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // DELETE /push/unsubscribe/:deviceId
  async unsubscribeByDevice(req, res, next) {
    try {
      const { deviceId } = req.params;
      if (!deviceId) {
        return res.status(400).json({ message: 'deviceId required' });
      }

      const initialLength = subscriptions.length;
      subscriptions = subscriptions.filter(sub => sub.deviceId !== deviceId);
      const deleted = initialLength - subscriptions.length;
      
      if (deleted === 0) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      
      return res.status(200).json({ 
        message: 'Unsubscribed successfully', 
        deviceId,
        deleted 
      });
    } catch (err) {
      console.error('Error in unsubscribeByDevice:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // POST /push/touch (actualizar lastSeen)
  async touch(req, res, next) {
    try {
      const { deviceId } = req.body || {};
      if (!deviceId) {
        return res.status(400).json({ message: 'deviceId required' });
      }

      const subscription = subscriptions.find(sub => sub.deviceId === deviceId);
      if (subscription) {
        subscription.lastSeen = new Date().toISOString();
      }

      return res.status(200).json({ message: 'Touched' });
    } catch (err) {
      console.error('Error in touch:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // POST /push/to-device (admin)
  async sendToDevice(req, res, next) {
    try {
      const { deviceId, payload } = req.body || {};
      if (!deviceId || !payload) {
        return res.status(400).json({ message: 'deviceId and payload required' });
      }

      const subscription = subscriptions.find(sub => sub.deviceId === deviceId);
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }

      console.log('📱 Simulando envío a dispositivo:', deviceId, payload);

      return res.status(200).json({ 
        message: 'Sent (simulated)',
        deviceId,
        payload 
      });
    } catch (err) {
      console.error('Error in sendToDevice:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // GET /push/subscriptions (admin)
  async listSubscriptions(req, res, next) {
    try {
      const subscriptionsToReturn = subscriptions.map(sub => ({
        deviceId: sub.deviceId,
        endpoint: sub.endpoint.substring(0, 50) + '...', // Truncar endpoint para seguridad
        userAgent: sub.userAgent,
        lastSeen: sub.lastSeen,
        createdAt: sub.createdAt
      }));

      return res.status(200).json({
        message: 'Subscriptions retrieved successfully',
        count: subscriptions.length,
        subscriptions: subscriptionsToReturn
      });
    } catch (err) {
      console.error('Error in listSubscriptions:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  },
};

export default SimpleSubscriptionController;