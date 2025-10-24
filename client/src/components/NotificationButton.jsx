import React, { useState, useEffect } from 'react';
import { 
    subscribeToPushNotifications, 
    unsubscribeFromPushNotifications, 
    getSubscriptionStatus, 
} from '../services/notification';

const NotificationButton = () => {
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        supported: false,
        subscribed: false,
        permission: 'default'
    });
    const [loading, setLoading] = useState(false);

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
            await checkSubscriptionStatus();
            alert('¡Notificaciones activadas! 🔔\nRecibirás actualizaciones de la feria.');
        } catch (error) {
            console.error('Error activando notificaciones:', error);
            alert('Error activando notificaciones: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUnsubscribe = async () => {
        setLoading(true);
        try {
            await unsubscribeFromPushNotifications();
            await checkSubscriptionStatus();
            alert('Notificaciones desactivadas 🔕');
        } catch (error) {
            console.error('Error desactivando notificaciones:', error);
            alert('Error desactivando notificaciones: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!subscriptionStatus.supported) {
        return null; // No mostrar si no hay soporte
    }

    return (
        <div className="notification-container">
            <button 
                onClick={subscriptionStatus.subscribed ? handleUnsubscribe : handleSubscribe}
                disabled={loading}
                className={`notification-button ${subscriptionStatus.subscribed ? 'subscribed' : 'unsubscribed'}`}
                title={subscriptionStatus.subscribed ? 'Desactivar notificaciones' : 'Activar notificaciones'}
            >
                <span className="notification-icon">
                    {loading ? '⏳' : subscriptionStatus.subscribed ? '🔔' : '🔕'}
                </span>
                {loading ? 'Procesando...' : subscriptionStatus.subscribed ? 'Notificaciones ON' : 'Activar Notificaciones'}
            </button>
        </div>
    );
};

export default NotificationButton;