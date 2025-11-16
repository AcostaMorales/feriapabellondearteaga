import React from "react";
import "./InfiniteCarousel.css";

export default function InfiniteCarousel({ sponsors = [] }) {
  // Si no hay sponsors, usar datos por defecto
  const defaultSponsors = [
    {
      id: 1,
      name: 'Ferretornillos',
      logo: 'https://res.cloudinary.com/dbebikryr/image/upload/v1763317320/Ferretornillos_y9hjpa.jpg',
      url: ''
    },
    
  ];

  const sponsorData = sponsors.length > 0 ? sponsors : defaultSponsors;
  
  // Triplicamos para un loop más suave y continuo
  const loopItems = [...sponsorData, ...sponsorData, ...sponsorData];

  const handleSponsorClick = (url, event) => {
    event.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {loopItems.map((sponsor, index) => (
          <a
            key={`${sponsor.id}-${index}`}
            href={sponsor.url}
            onClick={(e) => handleSponsorClick(sponsor.url, e)}
            className="carousel-item"
            title={sponsor.name}
          >
            <img 
              src={sponsor.logo} 
              alt={sponsor.name}
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
