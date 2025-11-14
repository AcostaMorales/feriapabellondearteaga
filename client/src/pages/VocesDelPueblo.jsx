import React from 'react';
import './VocesDelPueblo.css';

const VocesDelPueblo = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
           
        ],
        '2025-11-15': [
            {
                id: 1,
                titulo: 'Renacidos de pabellón',
                descripcion:'',
                hora: '19:00',
                artista: ''
            },
            
        ],
        '2025-11-16': [
            {
                id: 2,
                titulo: 'Marijuana',
                descripcion: '',
                hora: '17:00',
                artista: ''
            },
            
        ],
        '2025-11-17': [
            {
                id: 3,
                titulo: 'Los aguerridos',
                descripcion: '',
                hora: '19:00',
                artista: ''
            }
        ],
        '2025-11-18': [
            {
                id: 4,
                titulo: 'Los gallardos',
                descripcion: '',
                hora: '19:00',
                artista: ''
            }
        ],
        '2025-11-19': [
            {
                id: 8,
                titulo: 'Música Norteña',
                descripcion: 'Noche de música norteña con grupos regionales',
                hora: '20:30',
                artista: 'Los Norteños de Aguascalientes'
            }
        ],
        '2025-11-20': [
            {
                id: 9,
                titulo: 'Monólogos del Pueblo',
                descripcion: 'Stand-up comedy con comediantes locales',
                hora: '21:00',
                artista: 'Comediantes Locales'
            }
        ],
        '2025-11-21': [
            {
                id: 10,
                titulo: 'Serenata Popular',
                descripcion: 'Serenata con canciones tradicionales mexicanas',
                hora: '19:00',
                artista: 'Tríos Tradicionales'
            }
        ],
        '2025-11-22': [
            {
                id: 11,
                titulo: 'Festival de Talentos',
                descripcion: 'Muestra de talentos diversos de la comunidad',
                hora: '18:00',
                artista: 'Talentos Comunitarios'
            }
        ],
        '2025-11-23': [
            {
                id: 12,
                titulo: 'Gran Finale Popular',
                descripcion: 'Cierre con todos los artistas participantes',
                hora: '19:30',
                artista: 'Todos los Participantes'
            }
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
        <div className="voces-container">

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Voces del Pueblo</h1>
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

export default VocesDelPueblo;