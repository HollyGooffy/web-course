import React, { useState } from 'react';
import { startParsing, addTestData } from '../services/api';
import '../styles/ParserForm.css';

function ParserForm({ onComplete }) {
  const [formData, setFormData] = useState({
    searchQuery: 'Toyota',
    city: 'moskva',
    maxPages: 1,
    source: 'api'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const data = await startParsing(
        formData.searchQuery,
        formData.city,
        parseInt(formData.maxPages),
        formData.source
      );
      setResult(data);
      onComplete();
    } catch (error) {
      setResult({ 
        success: false, 
        error: error.response?.data?.error || error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestData = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await addTestData();
      setResult({ success: true, message: data.message });
      onComplete();
    } catch (error) {
      setResult({ 
        success: false, 
        error: error.response?.data?.error || error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parser-form">
      <h2>Запустить парсинг</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Источник данных:</label>
          <select
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          >
            <option value="api">🌐 Публичное API (работает всегда)</option>
            <option value="autoru">🚗 Auto.ru (может не работать)</option>
          </select>
          <small>💡 Рекомендуется использовать API для стабильной работы</small>
        </div>

        <div className="form-group">
          <label>Поисковый запрос (марка автомобиля):</label>
          <input
            type="text"
            value={formData.searchQuery}
            onChange={(e) => setFormData({ ...formData, searchQuery: e.target.value })}
            placeholder="Например: Toyota, Honda, BMW"
            required
          />
        </div>

        <div className="form-group">
          <label>Город:</label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          >
            <option value="moskva">Москва</option>
            <option value="sankt-peterburg">Санкт-Петербург</option>
            <option value="ekaterinburg">Екатеринбург</option>
            <option value="novosibirsk">Новосибирск</option>
            <option value="kazan">Казань</option>
          </select>
          <small>📍 Используется для генерации данных</small>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? '⏳ Парсинг...' : '🚀 Начать парсинг'}
        </button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <button 
          onClick={handleAddTestData} 
          disabled={loading}
          className="btn-secondary"
        >
          {loading ? '⏳ Загрузка...' : '🧪 Добавить тестовые данные'}
        </button>
      </div>

      {result && (
        <div className={`result ${result.success ? 'success' : 'error'}`}>
          {result.success ? (
            <>
              <h3>✅ {result.message || 'Успешно!'}</h3>
              {result.result && (
                <>
                  <p>Найдено: {result.result.total}</p>
                  <p>Сохранено новых: {result.result.saved}</p>
                  <p>Пропущено дубликатов: {result.result.skipped}</p>
                </>
              )}
            </>
          ) : (
            <>
              <h3>❌ Ошибка</h3>
              <p>{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ParserForm;
