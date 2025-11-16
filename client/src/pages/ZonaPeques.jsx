import React, { useState, useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const ZonaPeques = () => {
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
    const eventosPeques = [
      {
        imagen: '/src/assets/images/zona-peques/inauguracion.jpg',
        titulo: 'Inauguración Zona Peques',
        descripcion: '',
        hora: '5:30 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Experiencia Multisensorial',
        descripcion: 'Estimulación sensorial, Sonidos y vibraciones, aromas y sabores, juegos de creatividad e imaginación, actividades Peque-Revoluciones, casa ciencia, juegos infantiles y actividades recreativas',
        hora: '5:00 PM',
        lugar: 'Canchitas',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        imagen: '/src/assets/images/zona-peques/creatividad.jpg',
        titulo: 'Juegos de Creatividad',
        descripcion: 'Actividades lúdicas diseñadas para fomentar la imaginación y creatividad infantil con materiales seguros y divertidos',
        hora: '4:00 PM',
        lugar: 'Zona Peques Central',
        enlaceLugar: 'https://maps.google.com/?q=Zona+Peques+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        imagen: '/src/assets/images/zona-peques/titeres.jpg',
        titulo: 'Teatro de Títeres',
        descripcion: 'Espectáculo mágico de títeres interactivo con la Compañía de Títeres Mágicos para estimular la participación de los pequeños',
        hora: '5:00 PM',
        lugar: 'Zona Peques Central',
        enlaceLugar: 'https://maps.google.com/?q=Zona+Peques+Pabellon+de+Arteaga',
        fecha: '2025-11-17'
      },
      {
        imagen: '/src/assets/images/zona-peques/pintura.jpg',
        titulo: 'Taller de Pintura Libre',
        descripcion: 'Espacio creativo libre para que los niños expresen su arte con pinturas seguras y lavables bajo supervisión especializada',
        hora: '4:30 PM',
        lugar: 'Zona Peques Central',
        enlaceLugar: 'https://maps.google.com/?q=Zona+Peques+Pabellon+de+Arteaga',
        fecha: '2025-11-18'
      },
      {
        imagen: '/src/assets/images/zona-peques/musica.jpg',
        titulo: 'Círculo Musical Infantil',
        descripcion: 'Sesión musical interactiva con instrumentos apropiados para la edad y canciones que estimulan el desarrollo auditivo',
        hora: '4:00 PM',
        lugar: 'Zona Peques Central',
        enlaceLugar: 'https://maps.google.com/?q=Zona+Peques+Pabellon+de+Arteaga',
        fecha: '2025-11-19'
      },
      {
        imagen: '/src/assets/images/zona-peques/cuentacuentos.jpg',
        titulo: 'Hora del Cuento',
        descripcion: 'Narración de cuentos clásicos y modernos adaptados para los más pequeños con elementos visuales y participación activa',
        hora: '5:00 PM',
        lugar: 'Zona Peques Central',
        enlaceLugar: 'https://maps.google.com/?q=Zona+Peques+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      }
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
          src="/src/assets/images/zona-peques/portada.jpg" 
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
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🎈 Hoy en Zona Peques</h2>
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
          <p>😴 No hay actividades programadas para hoy</p>
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

export default ZonaPeques;