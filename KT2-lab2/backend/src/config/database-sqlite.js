import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, '../../avito_parser.db'));

// Создание таблицы
const initDatabase = () => {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL,
        year INTEGER,
        mileage INTEGER,
        engine_type TEXT,
        transmission TEXT,
        city TEXT,
        description TEXT,
        image_url TEXT,
        listing_url TEXT UNIQUE,
        published_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ SQLite Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

// Обертки для совместимости с MySQL API
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      if (sql.trim().toUpperCase().startsWith('SELECT')) {
        const stmt = db.prepare(sql);
        const rows = stmt.all(...params);
        resolve([rows]);
      } else if (sql.trim().toUpperCase().startsWith('INSERT')) {
        const stmt = db.prepare(sql);
        const info = stmt.run(...params);
        resolve([{ insertId: info.lastInsertRowid, affectedRows: info.changes }]);
      } else if (sql.trim().toUpperCase().startsWith('UPDATE') || 
                 sql.trim().toUpperCase().startsWith('DELETE') ||
                 sql.trim().toUpperCase().startsWith('TRUNCATE')) {
        if (sql.includes('TRUNCATE')) {
          db.exec('DELETE FROM cars');
          resolve([{ affectedRows: db.prepare('SELECT changes()').get()['changes()'] }]);
        } else {
          const stmt = db.prepare(sql);
          const info = stmt.run(...params);
          resolve([{ affectedRows: info.changes }]);
        }
      } else {
        db.exec(sql);
        resolve([{}]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const pool = {
  query
};

export { pool, initDatabase };
