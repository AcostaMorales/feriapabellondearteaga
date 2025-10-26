// Service Worker para notificaciones push
self.addEventListener('push', function(event) {
    console.log('Push notification received:', event);
    
    if (!event.data) {
        console.log('No data in push event');
        return;
    }
    
    try {
        const data = event.data.json();
        console.log('Push data:', data);
        
        const options = {
            body: data.body || 'Nueva notificación',
            icon: data.icon || '/pwa-192x192.png',
            badge: data.badge || '/pwa-192x192.png',
            data: {
                url: data.url || '/',
                ...data.data
            },
            requireInteraction: true,
            tag: 'feria-notification'
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'Feria de Pabellón', options)
        );
    } catch (error) {
        console.error('Error processing push notification:', error);
    }
});

// Manejar clic en notificación
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received:', event);
    
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function(clientList) {
                // Si ya hay una ventana abierta, enfocarla
                for (let client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        client.navigate(urlToOpen);
                        return client.focus();
                    }
                }
                
                // Si no hay ventanas abiertas, abrir una nueva
                if (self.clients.openWindow) {
                    return self.clients.openWindow(urlToOpen);
                }
            })
    );
});