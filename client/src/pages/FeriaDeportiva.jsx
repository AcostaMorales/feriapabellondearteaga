import React from 'react';
import './FeriaDeportiva.css';

const FeriaDeportiva = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            {
                id: 1,
                titulo: 'Torneo de Fútbol Infantil',
                descripcion: 'Torneo para niños de 8 a 12 años',
                hora: '09:00',
                deporte: 'Fútbol',
                categoria: 'Infantil'
            },
            {
                id: 2,
                titulo: 'Competencia de Natación',
                descripcion: 'Competencia libre para todas las edades',
                hora: '16:00',
                deporte: 'Natación',
                categoria: 'Libre'
            }
        ],
        '2025-11-15': [
            {
                id: 3,
                titulo: 'Torneo de Básquetbol Juvenil',
                descripcion: 'Campeonato estatal juvenil de básquetbol',
                hora: '14:00',
                deporte: 'Básquetbol',
                categoria: 'Juvenil'
            },
            {
                id: 4,
                titulo: 'Exhibición de Box',
                descripcion: 'Peleas de exhibición con boxeadores profesionales',
                hora: '19:00',
                deporte: 'Box',
                categoria: 'Adulto'
            }
        ],
        '2025-11-16': [
            {
                id: 5,
                titulo: 'Maratón Familiar',
                descripcion: 'Carrera de 5k para toda la familia',
                hora: '07:00',
                deporte: 'Atletismo',
                categoria: 'Mixto'
            },
            {
                id: 6,
                titulo: 'Torneo de Voleibol Femenil',
                descripcion: 'Competencia de voleibol equipos femeniles',
                hora: '15:00',
                deporte: 'Voleibol',
                categoria: 'Adulto'
            }
        ],
        '2025-11-17': [
            {
                id: 7,
                titulo: 'Ciclismo de Montaña',
                descripcion: 'Recorrido por las montañas de Pabellón',
                hora: '08:00',
                deporte: 'Ciclismo',
                categoria: 'Adulto'
            }
        ],
        '2025-11-18': [
            {
                id: 8,
                titulo: 'Torneo de Ajedrez',
                descripcion: 'Campeonato municipal de ajedrez',
                hora: '10:00',
                deporte: 'Ajedrez',
                categoria: 'Libre'
            }
        ],
        '2025-11-19': [
            {
                id: 9,
                titulo: 'Competencia de Lucha Libre',
                descripcion: 'Torneo regional de lucha libre',
                hora: '18:00',
                deporte: 'Lucha',
                categoria: 'Adulto'
            }
        ],
        '2025-11-20': [
            {
                id: 10,
                titulo: 'Torneo de Tenis',
                descripcion: 'Campeonato individual y dobles',
                hora: '09:00',
                deporte: 'Tenis',
                categoria: 'Adulto'
            }
        ],
        '2025-11-21': [
            {
                id: 11,
                titulo: 'Atletismo Veteranos',
                descripcion: 'Competencias para atletas mayores de 40',
                hora: '17:00',
                deporte: 'Atletismo',
                categoria: 'Veteranos'
            }
        ],
        '2025-11-22': [
            {
                id: 12,
                titulo: 'Torneo de Fútbol Final',
                descripcion: 'Gran final del torneo de fútbol',
                hora: '16:00',
                deporte: 'Fútbol',
                categoria: 'Adulto'
            }
        ],
        '2025-11-23': [
            {
                id: 13,
                titulo: 'Clausura Deportiva',
                descripcion: 'Ceremonia de clausura y premiación',
                hora: '18:00',
                deporte: 'Ceremonia',
                categoria: 'General'
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

    // Función para eliminar evento (deshabilitada)
    const eliminarEvento = () => {
        console.log('Evento no se puede eliminar desde la aplicación');
    };

    return (
        <div className="feria-deportiva-container">
            {/* Imagen de portada */}
            <div className="portada-container">
                <img 
                    src="https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png" 
                    alt="Feria Deportiva Revolucionaria" 
                    className="imagen-portada"
                />
            </div>

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Feria Deportiva Revolucionaria</h1>
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
                                                <div className="evento-meta">
                                                    <span className="evento-deporte">{evento.deporte}</span>
                                                    {evento.categoria && (
                                                        <span className="evento-categoria">{evento.categoria}</span>
                                                    )}
                                                </div>
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
                                    <p>No hay eventos deportivos programados para esta fecha</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeriaDeportiva;