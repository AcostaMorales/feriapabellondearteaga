import React, { useState, useEffect } from 'react';
import { 
    subscribeToPushNotifications, 
    getSubscriptionStatus, 
} from '../services/notification';

const NotificationButton = ({ inline = true, className = '', autoHideOnToggle = true }) => {
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        supported: false,
        subscribed: false,
        permission: 'default'
    });
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        checkSubscriptionStatus();
    }, []);

    const checkSubscriptionStatus = async () => {
        const status = await getSubscriptionStatus();
        setSubscriptionStatus(status);
    };

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            await subscribeToPushNotifications();
            if (autoHideOnToggle) setHidden(true);
            await checkSubscriptionStatus();
            alert('¡Notificaciones activadas! 🔔\nRecibirás notificaciones de vive y descubre Pabellón de Arteaga.');
        } catch (error) {
            console.error('Error activando notificaciones:', error);
            alert('Error activando notificaciones: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (hidden) return null;

    if (!subscriptionStatus.supported) {
        return null; // No mostrar si no hay soporte
    }

    // Ocultar si ya está suscrito (solo mostrar para suscribirse)
    if (subscriptionStatus.subscribed) {
        return null;
    }

    return (
        <div className={inline ? "" : "notification-container"}>
            <button 
                onClick={handleSubscribe}
                disabled={loading}
                className={className || `notification-button footer-tool-btn unsubscribed`}
                title="Activar notificaciones"
            >
                <span className="notification-icon">
                    {loading ? '⏳' : '🔔'}
                </span>
                {loading ? 'Procesando...' : 'Activar Notificaciones'}
            </button>
        </div>
    );
};

export default NotificationButton;