import React, { useState } from 'react';
import './TeatroDelPueblo.css';

const TeatroDelPueblo = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Datos de bandas/cantantes - El primer elemento será el del día actual
    const bandas = [
        {
            id: 1,
            nombre: "El Bebeto",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905831/14nov_wtjheo.jpg", // Placeholder - reemplaza con imagen real
            fechaPresentacion: "19 Noviembre", 
            hora: "21:00 hrs",
            genero: "",
            descripcion: "",
            biografia: "Carlos Alberto García Villanueva, artísticamente conocido como El Bebeto, es un cantante y compositor mexicano.​ Grabó su primer material discográfico titulado, Quiero que seas tú en 2010, bajo el sello discográfico de Universal Music.",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 2,
            nombre: "La firrma",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905838/15nov_wpbtlm.jpg", // Placeholder
            fechaPresentacion: "15 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 3,
            nombre: "Inspector",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905835/16nov_sjcdfa.jpg", // Placeholder
            fechaPresentacion: "16 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 4,
            nombre: "La fiera",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905841/17nov_rk2xcb.jpg", // Placeholder
            fechaPresentacion: "17 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 5,
            nombre: "Tropicalismo apache",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905815/18nov_zktzj7.jpg", // Placeholder
            fechaPresentacion: "18 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 6,
            nombre: "Bacilos",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905820/19nov_tsyqll.jpg", // Placeholder
            fechaPresentacion: "19 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "EL BEBETO nace en Guasave, Sinaloa. En el 2010 graba su primer disco como solista titulado “QUIERO QUE SEAS TÚ”, y participa junto a 3BALLMTY en los temas “Inténtalo” y “De las 12 a las 12”, pertenecientes al disco de los DJ’S. En el 2012 lanza “ESE SOY YO” con el éxito “Lo legal” y en el 2014 “EN TU MIRADA” con: “Lo más interesante”, “No fue necesario” y “No te creas tan importante”. En el 2015, estrena su primer disco con Mariachi titulado “ETERNAMENTE MEXICANO” del que promueve “Cuando tú me besas” y “Besos nuevos”. Este sería el despunte de su carrera dentro de este género. Ha sido nominado al Premio Lo Nuestro. Ganador de varios Premios Billboard de la Música Regional Mexicana. Nominado a Premios Billboard de la Música Latina. Nominado a Premios Bandamax, Premios de la Calle y Latin Grammy. ",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 7,
            nombre: "Los Acosta",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905818/20nov_aubicd.jpg", // Placeholder
            fechaPresentacion: "20 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 8,
            nombre: "Isaías Lucero Los involucrados de Nuevo Leon",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905824/21nov_dpmagg.jpg", // Placeholder
            fechaPresentacion: "21 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 9,
            nombre: "Banda corona del rey",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905826/22nov_ccy5ke.jpg", // Placeholder
            fechaPresentacion: "22 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
        {
            id: 10,
            nombre: "La mafia",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762905829/23nov_r0tbnd.jpg", // Placeholder
            fechaPresentacion: "16 Noviembre",
            hora: "21:00 hrs", 
            genero: "",
            descripcion: "",
            biografia: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                youtube: "#"
            },
            canciones: [""]
        },
    ];

    // Auto-scroll del carrusel deshabilitado para mejor lectura
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentSlide((prev) => 
    //             prev === bandas.length - 1 ? 0 : prev + 1
    //         );
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [bandas.length]);

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    //const bandaActual = bandas[currentSlide];

    return (
        <div className="teatro-container">
            {/* Imagen Promocional del Teatro */}
            <div className="teatro-promocional-container">
                <img 
                    src="https://res.cloudinary.com/dbebikryr/image/upload/v1762905844/promocional_kyss74.jpg"
                    alt="Teatro del Pueblo - Feria de Pabellón de Arteaga" 
                    className="teatro-imagen-promocional"
                />
            </div>

            {/* Carrusel de Bandas */}
            <div className="bandas-section">
                <h2 className="bandas-title">Artistas Invitados</h2>
                
                <div className="bandas-carrusel-container">
                    <div className="bandas-carrusel-wrapper">
                        <div 
                            className="bandas-carrusel-track"
                            style={{ 
                                transform: `translateX(-${currentSlide * 100}%)` 
                            }}
                        >
                            {bandas.map((banda, index) => (
                                <div 
                                    key={banda.id} 
                                    className="bandas-carrusel-slide"
                                    onClick={() => handleSlideChange(index)}
                                >
                                    <div className="banda-card">
                                        <img 
                                            src={banda.imagen} 
                                            alt={banda.nombre}
                                            className="banda-imagen"
                                        />
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Indicadores del carrusel */}
                    <div className="bandas-carrusel-indicators">
                        {bandas.map((_, index) => (
                            <button
                                key={index}
                                className={`banda-indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => handleSlideChange(index)}
                                aria-label={`Ver ${bandas[index].nombre}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Información de la Banda Actual 
            <div className="banda-info-section">
                <div className="banda-info-container">
                    <div className="banda-info-header">
                        <h2 className="banda-info-nombre">{bandaActual.nombre}</h2>
                        <div className="banda-info-meta">
                            <span className="banda-info-fecha">
                                📅 {bandaActual.fechaPresentacion} • ⏰ {bandaActual.hora}
                            </span>
                            <span className="banda-info-genero">🎵 {bandaActual.genero}</span>
                        </div>
                    </div>

                    <div className="banda-info-content">
                        <div className="banda-descripcion">
                            <h3>Sobre el Espectáculo</h3>
                            <p>{bandaActual.descripcion}</p>
                        </div>

                        <div className="banda-biografia">
                            <h3>Biografía</h3>
                            <p>{bandaActual.biografia}</p>
                        </div>

                        <div className="banda-canciones">
                            <h3>Canciones Populares</h3>
                            <ul className="canciones-lista">
                                {bandaActual.canciones.map((cancion, index) => (
                                    <li key={index} className="cancion-item">
                                        🎶 {cancion}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="banda-redes">
                            <h3>Síguelos en Redes Sociales</h3>
                            <div className="redes-sociales">
                                <a 
                                    href={bandaActual.redesSociales.facebook} 
                                    className="red-social facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📘 Facebook
                                </a>
                                <a 
                                    href={bandaActual.redesSociales.instagram} 
                                    className="red-social instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📷 Instagram
                                </a>
                                <a 
                                    href={bandaActual.redesSociales.youtube} 
                                    className="red-social youtube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📺 YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*}

            {/* Información Adicional del Teatro */}
            <div className="teatro-info-adicional">
                <div className="teatro-info-card">
                    <h3>Información del Teatro</h3>
                    <div className="teatro-detalles">
                        <p><strong>📍 Ubicación:</strong> Centro de la Feria, Pabellón de Arteaga</p>
                        <p><strong>🪑 Capacidad:</strong> 5,000 personas</p>
                        <p><strong>🎫 Entrada:</strong> Libre</p>
                        <p><strong>⏰ Horarios:</strong> Funciones desde las 19:00 hrs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeatroDelPueblo;