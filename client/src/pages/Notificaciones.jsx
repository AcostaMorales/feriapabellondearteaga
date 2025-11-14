import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import UnsubscribeButton from '../components/UnsubscribeButton';
import './Notificaciones.css';

const Notificaciones = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotifications();
    // Marcar notificaciones como leídas al entrar
    markAllAsRead();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications`);
      if (!response.ok) {
        throw new Error('Error al cargar notificaciones');
      }
      const result = await response.json();
      
      // El servidor puede devolver { data: [...] } o directamente [...]
      let notificationsData;
      if (result && typeof result === 'object') {
        // Si tiene propiedad data, usarla; sino usar el objeto completo
        notificationsData = result.data || result;
      } else {
        notificationsData = result;
      }
      
      // Asegurar que sea un array
      const finalData = Array.isArray(notificationsData) ? notificationsData : [];
      setNotifications(finalData);
      
    } catch (err) {
      setError(err.message);
      console.error('Error cargando notificaciones:', err);
      // En caso de error, asegurar que notifications sea un array vacío
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/notifications/mark-read`, {
        method: 'PATCH'
      });
      // Actualizar el estado local
      localStorage.setItem('lastNotificationCheck', new Date().toISOString());
    } catch (err) {
      console.error('Error marcando notificaciones como leídas:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n._id !== id));
      }
    } catch (err) {
      console.error('Error eliminando notificación:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (hours < 24) {
      return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
    } else if (days < 7) {
      return `Hace ${days} día${days !== 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event':
        return '🎉';
      case 'update':
        return '🔄';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return '📢';
    }
  };

  if (loading) {
    return (
      <div className="notifications-page">
        <Header />
        <div className="notifications-container">
          <div className="notifications-header">
            <h1>Notificaciones</h1>
          </div>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando notificaciones...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notifications-page">
        <Header />
        <div className="notifications-container">
          <div className="notifications-header">
            <h1>Notificaciones</h1>
          </div>
          <div className="error-state">
            <p>❌ {error}</p>
            <button onClick={loadNotifications} className="retry-button">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <Header />
      <div className="notifications-container">
        <div className="notifications-header">
          <h1>Notificaciones</h1>
          <p className="notifications-count">
            {Array.isArray(notifications) ? notifications.length : 0} notificación{(Array.isArray(notifications) ? notifications.length : 0) !== 1 ? 'es' : ''}
          </p>
        </div>

        {!Array.isArray(notifications) || notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>No tienes notificaciones</h3>
            <p>Te avisaremos cuando haya algo nuevo</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div 
                key={notification._id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <h3 className="notification-title">{notification.title}</h3>
                  <p className="notification-message">{notification.message || notification.body || 'Sin mensaje'}</p>
                  <div className="notification-meta">
                    <span className="notification-date">
                      {formatDate(notification.createdAt)}
                    </span>
                    {!notification.read && (
                      <span className="notification-new">Nuevo</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => deleteNotification(notification._id)}
                  className="delete-button"
                  aria-label="Eliminar notificación"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botón para desinscribirse */}
        <UnsubscribeButton />
      </div>
    </div>
  );
};

export default Notificaciones;