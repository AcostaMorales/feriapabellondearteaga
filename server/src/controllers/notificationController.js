// controllers/NotificationController.js
import Notification from '../models/Notification.js';

/** Utils */
const clamp = (num, min, max) => Math.max(min, Math.min(num, max));
const parseIso = (v) => (v ? new Date(v) : null);

function computeNextRun({ startAt, repeatEveryHours = 0, expireAt, now = new Date() }) {
  const start = startAt ? new Date(startAt) : now;
  const exp = expireAt ? new Date(expireAt) : null;

  // Si no repite
  if (!repeatEveryHours || repeatEveryHours <= 0) {
    const next = start > now ? start : now; // por si quieres forzar un envío inmediato
    if (exp && next >= exp) return null;
    return next;
  }

  // Repetitiva
  const msPerSlot = repeatEveryHours * 60 * 60 * 1000;
  if (start > now) {
    if (exp && start >= exp) return null;
    return start;
  }
  const elapsed = now - start;
  const slots = Math.ceil(elapsed / msPerSlot);
  const next = new Date(start.getTime() + slots * msPerSlot);
  if (exp && next >= exp) return null;
  return next;
}

function buildActiveQuery(now = new Date()) {
  return {
    $or: [
      // Notificaciones activas (programadas o en ejecución)
      {
        startAt: { $lte: now },
        expireAt: { $gt: now },
        status: { $nin: ['cancelled'] },
      },
      // Notificaciones completadas que ya fueron enviadas (para mostrar en historial)
      {
        status: 'completed',
        lastSentAt: { $exists: true }, // Solo las que fueron enviadas
        expireAt: { $gt: now }, // Que no hayan expirado
      }
    ]
  };
}

function buildPublicQuery(now = new Date()) {
  return {
    $or: [
      // Notificaciones completadas que ya fueron enviadas
      {
        status: 'completed',
        lastSentAt: { $exists: true },
        expireAt: { $gt: now },
      },
      // Notificaciones activas que ya empezaron (no programadas para el futuro)
      {
        startAt: { $lte: now },
        expireAt: { $gt: now },
        status: 'running',
      }
    ]
  };
}

const NotificationController = {
  /** ======================
   *  Público
   *  ====================== */

  // GET /notifications
  async listPublic(req, res, next) {
    try {
      const {
        limit: limitRaw,
        page: pageRaw,
        since: sinceRaw,
        now: nowRaw,
      } = req.query;

      const now = parseIso(nowRaw) || new Date();
      const page = clamp(parseInt(pageRaw || '1', 10) || 1, 1, 10_000);
      const limit = clamp(parseInt(limitRaw || '20', 10) || 20, 1, 100);
      const skip = (page - 1) * limit;

      const q = buildPublicQuery(now);
      
      // Filtro adicional por fecha de actualización
      const since = parseIso(sinceRaw);
      if (since) {
        q.updatedAt = { $gt: since };
      }

      const [data, total] = await Promise.all([
        Notification.find(q)
          .sort({ lastSentAt: -1, createdAt: -1, _id: -1 }) // Ordenar por fecha de envío
          .skip(skip)
          .limit(limit)
          .lean(),
        Notification.countDocuments(q),
      ]);

      res.json({
        data,
        page,
        limit,
        total,
        hasMore: skip + data.length < total,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /notifications/has-new
  async hasNew(req, res, next) {
    try {
      const { lastOpenedAt: lastOpenedAtRaw, activeOnly = 'true', now: nowRaw } = req.query;
      const now = parseIso(nowRaw) || new Date();
      const lastOpenedAt = parseIso(lastOpenedAtRaw);

      const q = {};
      if (activeOnly !== 'false') {
        Object.assign(q, buildActiveQuery(now));
      }
      if (lastOpenedAt) {
        q.updatedAt = { $gt: lastOpenedAt };
      }

      const count = await Notification.countDocuments(q);
      res.json({ hasNew: count > 0, count });
    } catch (err) {
      next(err);
    }
  },

  // GET /notifications/unread-count
  async getUnreadCount(req, res, next) {
    try {
      const now = new Date();
      const lastCheck = req.query.lastCheck ? new Date(req.query.lastCheck) : null;
      
      const q = buildActiveQuery(now);
      if (lastCheck) {
        q.createdAt = { $gt: lastCheck };
      }

      const count = await Notification.countDocuments(q);
      res.json({ count, hasNew: count > 0 });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /notifications/mark-read
  async markAllAsRead(req, res, next) {
    try {
      // En este caso simplemente confirmamos la lectura
      // No modificamos las notificaciones, solo enviamos confirmación
      res.json({ message: 'Marked as read', timestamp: new Date() });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /notifications/:id (público)
  async deleteNotification(req, res, next) {
    try {
      const { id } = req.params;
      
      // Solo permitir eliminar notificaciones activas
      const now = new Date();
      const query = { 
        _id: id, 
        ...buildActiveQuery(now)
      };
      
      const result = await Notification.deleteOne(query);
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Notificación no encontrada o no puede ser eliminada' });
      }
      
      res.json({ message: 'Notificación eliminada correctamente' });
    } catch (err) {
      next(err);
    }
  },

  /** ======================
   *  Admin (requireAdmin)
   *  ====================== */

  // POST /admin/notifications
  async create(req, res, next) {
    try {
      const {
        title,
        message,
        body, // fallback para compatibilidad
        type,
        icon,
        url,
        data,
        startAt,
        expireAt,
        repeatEveryHours,
        status, // opcional, normalmente 'scheduled'
        target, // opcional
      } = req.body || {};

      if (!title || (!message && !body)) {
        return res.status(400).json({ message: 'title and message are required' });
      }
      const start = startAt ? new Date(startAt) : new Date();
      const exp = expireAt ? new Date(expireAt) : null;

      if (exp && start >= exp) {
        return res.status(400).json({ message: 'expireAt must be after startAt' });
      }

      const doc = new Notification({
        title,
        message: message || body, // usar message, fallback a body
        body: body || message, // mantener body para compatibilidad
        type: type || 'info',
        icon,
        url,
        data,
        startAt: start,
        expireAt: exp,
        repeatEveryHours: repeatEveryHours || 0,
        status: status || 'scheduled',
        target,
      });

      // Calcular nextRunAt si el modelo no lo fija solo
      const nextRun = computeNextRun({
        startAt: doc.startAt,
        repeatEveryHours: doc.repeatEveryHours,
        expireAt: doc.expireAt,
        now: new Date(),
      });
      doc.nextRunAt = nextRun;

      // Si no hay siguiente corrida (expiró antes de empezar)
      if (!nextRun) {
        doc.status = doc.repeatEveryHours > 0 ? 'completed' : 'completed';
      }

      await doc.save();

      res.status(201).json({
        message: 'created',
        id: doc._id.toString(),
        nextRunAt: doc.nextRunAt,
        status: doc.status,
      });
    } catch (err) {
      next(err);
    }
  },

  // PUT /admin/notifications/:id
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const payload = { ...req.body };
      if (payload.startAt) payload.startAt = new Date(payload.startAt);
      if (payload.expireAt) payload.expireAt = new Date(payload.expireAt);

      // Validación básica start/expire
      if (payload.startAt && payload.expireAt && payload.startAt >= payload.expireAt) {
        return res.status(400).json({ message: 'expireAt must be after startAt' });
      }

      // Aplicar cambios
      const doc = await Notification.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });

      if (!doc) return res.status(404).json({ message: 'Notification not found' });

      // Recalcular nextRunAt si cambian campos de tiempo/periodo/estado
      const shouldRecalc =
        'startAt' in payload ||
        'expireAt' in payload ||
        'repeatEveryHours' in payload ||
        'status' in payload;

      if (shouldRecalc) {
        const nextRun = computeNextRun({
          startAt: doc.startAt,
          repeatEveryHours: doc.repeatEveryHours,
          expireAt: doc.expireAt,
          now: new Date(),
        });
        doc.nextRunAt = nextRun;

        // Si ya no hay siguiente corrida, completar salvo que esté cancelada
        if (!nextRun && doc.status !== 'cancelled') {
          doc.status = 'completed';
        }
        await doc.save();
      }

      res.json({
        message: 'updated',
        id: doc._id.toString(),
        nextRunAt: doc.nextRunAt,
        status: doc.status,
      });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /admin/notifications/:id
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const hard = (req.query.hard || '').toString().toLowerCase() === 'true';

      if (hard) {
        const result = await Notification.deleteOne({ _id: id });
        return res.json({ message: 'deleted', deleted: result.deletedCount || 0 });
      }

      // Soft cancel
      const doc = await Notification.findById(id);
      if (!doc) return res.status(404).json({ message: 'Notification not found' });
      doc.status = 'cancelled';
      doc.nextRunAt = null;
      await doc.save();
      res.json({ message: 'cancelled', id: doc._id.toString() });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/notifications
  async listAdmin(req, res, next) {
    try {
      const {
        status,
        q,
        from,
        to,
        limit: limitRaw,
        page: pageRaw,
        sort = '-startAt',
      } = req.query;

      const page = clamp(parseInt(pageRaw || '1', 10) || 1, 1, 10_000);
      const limit = clamp(parseInt(limitRaw || '20', 10) || 20, 1, 100);
      const skip = (page - 1) * limit;

      const qy = {};
      if (status) qy.status = status;
      if (q) {
        qy.$or = [
          { title: { $regex: q, $options: 'i' } },
          { message: { $regex: q, $options: 'i' } },
          { body: { $regex: q, $options: 'i' } },
        ];
      }
      if (from || to) {
        qy.startAt = {};
        if (from) qy.startAt.$gte = new Date(from);
        if (to) qy.startAt.$lte = new Date(to);
      }

      const sortObj = {};
      // sort como "-startAt,updatedAt"
      for (const token of sort.split(',')) {
        const t = token.trim();
        if (!t) continue;
        if (t.startsWith('-')) sortObj[t.slice(1)] = -1;
        else sortObj[t] = 1;
      }

      const [data, total] = await Promise.all([
        Notification.find(qy).sort(sortObj).skip(skip).limit(limit).lean(),
        Notification.countDocuments(qy),
      ]);

      res.json({
        data,
        page,
        limit,
        total,
        hasMore: skip + data.length < total,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/notifications/:id
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const doc = await Notification.findById(id).lean();
      if (!doc) return res.status(404).json({ message: 'Notification not found' });
      res.json({ data: doc });
    } catch (err) {
      next(err);
    }
  },
};

export default NotificationController;
