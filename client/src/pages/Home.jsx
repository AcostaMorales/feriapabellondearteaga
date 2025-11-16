import React from 'react';
import NavigationGrid from '../components/NavigationGrid.jsx';
import FloatingVideo from '../components/FloatingVideo.jsx';
import PromoCarousel from '../components/PromoCarousel.jsx';
import './Home.css';

const Home = () => {
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
            title: 'Mapa de vinícolas pabellón',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763157921/ChatGPT_Image_13_nov_2025_08_37_10_p.m._o3sq0l.png',
            route: 'https://view.genially.com/6913fa88c898b013b0b39c94/interactive-content-mapa-interactivo',
        },
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
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763143783/Lienzocharro_cnspoy.png',
            route: '/lienzocharro',
        },
        {
            title: 'Zona Peques',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763157027/ZonaPeques_vkpsug.jpg',
            route: '/zonapeques',
        },
        {
            title: 'Expo Ganadera',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763157161/ExpoGanadera_vy80e7.jpg',
            route: '/expoganadera',
        },
    
        
    ];

    return (
        <div className="home-container">
            {/* Video Flotante */}
            <FloatingVideo 
                videoUrl="https://www.youtube.com/embed/7OFjFb2iePU?autoplay=1&mute=1&loop=1&playlist=7OFjFb2iePU"
                title="Video Promocional - Feria de Pabellón de Arteaga"
                isYouTube={true}
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