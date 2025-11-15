import React from 'react';
import './FeriaDeportiva.css';

const FeriaDeportiva = () => {
    // Array de eventos organizados por fechas (14-23 noviembre) - HARDCODEADOS
    const eventos = {
        '2025-11-14': [
        ],
        '2025-11-15': [
            {
                id: 1,
                titulo: 'Torneo de Box Dualmeet',
                descripcion: '',
                hora: '08:00',
                deporte: 'Box',
                categoria: ''
            },
            {
                id: 2,
                titulo: 'Cuadrangular de Tocho flag',
                descripcion: '',
                hora: '08:00',
                deporte: 'Tocho flag',
                categoria: ''
            }, 
            {
                id: 3,
                titulo: 'Torneo local de tenis',
                descripcion: '',
                hora: '08:30',
                deporte: 'Tenis',
                categoria: ''
            },
            {
                id: 4,
                titulo: 'Torneo de tocho flag libre',
                descripcion: '',
                hora: '09:00',
                deporte: 'Tocho flag',
                categoria: ''
            },
            {
                id: 5,
                titulo: 'Cuadrangular de tocho infantil LIPAF',
                descripcion: '',
                hora: '09:00',
                deporte: 'Tocho flag',
                categoria: 'infantil'
            },
            {
                id: 6,
                titulo: 'Derby de la Revolución homerun',
                descripcion: '',
                hora: '17:00',
                deporte: 'Derby',
                categoria: ''
            },
            {
                id: 7,
                titulo: 'Nacional de artes marciales mixtas',
                descripcion: '',
                hora: '17:00',
                deporte: 'Artes marciales mixtas',
                categoria: ''
            },
            {
                id: 8,
                titulo: 'Cuadrangular 1era especial de béisbol',
                descripcion: '',
                hora: '18:30',
                deporte: 'Besísbol',
                categoria: ''
            },

        ],
        '2025-11-16': [
            {
                id: 10,
                titulo: 'Torneo de ajedrez',
                descripcion: '',
                hora: '08:00',
                deporte: 'Ajedrez',
                categoria: ''
            },
            {
                id: 11,
                titulo: 'Cuadrangular de rugby',
                descripcion: '',
                hora: '09:00',
                deporte: 'rugby',
                categoria: ''
            },
            {
                id: 12,
                titulo: 'Cuadrangular de sóftbol',
                descripcion: '',
                hora: '10:00',
                deporte: 'rugby',
                categoria: ''
            },
            {
                id: 13,
                titulo: 'Cuadrangular municipal de fútbol libre',
                descripcion: '',
                hora: '09:00',
                deporte: 'futbol',
                categoria: ''
            },
        ],
        '2025-11-17': [
            {
                id: 14,
                titulo: 'Carrera de carros sin motor',
                descripcion: '',
                hora: '17:00',
                deporte: '',
                categoria: ''
            },
            {
                id: 15,
                titulo: 'Cuadrangular de voleibol',
                descripcion: '',
                hora: '17:00',
                deporte: 'Voleibol',
                categoria: ''
            },
        
        ],
        '2025-11-18': [
            {
                id: 16,
                titulo: 'Torneo nacional de cachibol',
                descripcion: '',
                hora: '08:00',
                deporte: '',
                categoria: ''
            },
            {
                id: 17,
                titulo: 'Clinica de basquetbol Mtra. Jezabel Noemí Medina Rodriguez',
                descripcion: '',
                hora: '08:00',
                deporte: '',
                categoria: ''
            },
        ],
        '2025-11-19': [
            {
                id: 18,
                titulo: 'Clinica deportiva de básquetbol con Horacio Llamas',
                descripcion: 'Torneo regional de lucha libre',
                hora: '18:00',
                deporte: 'Lucha',
                categoria: 'Adulto'
            }
        ],
        '2025-11-20': [
            
        ],
        '2025-11-21': [
            {
                id: 19,
                titulo: 'Cuadrangular Fuútbol "Copa Revolución 2025"',
                descripcion: '',
                hora: '18:00',
                deporte: 'Futbol',
                categoria: ''
            }
        ],
        '2025-11-22': [
            {
                id: 20,
                titulo: 'Encuentro de Taekwondo',
                descripcion: '',
                hora: '08:00',
                deporte: 'Taekwondo',
                categoria: ''
            },
            {
                id: 21,
                titulo: 'Torneo Revolucionario de Frontenis',
                descripcion: '',
                hora: '08:00',
                deporte: 'Frontenis',
                categoria: ''
            },
            {
                id: 22,
                titulo: 'Torneo local de tenis',
                descripcion: '',
                hora: '08:30',
                deporte: 'Tenis',
                categoria: ''
            },
            {
                id: 23,
                titulo: 'Cuadrangular de Basquetbol varonil 40 y más',
                descripcion: '',
                hora: '09:00',
                deporte: 'Basquetbol',
                categoria: ''
            },
            {
                id: 24,
                titulo: 'Crossfit Marvelous',
                descripcion: '',
                hora: '09:00',
                deporte: 'Crossfit',
                categoria: ''
            },
            {
                id: 25,
                titulo: 'Torneo de Tocho flag libre',
                descripcion: '',
                hora: '10:00',
                deporte: 'Tocho flag',
                categoria: ''
            },
            {
                id: 26,
                titulo: 'Cuadrangular de básquetbol femenil libre',
                descripcion: '',
                hora: '10:00',
                deporte: 'Basquetbol',
                categoria: ''
            },
            {
                id: 27,
                titulo: 'Cuadrangular fútbol "Copa Revolución 2025"',
                descripcion: '',
                hora: '10:00',
                deporte: 'Futbol',
                categoria: ''
            },
            {
                id: 28,
                titulo: 'Cuadrangular 1era especial de béisbol',
                descripcion: '',
                hora: '17:30',
                deporte: 'Besísbol',
                categoria: ''
            },



        ],
        '2025-11-23': [
            {
                id: 29,
                titulo: 'Carrera atlética "de la pista al campo',
                descripcion: '',
                hora: '08:00',
                deporte: '',
                categoria: ''
            },
            {
                id: 30,
                titulo: 'Torneo de tocho flag libre',
                descripcion: '',
                hora: '10:00',
                deporte: '',
                categoria: ''
            },
            {
                id: 31,
                titulo: 'Cuadrangular municipal de fútbol libre',
                descripcion: '',
                hora: '10:00',
                deporte: '',
                categoria: ''
            },
            {
                id: 32,
                titulo: 'Final de sóftbol',
                descripcion: '',
                hora: '10:00',
                deporte: '',
                categoria: ''
            },
            
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