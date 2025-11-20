import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PWAInstall from './PWAInstall';
import InfiniteCarousel from './InfiniteCarousel';
import './AppFooter.css';

const AppFooter = ({ sponsorsData = [], navigationItems = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ), 
      label: 'Mapa', 
      route: 'https://view.genially.com/6913fa88c898b013b0b39c94/interactive-content-mapa-interactivo'
    },
    { 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c1.1 0 2 .9 2 2v1h3c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h3V4c0-1.1.9-2 2-2zm0 2c-.6 0-1 .4-1 1v1h2V5c0-.6-.4-1-1-1zm6 15V7H6v12h12zm-9-9h6v2H9v-2zm0 3h6v2H9v-2z"/>
        </svg>
      ), 
      label: 'Notificaciones', 
      route: '/notificaciones'
    },
    
  ];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavigation;

  const handleNavigate = (route) => {
    // Si es una URL externa (comienza con http o https), abrir en nueva pestaña
    if (route.startsWith('http://') || route.startsWith('https://')) {
      window.open(route, '_blank', 'noopener,noreferrer');
    } else {
      // Si es una ruta interna, usar navigate
      navigate(route);
    }
  };

  const isActiveRoute = (route) => {
    if (route === '/' && location.pathname === '/') return true;
    if (route !== '/' && location.pathname.includes(route)) return true;
    return false;
  };

  return (
    <footer className="app-footer">
      {/* PWA Install Section */}
      <PWAInstall />
      
      {/* Carrusel de patrocinadores */}
      <div className="sponsors-carousel">
        <InfiniteCarousel sponsors={sponsorsData} />
      </div>

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