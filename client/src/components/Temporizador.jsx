import React, { useState, useEffect } from 'react';
import temporizadorService from '../services/temporizador';
import CuentaRegresiva from './CuentaRegresiva';
import InstallPWAButton from './InstallPWAButton';
import ClearSiteDataButton from './ClearSiteDataButton';
import NotificationPermissionButton from './NotificationPermissionButton';
import './Temporizador.css';

const Temporizador = () => {
    const [temporizador, setTemporizador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('🔄 Iniciando fetch de temporizador...');
        console.log('🌐 Base URL:', import.meta.env.VITE_APP_URL);
        
        temporizadorService.get('/')
            .then(res => {
                console.log('✅ Respuesta del servidor:', res.data);
                setTemporizador(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('❌ Error fetching data:', error);
                console.error('📋 Error details:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data
                });
                setError(error.response?.data?.message || error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="app-container">
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Cargando...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="app-container">
            <div className="error-message">
                <p>Error: {error}</p>
            </div>
        </div>
    );
    
    if (!temporizador) return (
        <div className="app-container">
            <div className="no-data">
                <p>No hay datos disponibles</p>
            </div>
        </div>
    );

    return (
        <div className="app-container">
            <div className="mobile-app">
                {/* Header */}
                <header className="app-header">
                    <h1 className="app-title">Feria de Pabellón de Arteaga</h1>
                    <div className="header-decoration"></div>
                </header>

                {/* Cuenta regresiva */}
                <CuentaRegresiva fechaLimite={temporizador.fechaLimite} />

                {/* Imagen del evento */}
                <div className="event-image-container">
                    <img 
                        src={temporizador.imagen} 
                        alt="Imagen del evento" 
                        className="event-image"
                    />
                </div>

                {/* Footer */}
                <footer className="app-footer">
                    <p>Pabellón de Arteaga te espera</p>
                </footer>
            </div>
            
            {/* Botón de instalación PWA */}
            <InstallPWAButton />
            
            {/* Botón para limpiar datos del sitio */}
            <ClearSiteDataButton />
            
            {/* Botón de notificaciones */}
            <NotificationPermissionButton />
        </div>
    );
}

export default Temporizador;