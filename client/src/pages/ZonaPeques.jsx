import React from 'react';
import './ZonaPeques.css';

const ZonaPeques = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            {
                id: 1,
                titulo: 'Inauguración de la Zona Peques',
                descripcion: 'Bienvenida con payasos y globos',
                hora: '16:00',
                artista: 'Payasos Divertidos'
            }
        ],
        '2025-11-15': [
            {
                id: 2,
                titulo: 'Teatro de Títeres',
                descripcion: 'Aventuras mágicas con títeres gigantes',
                hora: '11:00',
                artista: 'Compañía Los Títeres Mágicos'
            },
            {
                id: 3,
                titulo: 'Taller de Pintura Infantil',
                descripcion: 'Los niños crean su propia obra de arte',
                hora: '15:00',
                artista: 'Maestra Colorín'
            },
            {
                id: 4,
                titulo: 'Show Musical Infantil',
                descripcion: 'Canciones y bailes para toda la familia',
                hora: '18:00',
                artista: 'Grupo Musical Arcoíris'
            }
        ],
        '2025-11-16': [
            {
                id: 5,
                titulo: 'Cuentacuentos Mágico',
                descripcion: 'Historias fantásticas llenas de aventura',
                hora: '10:30',
                artista: 'El Narrador Encantado'
            },
            {
                id: 6,
                titulo: 'Taller de Manualidades',
                descripcion: 'Creación de figuras con materiales reciclados',
                hora: '14:00',
                artista: 'Equipo Eco-Arte'
            },
            {
                id: 7,
                titulo: 'Espectáculo de Magia',
                descripcion: 'Trucos de magia sorprendentes para niños',
                hora: '17:30',
                artista: 'Mago Fantasía'
            }
        ],
        '2025-11-17': [
            {
                id: 8,
                titulo: 'Obra de Teatro Infantil',
                descripcion: 'Los Tres Cochinitos - versión musical',
                hora: '11:00',
                artista: 'Teatro Infantil Municipal'
            },
            {
                id: 9,
                titulo: 'Taller de Cocina Divertida',
                descripcion: 'Preparación de postres fáciles para niños',
                hora: '16:00',
                artista: 'Chef Pequeñín'
            }
        ],
        '2025-11-18': [
            {
                id: 10,
                titulo: 'Festival de Juegos Tradicionales',
                descripcion: 'Matarile rile ron, vibora de la mar y más',
                hora: '15:30',
                artista: 'Animadores Tradicionales'
            },
            {
                id: 11,
                titulo: 'Cinema Infantil',
                descripcion: 'Proyección de película familiar',
                hora: '19:00',
                artista: 'Cine Familiar'
            }
        ],
        '2025-11-19': [
            {
                id: 12,
                titulo: 'Taller de Ciencias Divertidas',
                descripcion: 'Experimentos seguros y emocionantes',
                hora: '10:00',
                artista: 'Científicos Locos'
            },
            {
                id: 13,
                titulo: 'Show de Burbujas Gigantes',
                descripcion: 'Espectáculo visual con burbujas de colores',
                hora: '17:00',
                artista: 'El Reino de las Burbujas'
            }
        ],
        '2025-11-20': [
            {
                id: 14,
                titulo: 'Concurso de Disfraces Infantiles',
                descripcion: 'Los mejores disfraces creativos de los niños',
                hora: '16:30',
                artista: 'Jurado Especializado'
            },
            {
                id: 15,
                titulo: 'Baile Infantil',
                descripcion: 'Música y coreografías para niños',
                hora: '18:30',
                artista: 'DJ Pequeños Bailarines'
            }
        ],
        '2025-11-21': [
            {
                id: 16,
                titulo: 'Taller de Jardinería para Niños',
                descripcion: 'Plantación de semillas en macetas decoradas',
                hora: '14:00',
                artista: 'Equipo Verde Infantil'
            },
            {
                id: 17,
                titulo: 'Espectáculo de Música y Movimiento',
                descripcion: 'Canciones interactivas con movimientos',
                hora: '17:00',
                artista: 'Música en Movimiento'
            }
        ],
        '2025-11-22': [
            {
                id: 18,
                titulo: 'Gran Festival de Talentos Infantiles',
                descripcion: 'Los niños muestran sus habilidades especiales',
                hora: '15:00',
                artista: 'Participantes Especiales'
            },
            {
                id: 19,
                titulo: 'Noche de Karaoke Infantil',
                descripcion: 'Cantemos juntos nuestras canciones favoritas',
                hora: '19:30',
                artista: 'Karaoke Diversión'
            }
        ],
        '2025-11-23': [
            {
                id: 20,
                titulo: 'Clausura Zona Peques',
                descripcion: 'Gran finale con todos los personajes favoritos',
                hora: '16:00',
                artista: 'Elenco Completo Zona Peques'
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