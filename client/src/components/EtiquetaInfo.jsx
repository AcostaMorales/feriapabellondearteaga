import React, { useState, useEffect } from 'react';
import './EtiquetaInfo.css';

const EtiquetaInfo = ({ 
  id,
  imagen, 
  titulo, 
  descripcion, 
  hora, 
  lugar, 
  enlaceLugar,
  fecha, // Nueva prop para la fecha
  estado = 'activo' // 'activo', 'proximo', 'expirado'
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Determinar si es par o impar para el layout
  const esPar = id % 2 === 0;
  const layoutInvertido = !esPar; // Impares serán invertidos

  // Detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Controlar scroll del body cuando el modal esté abierto
  useEffect(() => {
    if (modalAbierto) {
      // Bloquear scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurar scroll
      document.body.style.overflow = 'auto';
    }

    // Cleanup: restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalAbierto]);

  // Función para truncar texto
  const truncarTexto = (texto, limite) => {
    if (!texto) return '';
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
  };

  // Función para formatear fecha
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    try {
      const fecha = new Date(fechaStr + 'T00:00:00');
      const opciones = { 
        day: 'numeric', 
        month: 'short',
        timeZone: 'America/Mexico_City'
      };
      return fecha.toLocaleDateString('es-MX', opciones);
    } catch {
      return fechaStr;
    }
  };

  // Calcular dimensiones basadas en el ancho de la pantalla
  const calcularDimensiones = () => {
    const anchoEtiqueta = Math.min(screenWidth * 0.9, 400); // Máximo 400px, mínimo 90% del ancho
    const altoEtiqueta = (275 / 300) * anchoEtiqueta; // Proporción 275/300
    const anchoImagen = (7 / 16) * anchoEtiqueta;
    const anchoContenido = (9 / 16) * anchoEtiqueta;
    
    return {
      anchoEtiqueta,
      altoEtiqueta,
      anchoImagen,
      anchoContenido
    };
  };

  const dimensiones = calcularDimensiones();

  // Abrir el modal al hacer clic en la etiqueta
  const abrirModal = () => {
    setModalAbierto(true);
  };

  // Cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
  };

  // Abrir Google Maps
  const abrirMaps = (e) => {
    e.stopPropagation(); // Prevenir que abra el modal
    if (enlaceLugar) {
      window.open(enlaceLugar, '_blank');
    } else if (lugar) {
      // Crear URL de Google Maps con el nombre del lugar
      const urlMaps = `https://www.google.com/maps/search/${encodeURIComponent(lugar)}`;
      window.open(urlMaps, '_blank');
    }
  };

  return (
    <>
      {/* Etiqueta Principal */}
      <div 
        className={`etiqueta-info ${estado} ${layoutInvertido ? 'layout-invertido' : ''}`}
        style={{
          width: `${dimensiones.anchoEtiqueta}px`,
          height: `${dimensiones.altoEtiqueta}px`,
          flexDirection: layoutInvertido ? 'row-reverse' : 'row'
        }}
        onClick={abrirModal}
      >
        {/* Indicador de estado */}
        <div className={`indicador-estado ${estado}`}>
          {estado === 'activo' && '🟢'}
          {estado === 'proximo' && '🟡'}
          {estado === 'expirado' && '🔴'}
        </div>

        {/* Contenedor de imagen */}
        <div 
          className={`contenedor-imagen ${layoutInvertido ? 'imagen-derecha' : ''}`}
          style={{
            width: `${dimensiones.anchoImagen}px`,
            height: `${dimensiones.altoEtiqueta}px`
          }}
        >
          <img 
            src={imagen} 
            alt={titulo}
            style={{
              width: `${dimensiones.anchoImagen - 20}px`, // 20px menos del ancho
              height: 'auto',
              maxHeight: `${dimensiones.altoEtiqueta - 20}px`
            }}
          />
        </div>

        {/* Contenedor de contenido */}
        <div 
          className={`contenedor-contenido ${layoutInvertido ? 'contenido-izquierda' : ''}`}
          style={{
            width: `${dimensiones.anchoContenido}px`,
            height: `${dimensiones.altoEtiqueta}px`
          }}
        >
          <h2 className="titulo-etiqueta">
            {truncarTexto(titulo, 50)}
          </h2>
          
          <p className="descripcion-etiqueta">
            {truncarTexto(descripcion, 100)}
          </p>
          
          <div className="info-adicional">
            <p className="fecha-etiqueta">
              <span className="icono">📅</span>
              {formatearFecha(fecha)}
            </p>
            
            <p className="hora-etiqueta">
              <span className="icono">🕒</span>
              {truncarTexto(hora, 10)}
            </p>
            
            <p 
              className="lugar-etiqueta clickeable" 
              onClick={abrirMaps}
              title="Click para abrir en Maps"
            >
              <span className="icono">📍</span>
              {truncarTexto(lugar, 20)}
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Previsualización */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="boton-cerrar" onClick={cerrarModal}>
              ✕
            </button>
            
            <div className="modal-imagen">
              <img src={imagen} alt={titulo} />
            </div>
            
            <div className="modal-info">
              <div className={`modal-estado ${estado}`}>
                {estado === 'activo' && '🟢 En curso'}
                {estado === 'proximo' && '🟡 Próximamente'}
                {estado === 'expirado' && '🔴 Finalizado'}
              </div>
              
              <h2 className="modal-titulo">{titulo}</h2>
              
              <p className="modal-descripcion">{descripcion}</p>
              
              <div className="modal-detalles">
                <div className="detalle">
                  <span className="icono">📅</span>
                  <span className="texto">{formatearFecha(fecha)}</span>
                </div>
                
                <div className="detalle">
                  <span className="icono">🕒</span>
                  <span className="texto">{hora}</span>
                </div>
                
                <div 
                  className="detalle lugar-modal clickeable" 
                  onClick={() => {
                    if (enlaceLugar) {
                      window.open(enlaceLugar, '_blank');
                    } else if (lugar) {
                      const urlMaps = `https://www.google.com/maps/search/${encodeURIComponent(lugar)}`;
                      window.open(urlMaps, '_blank');
                    }
                  }}
                  title="Click para abrir en Google Maps"
                >
                  <span className="icono">📍</span>
                  <span className="texto">{lugar}</span>
                  <span className="icono-externo">🔗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EtiquetaInfo;