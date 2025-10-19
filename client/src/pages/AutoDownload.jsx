import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoDownload = () => {
    const [countdown, setCountdown] = useState(5);
    const [installing, setInstalling] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let deferredPrompt = null;

        // Escuchar el evento beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setInstalling(true);
            
            // Auto-instalar después del countdown
            setTimeout(() => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('PWA instalada automáticamente');
                        }
                        navigate('/');
                    });
                }
            }, 5000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Countdown timer
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (!installing) {
                        // Si no hay prompt disponible, redirigir con instrucciones
                        navigate('/?showInstructions=true');
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            clearInterval(timer);
        };
    }, [navigate, installing]);

    const handleManualInstall = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            alert('En iOS:\n1. Toca el botón Compartir (⬆️)\n2. Selecciona "Agregar a pantalla principal"');
        } else {
            alert('En Chrome:\n1. Menú (⋮) → "Instalar aplicación"\n2. O añadir a marcadores para acceso rápido');
        }
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>📱</div>
                <h1 style={styles.title}>Instalación Automática</h1>
                <p style={styles.description}>
                    {installing 
                        ? 'Instalando aplicación...' 
                        : `Instalación automática en ${countdown} segundos`
                    }
                </p>
                
                <div style={styles.loader}>
                    <div style={{...styles.progress, width: `${((5-countdown)/5)*100}%`}}></div>
                </div>

                <div style={styles.buttons}>
                    <button 
                        onClick={handleManualInstall}
                        style={styles.button}
                    >
                        Instalar Manualmente
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        style={styles.cancelButton}
                    >
                        Cancelar
                    </button>
                </div>

                <div style={styles.info}>
                    <h3>💡 ¿Por qué instalar?</h3>
                    <ul style={styles.benefits}>
                        <li>✅ Acceso directo desde tu pantalla de inicio</li>
                        <li>✅ Funciona sin conexión a internet</li>
                        <li>✅ Notificaciones de eventos</li>
                        <li>✅ Experiencia como app nativa</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    },
    card: {
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    },
    icon: {
        fontSize: '4rem',
        marginBottom: '20px'
    },
    title: {
        color: '#2d3748',
        marginBottom: '15px',
        fontSize: '1.5rem'
    },
    description: {
        color: '#4a5568',
        marginBottom: '30px',
        fontSize: '1.1rem'
    },
    loader: {
        width: '100%',
        height: '6px',
        background: '#e2e8f0',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '30px'
    },
    progress: {
        height: '100%',
        background: 'linear-gradient(90deg, #667eea, #764ba2)',
        transition: 'width 1s ease'
    },
    buttons: {
        display: 'flex',
        gap: '15px',
        marginBottom: '30px'
    },
    button: {
        flex: 1,
        padding: '12px 20px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    cancelButton: {
        flex: 1,
        padding: '12px 20px',
        background: '#e2e8f0',
        color: '#4a5568',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer'
    },
    info: {
        textAlign: 'left',
        background: '#f7fafc',
        padding: '20px',
        borderRadius: '10px'
    },
    benefits: {
        margin: 0,
        paddingLeft: '0',
        listStyle: 'none'
    }
};

export default AutoDownload;