import React from 'react';
import './TeatroBicentenario.css';

const TeatroBicentenario = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            {
                id: 1,
                titulo: 'Elección y Coronación de la Reina FRR2025',
                descripcion: '',
                hora: '20:00',
                artista: 'Orquesta Sinfónica de Aguascalientes'
            },
            
        ],
        '2025-11-15': [
            {
                id: 2,
                titulo: 'Teatro bicentenario ballet ballet bali hai',
                descripcion: '',
                hora: '19:00',
                artista: ''
            }
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
            {
                id: 3,
                titulo: 'Ballet municipal de danza folklorico izkaltékatl, alternando con el grupo de danza folklórica kan ometeotl',
                descripcion: '',
                hora: '19:00',
                artista: ''
            }
        ],
        '2025-11-23': [
            {
                id: 4,
                titulo: 'Grupo de danza folklórica Ehecatl de Pabellón de Arteaga, alternando con el grupo de danza folklórica Metsi Nei',
                descripcion: '',
                hora: '19:00',
                artista: ''
            }
        ]
    };

    const fechas = [
        { fecha: '2025-11-14', dia: 'Viernos 14', nombre: 'Noviembre' },
        { fecha: '2025-11-15', dia: 'Sábado 15', nombre: 'Noviembre' },
        { fecha: '2025-11-16', dia: 'Domingo 16', nombre: 'Noviembre' },
        { fecha: '2025-11-17', dia: 'Lunes 17', nombre: 'Noviembre' },
        { fecha: '2025-11-18', dia: 'Martes 18', nombre: 'Noviembre' },
        { fecha: '2025-11-19', dia: 'Miercoles 19', nombre: 'Noviembre' },
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
        <div className="teatro-container">

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Teatro Bicentenario</h1>
                <p className="subtitulo">Programación del 14 al 23 de Noviembre 2025</p>
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

export default TeatroBicentenario;