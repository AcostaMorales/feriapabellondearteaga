import React, { useState } from 'react';
import NavigationGrid from '../components/NavigationGrid.jsx';
import HeroVideo from '../components/HeroVideo.jsx';
import PromoCarousel from '../components/PromoCarousel.jsx';
import PDFAnnouncement from '../components/PDFAnnouncement.jsx';
import './Home.css';

const Home = () => {
    const [showAnnouncement, setShowAnnouncement] = useState(true);

    // Configuración del anuncio con imagen personalizada
    const announcementImage = 'https://res.cloudinary.com/dbebikryr/image/upload/v1763151519/Mensaje_presidenta_mptszs.png';

    // Función para cerrar el anuncio
    const handleCloseAnnouncement = () => {
        setShowAnnouncement(false);
    };
    // Array de imágenes promocionales para el carrusel
    const promocionalImages = [
        {
            url: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
            alt: 'Promocional Feria de Pabellón de Arteaga',
            overlay: true,
            title: 'Feria de Pabellón de Arteaga',
            subtitle: '¡Vive la tradición y la cultura!'
        },
        {
            url: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763151519/Mensaje_presidenta_mptszs.png',
            alt: 'Mensaje de la presidenta',
            overlay: true,
            title: 'Teatro del Pueblo',
            subtitle: 'Disfruta de los mejores espectáculos'
        },
    ];

    // Array de botones de navegación (adaptado para NavigationGrid)
    const navigationItems = [
        {
            title: 'Mapa de pabellón',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763269268/Mapaoficial_2_ypxmyc.png',
            route: 'https://view.genially.com/6913fa88c898b013b0b39c94/interactive-content-mapa-interactivo',
        },
        {
            title: 'Teatro del Pueblo',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763268349/Boton_teatro_1_lo2msb.png',
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
            title: 'Voces del Pueblo',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389323/voces_del_pueblo_ikzwc7.png',
            route: '/vocesdelpueblo',
            
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
            title: 'Lienzo charro',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763268616/LienzoCharro_vmjqup.png',
            route: '/lienzocharro',
        },
        {
            title: 'Zona Peques',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763268511/Zona_peques_1_rol3hl.png',
            route: '/zonapeques',
        },
        {
            title: 'Expo Ganadera',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763269580/ExpoGanadera_wylsmj.png',
            route: '/expoganadera',
        },
    
        
    ];

    return (
        <div className="home-container">
            {/* Anuncio con imagen personalizada */}
            {showAnnouncement && (
                <PDFAnnouncement
                    pdfUrl={announcementImage}
                    isImage={true}
                    duration={8000}
                    showCloseButton={true}
                    title="¡Bienvenido a la Feria de Pabellon de Arteaga 2025!"
                    onClose={handleCloseAnnouncement}
                />
            )}

            {/* Video Hero en la parte superior */}
            <HeroVideo 
                videoUrl="https://www.youtube.com/embed/7OFjFb2iePU?autoplay=1&mute=1&loop=1&playlist=7OFjFb2iePU"
                title="Feria de Pabellón de Arteaga 2025"
                isYouTube={true}
                height="60vh"
            />

            {/* Carrusel Promocional Principal */}
            <PromoCarousel 
                images={promocionalImages}
                autoPlay={true}
                interval={6000}
            />

            {/* Grid de Navegación usando el componente NavigationGrid */}
            <NavigationGrid 
                title="Explora la Feria"
                items={navigationItems}
                columns={1}
                className="home-navigation"
            />

            
        </div>
    );
};

export default Home;