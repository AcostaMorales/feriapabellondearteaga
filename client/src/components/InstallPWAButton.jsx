import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Verificar si ya está instalada
        const checkIfInstalled = () => {
            return (
                window.matchMedia('(display-mode: standalone)').matches || 
                window.navigator.standalone === true ||
                document.referrer.includes('android-app://')
            );
        };

        setIsInstalled(checkIfInstalled());

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
        // Si ya está instalada, preguntar si quiere reinstalar
        if (isInstalled) {
            const reinstall = window.confirm(
                '¡La app ya está instalada! 📱\n\n' +
                '¿Quieres reinstalarla?\n\n' +
                'Nota: Tendrás que:\n' +
                '• Desinstalar la app actual primero\n' +
                '• O limpiar los datos del navegador\n' +
                '• Luego volver a instalar'
            );
            
            if (reinstall) {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                
                if (isIOS) {
                    alert(
                        'Para reinstalar en iOS:\n\n' +
                        '1. Mantén presionado el ícono de la app\n' +
                        '2. Selecciona "Eliminar app"\n' +
                        '3. Vuelve al navegador Safari\n' +
                        '4. Toca Compartir (⬆️) → "Agregar a pantalla principal"'
                    );
                } else {
                    alert(
                        'Para reinstalar en Android/Chrome:\n\n' +
                        '1. Configuración → Apps → Busca "Feria Pabellón"\n' +
                        '2. Desinstalar\n' +
                        '3. O ve a: chrome://settings/content/all\n' +
                        '4. Busca el sitio y elimina todos los datos\n' +
                        '5. Recarga esta página para reinstalar'
                    );
                }
            }
            return;
        }

        // Detectar iOS para instalación normal
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            alert('Para instalar esta app:\n1. Toca el botón "Compartir" (⬆️)\n2. Selecciona "Agregar a pantalla principal"\n3. Confirma la instalación');
            return;
        }

        if (!deferredPrompt) {
            alert('Para instalar esta app:\n• Chrome: Menú (⋮) → "Instalar app"\n• O limpia los datos del sitio en configuración');
            return;
        }

        // Mostrar el prompt de instalación
        deferredPrompt.prompt();
        
        // Esperar la respuesta del usuario
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('Usuario aceptó instalar la PWA');
        } else {
            console.log('Usuario rechazó instalar la PWA');
        }

        // Limpiar el prompt
        setDeferredPrompt(null);
    };

    // Determinar el texto del botón
    const getButtonText = () => {
        if (isInstalled) {
            return '📱 App Instalada - Toca para reinstalar';
        }
        return '📱 Instalar App';
    };

    // Determinar la clase CSS del botón
    const getButtonClass = () => {
        return isInstalled ? 'install-pwa-button installed' : 'install-pwa-button';
    };

    return (
        <div className="install-pwa-container">
            <button 
                onClick={handleInstallClick}
                className={getButtonClass()}
                title={isInstalled ? 'App ya instalada - Clic para opciones de reinstalación' : 'Instalar como aplicación'}
            >
                <span className="install-icon">📱</span>
                {getButtonText()}
            </button>
        </div>
    );
};

export default InstallPWAButton;