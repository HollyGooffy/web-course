import React, { useState } from 'react';
import { searchCars } from '../services/api';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    query: '',
    minPrice: '',
    maxPrice: '',
    city: ''
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchCars(filters);
      onSearch(data.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleReset = async () => {
    setFilters({ query: '', minPrice: '', maxPrice: '', city: '' });
    try {
      const data = await searchCars({});
      onSearch(data.data);
    } catch (error) {
      console.error('Reset error:', error);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="🔍 Поиск по названию..."
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        />
        <input
          type="number"
          placeholder="Цена от"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Цена до"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <input
          type="text"
          placeholder="Город"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        <button type="submit" className="btn-search">Найти</button>
        <button type="button" onClick={handleReset} className="btn-reset">Сбросить</button>
      </form>
    </div>
  );
}

export default SearchBar;
