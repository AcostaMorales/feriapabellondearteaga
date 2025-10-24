self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: data.icon || '/pwa-192x192.png',
            badge: data.badge || '/pwa-192x192.png',
            tag: data.tag || 'feria-notification',
            timestamp: data.timestamp,
            requireInteraction: true,
            actions: [
                {
                    action: 'open',
                    title: 'Ver más',
                    icon: '/pwa-192x192.png'
                },
                {
                    action: 'close',
                    title: 'Cerrar'
                }
            ],
            data: {
                url: data.url || '/'
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function(clientList) {
            // Si ya hay una ventana abierta, enfocarla
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // Si no hay ventana abierta, abrir una nueva
            if (self.clients.openWindow) {
                return self.clients.openWindow(urlToOpen);
            }
        })
    );
});

self.addEventListener('notificationclose', function(event) {
    console.log('Notificación cerrada:', event.notification.tag);
});