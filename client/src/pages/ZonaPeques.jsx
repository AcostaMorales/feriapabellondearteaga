import React, { useMemo, useState } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import PDFAnnouncement from '../components/PDFAnnouncement';
import '../styles/PaginasEventos.css';

const ZonaPeques = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  // URL del GIF promocional de pediatra
  const announcementGif = '/Promociones/PromoPediatra.gif';
  
  // Función para cerrar el anuncio
  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
  };

  // Función para determinar el estado basado en la fecha
  const determinarEstado = (fecha) => {
    // Obtener fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const añoHoy = hoy.getFullYear();
    const mesHoy = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const diaHoy = hoy.getDate().toString().padStart(2, '0');
    const fechaHoyStr = `${añoHoy}-${mesHoy}-${diaHoy}`;
    
    // Comparación directa de strings (más confiable)
    if (fecha === fechaHoyStr) {
      return 'activo';
    } else if (fecha < fechaHoyStr) {
      return 'expirado';
    } else {
      return 'proximo';
    }
  };

  // Procesar eventos con sus estados
  const eventosConEstado = useMemo(() => {
    // Array de eventos con fechas en lugar de estados
    const eventosPeques = [
      {
        id: 1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Inauguración Zona Peques',
        descripcion: '',
        hora: '5:30 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        id: 3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-16'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-17'
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-18'
      },
      {
        id: 6,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-19'
      },
      {
        id: 7,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-20'
      },
      {
        id: 8,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-21'
      },
      {
        id: 9,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-22'
      },
      {
        id: 10,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-23'
      },
      
      
    ];

    return eventosPeques.map(evento => ({
      ...evento,
      estado: determinarEstado(evento.fecha)
    }));
  }, []);

  // Filtrar eventos activos
  const eventosActivos = eventosConEstado.filter(evento => evento.estado === 'activo');
  
  // Eventos no activos para mostrar al expandir
  const eventosNoActivos = eventosConEstado.filter(evento => evento.estado !== 'activo');

  // Obtener fecha actual formateada
  const fechaActual = useMemo(() => {
    const hoy = new Date();
    const opciones = { 
      day: 'numeric', 
      month: 'long',
      timeZone: 'America/Mexico_City'
    };
    return hoy.toLocaleDateString('es-MX', opciones);
  }, []);

  return (
    <div className="pagina-eventos zona-peques">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png" 
          alt="Zona Peques - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Zona Peques</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <h2 className="fecha-prominente">📅 Hoy, {fechaActual}</h2>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 && (
        <div className="eventos-activos">
          <h2>🎈 Hoy en Zona Peques</h2>
          <div className="contenedor-etiquetas">
            {eventosActivos.map((evento, index) => (
              <EtiquetaInfo
                key={`activo-${index}`}
                id={evento.id}
                imagen={evento.imagen}
                titulo={evento.titulo}
                descripcion={evento.descripcion}
                hora={evento.hora}
                lugar={evento.lugar}
                  enlaceLugar={evento.enlaceLugar}
                  fecha={evento.fecha}
                  estado={evento.estado}
              />
            ))}
          </div>
        </div>
      )}

      {/* Todos los eventos */}
      {eventosNoActivos.length > 0 && (
        <div className="contenedor-etiquetas">
          {eventosNoActivos
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .map((evento, index) => (
              <EtiquetaInfo
                key={`programacion-${index}`}
                id={evento.id}
                imagen={evento.imagen}
                titulo={evento.titulo}
                descripcion={evento.descripcion}
                hora={evento.hora}
                lugar={evento.lugar}
                enlaceLugar={evento.enlaceLugar}
                estado={evento.estado}
              />
            ))}
        </div>
      )}

      {/* Anuncio GIF promocional del pediatra */}
      {showAnnouncement && (
        <PDFAnnouncement
          pdfUrl={announcementGif}
          isImage={true}
          duration={5000}
          showCloseButton={true}
          title="¡Promoción especial para los peques!"
          onClose={handleCloseAnnouncement}
        />
      )}
    </div>
  );
};

export default ZonaPeques;