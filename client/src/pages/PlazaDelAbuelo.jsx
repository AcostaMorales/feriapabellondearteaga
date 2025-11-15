import React from 'react';
import './PlazaDelAbuelo.css';

const PlazaDelAbuelo = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            {
                id: 1,
                titulo: 'Inauguración Plaza del Abuelo',
                descripcion: 'Ceremonia de apertura con autoridades locales y bendición del espacio',
                hora: '18:00',
                artista: 'Autoridades Municipales',
                tipo: 'Inauguración'
            },
            {
                id: 2,
                titulo: 'Serenata Tradicional',
                descripcion: 'Música tradicional mexicana bajo las estrellas',
                hora: '20:00',
                artista: 'Trío Los Nostálgicos',
                tipo: 'Musical'
            }
        ],
        '2025-11-15': [
            {
                id: 3,
                titulo: 'Cuentacuentos del Abuelo',
                descripcion: 'Historias y leyendas de Pabellón de Arteaga narradas por adultos mayores',
                hora: '17:00',
                artista: 'Círculo de Adultos Mayores',
                tipo: 'Cultural'
            },
            {
                id: 4,
                titulo: 'Noche de Boleros',
                descripcion: 'Los mejores boleros de la época dorada interpretados en vivo',
                hora: '19:30',
                artista: 'Dúo Romántico Corazón',
                tipo: 'Musical'
            }
        ],
        '2025-11-16': [
            {
                id: 5,
                titulo: 'Matinée Familiar',
                descripcion: 'Actividades recreativas para toda la familia en honor a los abuelos',
                hora: '16:00',
                artista: 'Grupo de Animación Familiar',
                tipo: 'Familiar'
            },
            {
                id: 6,
                titulo: 'Tarde de Rondallas',
                descripcion: 'Música tradicional de cine de oro mexicano',
                hora: '17:00',
                artista: 'Mariachi Nuevo Milenio',
                tipo: 'Musical'
            },
            {
                id: 7,
                titulo: 'Baile de Salón',
                descripcion: 'Demostración y participación de bailes de salón clásicos',
                hora: '20:00',
                artista: 'Academia de Baile Elegancia',
                tipo: 'Danza'
            }
        ],
        '2025-11-17': [
            {
                id: 8,
                titulo: 'Misa Dominical',
                descripcion: 'Celebración religiosa en honor a los adultos mayores',
                hora: '10:00',
                artista: 'Padre Miguel Hernández',
                tipo: 'Religioso'
            },
            {
                id: 9,
                titulo: 'Tarde de Nostalgia',
                descripción: 'Música de los 60s, 70s y 80s que marcó una generación',
                hora: '17:00',
                artista: 'Los Veteranos del Rock',
                tipo: 'Musical'
            }
        ],
        '2025-11-18': [
            {
                id: 10,
                titulo: 'Taller de Memorias',
                descripcion: 'Espacio para compartir anécdotas y recuerdos de la comunidad',
                hora: '16:00',
                artista: 'Asociación Cultural Memorias',
                tipo: 'Cultural'
            },
            {
                id: 11,
                titulo: 'Música en Vivo',
                descripcion: 'Presentación de artistas locales con repertorio variado',
                hora: '17:00',
                artista: 'Conjunto Musical Tradición',
                tipo: 'Musical'
            }
        ],
        '2025-11-19': [
            {
                id: 12,
                titulo: 'Exposición de Fotografías',
                descripcion: 'Muestra fotográfica de la historia de Pabellón de Arteaga',
                hora: '15:00',
                artista: 'Archivo Histórico Municipal',
                tipo: 'Cultural'
            },
            {
                id: 13,
                titulo: 'Tamborazo Tradicional',
                descripcion: 'Música de banda con el sabor tradicional de Aguascalientes',
                hora: '17:00',
                artista: 'Tamborazo San Miguel',
                tipo: 'Musical'
            }
        ],
        '2025-11-20': [
            {
                id: 14,
                titulo: 'Día de la Revolución - Homenaje',
                descripcion: 'Ceremonia cívica en memoria de los héroes revolucionarios',
                hora: '10:00',
                artista: 'Comité Cívico Municipal',
                tipo: 'Cívico'
            },
            {
                id: 15,
                titulo: 'Música Revolucionaria',
                descripcion: 'Interpretación de corridos y música de la época revolucionaria',
                hora: '17:00',
                artista: 'Los Corridos de la Patria',
                tipo: 'Musical'
            }
        ],
        '2025-11-21': [
            {
                id: 16,
                titulo: 'Charla: Historias de Vida',
                descripcion: 'Testimonios de adultos mayores sobre la evolución del pueblo',
                hora: '16:00',
                artista: 'Cronistas Locales',
                tipo: 'Cultural'
            },
            {
                id: 17,
                titulo: 'Noche de Trova',
                descripcion: 'Música de trova y canción de protesta de los años dorados',
                hora: '19:00',
                artista: 'Trovadores de Aguascalientes',
                tipo: 'Musical'
            }
        ],
        '2025-11-22': [
            {
                id: 18,
                titulo: 'Festival de Talentos Senior',
                descripcion: 'Presentación de talentos artísticos de adultos mayores',
                hora: '16:00',
                artista: 'Participantes Locales',
                tipo: 'Variado'
            },
            {
                id: 19,
                titulo: 'Gran Serenata de Clausura',
                descripcion: 'Presentación especial de cierre con todos los artistas participantes',
                hora: '19:00',
                artista: 'Elenco Completo',
                tipo: 'Musical'
            }
        ],
        '2025-11-23': [
            {
                id: 20,
                titulo: 'Misa de Acción de Gracias',
                descripcion: 'Ceremonia religiosa de agradecimiento por los eventos realizados',
                hora: '11:00',
                artista: 'Padre Miguel Hernández',
                tipo: 'Religioso'
            },
            {
                id: 21,
                titulo: 'Despedida Musical',
                descripcion: 'Último concierto de la temporada con música tradicional mexicana',
                hora: '17:00',
                artista: 'Mariachi Tradición Mexicana',
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
                                    <div key={evento.id} className="evento-card">
                                        <div className="evento-info">
                                            <div className="evento-hora">
                                                {evento.hora}
                                            </div>
                                            <div className="evento-detalles">
                                                <h3 className="evento-titulo">{evento.titulo}</h3>
                                                <p className="evento-descripcion">{evento.descripcion}</p>
                                                <div className="evento-meta">
                                                    <span className="evento-artista">{evento.artista}</span>
                                                    {evento.tipo && (
                                                        <span className="evento-tipo">{evento.tipo}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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