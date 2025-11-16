import React, { useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const ExpoGanadera = () => {

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
    const eventosGanaderos = [
      {
        id: 1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Inauguración Expo Ganadera',
        descripcion: 'Música en vivo banda del rancho',
        hora: '6:00 PM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        id: 3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      },
    ];

    return eventosGanaderos.map(evento => ({
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
    <div className="pagina-eventos expo-ganadera">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png" 
          alt="Expo Ganadera - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Expo Ganadera</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <h2 className="fecha-prominente">📅 Hoy, {fechaActual}</h2>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 && (
        <div className="eventos-activos">
          <h2>🐄 Hoy en la Expo</h2>
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

export default ExpoGanadera;