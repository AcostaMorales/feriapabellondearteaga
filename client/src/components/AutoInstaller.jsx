import React, { useEffect } from 'react';

const AutoInstaller = () => {
    useEffect(() => {
        // Detectar si viene de un enlace especial para auto-instalación
        const urlParams = new URLSearchParams(window.location.search);
        const autoInstall = urlParams.get('autoinstall');
        
        if (autoInstall === 'true') {
            // Mostrar prompt de instalación automáticamente
            setTimeout(() => {
                const event = new CustomEvent('auto-install-request');
                window.dispatchEvent(event);
            }, 1000);
        }
    }, []);

    return null;
};

export default AutoInstaller;