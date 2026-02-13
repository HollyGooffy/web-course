import React from 'react';
import { deleteBook } from '../services/api';
import '../styles/BookCard.css';

function BookCard({ book, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Delete this book?')) {
      try {
        await deleteBook(book.id);
        onDelete();
      } catch (error) {
        alert('Error deleting book');
      }
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return `£${price.toFixed(2)}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const ratingNum = typeof rating === 'string' ? parseInt(rating) : rating;
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < ratingNum ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="book-card">
      {book.image_url && (
        <div className="book-image">
          <img src={book.image_url} alt={book.title} />
          <div className="book-overlay">
            <a 
              href={book.listing_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-details"
            >
              View Details
            </a>
          </div>
        </div>
      )}
      
      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        
        <div className="book-rating">
          {renderStars(book.city)}
        </div>
        
        <div className="book-price">{formatPrice(book.price)}</div>
        
        <div className="book-availability">
          <span className={`availability-badge ${book.description === 'In stock' ? 'in-stock' : 'out-of-stock'}`}>
            {book.description === 'In stock' ? '✓ In Stock' : '✗ Out of Stock'}
          </span>
        </div>
        
        <div className="book-actions">
          <a 
            href={book.listing_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link"
          >
            📖 View Book
          </a>
          <button onClick={handleDelete} className="btn-delete">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
