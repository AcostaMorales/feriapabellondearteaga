import React from 'react';
import './LienzoCharro.css';

const LienzoCharro = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            
        ],
        '2025-11-15': [
           
        ],
        '2025-11-16': [
           
        ],
        '2025-11-17': [
            
        ],
        '2025-11-18': [
           
        ],
        '2025-11-19': [
            
        ],
        '2025-11-20': [
            
        ],
        '2025-11-21': [
           
        ],
        '2025-11-22': [
            
        ],
        '2025-11-23': [
           
        ]
    };

    const fechas = [
        { fecha: '2025-11-14', dia: 'Jueves 14', nombre: 'Noviembre' },
        { fecha: '2025-11-15', dia: 'Viernes 15', nombre: 'Noviembre' },
        { fecha: '2025-11-16', dia: 'Sábado 16', nombre: 'Noviembre' },
        { fecha: '2025-11-17', dia: 'Domingo 17', nombre: 'Noviembre' },
        { fecha: '2025-11-18', dia: 'Lunes 18', nombre: 'Noviembre' },
        { fecha: '2025-11-19', dia: 'Martes 19', nombre: 'Noviembre' },
        { fecha: '2025-11-20', dia: 'Miércoles 20', nombre: 'Noviembre' },
        { fecha: '2025-11-21', dia: 'Jueves 21', nombre: 'Noviembre' },
        { fecha: '2025-11-22', dia: 'Viernes 22', nombre: 'Noviembre' },
        { fecha: '2025-11-23', dia: 'Sábado 23', nombre: 'Noviembre' }
    ];

    return (
        <div className="lienzo-charro-container">
            {/* Imagen de portada */}
            <div className="portada-container">
                <img 
                    src="https://res.cloudinary.com/dbebikryr/image/upload/v1762389321/lienzo_charro_bftijw.png" 
                    alt="Lienzo Charro" 
                    className="imagen-portada"
                />
            </div>

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Lienzo Charro</h1>
                <p className="subtitulo">Eventos de Charrería del 14 al 23 de Noviembre 2025</p>
            </div>

            {/* Sección de eventos por fechas */}
            <div className="eventos-contenedor">
                {fechas.map(({ fecha, dia, nombre }) => (
                    <div key={fecha} className="fecha-seccion">
                        <div className="fecha-header">
                            <h2 className="fecha-titulo">{dia}</h2>
                            <span className="fecha-mes">{nombre}</span>
                        </div>

                        {/* Lista de eventos para esta fecha */}
                        <div className="eventos-lista">
                            {eventos[fecha] && eventos[fecha].length > 0 ? (
                                eventos[fecha].map(evento => (
                                    <div key={evento.id} className="evento-item">
                                        <div className="evento-content">
                                            <div className="evento-header">
                                                <h3 className="evento-titulo">{evento.titulo}</h3>
                                                <span className="evento-hora">{evento.hora}</span>
                                            </div>
                                            <div className="evento-info">
                                                <div className="evento-meta">
                                                    <span className="evento-participante">{evento.participante}</span>
                                                    {evento.modalidad && (
                                                        <span className="evento-modalidad">{evento.modalidad}</span>
                                                    )}
                                                </div>
                                                <p className="evento-descripcion">{evento.descripcion}</p>
                                            </div>
                                        </div>
                                        <button 
                                            className="btn-eliminar"
                                            onClick={() => console.log('Función de eliminación deshabilitada')}
                                            aria-label="Eliminar evento"
                                            disabled
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="sin-eventos">
                                    <p>No hay eventos de charrería programados para esta fecha</p>
                                </div>
                            )}
                        </div>

                        {/* Formulario deshabilitado - eventos hardcodeados */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LienzoCharro;