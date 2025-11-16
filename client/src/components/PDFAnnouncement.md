# Componentes de Anuncio PDF

Este conjunto de componentes permite mostrar anuncios PDF o imágenes en la aplicación de la Feria de Pabellón de Arteaga.

## Componentes Incluidos

1. **PDFAnnouncement** - Componente principal para mostrar el anuncio
2. **AutoPDFAnnouncement** - Componente que muestra automáticamente el anuncio al cargar
3. **usePDFAnnouncement** - Hook personalizado para manejar el estado

## Características

- ✅ Soporte para PDF e imágenes
- ✅ Contador regresivo visual
- ✅ Auto-cierre después de tiempo definido
- ✅ Botón de cierre manual opcional
- ✅ Animaciones suaves de entrada y salida
- ✅ Responsive design
- ✅ Control de sesión (mostrar solo una vez)
- ✅ Overlay con blur de fondo

## Uso Básico

### 1. PDFAnnouncement - Control Manual

```jsx
import React from 'react';
import PDFAnnouncement from '../components/PDFAnnouncement';
import usePDFAnnouncement from '../hooks/usePDFAnnouncement';

const MiPagina = () => {
  const pdfHook = usePDFAnnouncement(
    'https://ejemplo.com/mi-archivo.pdf', 
    5000 // 5 segundos
  );

  return (
    <div>
      <button onClick={pdfHook.openPDF}>
        Ver Anuncio
      </button>
      
      {pdfHook.showAnnouncement && (
        <PDFAnnouncement
          pdfUrl={pdfHook.pdfUrl}
          duration={pdfHook.duration}
          onClose={pdfHook.closePDF}
          showCloseButton={true}
          isImage={false} // Para PDF
          title="Mi Anuncio"
        />
      )}
    </div>
  );
};
```

### 2. AutoPDFAnnouncement - Automático

```jsx
import React from 'react';
import AutoPDFAnnouncement from '../components/AutoPDFAnnouncement';

const MiPagina = () => {
  return (
    <div>
      {/* Contenido de tu página */}
      <h1>Mi Página</h1>
      
      {/* Anuncio automático */}
      <AutoPDFAnnouncement
        pdfUrl="https://ejemplo.com/anuncio.png"
        delay={3000}          // Esperar 3 segundos antes de mostrar
        duration={5000}       // Mostrar por 5 segundos
        isImage={true}        // Es una imagen
        title="¡Oferta especial!"
        showOnlyOnce={true}   // Solo mostrar una vez por sesión
      />
    </div>
  );
};
```

## Props Disponibles

### PDFAnnouncement
- `pdfUrl` (string) - URL del PDF o imagen
- `duration` (number) - Duración en milisegundos (default: 5000)
- `onClose` (function) - Callback cuando se cierra
- `showCloseButton` (boolean) - Mostrar botón X (default: false)
- `isImage` (boolean) - Si es imagen o PDF (default: false)
- `title` (string) - Título del anuncio

### AutoPDFAnnouncement
- `pdfUrl` (string) - URL del PDF o imagen
- `delay` (number) - Tiempo antes de mostrar (default: 2000ms)
- `duration` (number) - Duración del anuncio (default: 5000ms)
- `isImage` (boolean) - Si es imagen o PDF (default: true)
- `title` (string) - Título del anuncio
- `showOnlyOnce` (boolean) - Solo una vez por sesión (default: true)

## Ejemplos de Uso en la Feria

### Anuncio de Bienvenida
```jsx
<AutoPDFAnnouncement
  pdfUrl="https://res.cloudinary.com/dbebikryr/image/upload/v1760499614/CartelPabellon_i1hcvc.png"
  delay={1000}
  duration={6000}
  isImage={true}
  title="¡Bienvenidos a la Feria de Pabellón de Arteaga!"
  showOnlyOnce={true}
/>
```

### Programación del Teatro
```jsx
<AutoPDFAnnouncement
  pdfUrl="/pdfs/programacion-teatro.pdf"
  delay={2000}
  duration={8000}
  isImage={false}
  title="Programación Teatro del Pueblo"
  showOnlyOnce={false}
/>
```

### Mapa del Recinto
```jsx
const MapaComponent = () => {
  const mapaHook = usePDFAnnouncement('/pdfs/mapa-feria.pdf', 10000);
  
  return (
    <button onClick={mapaHook.openPDF}>
      📍 Ver Mapa del Recinto
    </button>
  );
};
```

## Personalización CSS

El componente incluye clases CSS que puedes personalizar:

- `.pdf-announcement-overlay` - Overlay de fondo
- `.pdf-announcement-container` - Contenedor principal
- `.countdown-indicator` - Barra de progreso
- `.pdf-container` - Contenedor del PDF/imagen
- `.close-button` - Botón de cierre
- `.announcement-info` - Información del pie

## Consideraciones

1. **Performance**: Las imágenes se cargan más rápido que los PDFs
2. **Compatibilidad**: Los PDFs pueden no funcionar en todos los navegadores móviles
3. **Tamaño**: Optimiza las imágenes para web antes de usarlas
4. **UX**: No abuses de los anuncios automáticos para no molestar al usuario

## Instalación

Los archivos ya están incluidos en el proyecto:
- `src/components/PDFAnnouncement.jsx`
- `src/components/PDFAnnouncement.css`
- `src/components/AutoPDFAnnouncement.jsx`
- `src/hooks/usePDFAnnouncement.js`