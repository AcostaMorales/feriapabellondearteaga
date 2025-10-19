import React, { useEffect, useState } from 'react';

const PWAUpdatePrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState(null);

    useEffect(() => {
        // Detectar cuando hay una nueva versión disponible
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });

            navigator.serviceWorker.ready.then((registration) => {
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            setWaitingWorker(newWorker);
                            setShowPrompt(true);
                        }
                    });
                });
            });
        }
    }, []);

    const updateApp = () => {
        if (waitingWorker) {
            waitingWorker.postMessage({ type: 'SKIP_WAITING' });
            setShowPrompt(false);
        }
    };

    const dismissPrompt = () => {
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="pwa-update-prompt">
            <div className="pwa-update-content">
                <div className="pwa-update-icon">🔄</div>
                <div className="pwa-update-text">
                    <h3>¡Nueva versión disponible!</h3>
                    <p>Hay una nueva versión de la app. ¿Quieres actualizarla?</p>
                </div>
                <div className="pwa-update-actions">
                    <button onClick={updateApp} className="pwa-update-btn primary">
                        Actualizar
                    </button>
                    <button onClick={dismissPrompt} className="pwa-update-btn secondary">
                        Después
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PWAUpdatePrompt;