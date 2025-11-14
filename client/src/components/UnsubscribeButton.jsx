import React, { useState, useEffect } from 'react';
import { 
    unsubscribeFromPushNotifications, 
    getSubscriptionStatus, 
} from '../services/notification';

const UnsubscribeButton = () => {
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

    const handleUnsubscribe = async () => {
        if (!confirm('¿Estás seguro de que quieres desactivar las notificaciones?\n\nYa no recibirás avisos sobre nuevos contenidos y eventos.')) {
            return;
        }

        setLoading(true);
        try {
            await unsubscribeFromPushNotifications();
            await checkSubscriptionStatus();
            alert('✅ Notificaciones desactivadas correctamente.\n\nYa no recibirás notificaciones push.');
        } catch (error) {
            console.error('Error desactivando notificaciones:', error);
            alert('❌ Error al desactivar notificaciones: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Solo mostrar si hay soporte y está suscrito
    if (!subscriptionStatus.supported || !subscriptionStatus.subscribed) {
        return null;
    }

    return (
        <div className="unsubscribe-section">
            <div className="unsubscribe-info">
                <h3>🔔 Notificaciones Push</h3>
                <p>Actualmente estás suscrito a las notificaciones. Recibes avisos sobre nuevos contenidos y eventos.</p>
            </div>
            <button 
                onClick={handleUnsubscribe}
                disabled={loading}
                className="unsubscribe-button"
            >
                {loading ? '⏳ Procesando...' : '🔕 Desactivar Notificaciones'}
            </button>
        </div>
    );
};

export default UnsubscribeButton;