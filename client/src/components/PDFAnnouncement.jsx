import React, { useState, useEffect, useCallback } from 'react';
import './PDFAnnouncement.css';

const PDFAnnouncement = ({ 
  pdfUrl, 
  duration = 5000, 
  onClose,
  showCloseButton = false,
  isImage = false, // Nueva prop para manejar imágenes
  title = "Información importante de la feria"
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Tiempo para la animación de salida
    }
  }, [onClose]);

  useEffect(() => {
    // Contador regresivo
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto cierre después de la duración especificada
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [duration, handleClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pdf-announcement-overlay">
      <div className={`pdf-announcement-container ${!isVisible ? 'closing' : ''}`}>
        {/* Contador visual */}
        <div className="countdown-indicator">
          <div className="countdown-text">
            Cerrando en {timeLeft}s
          </div>
          <div 
            className="countdown-bar" 
            style={{
              width: `${(timeLeft / (duration / 1000)) * 100}%`
            }}
          />
        </div>

        {/* Botón de cierre manual (opcional) */}
        {showCloseButton && (
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Cerrar anuncio"
          >
            ×
          </button>
        )}

        {/* Contenedor del PDF/Imagen */}
        <div className="pdf-container">
          {isImage ? (
            <img
              src={pdfUrl}
              alt={title}
              className="pdf-image"
              style={{
                width: '360px',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
              onError={(e) => {
                console.error('Error cargando imagen:', pdfUrl);
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              onLoad={() => console.log('Imagen cargada exitosamente:', pdfUrl)}
            />
          ) : (
            <div className="pdf-viewer">
              <object
                data={pdfUrl}
                type="application/pdf"
                className="pdf-object"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px'
                }}
              >
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Anuncio PDF"
                  className="pdf-iframe"
                  frameBorder="0"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px'
                  }}
                >
                  <div className="pdf-fallback">
                    <p>📄 No se puede mostrar el PDF en este navegador</p>
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        marginTop: '10px'
                      }}
                    >
                      Abrir PDF en nueva pestaña
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          )}
          
          {/* Fallback para cuando la imagen no carga */}
          <div 
            className="image-fallback" 
            style={{ 
              display: 'none',
              textAlign: 'center',
              padding: '40px',
              background: '#f8f9fa',
              borderRadius: '10px',
              color: '#666'
            }}
          >
            <p>🖼️ No se pudo cargar la imagen</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              URL intentada: <code>{pdfUrl}</code>
            </p>
            <p style={{ fontSize: '12px', marginTop: '10px', color: '#999' }}>
              Verifica que el archivo existe en la carpeta public/anuncios/
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default PDFAnnouncement;