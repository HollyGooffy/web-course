import initSqlJs from 'sql.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../books_parser.db');

let db = null;

const initDatabase = async () => {
  try {
    const SQL = await initSqlJs();
    
    // Загружаем существующую БД или создаем новую
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      console.log('✅ Database loaded from file');
    } else {
      db = new SQL.Database();
      console.log('✅ New database created');
    }
    
    // Создаем таблицу
    db.run(`
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
    
    saveDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

const saveDatabase = () => {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
};

const query = async (sql, params = []) => {
  return new Promise((resolve, reject) => {
    try {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }

      if (sql.trim().toUpperCase().startsWith('SELECT')) {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        const rows = [];
        while (stmt.step()) {
          rows.push(stmt.getAsObject());
        }
        stmt.free();
        resolve([rows]);
      } else if (sql.includes('TRUNCATE')) {
        db.run('DELETE FROM cars');
        saveDatabase();
        resolve([{ affectedRows: 1 }]);
      } else {
        db.run(sql, params);
        saveDatabase();
        resolve([{ 
          insertId: db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || 0,
          affectedRows: 1 
        }]);
      }
    } catch (error) {
      // Игнорируем ошибки дубликатов
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        resolve([{ affectedRows: 0 }]);
      } else {
        reject(error);
      }
    }
  });
};

const pool = { query };

export { pool, initDatabase };
