import React from 'react';
import '../styles/Statistics.css';

function Statistics({ data }) {
  if (!data) {
    return <div className="loading">⏳ Загрузка статистики...</div>;
  }

  const formatPrice = (price) => {
    if (!price) return '0 ₽';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="statistics">
      <h2>📊 Статистика</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-value">{data.total_cars || 0}</div>
          <div className="stat-label">Всего объявлений</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">{formatPrice(data.avg_price)}</div>
          <div className="stat-label">Средняя цена</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📉</div>
          <div className="stat-value">{formatPrice(data.min_price)}</div>
          <div className="stat-label">Минимальная цена</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">{formatPrice(data.max_price)}</div>
          <div className="stat-label">Максимальная цена</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-value">{data.cities_count || 0}</div>
          <div className="stat-label">Городов</div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
