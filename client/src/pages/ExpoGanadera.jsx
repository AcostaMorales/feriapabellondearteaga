import React, { useState, useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const ExpoGanadera = () => {
  const [mostrarTodos, setMostrarTodos] = useState(false);

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
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Inauguración Expo Ganadera',
        descripcion: 'Música en vivo banda del rancho',
        hora: '6:00 PM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Expo Leche',
        descripcion: 'Expo leche, expo carne, exposición de gallitos miniatura, expo cabllos, expo borregos, expor reptiles, rodeo infantil',
        hora: '9:00 AM',
        lugar: 'Recinto Ferial - Área Ganadera',
        enlaceLugar: 'https://maps.google.com/?q=Expo+Ganadera+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
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
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🐄 Hoy en la Expo</h2>
          <div className="contenedor-etiquetas">
            {eventosActivos.map((evento, index) => (
              <EtiquetaInfo
                key={`activo-${index}`}
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
        </div>
      ) : (
        <div className="sin-eventos-activos">
          <p>😴 No hay exposiciones programadas para hoy</p>
        </div>
      )}

      {/* Sección para ver programación completa */}
      <div className="programacion-completa">
        <p className="texto-programacion">Mira la programación completa</p>
        <button 
          className="boton-ver-todo"
          onClick={() => setMostrarTodos(!mostrarTodos)}
        >
          {mostrarTodos ? 'Ocultar' : 'Ver todo'}
        </button>
      </div>

      {/* Eventos expirados y próximos */}
      {mostrarTodos && eventosNoActivos.length > 0 && (
        <div className="eventos-programacion">
          <h2>📅 Programación Completa</h2>
          <div className="contenedor-etiquetas">
            {eventosNoActivos
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
              .map((evento, index) => (
                <EtiquetaInfo
                  key={`programacion-${index}`}
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
        </div>
      )}
    </div>
  );
};

export default ExpoGanadera;