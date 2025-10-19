import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Verificar si ya está instalada
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            setIsInstalled(true);
            return;
        }

        // Mostrar botón si es iOS (donde beforeinstallprompt no funciona)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        // En iOS Safari siempre mostrar un botón informativo
        if (isIOS) {
            setShowInstallButton(true);
        }

        // Escuchar el evento beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            // Prevenir que el navegador muestre automáticamente el prompt
            e.preventDefault();
            // Guardar el evento para usarlo después
            setDeferredPrompt(e);
            // Mostrar nuestro botón personalizado
            setShowInstallButton(true);
        };

        // Escuchar cuando la app se instala
        const handleAppInstalled = () => {
            console.log('PWA instalada exitosamente');
            setShowInstallButton(false);
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
        // Detectar iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            // En iOS mostrar instrucciones
            alert('Para instalar esta app:\n1. Toca el botón "Compartir" (⬆️)\n2. Selecciona "Agregar a pantalla principal"\n3. Confirma la instalación');
            return;
        }

        if (!deferredPrompt) {
            // Si no hay prompt disponible, mostrar instrucciones
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
        setShowInstallButton(false);
    };

    // No mostrar nada si ya está instalada
    if (isInstalled) {
        return null;
    }

    // No mostrar si no está disponible la instalación
    if (!showInstallButton) {
        return null;
    }

    return (
        <div className="install-pwa-container">
            <button 
                onClick={handleInstallClick}
                className="install-pwa-button"
            >
                <span className="install-icon">📱</span>
                Instalar App
            </button>
        </div>
    );
};

export default InstallPWAButton;