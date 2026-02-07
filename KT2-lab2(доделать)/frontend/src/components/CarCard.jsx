import React from 'react';
import { deleteCar } from '../services/api';
import '../styles/CarCard.css';

function CarCard({ car, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Удалить это объявление?')) {
      try {
        await deleteCar(car.id);
        onDelete();
      } catch (error) {
        alert('Ошибка при удалении');
      }
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Цена не указана';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="car-card">
      {car.image_url && (
        <div className="car-image">
          <img src={car.image_url} alt={car.title} />
        </div>
      )}
      
      <div className="car-content">
        <h3 className="car-title">{car.title}</h3>
        
        <div className="car-price">{formatPrice(car.price)}</div>
        
        <div className="car-details">
          {car.city && (
            <div className="car-info">
              📍 {car.city}
            </div>
          )}
          
          {car.year && (
            <div className="car-info">
              📅 {car.year} год
            </div>
          )}
          
          {car.mileage && (
            <div className="car-info">
              🛣️ {car.mileage.toLocaleString('ru-RU')} км
            </div>
          )}
        </div>
        
        {car.description && (
          <p className="car-description">{car.description}</p>
        )}
        
        {car.listing_url && (
          <div className="car-link-box">
            <span className="link-label">🔗 Ссылка:</span>
            <a 
              href={car.listing_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="car-link-text"
            >
              {car.listing_url}
            </a>
          </div>
        )}
        
        <div className="car-meta">
          <small>Добавлено: {new Date(car.created_at).toLocaleDateString('ru-RU')}</small>
        </div>
        
        <div className="car-actions">
          <a 
            href={car.listing_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link"
          >
            Открыть объявление
          </a>
          <button onClick={handleDelete} className="btn-delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
