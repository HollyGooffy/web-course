import React, { useState, useEffect } from 'react';
import { startParsing, getCategories } from '../services/api';
import '../styles/ParserForm.css';

function ParserForm({ onComplete }) {
  const [formData, setFormData] = useState({
    category: '',
    maxPages: 2
  });
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategories();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const data = await startParsing(
        formData.category,
        parseInt(formData.maxPages)
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

  return (
    <div className="parser-form">
      <div className="form-header">
        <h2>📚 Parse Books</h2>
        <p className="form-subtitle">Scrape books from books.toscrape.com</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          {loadingCategories ? (
            <div className="loading-categories">
              <span className="spinner-small"></span>
              Loading categories...
            </div>
          ) : (
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-select"
              disabled={loading}
            >
              <option value="">📚 All Books</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-group">
          <label>Number of pages to parse:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={formData.maxPages}
            onChange={(e) => setFormData({ ...formData, maxPages: e.target.value })}
            className="form-input"
            disabled={loading}
          />
          <small>💡 Each page contains ~20 books. Parser will stop automatically if there are no more pages.</small>
        </div>

        <button type="submit" disabled={loading || loadingCategories} className="btn-primary">
          {loading ? (
            <>
              <span className="spinner"></span>
              Parsing...
            </>
          ) : (
            <>
              🚀 Start Parsing
            </>
          )}
        </button>
      </form>

      {result && (
        <div className={`result ${result.success ? 'success' : 'error'}`}>
          {result.success ? (
            <>
              <div className="result-icon">✅</div>
              <h3>{result.message || 'Success!'}</h3>
              {result.result && (
                <div className="result-stats">
                  <div className="stat">
                    <span className="stat-value">{result.result.total}</span>
                    <span className="stat-label">Found</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{result.result.saved}</span>
                    <span className="stat-label">Saved</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{result.result.skipped}</span>
                    <span className="stat-label">Skipped</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="result-icon">❌</div>
              <h3>Error</h3>
              <p>{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ParserForm;
