# Configuración de Imágenes para la Página Home

## Imágenes Requeridas

### 1. Imagen Promocional Principal
- **Archivo**: `promocional-principal.jpg`
- **Ubicación**: `/public/images/promocional-principal.jpg`
- **Tamaño recomendado**: 414px × 250px (o proporción 1.66:1)
- **Formato**: JPG, PNG o WebP
- **Descripción**: Imagen principal que aparece en la parte superior de la página Home

### 2. Imágenes del Carrusel de Eventos
- **Archivos**: 
  - `evento1.jpg`
  - `evento2.jpg` 
  - `evento3.jpg`
  - `evento4.jpg`
  - (Puedes agregar más cambiando el array en Home.jsx)
- **Ubicación**: `/public/images/`
- **Tamaño recomendado**: 414px × 200px (o proporción 2.07:1)
- **Formato**: JPG, PNG o WebP
- **Descripción**: Imágenes que se mostrarán en el carrusel rotativo

### 3. Imágenes del Grid de Navegación
- **Archivos**:
  - `nav-informacion.jpg` - Botón de Información
  - `nav-eventos.jpg` - Botón de Eventos  
  - `nav-ubicacion.jpg` - Botón de Ubicación
  - `nav-contacto.jpg` - Botón de Contacto
  - `nav-gastronomia.jpg` - Botón de Gastronomía
  - `nav-artesanias.jpg` - Botón de Artesanías
- **Ubicación**: `/public/images/`
- **Tamaño recomendado**: 200px × 120px (o proporción 1.67:1)
- **Formato**: JPG, PNG o WebP
- **Descripción**: Imágenes pequeñas para los botones de navegación rápida

## Cómo Personalizar los Elementos

### Editar el array de eventos en `Home.jsx`:

```jsx
const eventos = [
    {
        id: 1,
        imagen: '/images/evento1.jpg',
        titulo: 'Tu Título del Evento',
        link: 'https://tu-enlace.com' // o '/ruta-interna'
    },
    // Agregar más eventos...
];
```

### Editar el array de navegación en `Home.jsx`:

```jsx
const navigationButtons = [
    {
        id: 1,
        titulo: 'Información',
        imagen: '/images/nav-informacion.jpg',
        link: '/informacion',
        descripcion: 'Detalles de la feria'
    },
    // Agregar más botones...
];
```

### Campos disponibles para navegación:
- **id**: Identificador único (número)
- **titulo**: Título del botón (string)
- **imagen**: Ruta a la imagen del botón (string)
- **link**: Enlace al que redirigirá al hacer clic (string)
- **descripcion**: Descripción corta que aparece debajo del título (string)

## Características del Grid de Navegación

✅ **Grid Responsive**: 2 columnas en móvil, 3 en pantallas más anchas
✅ **Imágenes con overlay**: Título y descripción superpuestos
✅ **Hover effects**: Zoom de imagen y elevación de tarjeta
✅ **Clickeable**: Cada tarjeta lleva a su enlace correspondiente
✅ **Carga progresiva**: Animación de placeholder mientras cargan las imágenes
✅ **Accesible**: Estados de focus y hover bien definidos

## Características del Carrusel

✅ **Auto-scroll**: Las imágenes cambian automáticamente cada 4 segundos
✅ **Indicadores**: Puntos en la parte inferior para navegación manual
✅ **Sin botones**: El carrusel es limpio, sin flechas de navegación
✅ **Clickeable**: Cada imagen lleva a su enlace correspondiente
✅ **Responsive**: Se adapta a diferentes tamaños de pantalla
✅ **Smooth transitions**: Transiciones suaves entre imágenes

## Notas Técnicas

- Las imágenes se cargan desde la carpeta `public/images/`
- Los componentes manejan automáticamente los estados de carga
- Las imágenes que no se encuentren mostrarán un placeholder con animación
- El carrusel y el grid son touch-friendly para dispositivos móviles
- El grid de navegación se adapta automáticamente al número de elementos

## Agregar Más Elementos

### Para eventos:
1. Coloca la nueva imagen en `/public/images/`
2. Agrega un nuevo objeto al array `eventos` en `Home.jsx`
3. El carrusel se actualizará automáticamente

### Para navegación:
1. Coloca la nueva imagen en `/public/images/` con prefijo `nav-`
2. Agrega un nuevo objeto al array `navigationButtons` en `Home.jsx`
3. El grid se reorganizará automáticamente