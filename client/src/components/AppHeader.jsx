import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = ({ 
  showBackButton = true, 
  title = 'Feria de Pabellón de Arteaga', 
  logoSrc = '/logo.png',
  onNotificationClick 
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  return (
    <header className="app-header">
      {/* Botón de regreso */}
      <div className="header-left">
        {showBackButton && (
          <button className="back-button" onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Logo central */}
      <div className="header-center">
        <img 
          src={logoSrc} 
          alt={title}
          className="header-logo"
          onError={(e) => {
            // Fallback si no se puede cargar la imagen
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <h1 className="header-title" style={{ display: 'none' }}>
          {title}
        </h1>
      </div>

      {/* Botón de notificaciones */}
      <div className="header-right">
        <button className="notification-button" onClick={handleNotificationClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          {/* Punto de notificación */}
          <span className="notification-dot"></span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;