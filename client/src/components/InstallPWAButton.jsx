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
            alert(
                '📱 Instalar en Android/Chrome:\n\n' +
                '• Opción 1: Menú (⋮) → "Instalar aplicación"\n' +
                '• Opción 2: Busca el ícono de instalación en la barra de direcciones\n' +
                '• Opción 3: Limpia datos del sitio en configuración\n\n' +
                '¡Disfruta de la experiencia como app nativa! 🎉'
            );
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