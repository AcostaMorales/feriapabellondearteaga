import React, { useEffect } from 'react';
import PDFAnnouncement from './PDFAnnouncement';
import usePDFAnnouncement from '../hooks/usePDFAnnouncement';

/**
 * Componente que muestra automáticamente un anuncio PDF/imagen al cargar la página
 * @param {string} pdfUrl - URL del PDF o imagen a mostrar
 * @param {number} delay - Tiempo de espera antes de mostrar el anuncio (en ms)
 * @param {number} duration - Duración del anuncio (en ms)
 * @param {boolean} isImage - Si es true, muestra como imagen; si es false, como PDF
 * @param {string} title - Título del anuncio
 * @param {boolean} showOnlyOnce - Si es true, solo se muestra una vez por sesión
 */
const AutoPDFAnnouncement = ({ 
  pdfUrl, 
  delay = 2000, 
  duration = 5000, 
  isImage = true,
  title = "Anuncio importante",
  showOnlyOnce = true
}) => {
  const pdfHook = usePDFAnnouncement(pdfUrl, duration);

  useEffect(() => {
    const sessionKey = `pdf-announcement-shown-${btoa(pdfUrl)}`;
    
    // Si showOnlyOnce está activado, verificar si ya se mostró en esta sesión
    if (showOnlyOnce && sessionStorage.getItem(sessionKey)) {
      return;
    }

    // Mostrar el anuncio después del delay especificado
    const timer = setTimeout(() => {
      pdfHook.openPDF();
      
      // Marcar como mostrado en esta sesión
      if (showOnlyOnce) {
        sessionStorage.setItem(sessionKey, 'true');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [pdfUrl, delay, showOnlyOnce, pdfHook]);

  return (
    <>
      {pdfHook.showAnnouncement && (
        <PDFAnnouncement
          pdfUrl={pdfHook.pdfUrl}
          duration={pdfHook.duration}
          onClose={pdfHook.closePDF}
          showCloseButton={true}
          isImage={isImage}
          title={title}
        />
      )}
    </>
  );
};

export default AutoPDFAnnouncement;