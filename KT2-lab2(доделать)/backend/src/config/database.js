import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Создание таблицы при запуске
const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2),
        year INT,
        mileage INT,
        engine_type VARCHAR(50),
        transmission VARCHAR(50),
        city VARCHAR(100),
        description TEXT,
        image_url VARCHAR(500),
        listing_url VARCHAR(500) UNIQUE,
        published_date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Database initialized successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

export { pool, initDatabase };
