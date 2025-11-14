import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AppFooter.css';

const AppFooter = ({ sponsorsData = [], navigationItems = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos por defecto de patrocinadores
  const defaultSponsors = [
    {
      id: 1,
      name: 'Coca Cola',
      logo: 'https://1000marcas.net/wp-content/uploads/2019/12/Coca-Cola-Logo.png',
      url: 'https://www.coca-cola.com'
    },
    {
      id: 2,
      name: 'Pepsi',
      logo: 'https://1000marcas.net/wp-content/uploads/2020/01/Pepsi-Logo.png',
      url: 'https://www.pepsi.com'
    },
    {
      id: 3,
      name: 'McDonald\'s',
      logo: 'https://1000marcas.net/wp-content/uploads/2019/12/McDonalds-Logo.png',
      url: 'https://www.mcdonalds.com'
    },
    {
      id: 4,
      name: 'Nike',
      logo: 'https://1000marcas.net/wp-content/uploads/2019/11/Nike-Logo.png',
      url: 'https://www.nike.com'
    },
    {
      id: 5,
      name: 'Adidas',
      logo: 'https://1000marcas.net/wp-content/uploads/2019/11/Adidas-logo.png',
      url: 'https://www.adidas.com'
    }
  ];

  // Navegación por defecto
  const defaultNavigation = [
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ), 
      label: 'Inicio', 
      route: '/'
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ), 
      label: 'Eventos', 
      route: '/eventos'
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ), 
      label: 'Mapa', 
      route: 'https://view.genially.com/6913fa88c898b013b0b39c94/interactive-content-mapa-interactivo'
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ), 
      label: 'Contacto', 
      route: '/contacto'
    }
  ];

  const sponsors = sponsorsData.length > 0 ? sponsorsData : defaultSponsors;
  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavigation;

  // Auto-slide cada 5 segundos
  useEffect(() => {
    if (sponsors.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  const handleNavigate = (route) => {
    // Si es una URL externa (comienza con http o https), abrir en nueva pestaña
    if (route.startsWith('http://') || route.startsWith('https://')) {
      window.open(route, '_blank', 'noopener,noreferrer');
    } else {
      // Si es una ruta interna, usar navigate
      navigate(route);
    }
  };

  const handleSponsorClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isActiveRoute = (route) => {
    if (route === '/' && location.pathname === '/') return true;
    if (route !== '/' && location.pathname.includes(route)) return true;
    return false;
  };

  return (
    <footer className="app-footer">
      {/* Carrusel de patrocinadores */}
      {sponsors.length > 0 && (
        <div className="sponsors-carousel">
          <div className="sponsors-track" style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}>
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.id} 
                className="sponsor-slide"
                onClick={() => handleSponsorClick(sponsor.url)}
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="sponsor-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navegación principal */}
      <nav className="footer-navigation">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`nav-button ${isActiveRoute(item.route) ? 'active' : ''}`}
            onClick={() => handleNavigate(item.route)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
};

export default AppFooter;