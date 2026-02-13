# 📚 Books Parser

A modern web scraper for books.toscrape.com with a beautiful, responsive UI.

## ✨ Features

- 📖 Parse books from books.toscrape.com
- 📂 Dynamic category loading from the website
- 🎨 Modern blue gradient design with smooth animations
- ⭐ Display book ratings with star visualization
- 🖼️ Book cover images with hover effects
- 📱 Fully responsive design
- 💾 SQLite database storage
- 🔄 Smart pagination with automatic page detection
- ⚡ Fast and efficient parsing

## 🚀 Tech Stack

### Backend
- Node.js + Express
- Axios + Cheerio (web scraping)
- SQLite (sql.js)

### Frontend
- React + Vite
- Modern CSS with gradients and animations
- Responsive grid layout

## 📦 Installation

1. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

2. Start the application:
```bash
# Backend (from backend folder)
npm start

# Frontend (from frontend folder)
npm run dev
```

## 🎯 Usage

1. Categories are automatically loaded from books.toscrape.com
2. Select a book category (or choose "All Books")
3. Set the number of pages to parse (recommended: 1-5)
4. Click "Start Parsing"
5. Browse the parsed books in the main area

## 🌐 Data Source

This parser uses [books.toscrape.com](https://books.toscrape.com/) - a sandbox website specifically designed for web scraping practice.

## 📸 Features Showcase

- **Modern UI**: Blue gradient backgrounds, smooth transitions, and hover effects
- **Book Cards**: Display title, price, rating, availability, and cover image
- **Dynamic Categories**: Categories are parsed directly from the website
- **Smart Pagination**: Automatically stops when reaching the last page
- **Responsive**: Works perfectly on desktop, tablet, and mobile

## 🛠️ API Endpoints

- `GET /api/categories` - Get all available book categories
- `POST /api/parse` - Start parsing books
- `GET /api/books` - Get all books (paginated)
- `GET /api/books/search` - Search books with filters
- `GET /api/books/statistics` - Get collection statistics
- `DELETE /api/books/:id` - Delete a specific book
- `DELETE /api/books` - Clear all books

## 📝 Notes

- The parser respects rate limits with 500ms delays between requests
- Book data includes: title, price, rating, availability, image, and URL
- All prices are in GBP (£)
- Ratings are displayed as 1-5 stars
- Categories are dynamically loaded from the website
- **Smart pagination**: Parser automatically stops when reaching the last page
- **Error handling**: Gracefully handles 404 errors for non-existent pages
- Maximum pages per request: 50 (recommended: 1-5 for faster results)

## 🎨 Design Highlights

- Blue gradient theme (#1e3a8a → #3b82f6 → #60a5fa)
- Modern card-based layout with elevated shadows
- Smooth animations and micro-interactions
- Clean typography with Inter font family
- Rounded corners (16-20px) for modern look
- Gradient buttons and badges
- Hover effects with scale and shadow transitions

## 📚 Quick Start

See [QUICK-START.md](QUICK-START.md) for a quick start guide.

## 🔧 Troubleshooting

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.

## 📁 Project Structure

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

Enjoy exploring books! 📚✨
