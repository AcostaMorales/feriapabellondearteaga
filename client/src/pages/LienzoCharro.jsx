import React, { useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const LienzoCharro = () => {

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
    const eventosCharros = [
      {
        id: 1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Rodeo',
        descripcion: '',
        hora: '4:00 PM',
        lugar: 'Lienzo Charro Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Lienzo+Charro+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Charreada de Gala "Banda tierra buena',
        descripcion: '',
        hora: '3:00 PM',
        lugar: 'Lienzo Charro Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Lienzo+Charro+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        id: 3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Corrida de Toros',
        descripcion: '',
        hora: '3:00 PM',
        lugar: 'Lienzo Charro Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Lienzo+Charro+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Enanitos Toreros de Aguascalientes',
        descripcion: 'Espectáculo único y divertido con los famosos enanitos toreros que han conquistado al público mexicano',
        hora: '5:00 PM',
        lugar: 'Lienzo Charro Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Lienzo+Charro+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Charreada de gala "Banda riel nueva era',
        descripcion: '',
        hora: '3:00 PM',
        lugar: 'Lienzo Charro Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Lienzo+Charro+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      }
    ];

    return eventosCharros.map(evento => ({
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
    <div className="pagina-eventos lienzo-charro">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1762910396/Corrida_mixta_lpmapt.jpg" 
          alt="Lienzo Charro - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Lienzo Charro</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <h2 className="fecha-prominente">📅 Hoy, {fechaActual}</h2>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 && (
        <div className="eventos-activos">
          <h2>🤠 Hoy en el Lienzo</h2>
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
    </div>
  );
};

export default LienzoCharro;