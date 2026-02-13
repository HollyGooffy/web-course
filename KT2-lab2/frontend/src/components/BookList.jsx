import React from 'react';
import BookCard from './BookCard';
import { deleteAllBooks } from '../services/api';
import '../styles/BookList.css';

function BookList({ books, loading, onUpdate }) {
  const handleClearAll = async () => {
    if (window.confirm('Delete all books from the database?')) {
      try {
        await deleteAllBooks();
        onUpdate();
      } catch (error) {
        alert('Error deleting books');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-books">
          <div className="loading-book">📕</div>
          <div className="loading-book">📗</div>
          <div className="loading-book">📘</div>
          <div className="loading-book">📙</div>
        </div>
        <h3 className="loading-title">Loading Books...</h3>
        <p className="loading-text">Please wait while we fetch your collection</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">
          <div className="book-stack">
            <div className="book book-1">📕</div>
            <div className="book book-2">📗</div>
            <div className="book book-3">📘</div>
          </div>
          <div className="sparkles">
            <span className="sparkle sparkle-1">✨</span>
            <span className="sparkle sparkle-2">✨</span>
            <span className="sparkle sparkle-3">✨</span>
          </div>
        </div>
        <h3 className="empty-title">No Books Yet</h3>
        <p className="empty-description">
          Your library is empty. Start parsing to discover amazing books from books.toscrape.com!
        </p>
        <div className="empty-features">
          <div className="feature-item">
            <span className="feature-icon">📂</span>
            <span className="feature-text">Choose a category</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Click "Start Parsing"</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📚</span>
            <span className="feature-text">Explore your collection</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2 className="book-list-title">
          Books Collection
          <span className="book-count">{books.length}</span>
        </h2>
        <button onClick={handleClearAll} className="clear-all-btn">
          🗑️ Clear All
        </button>
      </div>
      
      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={onUpdate} />
        ))}
      </div>
    </div>
  );
}

export default BookList;
