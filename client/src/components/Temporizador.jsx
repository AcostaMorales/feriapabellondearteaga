import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        console.log('🔄 Iniciando fetch de temporizador...');
        console.log('🌐 Base URL:', import.meta.env.VITE_APP_URL);
        
        // Función para verificar si la cuenta regresiva ha terminado
        const verificarFinCuentaRegresiva = (fechaLimite) => {
            const ahora = new Date().getTime();
            const fechaObjetivo = new Date(fechaLimite).getTime();
            const diferencia = fechaObjetivo - ahora;
            
            if (diferencia <= 0) {
                // La cuenta regresiva ha terminado, navegar a Home
                setTimeout(() => {
                    navigate('/home');
                }, 2000); // Esperar 2 segundos para mostrar que llegó a 0
            }
        };
        
        temporizadorService.get('/')
            .then(res => {
                console.log('✅ Respuesta del servidor:', res.data);
                setTemporizador(res.data);
                setLoading(false);
                
                // Verificar inicialmente si ya terminó la cuenta regresiva
                verificarFinCuentaRegresiva(res.data.fechaLimite);
                
                // Verificar cada segundo si termina la cuenta regresiva
                const intervalo = setInterval(() => {
                    verificarFinCuentaRegresiva(res.data.fechaLimite);
                }, 1000);
                
                return () => clearInterval(intervalo);
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
    }, [navigate]);

    if (loading) return (
        <div className="temporizador-container">
            <div className="temporizador-header">
                <div className="header-content">
                    <h1 className="header-title">Feria de Pabellón de Arteaga</h1>
                    <div className="header-line"></div>
                </div>
            </div>
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Cargando...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="temporizador-container">
            <div className="temporizador-header">
                <div className="header-content">
                    <h1 className="header-title">Feria de Pabellón de Arteaga</h1>
                    <div className="header-line"></div>
                </div>
            </div>
            <div className="error-message">
                <p>Error: {error}</p>
            </div>
        </div>
    );
    
    if (!temporizador) return (
        <div className="temporizador-container">
            <div className="temporizador-header">
                <div className="header-content">
                    <h1 className="header-title">Feria de Pabellón de Arteaga</h1>
                    <div className="header-line"></div>
                </div>
            </div>
            <div className="error-message">
                <p>No hay datos disponibles</p>
            </div>
        </div>
    );

    return (
        <div className="temporizador-container">
            {/* Nuevo Header */}
            <div className="temporizador-header">
                <div className="header-content">
                    <h1 className="header-title">Feria de Pabellón de Arteaga</h1>
                    <div className="header-line"></div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="temporizador-content">
                {/* Cuenta regresiva */}
                <div className="cuenta-regresiva">
                    <CuentaRegresiva fechaLimite={temporizador.fechaLimite} />
                </div>

                {/* Imagen del evento */}
                <div className="event-image-container">
                    <img 
                        src={temporizador.imagen} 
                        alt="Imagen del evento" 
                        className="event-image"
                    />
                </div>
                
                {/* Botones PWA - solo en desarrollo */}
                {import.meta.env.DEV && (
                    <div className="development-buttons">
                        <NotificationPermissionButton />
                        <InstallPWAButton />
                        <ClearSiteDataButton />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Temporizador;