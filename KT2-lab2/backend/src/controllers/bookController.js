import { pool } from '../config/database-simple.js';
import parserService from '../services/parserService.js';

export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'created_at', order = 'DESC' } = req.query;
    const offset = (page - 1) * limit;
    
    const [books] = await pool.query(
      `SELECT * FROM cars ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );
    
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM cars');
    const total = countResult[0].total;
    
    res.json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { query, minPrice, maxPrice } = req.query;
    
    let sql = 'SELECT * FROM cars WHERE 1=1';
    const params = [];
    
    if (query) {
      sql += ' AND title LIKE ?';
      params.push(`%${query}%`);
    }
    
    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }
    
    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }
    
    sql += ' ORDER BY created_at DESC';
    
    const [books] = await pool.query(sql, params);
    
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await parserService.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const startParsing = async (req, res) => {
  try {
    console.log('📥 Received parsing request:', req.body);
    const { category = '', maxPages = 1 } = req.body;
    
    console.log(`📋 Parsing params: category="${category}", maxPages=${maxPages}`);
    
    // Валидация
    if (maxPages < 1 || maxPages > 50) {
      return res.status(400).json({ 
        success: false, 
        error: 'maxPages must be between 1 and 50' 
      });
    }
    
    // Очищаем базу перед новым парсингом
    console.log('🗑️ Clearing database before parsing...');
    await pool.query('DELETE FROM cars');
    
    // Парсим книги
    console.log('📚 Parsing books from books.toscrape.com');
    const books = await parserService.parseBooks(category, maxPages);
    
    if (books.length === 0) {
      console.log('⚠️ No books found');
      return res.json({
        success: true,
        message: 'No books found for this category',
        result: { saved: 0, skipped: 0, total: 0 }
      });
    }
    
    console.log(`✅ Parsed ${books.length} books, saving to DB...`);
    
    // Сохраняем в БД
    const result = await parserService.saveToDB(books);
    
    console.log('✅ Parsing completed successfully');
    
    res.json({
      success: true,
      message: 'Parsing completed',
      result
    });
  } catch (error) {
    console.error('❌ Parsing error:', error);
    console.error('Stack trace:', error.stack);
    
    // Более понятные сообщения об ошибках
    let errorMessage = error.message;
    
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Cannot connect to books.toscrape.com. Please check your internet connection.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Request timeout. The website is not responding.';
    } else if (error.response && error.response.status === 404) {
      errorMessage = 'Category or page not found on the website.';
    }
    
    res.status(500).json({ success: false, error: errorMessage });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total_books,
        AVG(price) as avg_price,
        MIN(price) as min_price,
        MAX(price) as max_price
      FROM cars
      WHERE price IS NOT NULL
    `);
    
    res.json({ success: true, data: stats[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cars WHERE id = ?', [id]);
    res.json({ success: true, message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAllBooks = async (req, res) => {
  try {
    await pool.query('DELETE FROM cars');
    res.json({ success: true, message: 'All books deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
