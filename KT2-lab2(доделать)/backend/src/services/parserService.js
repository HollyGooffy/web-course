import axios from 'axios';
import * as cheerio from 'cheerio';
import { pool } from '../config/database-simple.js';

class ParserService {
  constructor() {
    this.baseUrl = 'https://www.avito.ru';
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    };
  }

  async parseAvito(searchQuery, city = 'rossiya', maxPages = 1) {
    const results = [];
    
    try {
      for (let page = 1; page <= maxPages; page++) {
        const url = `${this.baseUrl}/${city}/avtomobili?q=${encodeURIComponent(searchQuery)}&p=${page}`;
        console.log(`🔍 Parsing page ${page}: ${url}`);
        
        const response = await axios.get(url, { 
          headers: this.headers,
          timeout: 15000 
        });
        
        const $ = cheerio.load(response.data);
        
        // Пробуем разные селекторы для карточек
        const selectors = [
          '[data-marker="item"]',
          '[class*="iva-item"]',
          '[data-marker="catalog-serp"] > div',
          'div[itemtype="http://schema.org/Product"]'
        ];
        
        let itemsFound = false;
        
        for (const selector of selectors) {
          const items = $(selector);
          if (items.length > 0) {
            console.log(`✅ Found ${items.length} items with selector: ${selector}`);
            itemsFound = true;
            
            items.each((index, element) => {
              try {
                const $item = $(element);
                
                // Пробуем разные способы получения данных
                let title = $item.find('[itemprop="name"]').text().trim() ||
                           $item.find('[data-marker="item-title"]').text().trim() ||
                           $item.find('h3').first().text().trim() ||
                           $item.find('a').first().attr('title') || '';
                
                // Цена
                let priceText = $item.find('[itemprop="price"]').attr('content') || 
                               $item.find('[data-marker="item-price"]').text().trim() ||
                               $item.find('[class*="price"]').first().text().trim();
                const price = priceText ? parseFloat(priceText.replace(/[^\d]/g, '')) : null;
                
                // URL
                let relativeUrl = $item.find('[itemprop="url"]').attr('href') || 
                                 $item.find('a[data-marker="item-title"]').attr('href') ||
                                 $item.find('a').first().attr('href');
                
                const listingUrl = relativeUrl ? 
                  (relativeUrl.startsWith('http') ? relativeUrl : `${this.baseUrl}${relativeUrl}`) : null;
                
                // Изображение
                const imageUrl = $item.find('img[itemprop="image"]').attr('src') || 
                                $item.find('img').first().attr('src') ||
                                $item.find('img').first().attr('data-src');
                
                // Описание
                const description = $item.find('[class*="description"]').text().trim() ||
                                   $item.find('p').first().text().trim();
                
                // Город
                const cityText = $item.find('[class*="geo"]').text().trim() ||
                                $item.find('[class*="location"]').text().trim();
                
                if (title && listingUrl) {
                  results.push({
                    title: title.substring(0, 255),
                    price,
                    city: cityText || city,
                    description: description.substring(0, 500),
                    image_url: imageUrl,
                    listing_url: listingUrl,
                    published_date: new Date().toISOString()
                  });
                }
              } catch (err) {
                console.error('Error parsing item:', err.message);
              }
            });
            
            break; // Нашли рабочий селектор, выходим
          }
        }
        
        if (!itemsFound) {
          console.log('⚠️ No items found with any selector. Saving HTML for debug...');
          // Сохраняем HTML для отладки
          const fs = await import('fs');
          fs.writeFileSync('debug_page.html', response.data);
          console.log('💾 HTML saved to debug_page.html');
        }
        
        // Задержка между запросами
        await this.delay(2000 + Math.random() * 2000);
      }
      
      console.log(`✅ Parsed ${results.length} items`);
      return results;
      
    } catch (error) {
      console.error('❌ Parsing error:', error.message);
      throw error;
    }
  }

  async saveToDB(cars) {
    let saved = 0;
    let skipped = 0;
    
    for (const car of cars) {
      try {
        await pool.query(
          `INSERT INTO cars (title, price, city, description, image_url, listing_url, published_date) 
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE 
           price = VALUES(price),
           updated_at = CURRENT_TIMESTAMP`,
          [car.title, car.price, car.city, car.description, car.image_url, car.listing_url, car.published_date]
        );
        saved++;
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          skipped++;
        } else {
          console.error('Error saving to DB:', error.message);
        }
      }
    }
    
    return { saved, skipped, total: cars.length };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ParserService();
