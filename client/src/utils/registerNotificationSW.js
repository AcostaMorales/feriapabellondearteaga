// Registrar service worker de notificaciones
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw-notifications.js')
        .then(registration => {
            console.log('SW de notificaciones registrado:', registration);
        })
        .catch(error => {
            console.error('Error registrando SW de notificaciones:', error);
        });
}