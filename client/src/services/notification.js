// Generar deviceId único para el navegador
export const generateDeviceId = () => {
    const existingId = localStorage.getItem('deviceId');
    if (existingId) return existingId;
    
    const deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('deviceId', deviceId);
    return deviceId;
};

// Verificar soporte para notificaciones
export const isNotificationSupported = () => {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
};

// Solicitar permisos de notificación
export const requestNotificationPermission = async () => {
    if (!isNotificationSupported()) {
        throw new Error('Las notificaciones no están soportadas en este navegador');
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
};

// Convertir clave VAPID a Uint8Array
export const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// Suscribir a notificaciones push
export const subscribeToPushNotifications = async () => {
    try {
        if (!isNotificationSupported()) {
            throw new Error('Las notificaciones no están soportadas');
        }

        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) {
            throw new Error('Permisos de notificación denegados');
        }

        const registration = await navigator.serviceWorker.ready;
        
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
        });

        const deviceId = generateDeviceId();

        // Enviar suscripción al servidor
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscription,
                deviceId
            })
        });

        if (!response.ok) {
            throw new Error('Error registrando suscripción en el servidor');
        }

        const result = await response.json();
        console.log('Suscripción exitosa:', result);
        
        return { success: true, deviceId, subscription };
    } catch (error) {
        console.error('Error suscribiendo a notificaciones:', error);
        throw error;
    }
};

// Desuscribir de notificaciones
export const unsubscribeFromPushNotifications = async () => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
            await subscription.unsubscribe();
        }

        const deviceId = localStorage.getItem('deviceId');
        if (deviceId) {
            await fetch(`${import.meta.env.VITE_API_URL}/api/notifications/unsubscribe/${deviceId}`, {
                method: 'DELETE'
            });
            localStorage.removeItem('deviceId');
        }

        return true;
    } catch (error) {
        console.error('Error desuscribiendo:', error);
        throw error;
    }
};

// Verificar estado de suscripción
export const getSubscriptionStatus = async () => {
    try {
        if (!isNotificationSupported()) {
            return { supported: false, subscribed: false, permission: 'default' };
        }

        const permission = Notification.permission;
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        return {
            supported: true,
            subscribed: !!subscription,
            permission,
            deviceId: localStorage.getItem('deviceId')
        };
    } catch (error) {
        console.error('Error verificando estado:', error);
        return { supported: false, subscribed: false, permission: 'default' };
    }
};