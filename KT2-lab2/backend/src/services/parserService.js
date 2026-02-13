import axios from 'axios';
import * as cheerio from 'cheerio';
import { pool } from '../config/database-simple.js';

class ParserService {
  constructor() {
    this.baseUrl = 'https://books.toscrape.com';
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    };
  }

  async getCategories() {
    try {
      console.log('📂 Fetching categories from books.toscrape.com...');
      
      const response = await axios.get(`${this.baseUrl}/index.html`, { 
        headers: this.headers,
        timeout: 15000 
      });
      
      const $ = cheerio.load(response.data);
      const categories = [];
      
      // Парсим категории из сайдбара
      $('.side_categories ul li ul li a').each((index, element) => {
        const $link = $(element);
        const name = $link.text().trim();
        const href = $link.attr('href');
        
        if (name && href) {
          // Убираем "catalogue/category/books/" и "index.html" сразу
          const value = href
            .replace('catalogue/category/books/', '')
            .replace('index.html', '');
          
          categories.push({
            name: name,
            value: value
          });
        }
      });
      
      console.log(`✅ Found ${categories.length} categories`);
      return categories;
      
    } catch (error) {
      console.error('❌ Error fetching categories:', error.message);
      throw error;
    }
  }

  async parseBooks(category = '', maxPages = 1) {
    const results = [];
    
    try {
      for (let page = 1; page <= maxPages; page++) {
        let url;
        
        if (!category) {
          // Все книги
          url = page === 1 
            ? `${this.baseUrl}/index.html`
            : `${this.baseUrl}/catalogue/page-${page}.html`;
        } else {
          // Конкретная категория - category уже в формате "travel_2/"
          url = page === 1 
            ? `${this.baseUrl}/catalogue/category/books/${category}index.html`
            : `${this.baseUrl}/catalogue/category/books/${category}page-${page}.html`;
        }
        
        console.log(`📚 Parsing page ${page}: ${url}`);
        
        try {
          const response = await axios.get(url, { 
            headers: this.headers,
            timeout: 15000 
          });
          
          const $ = cheerio.load(response.data);
          
          // Парсим карточки книг
          const items = $('article.product_pod');
          
          // Если на странице нет книг - значит страниц больше нет
          if (items.length === 0) {
            console.log(`⚠️ No books found on page ${page}, stopping pagination`);
            break;
          }
          
          console.log(`✅ Found ${items.length} books`);
          
          items.each((index, element) => {
            try {
              const $item = $(element);
              
              // Название книги
              const title = $item.find('h3 a').attr('title') || $item.find('h3 a').text().trim();
              
              // Цена
              const priceText = $item.find('p.price_color').text().trim();
              const price = priceText ? parseFloat(priceText.replace('£', '')) : null;
              
              // Рейтинг
              const ratingClass = $item.find('p.star-rating').attr('class');
              const ratingMap = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5 };
              const ratingText = ratingClass ? ratingClass.replace('star-rating ', '') : '';
              const rating = ratingMap[ratingText] || 0;
              
              // URL книги
              const relativeUrl = $item.find('h3 a').attr('href');
              const bookUrl = relativeUrl ? `${this.baseUrl}/catalogue/${relativeUrl.replace('../', '')}` : null;
              
              // Изображение
              const imageRelativeUrl = $item.find('img').attr('src');
              const imageUrl = imageRelativeUrl ? `${this.baseUrl}/${imageRelativeUrl.replace('../', '')}` : null;
              
              // Наличие
              const availability = $item.find('p.instock.availability').text().trim();
              const inStock = availability.includes('In stock');
              
              if (title && bookUrl) {
                results.push({
                  title: title.substring(0, 255),
                  price,
                  rating,
                  availability: inStock ? 'In stock' : 'Out of stock',
                  image_url: imageUrl,
                  listing_url: bookUrl,
                  published_date: new Date().toISOString()
                });
              }
            } catch (err) {
              console.error('Error parsing book:', err.message);
            }
          });
          
          // Задержка между запросами
          await this.delay(500);
          
        } catch (pageError) {
          // Если страница не найдена (404) - это нормально, просто больше нет страниц
          if (pageError.response && pageError.response.status === 404) {
            console.log(`⚠️ Page ${page} not found (404), stopping pagination`);
            break;
          }
          // Другие ошибки пробрасываем дальше
          throw pageError;
        }
      }
      
      console.log(`✅ Parsed ${results.length} books total`);
      return results;
      
    } catch (error) {
      console.error('❌ Parsing error:', error.message);
      throw error;
    }
  }

  async saveToDB(books) {
    let saved = 0;
    let skipped = 0;
    
    for (const book of books) {
      try {
        await pool.query(
          `INSERT INTO cars (title, price, city, description, image_url, listing_url, published_date) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [book.title, book.price, book.rating + ' stars', book.availability, book.image_url, book.listing_url, book.published_date]
        );
        saved++;
      } catch (error) {
        console.error('Error saving to DB:', error.message);
        skipped++;
      }
    }
    
    return { saved, skipped, total: books.length };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ParserService();
