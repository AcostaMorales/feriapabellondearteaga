import React, { useState, useMemo, useEffect } from 'react';
import EtiquetaInfo from '../components/EtiquetaInfo';
import PDFAnnouncement from '../components/PDFAnnouncement';
import usePDFAnnouncement from '../hooks/usePDFAnnouncement';
import { useLocation } from 'react-router-dom';
import '../styles/PaginasEventos.css';

const TeatroDelPueblo = () => {
  // Constante para manejar el número de anuncios que existen
  const NUMERO_DE_ANUNCIOS = 1; // Modifica este número según cuántos anuncios tengas en la carpeta /anuncios
  
  const [randomAnnouncementUrl, setRandomAnnouncementUrl] = useState('');
  const location = useLocation();
  
  // Función para obtener una imagen aleatoria de anuncios
  const getRandomAnnouncement = () => {
    const randomNumber = Math.floor(Math.random() * NUMERO_DE_ANUNCIOS) + 1;
    const imagePath = `/anuncios/anuncio${randomNumber}.png`;
    console.log('🎲 Generando imagen aleatoria:', imagePath);
    return imagePath;
  };
  
  const pdfHook = usePDFAnnouncement(randomAnnouncementUrl, 6000);

  // Detectar si se navegó desde el Home o desde NavigationGrid
  useEffect(() => {
    const fromHome = location.state?.fromHome || sessionStorage.getItem('navigatedFromHome');
    const fromNavigation = sessionStorage.getItem('showTeatroAnnouncement');
    
    console.log('🔍 Verificando navegación - fromHome:', fromHome, 'fromNavigation:', fromNavigation);
    
    if (fromHome || fromNavigation === 'true') {
      console.log('✅ Condición cumplida, generando anuncio...');
      
      // Generar URL de imagen aleatoria
      const imageUrl = getRandomAnnouncement();
      setRandomAnnouncementUrl(imageUrl);
      console.log('📸 URL de imagen establecida:', imageUrl);
      
      // Mostrar el anuncio después de un pequeño delay
      setTimeout(() => {
        console.log('🎭 Mostrando anuncio...');
        pdfHook.openPDF();
      }, 1500);
      
      // Limpiar los flags
      sessionStorage.removeItem('navigatedFromHome');
      sessionStorage.removeItem('showTeatroAnnouncement');
      console.log('🧹 Flags limpiados');
    } else {
      console.log('❌ No se encontraron flags de navegación');
    }
  }, [location, pdfHook]);

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
        id: 1,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905838/15nov_wpbtlm.jpg',
        titulo: 'La firma',
        descripcion: 'El Grupo La Firma es una agrupación musical mexicana originaria de la ciudad de San Nicolás de los Garza, Nuevo León, México surgida en el año de 1996, cuando Juan Cárdenas y Adrián González aliaron su talento junto al joven compositor y cantante Luis "Louie" Padilla junto con otros 9 miembros para crear un concepto muy innovador al combinar los ritmos de jazz, norteño, tex-mex, entre otros, con el inconfundible sabor grupero para así obtener un grupo totalmente original: La Firma',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: 'https://maps.google.com/?q=Teatro+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-15' // Hoy - activo
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905835/16nov_sjcdfa.jpg',
        titulo: 'Inspector',
        descripcion: 'Inspector es una banda mexicana de rock y ska. Fundada en Noviembre del año 1995 en Monterrey, integraron el auge del ska en México a finales de los años 90;saltaron a la fama en su país en 2001 con su disco Alma en Fuego,que incluyó los temas Amnesia y Amargo adiós​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: 'https://maps.google.com/?q=Teatro+del+Pueblo+Pabellon+de+Arteaga',
        fecha: '2025-11-16' 
      },
      {
        id: 3,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905841/17nov_rk2xcb.jpg',
        titulo: 'La fiera',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-17' 
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905815/18nov_zktzj7.jpg',
        titulo: 'Tropicalismo Apcahe de Arturo Ortiz',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-18' 
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905820/19nov_tsyqll.jpg',
        titulo: 'Bacilos',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-19' 
      },
      {
        id: 6,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905818/20nov_aubicd.jpg',
        titulo: 'Los Acosta',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-20' 
      },
      {
        id: 7,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905824/21nov_dpmagg.jpg',
        titulo: 'Isaías Lucero',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-21' 
      },
      {
        id: 8,
        imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762905826/22nov_ccy5ke.jpg',
        titulo: 'Banda Corona del Rey',
        descripcion: '​',
        hora: '8:00 PM',
        lugar: 'Teatro del Pueblo',
        enlaceLugar: '',
        fecha: '2025-11-22' 
      },
      {
        id: 9,
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
          <p>😴 No hay funciones programadas para hoy</p>
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

      {/* Anuncio de imagen aleatoria controlado */}
      {pdfHook.showAnnouncement && (
        <PDFAnnouncement
          pdfUrl={pdfHook.pdfUrl}
          duration={pdfHook.duration}
          onClose={pdfHook.closePDF}
          showCloseButton={true}
          isImage={true}
          title="Anuncio Especial del Teatro"
        />
      )}
    </div>
  );
};

export default TeatroDelPueblo;