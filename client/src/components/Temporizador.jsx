import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CuentaRegresiva from './CuentaRegresiva';
import InstallPWAButton from './InstallPWAButton';
import ClearSiteDataButton from './ClearSiteDataButton';
import NotificationPermissionButton from './NotificationPermissionButton';
import './Temporizador.css';

const Temporizador = () => {
    const [temporizador, setTemporizador] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Función para calcular las 2 PM hora de México
    const calcularFecha2PM = () => {
        // Obtener la fecha y hora actual en México
        const now = new Date();
        
        // Crear un objeto Date para las 2 PM de hoy en hora de México
        // Usamos toLocaleString para convertir a la zona horaria de México
        const hoyEnMexico = new Date(now.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        
        // Crear fecha para las 2 PM de hoy
        const fecha2PM = new Date();
        fecha2PM.setHours(14, 0, 0, 0); // 14:00:00.000 hora local
        
        // Si ya pasaron las 2 PM de hoy en México, programar para mañana
        const horaActualMexico = parseInt(hoyEnMexico.toLocaleString("en-US", {
            timeZone: "America/Mexico_City",
            hour: "numeric",
            hour12: false
        }));
        
        console.log(`🕐 Hora actual en México: ${horaActualMexico}:${hoyEnMexico.getMinutes()}`);
        
        if (horaActualMexico >= 14) {
            fecha2PM.setDate(fecha2PM.getDate() + 1);
            console.log('⏰ Ya pasaron las 2 PM hoy, programando para mañana');
        } else {
            console.log('⏰ Programando para las 2 PM de hoy');
        }
        
        return fecha2PM.toISOString();
    };

    useEffect(() => {
        console.log('🔄 Configurando temporizador para 2 PM...');
        
        // Crear objeto de temporizador con fecha objetivo a las 2 PM
        const temporizadorData = {
            fechaLimite: calcularFecha2PM(),
            imagen: '/pwa-512x512.png', // Imagen por defecto
            titulo: 'Cuenta regresiva hasta las 2 PM',
            descripcion: 'Tiempo restante hasta las 2 de la tarde hora de México'
        };
        
        console.log('⏰ Fecha objetivo:', temporizadorData.fechaLimite);
        
        // Función para verificar si la cuenta regresiva ha terminado
        const verificarFinCuentaRegresiva = (fechaLimite) => {
            const ahora = new Date().getTime();
            const fechaObjetivo = new Date(fechaLimite).getTime();
            const diferencia = fechaObjetivo - ahora;
            
            if (diferencia <= 0) {
                console.log('🎉 ¡Llegaron las 2 PM!');
                // Navegar a Home después de llegar las 2 PM
                setTimeout(() => {
                    navigate('/home');
                }, 2000); // Esperar 2 segundos para mostrar que llegó a 0
            }
        };
        
        setTemporizador(temporizadorData);
        setLoading(false);
        
        // Verificar inicialmente si ya es después de las 2 PM
        verificarFinCuentaRegresiva(temporizadorData.fechaLimite);
        
        // Verificar cada segundo si termina la cuenta regresiva
        const intervalo = setInterval(() => {
            verificarFinCuentaRegresiva(temporizadorData.fechaLimite);
        }, 1000);
        
        return () => clearInterval(intervalo);
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