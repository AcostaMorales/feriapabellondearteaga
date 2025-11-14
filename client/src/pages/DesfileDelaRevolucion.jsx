import React from 'react';
import './DesfileDelaRevolucion.css';

const DesfileDelaRevolucion = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            
        ],
        '2025-11-15': [
            {
                id: 2,
                titulo: 'Desfile Histórico de la Revolución',
                descripcion: 'Representación de los momentos más importantes de 1910',
                hora: '10:00',
                artista: 'Grupos Históricos Regionales'
            },
            {
                id: 3,
                titulo: 'Exhibición de Armas Históricas',
                descripcion: 'Muestra de armamento usado durante la Revolución',
                hora: '14:00',
                artista: 'Museo de la Revolución'
            }
        ],
        '2025-11-16': [
            {
                id: 4,
                titulo: 'Teatro: "Villa y Zapata"',
                descripcion: 'Obra sobre los líderes revolucionarios más emblemáticos',
                hora: '18:00',
                artista: 'Compañía Teatral Histórica'
            },
            {
                id: 5,
                titulo: 'Corridos Revolucionarios',
                descripcion: 'Música tradicional de la época revolucionaria',
                hora: '20:30',
                artista: 'Mariachi Revolución'
            }
        ],
        '2025-11-17': [
            {
                id: 6,
                titulo: 'Conferencia: "Aguascalientes en la Revolución"',
                descripcion: 'Historia local durante el movimiento revolucionario',
                hora: '16:00',
                artista: 'Dr. Historiador Regional'
            },
            {
                id: 7,
                titulo: 'Baile de la Época',
                descripcion: 'Danzas tradicionales del México revolucionario',
                hora: '19:00',
                artista: 'Ballet Folklórico Revolucionario'
            }
        ],
        '2025-11-18': [
            {
                id: 8,
                titulo: 'Exposición Fotográfica',
                descripcion: 'Imágenes históricas de la Revolución Mexicana',
                hora: '11:00',
                artista: 'Archivo Histórico del Estado'
            }
        ],
        '2025-11-19': [
            {
                id: 9,
                titulo: 'Taller de Vestimenta Revolucionaria',
                descripcion: 'Aprende sobre la moda y vestimenta de 1910',
                hora: '15:00',
                artista: 'Diseñadores Históricos'
            },
            {
                id: 10,
                titulo: 'Concierto de Música Revolucionaria',
                descripcion: 'Canciones que marcaron la época',
                hora: '20:00',
                artista: 'Orquesta Típica Mexicana'
            }
        ],
        '2025-11-20': [
            {
                id: 11,
                titulo: 'Día de la Revolución - Acto Cívico',
                descripcion: 'Ceremonia conmemorativa del 20 de noviembre',
                hora: '09:00',
                artista: 'Autoridades Municipales'
            },
            {
                id: 12,
                titulo: 'Gran Desfile Revolucionario',
                descripcion: 'Desfile principal con carros alegóricos y participantes',
                hora: '11:00',
                artista: 'Escuelas y Organizaciones Civiles'
            },
            {
                id: 13,
                titulo: 'Festival Gastronómico Revolucionario',
                descripcion: 'Platillos típicos de la época revolucionaria',
                hora: '13:00',
                artista: 'Cocineras Tradicionales'
            }
        ],
        '2025-11-21': [
            {
                id: 14,
                titulo: 'Recreación de Batallas Históricas',
                descripcion: 'Representación de combates revolucionarios',
                hora: '17:00',
                artista: 'Grupo de Recreación Histórica'
            }
        ],
        '2025-11-22': [
            {
                id: 15,
                titulo: 'Noche de Leyendas Revolucionarias',
                descripcion: 'Cuentos y leyendas de la Revolución Mexicana',
                hora: '19:30',
                artista: 'Narradores Tradicionales'
            }
        ],
        '2025-11-23': [
            {
                id: 16,
                titulo: 'Clausura - Homenaje a los Héroes',
                descripcion: 'Ceremonia de clausura honrando a los revolucionarios',
                hora: '18:00',
                artista: 'Coro y Orquesta Municipal'
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
        <div className="desfile-container">

            {/* Título principal */}
            <div className="titulo-section">
                <h1 className="titulo-principal">Desfile de la Revolución</h1>
                <p className="subtitulo">Conmemorando el 20 de Noviembre - 14 al 23 de Noviembre 2025</p>
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

export default DesfileDelaRevolucion;