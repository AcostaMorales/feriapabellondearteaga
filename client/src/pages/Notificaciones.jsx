import React, { useState, useEffect } from 'react';
import './Notificaciones.css';

const Notificaciones = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Base URL
  const API_BASE = process.env.NODE_ENV === 'production' 
    ? 'https://feriapabellondearteaga.onrender.com/api' 
    : 'http://localhost:10000/api';

  useEffect(() => {
    // Verificar el estado actual de las notificaciones
    checkNotificationStatus();
    
    // Cargar notificaciones desde servidor y localStorage
    loadNotifications();
    
    // Limpiar notificaciones expiradas (más de 24 horas)
    cleanExpiredNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Cargar notificaciones del servidor
      const response = await fetch(`${API_BASE}/notifications`);
      let serverNotifications = [];
      
      if (response.ok) {
        const data = await response.json();
        serverNotifications = data.data || [];
      } else {
        console.warn('No se pudieron cargar notificaciones del servidor');
      }

      // Cargar notificaciones locales
      const storedNotifications = localStorage.getItem('fairNotifications');
      let localNotifications = [];
      
      if (storedNotifications) {
        localNotifications = JSON.parse(storedNotifications);
      }

      // Combinar notificaciones del servidor y locales
      const allNotifications = [...serverNotifications, ...localNotifications]
        .sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp));

      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
      setError('Error al cargar notificaciones');
      
      // Fallback: cargar solo notificaciones locales
      const storedNotifications = localStorage.getItem('fairNotifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } finally {
      setLoading(false);
    }
  };

  const checkNotificationStatus = () => {
    const permission = Notification.permission;
    const localEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    setNotificationPermission(permission);
    setNotificationsEnabled(permission === 'granted' && localEnabled);
  };

  const cleanExpiredNotifications = () => {
    const stored = localStorage.getItem('fairNotifications');
    if (!stored) return;

    try {
      const notifications = JSON.parse(stored);
      const now = Date.now();
      const validNotifications = notifications.filter(notification => {
        const notificationTime = notification.timestamp;
        const timeDiff = now - notificationTime;
        const hoursElapsed = timeDiff / (1000 * 60 * 60);
        return hoursElapsed < 24; // Mantener solo las de las últimas 24 horas
      });

      if (validNotifications.length !== notifications.length) {
        saveNotifications(validNotifications);
      }
    } catch (error) {
      console.error('Error limpiando notificaciones expiradas:', error);
    }
  };

  const requestNotificationPermission = async () => {
    setLoading(true);
    
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        localStorage.setItem('notificationsEnabled', 'true');
        
        // Registrar el service worker para push notifications si no está registrado
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          console.log('Service Worker registrado para notificaciones:', registration);
          
          // Agregar notificación de bienvenida
          addNotification({
            title: '¡Notificaciones activadas!',
            body: 'Ahora recibirás notificaciones sobre eventos y actualizaciones de la feria.',
            type: 'success'
          });
        }
      } else {
        setNotificationsEnabled(false);
        localStorage.setItem('notificationsEnabled', 'false');
      }
    } catch (error) {
      console.error('Error solicitando permisos:', error);
    } finally {
      setLoading(false);
    }
  };

  const disableNotifications = () => {
    setNotificationsEnabled(false);
    localStorage.setItem('notificationsEnabled', 'false');
    addNotification({
      title: 'Notificaciones desactivadas',
      body: 'Ya no recibirás notificaciones de la aplicación.',
      type: 'info'
    });
  };

  const enableNotifications = () => {
    if (notificationPermission === 'granted') {
      setNotificationsEnabled(true);
      localStorage.setItem('notificationsEnabled', 'true');
      addNotification({
        title: 'Notificaciones activadas',
        body: 'Volverás a recibir notificaciones de la aplicación.',
        type: 'success'
      });
    }
  };

  const addNotification = (notificationData) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      ...notificationData,
      timestamp: Date.now(),
      read: false
    };

    const updatedNotifications = [newNotification, ...notifications];
    saveNotifications(updatedNotifications);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id 
        ? { ...notification, read: true }
        : notification
    );
    saveNotifications(updatedNotifications);
  };

  const deleteNotification = async (id) => {
    // Si es una notificación del servidor, intentar eliminarla del servidor
    if (!id.toString().startsWith('local-')) {
      try {
        await fetch(`${API_BASE}/notifications/${id}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.warn('Error eliminando del servidor:', error);
      }
    }

    // Eliminar de la lista local
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    
    // Actualizar localStorage para notificaciones locales
    const localNotifications = updatedNotifications.filter(n => 
      n.id.toString().startsWith('local-') || !n.createdAt
    );
    localStorage.setItem('fairNotifications', JSON.stringify(localNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('fairNotifications');
  };

  const saveNotifications = (newNotifications) => {
    try {
      // Solo guardar notificaciones locales
      const localNotifications = newNotifications.filter(n => 
        n.id.toString().startsWith('local-') || !n.createdAt
      );
      localStorage.setItem('fairNotifications', JSON.stringify(localNotifications));
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error guardando notificaciones:', error);
    }
  };

  const sendTestNotification = () => {
    if (notificationsEnabled) {
      addNotification({
        title: 'Notificación de prueba',
        body: 'Esta es una notificación de prueba para verificar que todo funciona correctamente.',
        type: 'test'
      });

      // También enviar notificación del navegador si es posible
      if (Notification.permission === 'granted') {
        new Notification('Notificación de prueba', {
          body: 'Esta es una notificación de prueba para verificar que todo funciona correctamente.',
          icon: '/Icon-192x192.png',
          badge: '/Icon-192x192.png'
        });
      }
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'event':
        return '📅';
      case 'test':
        return '🧪';
      default:
        return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notificaciones-container">
      {/* Título principal */}
      <div className="titulo-section">
        <h1 className="titulo-principal">Notificaciones</h1>
        <p className="subtitulo">Gestiona tus notificaciones de la feria</p>
      </div>

      {/* Control de notificaciones */}
      <div className="notification-settings">
        <div className="setting-card">
          <div className="setting-info">
            <h3>Notificaciones Push</h3>
            <p>Recibe actualizaciones sobre eventos y actividades</p>
            <div className="permission-status">
              Estado: <span className={`status ${notificationPermission}`}>
                {notificationPermission === 'granted' ? 'Permitidas' : 
                 notificationPermission === 'denied' ? 'Denegadas' : 'No configuradas'}
              </span>
            </div>
          </div>
          
          <div className="setting-actions">
            {notificationPermission === 'granted' ? (
              <div className="toggle-container">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => e.target.checked ? enableNotifications() : disableNotifications()}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ) : (
              <button
                className="enable-btn"
                onClick={requestNotificationPermission}
                disabled={loading || notificationPermission === 'denied'}
              >
                {loading ? 'Activando...' : 'Activar'}
              </button>
            )}
          </div>
        </div>

        {notificationPermission === 'denied' && (
          <div className="permission-help">
            <p>
              <strong>Para activar notificaciones:</strong><br/>
              1. Ve a la configuración de tu navegador<br/>
              2. Busca la sección de "Notificaciones" o "Permisos"<br/>
              3. Permite notificaciones para este sitio
            </p>
          </div>
        )}
        
        {notificationsEnabled && (
          <div className="test-section">
            <button className="test-btn" onClick={sendTestNotification}>
              Enviar notificación de prueba
            </button>
          </div>
        )}
      </div>

      {/* Lista de Notificaciones */}
      <div className="notifications-section">
        <div className="section-header">
          <h2>
            📱 Notificaciones 
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </h2>
          {notifications.length > 0 && (
            <button className="clear-all-btn" onClick={clearAllNotifications}>
              Limpiar Todo
            </button>
          )}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
            <p>Cargando notificaciones...</p>
          </div>
        )}

        {error && (
          <div style={{ 
            background: 'rgba(255, 193, 7, 0.1)', 
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '8px',
            padding: '15px',
            margin: '10px 0',
            color: 'white'
          }}>
            <p>⚠️ {error}</p>
            <button 
              onClick={loadNotifications}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <div className="no-notifications-icon">🔔</div>
              <h3>No hay notificaciones</h3>
              <p>Aquí aparecerán las notificaciones que recibas de la feria</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-body">{notification.body}</p>
                  <span className="notification-time">{formatTime(notification.timestamp)}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notificaciones;