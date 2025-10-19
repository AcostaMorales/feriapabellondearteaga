import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isInPWA, setIsInPWA] = useState(false);

    useEffect(() => {
        // Verificar si ya está instalada y ejecutándose como PWA
        const checkIfInstalled = () => {
            return (
                window.matchMedia('(display-mode: standalone)').matches || 
                window.navigator.standalone === true ||
                document.referrer.includes('android-app://')
            );
        };

        // Verificar si está ejecutándose dentro de la PWA
        const checkIfInPWA = () => {
            return (
                window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone === true ||
                window.location.search.includes('utm_source=pwa')
            );
        };

        setIsInstalled(checkIfInstalled());
        setIsInPWA(checkIfInPWA());

        // Si está dentro de la PWA, no mostrar el botón
        if (checkIfInPWA()) {
            return;
        }

        // Escuchar el evento beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            // Prevenir que el navegador muestre automáticamente el prompt
            e.preventDefault();
            // Guardar el evento para usarlo después
            setDeferredPrompt(e);
        };

        // Escuchar cuando la app se instala
        const handleAppInstalled = () => {
            console.log('PWA instalada exitosamente');
            setIsInstalled(true);
            setDeferredPrompt(null);
        };

        // Agregar event listeners
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Cleanup
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        // Si ya está instalada, ofrecer limpieza automática
        if (isInstalled) {
            await handleReinstallWithCleanup();
            return;
        }

        // 🚀 INSTALACIÓN AUTOMÁTICA - Intentar instalar inmediatamente
        await attemptAutoInstall();
    };

    const attemptAutoInstall = async () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (deferredPrompt) {
            try {
                // Instalación automática en Chrome/Edge
                console.log('🚀 Iniciando instalación automática...');
                deferredPrompt.prompt();
                
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    console.log('✅ PWA instalada automáticamente');
                    setIsInstalled(true);
                } else {
                    console.log('❌ Usuario rechazó la instalación');
                    showManualInstructions(isIOS);
                }
                
                setDeferredPrompt(null);
            } catch (error) {
                console.error('Error en instalación automática:', error);
                showManualInstructions(isIOS);
            }
        } else {
            // Si no hay prompt disponible, mostrar instrucciones
            showManualInstructions(isIOS);
        }
    };

    // 🧹 Función para limpiar datos del sitio automáticamente
    const clearSiteData = async () => {
        try {
            // Método 1: Limpiar Service Worker
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                    console.log('🧹 Service Worker eliminado');
                }
            }

            // Método 2: Limpiar Cache Storage
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                for (const cacheName of cacheNames) {
                    await caches.delete(cacheName);
                    console.log('🧹 Cache eliminado:', cacheName);
                }
            }

            // Método 3: Limpiar Local Storage
            localStorage.clear();
            sessionStorage.clear();
            console.log('🧹 Storage local eliminado');

            // Método 4: Limpiar IndexedDB (si existe)
            if ('indexedDB' in window) {
                // Intentar eliminar bases de datos conocidas
                const databases = ['workbox-expiration', 'keyval-store'];
                for (const dbName of databases) {
                    try {
                        indexedDB.deleteDatabase(dbName);
                        console.log('🧹 IndexedDB eliminado:', dbName);
                    } catch (error) {
                        // Ignorar errores de bases de datos que no existen
                        console.log(' IndexedDB no encontrado (ignorando):', error);
                    }
                }
            }

            return true;
        } catch (error) {
            console.error('Error limpiando datos:', error);
            return false;
        }
    };

    // 🔄 Función para reinstalación automática con limpieza
    const handleReinstallWithCleanup = async () => {
        const confirmCleanup = window.confirm(
            '🧹 LIMPIEZA AUTOMÁTICA\n\n' +
            '¿Quieres que limpie automáticamente todos los datos del sitio?\n' +
            'Esto permitirá reinstalar la PWA fácilmente.\n\n' +
            'OK = Limpiar datos y permitir reinstalación\n' +
            'Cancelar = Ver instrucciones manuales'
        );

        if (confirmCleanup) {
            try {
                // Mostrar indicador de carga
                const loadingAlert = setTimeout(() => {
                    alert('🧹 Limpiando datos del sitio...\n\nEsto tomará unos segundos.');
                }, 100);

                // Limpiar datos automáticamente
                const cleaned = await clearSiteData();
                clearTimeout(loadingAlert);

                if (cleaned) {
                    alert(
                        '✅ ¡LIMPIEZA COMPLETADA!\n\n' +
                        '🔄 Recargando página para permitir reinstalación...\n' +
                        '¡El botón de instalación aparecerá nuevamente!'
                    );
                    
                    // Recargar página después de limpiar
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    // Si falla la limpieza automática, mostrar instrucciones manuales
                    showManualCleanupInstructions();
                }
            } catch (error) {
                console.error('Error en limpieza automática:', error);
                showManualCleanupInstructions();
            }
        } else {
            showManualCleanupInstructions();
        }
    };

    const showManualCleanupInstructions = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            alert(
                '🧹 LIMPIEZA MANUAL - iOS:\n\n' +
                '1. Configuración → Safari → Avanzado\n' +
                '2. Datos de sitios web\n' +
                '3. Buscar: "feriapabellondearteaga"\n' +
                '4. Deslizar izquierda → Eliminar\n' +
                '5. Volver a Safari y recargar página\n\n' +
                '✅ ¡El botón de instalación aparecerá!'
            );
        } else {
            alert(
                '🧹 LIMPIEZA MANUAL - Chrome:\n\n' +
                '1. chrome://settings/content/all\n' +
                '2. Buscar: "feriapabellondearteaga"\n' +
                '3. Clic en el sitio → "Eliminar datos y permisos"\n' +
                '4. Recargar esta página\n\n' +
                '✅ ¡El botón de instalación aparecerá!'
            );
        }
    };

    const showManualInstructions = (isIOS) => {
        if (isIOS) {
            alert(
                '📱 Instalar en iOS:\n\n' +
                '1. Toca el botón "Compartir" (⬆️) en la parte inferior\n' +
                '2. Desplázate y selecciona "Agregar a pantalla principal"\n' +
                '3. Confirma tocando "Agregar"\n\n' +
                '¡Listo! La app aparecerá en tu pantalla de inicio 🎉'
            );
        } else {
            // Ofrecer limpieza automática si no hay prompt
            const offerCleanup = window.confirm(
                '📱 INSTALACIÓN - Android/Chrome:\n\n' +
                'Parece que ya instalaste la app antes.\n\n' +
                'OK = Limpiar datos automáticamente para reinstalar\n' +
                'Cancelar = Ver instrucciones manuales'
            );

            if (offerCleanup) {
                handleReinstallWithCleanup();
            } else {
                alert(
                    '📱 Instalar manualmente:\n\n' +
                    '• Opción 1: Menú (⋮) → "Instalar aplicación"\n' +
                    '• Opción 2: Busca el ícono de instalación en la barra de direcciones\n' +
                    '• Opción 3: Limpia datos del sitio en configuración\n\n' +
                    '¡Disfruta de la experiencia como app nativa! 🎉'
                );
            }
        }
    };

    // 🔒 No mostrar botón si está ejecutándose dentro de la PWA
    if (isInPWA) {
        return null;
    }

    // Determinar el texto del botón
    const getButtonText = () => {
        if (isInstalled) {
            return '� Reinstalar App';
        }
        return '� Instalar App Ahora';
    };

    // Determinar la clase CSS del botón
    const getButtonClass = () => {
        return isInstalled ? 'install-pwa-button installed' : 'install-pwa-button auto-install';
    };

    return (
        <div className="install-pwa-container">
            <button 
                onClick={handleInstallClick}
                className={getButtonClass()}
                title={isInstalled ? 'App ya instalada - Clic para reinstalar' : 'Instalación automática - Un clic y listo!'}
            >
                <span className="install-icon">
                    {isInstalled ? '🔄' : '�'}
                </span>
                {getButtonText()}
            </button>
        </div>
    );
};

export default InstallPWAButton;