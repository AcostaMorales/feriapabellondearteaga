import React, { useState, useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const PlazaDelAbuelo = () => {
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
    const eventosPlaza = [
      
      
      {
        id: 1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Tarde de Rondallas (Principales CAlles)',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Jardín Juárez, Recorrido Madero, Revolución e Instalaciones de la feria',
        enlaceLugar: 'https://maps.google.com/?q=Plaza+del+Abuelo+Pabellon+de+Arteaga',
        fecha: '2025-11-17'
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Musica en vivo',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Plaza del Abuelo',
        enlaceLugar: 'https://maps.google.com/?q=Plaza+del+Abuelo+Pabellon+de+Arteaga',
        fecha: '2025-11-18'
      },
      {
        id:3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Tamborazo',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Plaza del Abuelo',
        enlaceLugar: 'https://maps.google.com/?q=Plaza+del+Abuelo+Pabellon+de+Arteaga',
        fecha: '2025-11-19'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Musica en vivo',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Plaza del Abuelo',
        enlaceLugar: 'https://maps.google.com/?q=Plaza+del+Abuelo+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Musica en vivo',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Plaza del Abuelo',
        enlaceLugar: 'https://maps.google.com/?q=Plaza+del+Abuelo+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      {
        id: 6,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Musica en vivo',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Plaza del Abuelo',
        enlaceLugar: 'https://maps.google.com/?q=Plaza+del+Abuelo+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
    ];

    return eventosPlaza.map(evento => ({
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
    <div className="pagina-eventos plaza-abuelo">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png" 
          alt="Plaza del Abuelo - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Plaza del Abuelo</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🏛️ Hoy en la Plaza</h2>
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
                estado={evento.estado}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="sin-eventos-activos">
          <p>😴 No hay eventos programados para hoy</p>
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
        </div>
      )}
    </div>
  );
};

export default PlazaDelAbuelo;