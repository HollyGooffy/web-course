import React, { useState, useEffect } from 'react';
import ParserForm from './components/ParserForm';
import BookList from './components/BookList';
import { getBooks } from './services/api';
import './styles/App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks();
      setBooks(data.data);
    } catch (error) {
      console.error('Error loading books:', error);
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleParsingComplete = async () => {
    await loadBooks();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📚 Books Parser</h1>
        <p className="app-subtitle">Scrape and explore books from books.toscrape.com</p>
      </header>

      <div className="container">
        <div className="content-wrapper">
          <aside className="sidebar">
            <ParserForm onComplete={handleParsingComplete} />
          </aside>

          <main className="main-content">
            {error ? (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3 className="error-title">Oops! Something went wrong</h3>
                <p className="error-description">{error}</p>
                <button onClick={loadBooks} className="retry-btn">
                  🔄 Try Again
                </button>
              </div>
            ) : (
              <BookList books={books} loading={loading} onUpdate={loadBooks} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
