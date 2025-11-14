// controllers/SubscriptionController.js
import Subscription from '../models/Subscription.js';
import webpush from '../config/webpush.js';

const SubscriptionController = {
  // POST /push/subscribe
  async subscribe(req, res, next) {
    try {
      const { deviceId, subscription } = req.body || {};

      if (!deviceId || !subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
        return res.status(400).json({ message: 'Invalid subscription data' });
      }

      await Subscription.findOneAndUpdate(
        { deviceId },
        {
          deviceId,
          endpoint: subscription.endpoint,
          keys: subscription.keys,
          lastSeen: new Date(),
          userAgent: req.get('user-agent') || undefined,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return res.status(201).json({ message: 'Subscription saved successfully' });
    } catch (err) {
      next(err);
    }
  },

  // POST /push/broadcast
  async broadcast(req, res, next) {
    try {
      // 1) Carga endpoints
      const subs = await Subscription.find({}, { endpoint: 1, keys: 1, deviceId: 1 });

      // 2) Payload (con defaults)
      const payload = JSON.stringify({
        title: req.body.title || 'Notificación',
        body: req.body.body || 'Tienes una nueva notificación',
        icon: req.body.icon || '/icon.png',
        url: req.body.url || '/',
        data: req.body.data || {},
      });

      // 3) Envío concurrente
      const results = await Promise.allSettled(
        subs.map((sub) => webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload))
      );

      // 4) Limpieza de suscripciones expiradas (404/410)
      const toDelete = results
        .map((result, index) => ({ result, sub: subs[index] }))
        .filter((x) => x.result.status === 'rejected' && [404, 410].includes(x.result.reason?.statusCode))
        .map((x) => ({ deviceId: x.sub.deviceId }));

      if (toDelete.length) {
        await Subscription.deleteMany({ $or: toDelete });
      }

      // 5) Resumen
      const successful = results.filter((r) => r.status === 'fulfilled').length;
      const failed = results.filter((r) => r.status === 'rejected').length;

      return res.status(200).json({
        message: 'Broadcast completed',
        total: subs.length,
        successful,
        failed,
        removed: toDelete.length,
      });
    } catch (err) {
      next(err);
    }
  },

  // --- OPCIONALES ----

  // POST /push/unsubscribe
  async unsubscribe(req, res, next) {
    try {
      const { deviceId, endpoint } = req.body || {};
      if (!deviceId && !endpoint) {
        return res.status(400).json({ message: 'deviceId or endpoint required' });
      }
      const query = deviceId ? { deviceId } : { endpoint };
      const result = await Subscription.deleteOne(query);
      return res.status(200).json({ message: 'Unsubscribed', deleted: result.deletedCount });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /push/unsubscribe/:deviceId
  async unsubscribeByDevice(req, res, next) {
    try {
      const { deviceId } = req.params;
      if (!deviceId) {
        return res.status(400).json({ message: 'deviceId required' });
      }
      
      const result = await Subscription.deleteOne({ deviceId });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      
      return res.status(200).json({ 
        message: 'Unsubscribed successfully', 
        deviceId,
        deleted: result.deletedCount 
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /push/touch (actualizar lastSeen)
  async touch(req, res, next) {
    try {
      const { deviceId } = req.body || {};
      if (!deviceId) return res.status(400).json({ message: 'deviceId required' });
      await Subscription.findOneAndUpdate({ deviceId }, { lastSeen: new Date() });
      return res.status(200).json({ message: 'Touched' });
    } catch (err) {
      next(err);
    }
  },

  // POST /push/to-device (admin)
  async sendToDevice(req, res, next) {
    try {
      const { deviceId, payload } = req.body || {};
      if (!deviceId || !payload) return res.status(400).json({ message: 'deviceId and payload required' });

      const sub = await Subscription.findOne({ deviceId });
      if (!sub) return res.status(404).json({ message: 'Subscription not found' });

      await webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, JSON.stringify(payload));
      return res.status(200).json({ message: 'Sent' });
    } catch (err) {
      // Si está expirada, la eliminamos
      if ([404, 410].includes(err?.statusCode)) {
        await Subscription.deleteOne({ deviceId: req.body.deviceId }).catch(() => {});
        return res.status(410).json({ message: 'Subscription expired and removed' });
      }
      next(err);
    }
  },

  // GET /push/subscriptions (admin)
  async listSubscriptions(req, res, next) {
    try {
      const subscriptions = await Subscription.find({}, {
        deviceId: 1,
        endpoint: 1,
        userAgent: 1,
        lastSeen: 1,
        createdAt: 1
      }).sort({ lastSeen: -1 });

      return res.status(200).json({
        message: 'Subscriptions retrieved successfully',
        count: subscriptions.length,
        subscriptions
      });
    } catch (err) {
      next(err);
    }
  },
};

export default SubscriptionController;
