import React, { useState, useEffect } from 'react';
import temporizadorService from '../services/temporizador';
import CuentaRegresiva from './CuentaRegresiva';
import './Temporizador.css';

const Temporizador = () => {
    const [temporizador, setTemporizador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        temporizadorService.get('/temporizador/')
            .then(res => {
                console.log('Respuesta del servidor:', res.data);
                setTemporizador(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
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
                    <div className="image-overlay">
                        <h2 className="event-subtitle">¡Te esperamos!</h2>
                    </div>
                </div>

                {/* Footer */}
                <footer className="app-footer">
                    <p>Pabellón de Arteaga te espera</p>
                </footer>
            </div>
        </div>
    );
}

export default Temporizador;