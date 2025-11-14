import React, { useState } from 'react';
import './Coronacion.css';

const Coronacion = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Datos de candidatas para la coronación
    const candidatas = [
        {
            id: 1,
            nombre: "Nohemi",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907974/Nahomi_jx3faj.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 2,
            nombre: "Gema",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907971/Gema_ezshvb.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 3,
            nombre: "Alexandra",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907968/Alexandra_plglnb.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 4,
            nombre: "Diana",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907764/Diana_dhinkw.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 5,
            nombre: "Daniela",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907744/Daniela_zluwgr.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 6,
            nombre: "Anneth",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907741/Anett_anwuvg.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 7,
            nombre: "Alejandra",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907737/Alejandra_v0plqk.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
        {
            id: 8,
            nombre: "Yohani",
            imagen: "https://res.cloudinary.com/dbebikryr/image/upload/v1762907689/Yohani_v0hdx5.jpg", // Placeholder - reemplaza con imagen real
            edad: "",
            titulo: "Candidata a Reina",
            descripcion: "",
            redesSociales: {
                facebook: "#",
                instagram: "#",
                tiktok: "#"
            }
        },
    ];

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    const candidataActual = candidatas[currentSlide];

    return (
        <div className="coronacion-container">
            {/* Imagen Promocional de la Coronación */}
            <div className="coronacion-promocional-container">
                <img 
                    src="https://res.cloudinary.com/dbebikryr/image/upload/v1762907735/Promocional_kdbiiz.jpg"
                    alt="Coronación de la Reina - Feria de Pabellón de Arteaga" 
                    className="coronacion-imagen-promocional"
                />
                
            </div>

            {/* Carrusel de Candidatas */}
            <div className="candidatas-section">
                <h2 className="candidatas-title">Candidatas a Reina</h2>
                
                <div className="candidatas-carrusel-container">
                    <div className="candidatas-carrusel-wrapper">
                        <div 
                            className="candidatas-carrusel-track"
                            style={{ 
                                transform: `translateX(-${currentSlide * 100}%)` 
                            }}
                        >
                            {candidatas.map((candidata, index) => (
                                <div 
                                    key={candidata.id} 
                                    className="candidatas-carrusel-slide"
                                    onClick={() => handleSlideChange(index)}
                                >
                                    <div className="candidata-card">
                                        <img 
                                            src={candidata.imagen} 
                                            alt={candidata.nombre}
                                            className="candidata-imagen"
                                        />
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Indicadores del carrusel */}
                    <div className="candidatas-carrusel-indicators">
                        {candidatas.map((_, index) => (
                            <button
                                key={index}
                                className={`candidata-indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => handleSlideChange(index)}
                                aria-label={`Ver ${candidatas[index].nombre}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Información de la Candidata Actual */}
            <div className="candidata-info-section">
                <div className="candidata-info-container">
                    <div className="candidata-info-header">
                        <h2 className="candidata-info-nombre">{candidataActual.nombre}</h2>
                        <div className="candidata-info-meta">
                            <span className="candidata-info-edad">
                                👑 {candidataActual.titulo} • 🎂 {candidataActual.edad}
                            </span>
                        </div>
                    </div>

                    <div className="candidata-info-content">
                        <div className="candidata-descripcion">
                            <h3>Sobre la Candidata</h3>
                            <p>{candidataActual.descripcion}</p>
                        </div>

                        <div className="candidata-redes">
                            <h3>Síguela en Redes Sociales</h3>
                            <div className="redes-sociales">
                                <a 
                                    href={candidataActual.redesSociales.facebook} 
                                    className="red-social facebook"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📘 Facebook
                                </a>
                                <a 
                                    href={candidataActual.redesSociales.instagram} 
                                    className="red-social instagram"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📷 Instagram
                                </a>
                                <a 
                                    href={candidataActual.redesSociales.tiktok} 
                                    className="red-social tiktok"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🎵 TikTok
                                </a>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>

            {/* Información Adicional del Evento */}
            <div className="coronacion-info-adicional">
                <div className="coronacion-info-card">
                    <h3>Información del Evento</h3>
                    <div className="coronacion-detalles">
                        <p><strong>📍 Ubicación:</strong> Teatro del Pueblo, Centro de la Feria</p>
                        <p><strong>👑 Evento:</strong> Coronación de la Reina 2025</p>
                        <p><strong>🎫 Entrada:</strong> Libre</p>
                        <p><strong>⏰ Horario:</strong> 20:00 hrs</p>
                        <p><strong>📅 Fecha:</strong> A confirmar</p>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Coronacion;