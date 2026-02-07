import { pool } from '../config/database-simple.js';
import parserService from '../services/parserService.js';
import autoruParser from '../services/autoruParser.js';

export const getAllCars = async (req, res) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'created_at', order = 'DESC' } = req.query;
    const offset = (page - 1) * limit;
    
    const [cars] = await pool.query(
      `SELECT * FROM cars ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );
    
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM cars');
    const total = countResult[0].total;
    
    res.json({
      success: true,
      data: cars,
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

export const searchCars = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, city } = req.query;
    
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
    
    if (city) {
      sql += ' AND city LIKE ?';
      params.push(`%${city}%`);
    }
    
    sql += ' ORDER BY created_at DESC';
    
    const [cars] = await pool.query(sql, params);
    
    res.json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const startParsing = async (req, res) => {
  try {
    const { searchQuery, city = 'moskva', maxPages = 1, source = 'api' } = req.body;
    
    if (!searchQuery) {
      return res.status(400).json({ success: false, error: 'Search query is required' });
    }
    
    // Очищаем базу перед новым парсингом
    console.log('🗑️ Clearing database before parsing...');
    await pool.query('DELETE FROM cars');
    
    let cars = [];
    
    // Выбираем источник парсинга
    if (source === 'autoru') {
      console.log('📍 Using Auto.ru parser');
      cars = await autoruParser.parseAutoRu(searchQuery, city, maxPages);
    } else {
      console.log('📍 Using API parser (fallback)');
      cars = await autoruParser.parseViaAPI(searchQuery);
    }
    
    // Сохраняем в БД
    const result = await autoruParser.saveToDB(cars);
    
    res.json({
      success: true,
      message: 'Parsing completed',
      result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total_cars,
        AVG(price) as avg_price,
        MIN(price) as min_price,
        MAX(price) as max_price,
        COUNT(DISTINCT city) as cities_count
      FROM cars
      WHERE price IS NOT NULL
    `);
    
    res.json({ success: true, data: stats[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cars WHERE id = ?', [id]);
    res.json({ success: true, message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAllCars = async (req, res) => {
  try {
    await pool.query('TRUNCATE TABLE cars');
    res.json({ success: true, message: 'All cars deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
