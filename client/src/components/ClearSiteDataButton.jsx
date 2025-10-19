import React from 'react';

const ClearSiteDataButton = () => {
    const clearSiteData = async () => {
        const confirmClear = window.confirm(
            '🧹 LIMPIAR DATOS DEL SITIO\n\n' +
            'Esto eliminará:\n' +
            '• Cache de la aplicación\n' +
            '• Service Workers\n' +
            '• Datos locales almacenados\n' +
            '• Historial de instalación PWA\n\n' +
            '✅ Permitirá reinstalar la PWA fácilmente\n\n' +
            '¿Continuar?'
        );

        if (!confirmClear) return;

        try {
            // Limpiar Service Workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                }
            }

            // Limpiar Cache Storage
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                for (const cacheName of cacheNames) {
                    await caches.delete(cacheName);
                }
            }

            // Limpiar Storage
            localStorage.clear();
            sessionStorage.clear();

            // Limpiar IndexedDB
            if ('indexedDB' in window) {
                const databases = ['workbox-expiration', 'keyval-store'];
                for (const dbName of databases) {
                    try {
                        indexedDB.deleteDatabase(dbName);
                    } catch (error) {
                        // Ignorar errores
                        console.log(' IndexedDB no encontrado (ignorando):', error);
                    }
                }
            }

            alert(
                '✅ ¡LIMPIEZA COMPLETADA!\n\n' +
                'Se eliminaron todos los datos del sitio.\n' +
                'La página se recargará para aplicar los cambios.\n\n' +
                'Ahora podrás instalar la PWA nuevamente.'
            );

            // Recargar página
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error limpiando datos:', error);
            alert(
                '❌ Error en limpieza automática\n\n' +
                'Limpieza manual:\n' +
                '1. Chrome: chrome://settings/content/all\n' +
                '2. Buscar este sitio\n' +
                '3. Eliminar todos los datos\n' +
                '4. Recargar página'
            );
        }
    };

    return (
        <div className="clear-data-container">
            <button 
                onClick={clearSiteData}
                className="clear-data-button"
                title="Limpiar datos para permitir reinstalación de PWA"
            >
                <span className="clear-icon">🧹</span>
                Limpiar Datos
            </button>
        </div>
    );
};

export default ClearSiteDataButton;