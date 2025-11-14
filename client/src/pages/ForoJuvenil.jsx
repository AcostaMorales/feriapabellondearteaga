import React from 'react';
import './ForoJuvenil.css';

const ForoJuvenil = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            {
                id: 1,
                titulo: 'Taller de Emprendimiento Digital',
                descripcion: 'Cómo crear tu startup en la era digital',
                hora: '16:00',
                ponente: 'María González',
                tema: 'Emprendimiento'
            },
            {
                id: 2,
                titulo: 'Conferencia: Futuro de la IA',
                descripcion: 'Inteligencia artificial y su impacto en los jóvenes',
                hora: '18:30',
                ponente: 'Dr. Roberto Martínez',
                tema: 'Tecnología'
            }
        ],
        '2025-11-15': [
            {
                id: 3,
                titulo: 'Mesa Redonda: Medio Ambiente',
                descripcion: 'Acciones juveniles contra el cambio climático',
                hora: '15:00',
                ponente: 'Colectivo Verde Joven',
                tema: 'Medio Ambiente'
            }
        ],
        '2025-11-16': [
            {
                id: 4,
                titulo: 'Taller de Liderazgo',
                descripcion: 'Desarrolla tus habilidades de liderazgo',
                hora: '10:00',
                ponente: 'Coach Laura Sánchez',
                tema: 'Liderazgo'
            },
            {
                id: 5,
                titulo: 'Charla: Salud Mental',
                descripcion: 'Bienestar emocional en la juventud',
                hora: '17:00',
                ponente: 'Psic. Ana Rodríguez',
                tema: 'Salud Mental'
            }
        ],
        '2025-11-17': [
            {
                id: 6,
                titulo: 'Foro de Innovación',
                descripcion: 'Proyectos innovadores de jóvenes emprendedores',
                hora: '11:00',
                ponente: 'Jóvenes Innovadores',
                tema: 'Innovación'
            }
        ],
        '2025-11-18': [
            {
                id: 7,
                titulo: 'Taller de Comunicación',
                descripcion: 'Comunicación efectiva en redes sociales',
                hora: '16:30',
                ponente: 'Influencer Carlos López',
                tema: 'Comunicación'
            }
        ],
        '2025-11-19': [
            {
                id: 8,
                titulo: 'Mesa de Educación',
                descripcion: 'El futuro de la educación superior',
                hora: '14:00',
                ponente: 'Rectores Universitarios',
                tema: 'Educación'
            }
        ],
        '2025-11-20': [
            {
                id: 9,
                titulo: 'Taller de Arte Digital',
                descripcion: 'Creación artística con herramientas digitales',
                hora: '15:30',
                ponente: 'Artista Digital Maya',
                tema: 'Arte y Cultura'
            }
        ],
        '2025-11-21': [
            {
                id: 10,
                titulo: 'Conferencia de Voluntariado',
                descripcion: 'Impacto social a través del voluntariado',
                hora: '17:30',
                ponente: 'ONG Corazón Solidario',
                tema: 'Voluntariado'
            }
        ],
        '2025-11-22': [
            {
                id: 11,
                titulo: 'Panel Deportivo Juvenil',
                descripcion: 'Deporte como herramienta de desarrollo',
                hora: '16:00',
                ponente: 'Atletas Olímpicos',
                tema: 'Deportes'
            }
        ],
        '2025-11-23': [
            {
                id: 12,
                titulo: 'Ceremonia de Clausura Juvenil',
                descripcion: 'Reconocimientos y compromisos juveniles',
                hora: '18:00',
                ponente: 'Consejo Juvenil',
                tema: 'Clausura'
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

    

    // Función para eliminar evento - DESHABILITADA
    // const eliminarEvento = (fecha, eventoId) => {
    //     // Función deshabilitada - eventos hardcodeados
    //     console.log('Función de eliminación deshabilitada para eventos hardcodeados');
    // };

    return (
        <div className="foro-juvenil-container">

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Foro Juvenil</h1>
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
                                                    <span className="evento-ponente">{evento.ponente}</span>
                                                    {evento.tema && (
                                                        <span className="evento-tema">{evento.tema}</span>
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
                                    <p>No hay eventos juveniles programados para esta fecha</p>
                                </div>
                            )}
                        </div>

                        {/* Formulario deshabilitado - eventos hardcodeados */}
                        {/* <FormularioEventoJuvenil 
                            fecha={fecha} 
                            onAgregarEvento={agregarEvento} 
                        /> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForoJuvenil;