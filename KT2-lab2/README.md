# 📚 Парсер книг (Books Parser)

Современный веб-скрапер для books.toscrape.com с красивым адаптивным интерфейсом.

## ✨ Возможности

- 📖 Парсинг книг с books.toscrape.com
- 📂 Динамическая загрузка категорий с сайта
- 💾 Хранение данных в SQLite


## 🚀 Технологии

### Backend
- Node.js + Express
- Axios + Cheerio (веб-скрапинг)
- SQLite (sql.js)

### Frontend
- React + Vite
- Современный CSS с градиентами и анимациями
- Адаптивная сеточная разметка

## 📦 Установка

1. Установите зависимости:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

2. Запустите приложение:
```bash
# Backend (из папки backend)
npm start

# Frontend (из папки frontend)
npm run dev
```

## 🎯 Использование

1. Категории автоматически загружаются с books.toscrape.com
2. Выберите категорию книг (или "All Books" для всех)
3. Укажите количество страниц для парсинга (рекомендуется: 1-5)
4. Нажмите "Start Parsing"
5. Просматривайте спарсенные книги в основной области

## 🌐 Источник данных

Парсер использует [books.toscrape.com](https://books.toscrape.com/) - тестовый сайт, специально созданный для практики веб-скрапинга.


## 🛠️ API Endpoints

- `GET /api/categories` - Получить все доступные категории книг
- `POST /api/parse` - Начать парсинг книг
- `GET /api/books` - Получить все книги (с пагинацией)
- `GET /api/books/search` - Поиск книг с фильтрами
- `GET /api/books/statistics` - Получить статистику коллекции
- `DELETE /api/books/:id` - Удалить конкретную книгу
- `DELETE /api/books` - Очистить все книги

## 📝 Примечания

- Парсер соблюдает ограничения с задержкой 500мс между запросами
- Данные книги включают: название, цену, рейтинг, наличие, изображение и URL
- Все цены указаны в фунтах стерлингов (£)
- Рейтинги отображаются от 1 до 5 звезд
- Категории динамически загружаются с сайта
- **Умная пагинация**: Парсер автоматически останавливается при достижении последней страницы
- **Обработка ошибок**: Корректно обрабатывает 404 ошибки для несуществующих страниц
- Максимум страниц за запрос: 50 (рекомендуется: 1-5 для быстрых результатов)


## 📁 Структура проекта

```
books-parser/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database-simple.js
│   │   ├── controllers/
│   │   │   └── bookController.js
│   │   ├── routes/
│   │   │   └── bookRoutes.js
│   │   ├── services/
│   │   │   └── parserService.js
│   │   └── server.js
│   ├── package.json
│   └── books_parser.db
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookList.jsx
│   │   │   └── ParserForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── BookCard.css
│   │   │   ├── BookList.css
│   │   │   └── ParserForm.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```
