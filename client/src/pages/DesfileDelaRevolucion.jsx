import React from 'react';
import './DesfileDelaRevolucion.css';

const DesfileDelaRevolucion = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
            
        ],
        '2025-11-15': [
            
        ],
        '2025-11-16': [
            
        ],
        '2025-11-17': [
            
        ],
        '2025-11-18': [
            
        ],
        '2025-11-19': [
             {
                id: 1,
                titulo: 'Desfile de prescolar',
                descripcion: '',
                hora: '17:30',
                artista: '',
            },
        ],
        '2025-11-20': [
            {
                id: 2,
                titulo: 'Desfile de la revolución',
                descripcion: 'invitado especial Horacio Llamas',
                hora: '08:00',
                artista: '',
            },
            
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