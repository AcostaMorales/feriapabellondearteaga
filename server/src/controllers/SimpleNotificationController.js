// controllers/SimpleNotificationController.js
// Controlador simplificado para notificaciones sin dependencias de Mongoose

let notifications = [
  {
    id: '1',
    title: '¡Bienvenido a la Feria de Pabellón de Arteaga!',
    message: 'Disfruta de todos los eventos y actividades que tenemos preparados para ti.',
    type: 'info',
    icon: '🎪',
    url: '/',
    data: {},
    createdAt: new Date().toISOString(),
    read: false
  },
  {
    id: '2', 
    title: 'Próximo evento: Teatro del Pueblo',
    message: 'No te pierdas las presentaciones en vivo este fin de semana.',
    type: 'event',
    icon: '🎭',
    url: '/teatrodelpueblo',
    data: {},
    createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minuto atrás
    read: false
  }
];

let notificationIdCounter = 3;

const SimpleNotificationController = {
  // Listar notificaciones públicas
  async listPublic(req, res) {
    try {
      const { limit = 20, page = 1 } = req.query;
      const limitNum = Math.min(parseInt(limit) || 20, 100);
      const pageNum = Math.max(parseInt(page) || 1, 1);
      const skip = (pageNum - 1) * limitNum;
      
      // Filtrar notificaciones activas
      const activeNotifications = notifications
        .filter(n => !n.deleted)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(skip, skip + limitNum);

      res.json({
        data: activeNotifications,
        page: pageNum,
        limit: limitNum,
        total: notifications.filter(n => !n.deleted).length,
        hasMore: skip + activeNotifications.length < notifications.filter(n => !n.deleted).length
      });
    } catch (error) {
      console.error('Error listing notifications:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Verificar si hay notificaciones nuevas
  async hasNew(req, res) {
    try {
      const { lastOpenedAt } = req.query;
      const lastOpened = lastOpenedAt ? new Date(lastOpenedAt) : new Date(0);
      
      const hasNew = notifications.some(n => 
        !n.deleted && 
        new Date(n.createdAt) > lastOpened
      );
      
      const count = notifications.filter(n => 
        !n.deleted && 
        new Date(n.createdAt) > lastOpened
      ).length;

      res.json({ hasNew, count });
    } catch (error) {
      console.error('Error checking new notifications:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Obtener contador de no leídas
  async getUnreadCount(req, res) {
    try {
      const { lastCheck } = req.query;
      const lastCheckDate = lastCheck ? new Date(lastCheck) : new Date(0);
      
      const count = notifications.filter(n => 
        !n.deleted && 
        !n.read &&
        new Date(n.createdAt) > lastCheckDate
      ).length;

      res.json({ count, hasNew: count > 0 });
    } catch (error) {
      console.error('Error getting unread count:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Marcar todas como leídas
  async markAllAsRead(req, res) {
    try {
      notifications.forEach(n => {
        if (!n.deleted) {
          n.read = true;
        }
      });

      res.json({ 
        message: 'Marked as read', 
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      console.error('Error marking as read:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Eliminar notificación
  async deleteNotification(req, res) {
    try {
      const { id } = req.params;
      
      const notificationIndex = notifications.findIndex(n => n.id === id && !n.deleted);
      
      if (notificationIndex === -1) {
        return res.status(404).json({ 
          message: 'Notificación no encontrada o ya eliminada' 
        });
      }
      
      notifications[notificationIndex].deleted = true;
      
      res.json({ message: 'Notificación eliminada correctamente' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // === ADMIN METHODS ===
  
  // Crear notificación (admin)
  async create(req, res) {
    try {
      const {
        title,
        message,
        body,
        type = 'info',
        icon = '📢',
        url = '/',
        data = {}
      } = req.body;

      if (!title || (!message && !body)) {
        return res.status(400).json({ 
          message: 'Título y mensaje son requeridos' 
        });
      }

      const notification = {
        id: String(notificationIdCounter++),
        title,
        message: message || body,
        type,
        icon,
        url,
        data,
        createdAt: new Date().toISOString(),
        read: false,
        deleted: false
      };

      notifications.unshift(notification);

      res.status(201).json({
        message: 'Notificación creada exitosamente',
        notification
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Listar notificaciones (admin)
  async listAdmin(req, res) {
    try {
      const { limit = 20, page = 1, q } = req.query;
      const limitNum = Math.min(parseInt(limit) || 20, 100);
      const pageNum = Math.max(parseInt(page) || 1, 1);
      const skip = (pageNum - 1) * limitNum;

      let filteredNotifications = notifications.filter(n => !n.deleted);

      // Filtro de búsqueda
      if (q) {
        const searchTerm = q.toLowerCase();
        filteredNotifications = filteredNotifications.filter(n =>
          n.title.toLowerCase().includes(searchTerm) ||
          n.message.toLowerCase().includes(searchTerm)
        );
      }

      const result = filteredNotifications
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(skip, skip + limitNum);

      res.json({
        data: result,
        page: pageNum,
        limit: limitNum,
        total: filteredNotifications.length,
        hasMore: skip + result.length < filteredNotifications.length
      });
    } catch (error) {
      console.error('Error listing admin notifications:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Obtener notificación por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const notification = notifications.find(n => n.id === id && !n.deleted);

      if (!notification) {
        return res.status(404).json({ message: 'Notificación no encontrada' });
      }

      res.json({ data: notification });
    } catch (error) {
      console.error('Error getting notification:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Actualizar notificación
  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const notificationIndex = notifications.findIndex(n => n.id === id && !n.deleted);

      if (notificationIndex === -1) {
        return res.status(404).json({ message: 'Notificación no encontrada' });
      }

      notifications[notificationIndex] = {
        ...notifications[notificationIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      res.json({
        message: 'Notificación actualizada exitosamente',
        notification: notifications[notificationIndex]
      });
    } catch (error) {
      console.error('Error updating notification:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  // Eliminar notificación (admin)
  async remove(req, res) {
    try {
      const { id } = req.params;
      const { hard = false } = req.query;

      const notificationIndex = notifications.findIndex(n => n.id === id);

      if (notificationIndex === -1) {
        return res.status(404).json({ message: 'Notificación no encontrada' });
      }

      if (hard) {
        // Eliminación completa
        notifications.splice(notificationIndex, 1);
        res.json({ message: 'Notificación eliminada permanentemente' });
      } else {
        // Eliminación suave
        notifications[notificationIndex].deleted = true;
        res.json({ message: 'Notificación marcada como eliminada' });
      }
    } catch (error) {
      console.error('Error removing notification:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

export default SimpleNotificationController;