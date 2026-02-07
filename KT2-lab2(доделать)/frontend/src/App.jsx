import React, { useState, useEffect } from 'react';
import ParserForm from './components/ParserForm';
import CarList from './components/CarList';
import Statistics from './components/Statistics';
import SearchBar from './components/SearchBar';
import { getCars, getStatistics } from './services/api';
import './styles/App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('parser');

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data.data);
      return data.data.length; // Возвращаем реальное количество
    } catch (error) {
      console.error('Error loading cars:', error);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await getStatistics();
      setStatistics(data.data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  useEffect(() => {
    loadCars();
    loadStatistics();
  }, []);

  const handleParsingComplete = async () => {
    await loadCars();
    await loadStatistics();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>🚗 Avito Parser</h1>
          <p>Парсинг автомобилей с Avito.ru</p>
        </div>
      </header>

      <div className="container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'parser' ? 'active' : ''}`}
            onClick={() => setActiveTab('parser')}
          >
            Парсинг
          </button>
          <button 
            className={`tab ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Результаты ({cars.length})
          </button>
          <button 
            className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Статистика
          </button>
        </div>

        <div className="content">
          {activeTab === 'parser' && (
            <ParserForm onComplete={handleParsingComplete} />
          )}

          {activeTab === 'results' && (
            <>
              <SearchBar onSearch={setCars} />
              <CarList cars={cars} loading={loading} onUpdate={loadCars} />
            </>
          )}

          {activeTab === 'statistics' && (
            <Statistics data={statistics} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
