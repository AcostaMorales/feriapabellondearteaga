import React, { useState, useRef, useEffect } from 'react';
import './HeroVideo.css';

const HeroVideo = ({ videoUrl, title = "Video de la Feria", isYouTube = false, height = "60vh" }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

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

  // Función para silenciar/activar sonido
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  // Función para pantalla completa
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Auto-play el video cuando se monta el componente
  useEffect(() => {
    if (videoRef.current && !isYouTube) {
      videoRef.current.play().catch(console.log);
    }
  }, [isYouTube]);

  // Sincronizar estado de reproducción con el elemento video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isYouTube) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isYouTube]);

  return (
    <div 
      className="hero-video-container"
      style={{ height }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {isYouTube ? (
        <iframe
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="hero-video-element"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          autoPlay
          playsInline
          className="hero-video-element"
        />
      )}

      {/* Overlay con información */}
      <div className="hero-video-overlay">
        <div className="hero-video-content">
          <h1 className="hero-video-title">{title}</h1>
          <div className="hero-video-subtitle">
            ¡Vive la tradición y la cultura!
          </div>
        </div>
      </div>

      {/* Controles solo para videos locales (no YouTube) */}
      {!isYouTube && (
        <div className={`hero-video-controls ${showControls ? 'visible' : ''}`}>
          <button 
            className="hero-control-btn"
            onClick={togglePlayPause}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button 
            className="hero-control-btn"
            onClick={toggleMute}
            title="Silenciar/Activar sonido"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>

          <button 
            className="hero-control-btn"
            onClick={toggleFullscreen}
            title="Pantalla completa"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Indicador de scroll */}
      <div className="hero-scroll-indicator">
        <span>Desliza para explorar</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </div>
    </div>
  );
};

export default HeroVideo;