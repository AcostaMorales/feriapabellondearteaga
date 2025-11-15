import React, { useState, useRef, useEffect } from 'react';
import './FloatingVideo.css';

const FloatingVideo = ({ videoUrl, thumbnailUrl, title = "Video de la Feria", isYouTube = false }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Función para iniciar video en modo pequeño
  const startSmallVideo = () => {
    setShowThumbnail(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.log); // Ignorar errores de autoplay
    }
  };

  // Función para alternar reproducción/pausa
  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
  };

  // Función para cerrar definitivamente el video
  const closeVideo = () => {
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Función para abrir en pantalla completa
  const openFullscreen = () => {
    setIsFullscreen(true);
    setIsMinimized(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Función para cerrar pantalla completa
  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Función para minimizar/maximizar el video flotante
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else if (isMinimized && !showThumbnail && videoRef.current) {
      videoRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
  };

  // Funciones para arrastrar el video
  const handleMouseDown = (e) => {
    // Solo permitir arrastre desde el handle de arrastre o el contenedor principal
    if (e.target.closest('.video-controls') || 
        e.target.closest('.play-button') || 
        e.target.classList.contains('video-preview') ||
        e.target.classList.contains('video-thumbnail')) {
      return; // No arrastrar si se hace clic en estos elementos
    }
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    e.preventDefault(); // Prevenir selección de texto
  };

  const handleTouchStart = (e) => {
    // Solo permitir arrastre desde el handle de arrastre o el contenedor principal
    if (e.target.closest('.video-controls') || 
        e.target.closest('.play-button') || 
        e.target.classList.contains('video-preview') ||
        e.target.classList.contains('video-thumbnail')) {
      return; // No arrastrar si se toca en estos elementos
    }
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMoveEffect = (e) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(window.innerWidth - 280, e.clientX - dragStart.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 180, e.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchMoveEffect = (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        const newX = Math.max(0, Math.min(window.innerWidth - 280, touch.clientX - dragStart.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 180, touch.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
        e.preventDefault();
      }
    };

    const handleMouseUpEffect = () => {
      setIsDragging(false);
    };

    const handleTouchEndEffect = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveEffect);
      document.addEventListener('mouseup', handleMouseUpEffect);
      document.addEventListener('touchmove', handleTouchMoveEffect, { passive: false });
      document.addEventListener('touchend', handleTouchEndEffect);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveEffect);
        document.removeEventListener('mouseup', handleMouseUpEffect);
        document.removeEventListener('touchmove', handleTouchMoveEffect);
        document.removeEventListener('touchend', handleTouchEndEffect);
      };
    }
  }, [isDragging, dragStart]);

  // Iniciar video automáticamente después de un delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMinimized && !isFullscreen) {
        startSmallVideo();
      }
    }, 2000); // Espera 2 segundos antes de iniciar

    return () => clearTimeout(timer);
  }, [isMinimized, isFullscreen]);

  // Sincronizar estado de reproducción con el elemento video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  // No renderizar el componente si no está visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Video flotante pequeño */}
      {!isFullscreen && (
        <div
          ref={containerRef}
          className={`floating-video ${isMinimized ? 'minimized' : ''} ${isDragging ? 'dragging' : ''}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="floating-video-content">
            {!isMinimized ? (
              <>
                {/* Área de arrastre (borde superior) */}
                <div className="drag-handle">
                  <div className="drag-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                
                {/* Área del video */}
                <div className="video-preview">
                  {showThumbnail ? (
                    <>
                      {thumbnailUrl && (
                        <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
                      )}
                      <div className="play-overlay">
                        <div className="play-button" onClick={(e) => {e.stopPropagation(); startSmallVideo();}}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {isYouTube ? (
                        <iframe
                          src={videoUrl}
                          title={title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="video-element-small"
                          onClick={openFullscreen}
                        />
                      ) : (
                        <video
                          ref={videoRef}
                          src={videoUrl}
                          muted
                          loop
                          autoPlay
                          playsInline
                          className="video-element-small"
                          onClick={openFullscreen}
                        />
                      )}
                      <div className="video-controls-overlay">
                        {!isYouTube && (
                          <button 
                            className="play-pause-btn"
                            onClick={(e) => {e.stopPropagation(); togglePlayPause();}}
                            title={isPlaying ? "Pausar" : "Reproducir"}
                          >
                            {isPlaying ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="#333">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="#333">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="video-minimized" onClick={toggleMinimize}>
                <span className="video-title-mini">Video</span>
              </div>
            )}
            
            <div className="video-controls" onClick={e => e.stopPropagation()}>
              <button 
                className="control-btn close-btn" 
                onClick={closeVideo}
                title="Cerrar video"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              
              <button 
                className="control-btn minimize-btn" 
                onClick={toggleMinimize}
                title={isMinimized ? "Expandir" : "Minimizar"}
              >
                {isMinimized ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M19 13H5v-2h14v2z"/>
                  </svg>
                )}
              </button>
              
              {!isMinimized && (
                <button 
                  className="control-btn fullscreen-btn" 
                  onClick={openFullscreen}
                  title="Pantalla completa"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de pantalla completa */}
      {isFullscreen && (
        <div className="video-fullscreen-modal" onClick={closeFullscreen}>
          <div className="video-fullscreen-content" onClick={e => e.stopPropagation()}>
            <button className="close-fullscreen-btn" onClick={closeFullscreen}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            {isYouTube ? (
              <iframe
                src={videoUrl.replace('autoplay=1&mute=1', 'autoplay=1')}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-element-fullscreen"
              />
            ) : (
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                autoPlay
                className="video-element-fullscreen"
                onPlay={() => console.log('Video playing')}
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )}
            
            <div className="video-info">
              <h3 className="video-title-fullscreen">{title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingVideo;