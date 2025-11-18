import React from "react";
import "./InfiniteCarousel.css";

export default function InfiniteCarousel({ sponsors = [], images = [], items = [] }) {
  // Si no hay sponsors, usar datos por defecto
  const defaultSponsors = [
    {
      id: 1,
      name: 'Ferretornillos',
      logo: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763317320/Ferretornillos_y9hjpa.jpg',
      url: '',
      type: 'sponsor'
    },
    {
      id: 2,
      name: 'Muebleria Diamante',
      logo: '/anuncios/muebleriadiamante.gif',
      url: '',
      type: 'sponsor'
    },
  ];

  // Combinar todos los tipos de contenido
  const allItems = [];
  
  // Agregar sponsors
  if (sponsors.length > 0) {
    sponsors.forEach(sponsor => {
      allItems.push({
        ...sponsor,
        type: 'sponsor',
        src: sponsor.logo,
        alt: sponsor.name,
        title: sponsor.name
      });
    });
  }
  
  // Agregar imágenes/GIFs
  if (images.length > 0) {
    images.forEach((image, index) => {
      allItems.push({
        id: `image-${index}`,
        type: 'image',
        src: typeof image === 'string' ? image : image.src || image.url,
        alt: typeof image === 'object' ? image.alt || `Imagen ${index + 1}` : `Imagen ${index + 1}`,
        title: typeof image === 'object' ? image.title || image.alt : undefined,
        url: typeof image === 'object' ? image.url || image.link : undefined
      });
    });
  }
  
  // Agregar items genéricos
  if (items.length > 0) {
    items.forEach((item, index) => {
      allItems.push({
        id: item.id || `item-${index}`,
        type: item.type || 'item',
        src: item.src || item.image || item.logo,
        alt: item.alt || item.name || `Item ${index + 1}`,
        title: item.title || item.name,
        url: item.url || item.link
      });
    });
  }

  // Si no hay contenido, usar datos por defecto
  const contentData = allItems.length > 0 ? allItems : defaultSponsors.map(sponsor => ({
    ...sponsor,
    type: 'sponsor',
    src: sponsor.logo,
    alt: sponsor.name,
    title: sponsor.name
  }));
  
  // Triplicamos para un loop más suave y continuo
  const loopItems = [...contentData, ...contentData, ...contentData];

  const handleItemClick = (item, event) => {
    event.preventDefault();
    
    // Solo abrir enlace si tiene URL
    if (item.url && item.url.trim() !== '') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Función para detectar si es GIF
  const isGif = (src) => {
    return src && src.toLowerCase().includes('.gif');
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {loopItems.map((item, index) => (
          <a
            key={`${item.id}-${index}`}
            href={item.url || '#'}
            onClick={(e) => handleItemClick(item, e)}
            className={`carousel-item ${item.type}`}
            title={item.title}
            style={{ 
              cursor: item.url && item.url.trim() !== '' ? 'pointer' : 'default' 
            }}
          >
            <img 
              src={item.src} 
              alt={item.alt}
              className={`carousel-image ${isGif(item.src) ? 'gif-image' : 'static-image'}`}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
