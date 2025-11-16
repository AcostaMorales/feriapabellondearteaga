import React, { useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const ForoJuvenil = () => {

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
    const eventosJuveniles = [
        {
          id:1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo de Box Dualmeet',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Foro Juvenil explanada de los Símbolos Patrios',
        enlaceLugar: 'https://maps.google.com/?q=Centro+Deportivo+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
        {
          id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo de Ajedrez',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Foro Juvenil explanada de los Símbolos Patrios',
        enlaceLugar: 'https://maps.google.com/?q=Casa+Cultura+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
        {
          id: 3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Carrera de carros sin motor',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Foro juvenil explanada de los Símbolos Patrios',
        enlaceLugar: '',
        fecha: '2025-11-17'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Exhibición de tablas rítmicas (CECYTEA Pabellón de Arteaga)',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Foro juvenil explanada de los Símbolos Patrios',
        enlaceLugar: '',
        fecha: '2025-11-18'
      },
      {
          id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Master class Zumba',
        descripcion: '',
        hora: '6:00 PM',
        lugar: 'Foro juvenil explanada de los Símbolos Patrios',
        enlaceLugar: '',
        fecha: '2025-11-18'
      },
        {
          id: 6,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Conjunto Plata',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Foro juvenil explanada de los Símbolos Patrios',
        enlaceLugar: '',
        fecha: '2025-11-19'
      },
      {
        id: 7,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'LDB Vázquez',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Foro Juvenil explanada de los Símbolos Patrios',
        enlaceLugar: 'https://maps.google.com/?q=Foro+Juvenil+Pabellon+de+Arteaga',
        fecha: '2025-11-20'
      },
      {
        id: 8,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Nueva Era',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Foro Juvenil explanada de los Símbolos Patrios',
        enlaceLugar: 'https://maps.google.com/?q=Foro+Juvenil+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      {
        id: 9,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Super Sammy',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Foro Juvenil explanada de los Símbolos Patrios',
        enlaceLugar: 'https://maps.google.com/?q=Foro+Juvenil+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 10,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Caldo de brujas',
        descripcion: '',
        hora: '7:00 PM',
        lugar: 'Foro juvenil explanada de los Símbolos Patrios',
        enlaceLugar: '',
        fecha: '2025-11-23'
      },
    ];

    return eventosJuveniles.map(evento => ({
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
    <div className="pagina-eventos foro-juvenil">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="/src/assets/images/foro-juvenil/portada.jpg" 
          alt="Foro Juvenil - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Foro Juvenil</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🎵 Hoy en el Foro</h2>
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

      {/* Programación Completa - Siempre visible */}
      {eventosNoActivos.length > 0 && (
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

export default ForoJuvenil;