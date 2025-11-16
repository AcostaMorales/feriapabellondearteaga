import React, { useState, useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import './VocesDelPueblo.css';

const VocesDelPueblo = () => {
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
    const eventosVoces = [
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Renacidos de Pabellón',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Marijuana',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Voces del Pueblo - Plaza Central',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Los Aguerridos',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-17'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Los Gallardos',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-18'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Mariachi Monumental Gigantes vs Pichi Macías',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-19'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'CLS',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Grupo Índigo',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Grupo Denso',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Grupo Pro Activo',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Voces del Pueblo - Escenario Principal',
        enlaceLugar: 'https://maps.google.com/?q=Voces+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      }
    ];

    return eventosVoces.map(evento => ({
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
    <div className="voces-del-pueblo">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png" 
          alt="Voces del Pueblo - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Voces del Pueblo</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🎤 Hoy en el Escenario</h2>
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
          <p>🎵 No hay presentaciones programadas para hoy</p>
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
          <h2>🎶 Programación Completa</h2>
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

export default VocesDelPueblo;