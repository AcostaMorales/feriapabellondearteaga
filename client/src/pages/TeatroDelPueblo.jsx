import React, { useState, useMemo } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import '../styles/PaginasEventos.css';

const TeatroDelPueblo = () => {
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
    const eventosTeatro = [
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905838/15nov_wpbtlm.jpg',
        titulo: 'La firma',
        descripcion: 'El Grupo La Firma es una agrupación musical mexicana originaria de la ciudad de San Nicolás de los Garza, Nuevo León, México surgida en el año de 1996, cuando Juan Cárdenas y Adrián González aliaron su talento junto al joven compositor y cantante Luis "Louie" Padilla junto con otros 9 miembros para crear un concepto muy innovador al combinar los ritmos de jazz, norteño, tex-mex, entre otros, con el inconfundible sabor grupero para así obtener un grupo totalmente original: La Firma',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: 'https://maps.google.com/?q=Teatro+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-15' // Hoy - activo
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905835/16nov_sjcdfa.jpg',
        titulo: 'Inspector',
        descripcion: 'Inspector es una banda mexicana de rock y ska. Fundada en Noviembre del año 1995 en Monterrey, integraron el auge del ska en México a finales de los años 90;saltaron a la fama en su país en 2001 con su disco Alma en Fuego,que incluyó los temas Amnesia y Amargo adiós​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: 'https://maps.google.com/?q=Teatro+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-16' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905841/17nov_rk2xcb.jpg',
        titulo: 'La fiera',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-17' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905815/18nov_zktzj7.jpg',
        titulo: 'Tropicalismo Apcahe de Arturo Ortiz',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-18' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905820/19nov_tsyqll.jpg',
        titulo: 'Bacilos',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-19' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905818/20nov_aubicd.jpg',
        titulo: 'Los Acosta',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-20' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905824/21nov_dpmagg.jpg',
        titulo: 'Isaías Lucero',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-21' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905826/22nov_ccy5ke.jpg',
        titulo: 'Banda Corona del Rey',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-22' 
      },
      {
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905829/23nov_r0tbnd.jpg',
        titulo: 'La mafia',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-23' 
      },
    ];

    return eventosTeatro.map(evento => ({
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
    <div className="pagina-eventos teatro-del-pueblo">
      {/* Imagen promocional */}
      <div className="imagen-promocional">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1762905844/promocional_kyss74.jpg" 
          alt="Teatro del Pueblo - Imagen promocional"
          className="imagen-hero"
        />
      </div>

      {/* Título de la página */}
      <div className="titulo-pagina">
        <h1>Teatro del Pueblo</h1>
      </div>

      {/* Fecha del día */}
      <div className="fecha-actual">
        <p>Hoy, {fechaActual}</p>
      </div>

      {/* Eventos activos */}
      {eventosActivos.length > 0 ? (
        <div className="eventos-activos">
          <h2>🎭 Hoy en el Teatro</h2>
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
          <p>😴 No hay funciones programadas para hoy</p>
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

export default TeatroDelPueblo;