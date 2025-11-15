import React from 'react';
import './ForoJuvenil.css';

const ForoJuvenil = () => {
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
                titulo: 'Conjunto plata',
                descripcion: '',
                hora: '19:00',
                ponente: '',
                tema: ''
            }
        ],
        '2025-11-20': [
            {
                id: 2,
                titulo: 'LDB Vázquez',
                descripcion: '',
                hora: '19:00',
                ponente: '',
                tema: ''
            }
        ],
        '2025-11-21': [
            {
                id: 3,
                titulo: 'Nueva era',
                descripcion: '',
                hora: '19:00',
                ponente: '',
                tema: ''
            }
        ],
        '2025-11-22': [
            {
                id: 4,
                titulo: 'Super Sammy',
                descripcion: '',
                hora: '19:00',
                ponente: '',
                tema: ''
            }
        ],
        '2025-11-23': [
            {
                id: 5,
                titulo: 'Caldo de brujas',
                descripcion: '',
                hora: '19:00',
                ponente: '',
                tema: ''
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