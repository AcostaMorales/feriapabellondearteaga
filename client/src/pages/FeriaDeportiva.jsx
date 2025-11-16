import React, { useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const FeriaDeportiva = () => {

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
    // Array de eventos deportivos
    const eventosDeportivos = [
      
      {
        id: 1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular de Tocho Flag',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'unidad deportiva municipal "cancha de fútbol"',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo Local de Tenis',
        descripcion: '',
        hora: '8:30 AM',
        lugar: 'Canchas de Tenis Municipales(Primera fase)',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        id: 3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo de tocho flag libre',
        descripcion: '',
        hora: '8:30 AM',
        lugar: 'Estadio de fútbol americano',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular de tocho infantil lIPAFF',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Cancha de fútbol americano',
        enlaceLugar: '',
        fecha: '2025-11-15'
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Derby de la Revolución Homerun',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Parque de Béisbol Revolución',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Beisbol+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        id: 6,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Nacional de Artes Marciales Mixtas',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Auditprop municipal',
        enlaceLugar: 'https://maps.google.com/?q=Gimnasio+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        id: 7,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular 1era especial de béisbol',
        descripcion: '',
        hora: '6:30 PM',
        lugar: 'Parque de Béisbol Revolución',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Beisbol+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      //Dia 16
      {
        id: 8,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular de Rugby',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Parque de béisbol',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        id: 9,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular de softbol',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Parque de béisbol',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        id: 10,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular Municipal de Fútbol Libre',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Unidad Deportiva',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      //Dia 17
      {
        id: 11,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular de Voleibol',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Cancha de Voleibol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Voleibol+Pabellon+de+Arteaga',
        fecha: '2025-11-17'
      },
      //Dia 18
      {
        id: 12,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Clínica de Basquetbol con Mtra. Jezabel',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Unidad Deportiva',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Basquetbol+Pabellon+de+Arteaga',
        fecha: '2025-11-18'
      },
      //Dia 19
      {
        id: 13,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Clínica Deportiva de Básquetbol con Horacio Llamas',
        descripcion: '',
        hora: '6:00 PM',
        lugar: 'Auditorio municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Basquetbol+Pabellon+de+Arteaga',
        fecha: '2025-11-19'
      },
      //Dia 20
      {
        id: 14,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'invitado especial Horacio Llamas',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Unidad Deportiva',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Basquetbol+Pabellon+de+Arteaga',
        fecha: '2025-11-19'
      },
      //Dia 21
      {
        id: 15,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular Fútbol "Copa Revolución 2025"',
        descripcion: '',
        hora: '6:00 PM',
        lugar: 'Unidad Deportiva',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      //Dia 22
      {
        id: 16,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Encuentro de Taekwondo',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Tecnológico de Pabellón de Arteaga',
        enlaceLugar: 'https://maps.google.com/?q=Gimnasio+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 17,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo Revolucionario de Frontenis',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Unidad deportiva',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 18,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo local de tenis',
        descripcion: '',
        hora: '8:30 AM',
        lugar: 'Unidad deportiva "Final"',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 19,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular de básquetbol varonil 40 y más',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Auditorio municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 20,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Crossfit Marvelous',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Parque de los chaneques',
        enlaceLugar: 'https://maps.google.com/?q=Gimnasio+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 21,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torneo de tocho flag libre',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Estadio de fútbol americano',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 22,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular fútbol "Copa Revolución"',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Unidad deportiva municipal "Final"',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        id: 23,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular 1era especial de béisbol',
        descripcion: '',
        hora: '5:30 PM',
        lugar: 'Parque de béisbol revolución',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      //Dia 23
      {
        id: 24,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Torne de tocho flag libre',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Estadio de fútbol americano finales',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      },
      {
        id: 25,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Cuadrangular municipal de fútbol libre',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'unidad deportiva municipal final',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      },
      {
        id: 26,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png',
        titulo: 'Final de sóftbol',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Parque de beísbol',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      },
    ];

    return eventosDeportivos.map(evento => ({
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
    <div className="pagina-eventos feria-deportiva">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png" 
          alt="Feria Deportiva Revolucionaria - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Feria Deportiva Revolucionaria</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <h2 className="fecha-prominente">📅 Hoy, {fechaActual}</h2>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 && (
        <div className="eventos-activos">
          <h2>🏆 Eventos de Hoy</h2>
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
                fecha={evento.fecha}
                estado={evento.estado}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default FeriaDeportiva;