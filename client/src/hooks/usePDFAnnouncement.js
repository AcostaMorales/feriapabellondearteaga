import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar el componente PDFAnnouncement
 * @param {string} pdfUrl - URL del PDF a mostrar
 * @param {number} duration - Duración en milisegundos (por defecto 5000ms)
 * @returns {object} - Objeto con estado y funciones para controlar el anuncio
 */
const usePDFAnnouncement = (pdfUrl, duration = 5000) => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const openPDF = useCallback(() => {
    setShowAnnouncement(true);
  }, []);

  const closePDF = useCallback(() => {
    setShowAnnouncement(false);
  }, []);

  const togglePDF = useCallback(() => {
    setShowAnnouncement(prev => !prev);
  }, []);

  return {
    showAnnouncement,
    openPDF,
    closePDF,
    togglePDF,
    pdfUrl,
    duration
  };
};

export default usePDFAnnouncement;