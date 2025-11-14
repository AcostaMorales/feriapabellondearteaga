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
            {
                id: 2,
                titulo: 'Presentación Ballet Folklórico',
                descripcion: 'Espectáculo de danza tradicional mexicana',
                hora: '18:00',
                artista: 'Ballet Folklórico Nacional'
            }
        ],
        '2025-11-15': [
            {
                id: 3,
                titulo: 'Teatro: "La Casa de Bernarda Alba"',
                descripcion: 'Obra clásica de Federico García Lorca',
                hora: '19:30',
                artista: 'Compañía Teatro del Estado'
            }
        ],
        '2025-11-16': [
            {
                id: 4,
                titulo: 'Concierto de Rock Sinfónico',
                descripcion: 'Fusión de rock clásico con orquesta sinfónica',
                hora: '21:00',
                artista: 'Banda Sinfónica Rock'
            },
            {
                id: 5,
                titulo: 'Espectáculo Infantil',
                descripcion: 'Obra musical para toda la familia',
                hora: '17:00',
                artista: 'Grupo Infantil Arcoíris'
            }
        ],
        '2025-11-17': [
            {
                id: 6,
                titulo: 'Concierto Gospel',
                descripcion: 'Música gospel con coro internacional',
                hora: '19:00',
                artista: 'Coro Gospel Internacional'
            }
        ],
        '2025-11-18': [],
        '2025-11-19': [
            {
                id: 7,
                titulo: 'Monólogo Cómico',
                descripcion: 'Stand-up comedy con comediante nacional',
                hora: '20:30',
                artista: 'Carlos Comedian'
            }
        ],
        '2025-11-20': [
            {
                id: 8,
                titulo: 'Concierto de Jazz',
                descripcion: 'Noche de jazz con músicos locales e internacionales',
                hora: '21:00',
                artista: 'Jazz Ensemble Pabellón'
            }
        ],
        '2025-11-21': [
            {
                id: 9,
                titulo: 'Teatro: "Romeo y Julieta"',
                descripcion: 'Adaptación moderna del clásico de Shakespeare',
                hora: '19:00',
                artista: 'Compañía Juvenil de Teatro'
            }
        ],
        '2025-11-22': [
            {
                id: 10,
                titulo: 'Concierto de Cierre',
                descripcion: 'Gran finale con artistas invitados',
                hora: '20:00',
                artista: 'Artistas Varios'
            }
        ],
        '2025-11-23': [
            {
                id: 11,
                titulo: 'Gala de Clausura',
                descripcion: 'Ceremonia de clausura con espectáculo especial',
                hora: '19:30',
                artista: 'Elenco Especial de Clausura'
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