import React from 'react';
import './PlazaDelAbuelo.css';

const PlazaDelAbuelo = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            
        ],
        '2025-11-15': [
           
        ],
        '2025-11-16': [
            
        ],
        '2025-11-17': [
            {
                id: 1,
                titulo: 'Tarde de rondallas (principales calles)',
                descripcion: 'Tematica de cine de oro',
                hora: '17:00',
                artista: 'Mariachi Nuevo Milenio',
                tipo: 'Musical'
            }
        ],
        '2025-11-18': [
            {
                id: 2,
                titulo: 'Musica en vivo',
                descripcion: '',
                hora: '17:00',
                artista: '',
                tipo: ''
            }
        ],
        '2025-11-19': [
            {
                id: 3,
                titulo: 'Tamborazo',
                descripcion: '',
                hora: '17:00',
                artista: '',
                tipo: ''
            }
        ],
        '2025-11-20': [
            {
                id: 4,
                titulo: 'NMusica en vivo',
                descripcion: '',
                hora: '17:00',
                artista: '',
                tipo: ''
            }
        ],
        '2025-11-21': [
            {
                id: 10,
                titulo: 'Función de Teatro Popular',
                descripcion: 'Obra teatral con temas regionales',
                hora: '19:30',
                artista: 'Grupo Teatral Coahuilense',
                tipo: 'Teatro'
            }
        ],
        '2025-11-22': [
            {
                id: 11,
                titulo: 'Baile Popular',
                descripcion: 'Baile tradicional con música en vivo',
                hora: '20:00',
                artista: 'Orquesta Los Antiguos',
                tipo: 'Baile'
            }
        ],
        '2025-11-23': [
            {
                id: 12,
                titulo: 'Gran Concierto de Clausura',
                descripcion: 'Cierre musical con artistas locales',
                hora: '21:00',
                artista: 'Artistas Unidos de Pabellón',
                tipo: 'Musical'
            }
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
        <div className="plaza-abuelo-container">

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Plaza del Abuelo</h1>
                <p className="subtitulo">Eventos Culturales del 14 al 23 de Noviembre 2025</p>
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
                                                    <span className="evento-artista">{evento.artista}</span>
                                                    {evento.tipo && (
                                                        <span className="evento-tipo">{evento.tipo}</span>
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
                                    <p>No hay eventos culturales programados para esta fecha</p>
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

export default PlazaDelAbuelo;