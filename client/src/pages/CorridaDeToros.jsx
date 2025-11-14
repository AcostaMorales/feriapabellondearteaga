import React from 'react';
import './CorridaDeToros.css';

const CorridaDeToros = () => {
    return (
        <div className="corrida-container">
            <div className="corrida-imagen-container">
                <img 
                    src="https://res.cloudinary.com/dbebikryr/image/upload/v1762910396/Corrida_mixta_lpmapt.jpg"
                    alt="Corrida de Toros - Feria de Pabellón de Arteaga" 
                    className="corrida-imagen-completa"
                />
            </div>
        </div>
    );
};

export default CorridaDeToros;