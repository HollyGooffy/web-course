import React from 'react';
import CarCard from './CarCard';
import '../styles/CarList.css';

function CarList({ cars, loading, onUpdate }) {
  if (loading) {
    return <div className="loading">⏳ Загрузка...</div>;
  }

  if (cars.length === 0) {
    return (
      <div className="empty-state">
        <h3>📭 Нет данных</h3>
        <p>Запустите парсинг, чтобы получить объявления</p>
      </div>
    );
  }

  return (
    <div className="car-list">
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} onDelete={onUpdate} />
        ))}
      </div>
    </div>
  );
}

export default CarList;
