import React, { useState, useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const FeriaDeportiva = () => {
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
    // Array de eventos deportivos
    const eventosDeportivos = [
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Torneo de Box Dualmeet',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Centro Deportivo - Ring Principal',
        enlaceLugar: 'https://maps.google.com/?q=Centro+Deportivo+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Cuadrangular de Tocho Flag',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Campo de Fútbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Torneo Local de Tenis',
        descripcion: '',
        hora: '8:30 AM',
        lugar: 'Canchas de Tenis Municipales',
        enlaceLugar: 'https://maps.google.com/?q=Canchas+Tenis+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Derby de la Revolución Homerun',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Campo de Béisbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Beisbol+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Nacional de Artes Marciales Mixtas',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Gimnasio Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Gimnasio+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-15'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Torneo de Ajedrez',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Casa de la Cultura',
        enlaceLugar: 'https://maps.google.com/?q=Casa+Cultura+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Cuadrangular de Rugby',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Campo de Fútbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Cuadrangular Municipal de Fútbol Libre',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Campo de Fútbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-16'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Carrera de Carros Sin Motor',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Avenida Principal',
        enlaceLugar: 'https://maps.google.com/?q=Avenida+Principal+Pabellon+de+Arteaga',
        fecha: '2025-11-17'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Cuadrangular de Voleibol',
        descripcion: '',
        hora: '5:00 PM',
        lugar: 'Cancha de Voleibol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Voleibol+Pabellon+de+Arteaga',
        fecha: '2025-11-17'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Torneo Nacional de Cachibol',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Cancha Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-18'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Clínica de Basquetbol con Mtra. Jezabel',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Cancha de Basquetbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Basquetbol+Pabellon+de+Arteaga',
        fecha: '2025-11-18'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Clínica Deportiva de Básquetbol con Horacio Llamas',
        descripcion: '',
        hora: '6:00 PM',
        lugar: 'Cancha de Basquetbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Basquetbol+Pabellon+de+Arteaga',
        fecha: '2025-11-19'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Cuadrangular Fútbol "Copa Revolución 2025"',
        descripcion: '',
        hora: '6:00 PM',
        lugar: 'Campo de Fútbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Futbol+Pabellon+de+Arteaga',
        fecha: '2025-11-21'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Encuentro de Taekwondo',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Gimnasio Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Gimnasio+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Torneo Revolucionario de Frontenis',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Cancha de Frontenis',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Frontenis+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Crossfit Marvelous',
        descripcion: '',
        hora: '9:00 AM',
        lugar: 'Gimnasio Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Gimnasio+Municipal+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Cuadrangular de Basquetbol Femenil Libre',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Cancha de Basquetbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Cancha+Basquetbol+Pabellon+de+Arteaga',
        fecha: '2025-11-22'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Carrera Atlética "De la Pista al Campo"',
        descripcion: '',
        hora: '8:00 AM',
        lugar: 'Pista de Atletismo Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Pista+Atletismo+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762389322/feria_deportiva_hcfkdr.png',
        titulo: 'Final de Sóftbol',
        descripcion: '',
        hora: '10:00 AM',
        lugar: 'Campo de Sóftbol Municipal',
        enlaceLugar: 'https://maps.google.com/?q=Campo+Softbol+Pabellon+de+Arteaga',
        fecha: '2025-11-23'
      }
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
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🏆 Eventos de Hoy</h2>
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
          <p>🏃‍♂️ No hay eventos deportivos programados para hoy</p>
        </div>
      )}

      {/* Sección para ver programación completa */}
      <div className="programacion-completa">
        <p className="texto-programacion">Mira la programación deportiva completa</p>
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
          <h2>🥇 Programación Deportiva Completa</h2>
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

export default FeriaDeportiva;