import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationGrid.css';

const NavigationGrid = ({ 
    items = [],
    columns = 2,
    className = '',
    title = ''
}) => {
    const navigate = useNavigate();

    const handleItemClick = (route) => {
        if (route.startsWith('http')) {
            window.open(route, '_blank');
        } else {
            navigate(route);
        }
    };

    return (
        <div className={`navigation-grid-container ${className}`}>
            {title && <h2 className="navigation-title">{title}</h2>}
            <div 
                className="navigation-grid"
                style={{ 
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="navigation-item"
                        onClick={() => handleItemClick(item.route)}
                    >
                        <div className="navigation-image-container">
                            <img 
                                src={item.image} 
                                alt={item.title}
                                className="navigation-image"
                            />
                            
                        </div>
                        {/* 
                        <div className="navigation-content">
                            <h3 className="navigation-item-title">{item.title}</h3>
                            {item.subtitle && (
                                <p className="navigation-subtitle">{item.subtitle}</p>
                            )}
                            {item.description && (
                                <p className="navigation-description">{item.description}</p>
                            )}
                        </div>
                        {item.arrow !== false && (
                            <div className="navigation-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9,18 15,12 9,6"></polyline>
                                </svg>
                            </div>
                        )}*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationGrid;