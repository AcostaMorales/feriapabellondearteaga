import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = ({ 
  title = 'Feria de Pabellón de Arteaga',
  showBackButton = true
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <header className="app-header">
      {showBackButton && (
        <button 
          className="back-button"
          onClick={handleBackClick}
          aria-label="Regresar"
        >
          ←
        </button>
      )}
      <div className="header-content">
        <img 
          src="/images/logo.png" 
          alt={title}
          className="header-logo"
        />
        <img 
          src="/images/fecha.png" 
          alt="Fecha del evento"
          className="header-fecha"
        />
      </div>
    </header>
  );
};

export default AppHeader;