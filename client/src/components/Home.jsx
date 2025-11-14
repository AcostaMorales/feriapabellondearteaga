import React, { useState, useEffect } from 'react';
import NavigationGrid from './NavigationGrid';
import './Home.css';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Array de eventos para el carrusel (las imágenes las agregarás después)
    const eventos = [
        {
            id: 1,
            imagen: '/images/evento1.jpg', // Placeholder - reemplaza con tu imagen
            titulo: 'Evento Cultural 1',
            link: '/evento1' // Placeholder - reemplaza con tu enlace
        },
        {
            id: 2,
            imagen: '/images/evento2.jpg', // Placeholder - reemplaza con tu imagen
            titulo: 'Evento Cultural 2',
            link: '/evento2' // Placeholder - reemplaza con tu enlace
        },
        {
            id: 3,
            imagen: '/images/evento3.jpg', // Placeholder - reemplaza con tu imagen
            titulo: 'Evento Cultural 3',
            link: '/evento3' // Placeholder - reemplaza con tu enlace
        },
        {
            id: 4,
            imagen: '/images/evento4.jpg', // Placeholder - reemplaza con tu imagen
            titulo: 'Evento Cultural 4',
            link: '/evento4' // Placeholder - reemplaza con tu enlace
        }
    ];

    // Array de botones de navegación (adaptado para NavigationGrid)
    const navigationItems = [
        {
            title: 'Teatro del Pueblo',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389323/teatro_del_pueblo_x5gnmu.png',
            route: '/teatrodelpueblo',
        },
        {
            title: 'Coronación de la Reina',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389321/coronacion_de_reyna_vptlh6.png', 
            route: '/coronacion',
            
        },
        {
            title: 'Teatro Bicentenario',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389323/teatro_bicentenario_mkovq6.png',
            route: '/teatrobicentenario',
            
        },
        {
            title: 'Feria Deportiva Revolucionaria',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
            route: '/feriadeportiva',
        },
        {
            title: 'Foro Juvenil',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/foro_juvenil_qxac3u.png',
            route: '/forojuvenil',
        },
        {
            title: 'Desfile de la Revolución',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/desfile_de_la_revolucion_bknkmy.png',
            route: '/desfiledelarevolucion',
        },
        {
            title: 'Plaza del Abuelo',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/plaza_del_abuelo_zp7vqz.png',
            route: '/plazadelabuelo',
        },
        {
            title: 'Corridas de Toros',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/corrida_de_toros_bpdhxc.png',
            route: '/corridasdetoros',
        },
    
        
    ];

    // Auto-scroll del carrusel cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => 
                prev === eventos.length - 1 ? 0 : prev + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [eventos.length]);

    const handleEventClick = (link) => {
        // Aquí puedes implementar la navegación
        console.log('Navegando a:', link);
        // window.open(link, '_blank'); // Para abrir en nueva pestaña
        // o usar React Router: navigate(link);
    };

    return (
        <div className="home-container">
            {/* Imagen Promocional Principal */}
            <div className="promocional-container">
                <img 
                    src="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png" 
                    alt="Promocional Feria de Pabellón de Arteaga" 
                    className="imagen-promocional"
                />
                
            </div>
            

            {/* Sección del Carrusel de Eventos */}
            <div className="eventos-section">

                <h3 className="eventos-title">Eventos Destacados</h3>
                
                <div className="carrusel-container">
                    <div className="carrusel-wrapper">
                        <div 
                            className="carrusel-track"
                            style={{ 
                                transform: `translateX(-${currentSlide * 100}%)` 
                            }}
                        >
                            {eventos.map((evento) => (
                                <div 
                                    key={evento.id} 
                                    className="carrusel-slide"
                                    onClick={() => handleEventClick(evento.link)}
                                >
                                    <div className="evento-card">
                                        <img 
                                            src={evento.imagen} 
                                            alt={evento.titulo}
                                            className="evento-imagen"
                                        />
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Indicadores del carrusel (puntos) */}
                    <div className="carrusel-indicators">
                        {eventos.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Ir al slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de Navegación usando el componente NavigationGrid */}
            <NavigationGrid 
                title="Explora la Feria"
                items={navigationItems}
                columns={1}
                className="home-navigation"
            />

            {/* Sección adicional para más contenido */}
            <div className="contenido-adicional">
                <div className="info-feria">
                    <h3>Información de la Feria</h3>
                    <p>Descubre todo lo que la Feria de Pabellón de Arteaga tiene para ofrecerte.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;