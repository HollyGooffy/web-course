import express from 'express';
import { pool } from '../config/database-simple.js';

const router = express.Router();

// Добавить тестовые данные (GET для удобства)
router.get('/test/seed', async (req, res) => {
  try {
    const testCars = [
      {
        title: 'Toyota Camry, 2020',
        price: 2500000,
        city: 'Москва',
        description: 'Отличное состояние, один владелец, полная комплектация',
        image_url: 'https://via.placeholder.com/300x200?text=Toyota+Camry',
        listing_url: 'https://www.avito.ru/test1'
      },
      {
        title: 'Honda Accord, 2019',
        price: 2200000,
        city: 'Санкт-Петербург',
        description: 'Пробег 45000 км, не битая, не крашеная',
        image_url: 'https://via.placeholder.com/300x200?text=Honda+Accord',
        listing_url: 'https://www.avito.ru/test2'
      },
      {
        title: 'Mazda 6, 2021',
        price: 2800000,
        city: 'Казань',
        description: 'Новая, на гарантии, полный привод',
        image_url: 'https://via.placeholder.com/300x200?text=Mazda+6',
        listing_url: 'https://www.avito.ru/test3'
      },
      {
        title: 'Volkswagen Passat, 2018',
        price: 1900000,
        city: 'Екатеринбург',
        description: 'Дизель, экономичный, в отличном состоянии',
        image_url: 'https://via.placeholder.com/300x200?text=VW+Passat',
        listing_url: 'https://www.avito.ru/test4'
      },
      {
        title: 'Hyundai Sonata, 2020',
        price: 2100000,
        city: 'Новосибирск',
        description: 'Максимальная комплектация, кожаный салон',
        image_url: 'https://via.placeholder.com/300x200?text=Hyundai+Sonata',
        listing_url: 'https://www.avito.ru/test5'
      }
    ];

    for (const car of testCars) {
      await pool.query(
        `INSERT INTO cars (title, price, city, description, image_url, listing_url, published_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [car.title, car.price, car.city, car.description, car.image_url, car.listing_url, new Date().toISOString()]
      );
    }

    res.json({ success: true, message: `Added ${testCars.length} test cars` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Добавить тестовые данные (POST)
router.post('/test/seed', async (req, res) => {
  try {
    const testCars = [
      {
        title: 'Toyota Camry, 2020',
        price: 2500000,
        city: 'Москва',
        description: 'Отличное состояние, один владелец, полная комплектация',
        image_url: 'https://via.placeholder.com/300x200?text=Toyota+Camry',
        listing_url: 'https://www.avito.ru/test1'
      },
      {
        title: 'Honda Accord, 2019',
        price: 2200000,
        city: 'Санкт-Петербург',
        description: 'Пробег 45000 км, не битая, не крашеная',
        image_url: 'https://via.placeholder.com/300x200?text=Honda+Accord',
        listing_url: 'https://www.avito.ru/test2'
      },
      {
        title: 'Mazda 6, 2021',
        price: 2800000,
        city: 'Казань',
        description: 'Новая, на гарантии, полный привод',
        image_url: 'https://via.placeholder.com/300x200?text=Mazda+6',
        listing_url: 'https://www.avito.ru/test3'
      },
      {
        title: 'Volkswagen Passat, 2018',
        price: 1900000,
        city: 'Екатеринбург',
        description: 'Дизель, экономичный, в отличном состоянии',
        image_url: 'https://via.placeholder.com/300x200?text=VW+Passat',
        listing_url: 'https://www.avito.ru/test4'
      },
      {
        title: 'Hyundai Sonata, 2020',
        price: 2100000,
        city: 'Новосибирск',
        description: 'Максимальная комплектация, кожаный салон',
        image_url: 'https://via.placeholder.com/300x200?text=Hyundai+Sonata',
        listing_url: 'https://www.avito.ru/test5'
      }
    ];

    for (const car of testCars) {
      await pool.query(
        `INSERT INTO cars (title, price, city, description, image_url, listing_url, published_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [car.title, car.price, car.city, car.description, car.image_url, car.listing_url, new Date().toISOString()]
      );
    }

    res.json({ success: true, message: `Added ${testCars.length} test cars` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
