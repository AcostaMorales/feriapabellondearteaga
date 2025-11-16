import React, { useState, useEffect, useCallback } from 'react';
import './PromoCarousel.css';

const PromoCarousel = ({ images, autoPlay = true, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  // Función para abrir modal con imagen
  const handleImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalOpen(true);
  };

  // Función para cerrar modal
  const closeModal = () => {
    setModalOpen(false);
    setModalImageUrl('');
  };

  // Función para ir a la siguiente imagen
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  }, [images.length]);

  // Función para ir a una imagen específica
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Controlar scroll del body cuando el modal esté abierto
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  // Auto-play funcionalidad
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [isPlaying, interval, nextSlide, images.length]);

  // Pausar auto-play en hover
  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(autoPlay);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div 
      className="promo-carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="promo-carousel-wrapper">
        <div 
          className="promo-carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="promo-carousel-slide">
              <img 
                src={image.url} 
                alt={image.alt || `Promocional ${index + 1}`}
                className="promo-carousel-image"
                loading={index === 0 ? "eager" : "lazy"}
                onClick={() => handleImageClick(image.url)}
                style={{ cursor: 'pointer' }}
                title="Haz clic para ver imagen completa"
              />
              
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores solo si hay más de una imagen */}
      {images.length > 1 && (
        <div className="promo-carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`promo-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Controles de navegación solo si hay más de una imagen */}
      {images.length > 1 && (
        <div className="promo-carousel-controls">
          <button
            className="promo-control-btn promo-prev"
            onClick={() => goToSlide((currentSlide - 1 + images.length) % images.length)}
            aria-label="Imagen anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button
            className="promo-control-btn promo-next"
            onClick={() => goToSlide((currentSlide + 1) % images.length)}
            aria-label="Imagen siguiente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Modal de Previsualización */}
      {modalOpen && (
        <div className="carousel-modal-overlay" onClick={closeModal}>
          <div className="carousel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="carousel-modal-close" onClick={closeModal}>
              ✕
            </button>
            
            <div className="carousel-modal-image">
              <img src={modalImageUrl} alt="Imagen completa" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCarousel;