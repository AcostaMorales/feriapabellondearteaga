import React from 'react';
import './ZonaPeques.css';

const ZonaPeques = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
           
             
        ],
        '2025-11-15': [
            {
                id: 1,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
            {
                id: 2,
                titulo: 'Inauguración Zona Peques que trascienden',
                descripcion: '',
                hora: '17:30',
                artista: ''
            }
            
        ],
        '2025-11-16': [
            {
                id: 3,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
           
        ],
        '2025-11-17': [
            {
                id: 4,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
            
        ],
        '2025-11-18': [
            {
                id: 5,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
            
        ],
        '2025-11-19': [
            {
                id: 6,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
            
        ],
        '2025-11-20': [
            {
                id: 7,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
            
        ],
        '2025-11-21': [
            {
                id: 8,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
        ],
        '2025-11-22': [
            {
                id: 9,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
            
        ],
        '2025-11-23': [
            {
                id: 10,
                titulo: 'Multisensorial ',
                descripcion: 'Estimulación dendorial, sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación ...',
                hora: '17:00',
                artista: ''
            },
        ]
    };

    const fechas = [
        { fecha: '2025-11-14', dia: 'Viernes 14', nombre: 'Noviembre' },
        { fecha: '2025-11-15', dia: 'Sábado 15', nombre: 'Noviembre' },
        { fecha: '2025-11-16', dia: 'Domingo 16', nombre: 'Noviembre' },
        { fecha: '2025-11-17', dia: 'Lunes 17', nombre: 'Noviembre' },
        { fecha: '2025-11-18', dia: 'Martes 18', nombre: 'Noviembre' },
        { fecha: '2025-11-19', dia: 'Miércoles 19', nombre: 'Noviembre' },
        { fecha: '2025-11-20', dia: 'Jueves 20', nombre: 'Noviembre' },
        { fecha: '2025-11-21', dia: 'Viernes 21', nombre: 'Noviembre' },
        { fecha: '2025-11-22', dia: 'Sábado 22', nombre: 'Noviembre' },
        { fecha: '2025-11-23', dia: 'Domingo 23', nombre: 'Noviembre' }
    ];

    // Función para eliminar evento (deshabilitada)
    const eliminarEvento = () => {
        console.log('Evento no se puede eliminar desde la aplicación');
    };

    return (
        <div className="zona-peques-container">

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Zona Peques</h1>
                <p className="subtitulo">Diversión para los más pequeños - 14 al 23 de Noviembre 2025</p>
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
                            {eventos[fecha].length > 0 ? (
                                eventos[fecha].map(evento => (
                                    <div key={evento.id} className="evento-card">
                                        <div className="evento-info">
                                            <div className="evento-hora">{evento.hora}</div>
                                            <div className="evento-detalles">
                                                <h3 className="evento-titulo">{evento.titulo}</h3>
                                                <p className="evento-artista">{evento.artista}</p>
                                                <p className="evento-descripcion">{evento.descripcion}</p>
                                            </div>
                                        </div>
                                        <button 
                                            className="btn-eliminar"
                                            onClick={eliminarEvento}
                                            aria-label="Eliminar evento"
                                            disabled
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="sin-eventos">
                                    <p>No hay eventos programados para esta fecha</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZonaPeques;