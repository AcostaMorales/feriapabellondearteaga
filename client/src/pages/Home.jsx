import React from 'react';
import NavigationGrid from '../components/NavigationGrid.jsx';
import './Home.css';

const Home = () => {
    // Array de botones de navegación (adaptado para NavigationGrid)
    const navigationItems = [
        {
            title: 'Mapa de vinícolas pabellón',
            image: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763143254/boton_mapa_vinicolas_du1zt6.png',
            route: 'https://view.genially.com/69169ef6f29001777d69cd40/interactive-content-mapa-vinicolas',
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
    
        
    ];

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