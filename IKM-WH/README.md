# 🎵 Festival Management System

Полнофункциональная система управления музыкальными фестивалями с современным веб-интерфейсом и мощным API.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Содержание

- [Обзор проекта](#обзор-проекта)
- [Возможности](#возможности)
- [Технологии](#технологии)
- [Быстрый старт](#быстрый-старт)
- [Архитектура](#архитектура)
- [API документация](#api-документация)
- [Развертывание](#развертывание)
- [Разработка](#разработка)
- [Тестирование](#тестирование)
- [Вклад в проект](#вклад-в-проект)

## 🎯 Обзор проекта

Festival Management System - это комплексное решение для организации и управления музыкальными фестивалями. Система включает в себя административную панель для организаторов и публичную часть для посетителей.

### Основные компоненты:
- **Backend API** (Node.js + Express + MongoDB) - серверная часть с REST API
- **Frontend SPA** (React + TypeScript) - клиентская часть с современным интерфейсом
- **Admin Panel** - панель администратора для управления контентом
- **Public Website** - публичный сайт фестиваля

## ✨ Возможности

### 🔐 Административная панель
- **Управление заявками** - обработка заявок на участие в фестивале
- **Управление группами** - добавление и редактирование информации о музыкальных группах
- **Планирование мероприятий** - создание расписания событий фестиваля
- **Управление фестивалями** - настройка основной информации о фестивалях
- **Мерчендайз** - каталог товаров с управлением ценами и остатками
- **Коллекционные карточки** - система продажи карточек участников
- **Афиши и постеры** - управление визуальными материалами
- **Контент-менеджмент** - редактирование текстового контента сайта
- **Статистика и аналитика** - отчеты и метрики системы

### 🌐 Публичная часть
- **Информация о фестивале** - расписание, участники, место проведения
- **Подача заявок** - форма для подачи заявок на участие
- **Каталог групп** - информация о музыкальных коллективах
- **Мерчендайз** - просмотр и покупка товаров
- **Коллекционные карточки** - просмотр и покупка карточек
- **Галерея** - афиши и фотоматериалы

## 🛠 Технологии

### Backend
- **Node.js 18+** - серверная платформа
- **Express.js** - веб-фреймворк
- **TypeScript** - типизированный JavaScript
- **MongoDB** - NoSQL база данных
- **Mongoose** - ODM для MongoDB
- **JWT** - аутентификация
- **bcrypt** - хеширование паролей
- **Multer + Sharp** - загрузка и обработка изображений
- **express-validator** - валидация данных

### Frontend
- **React 19** - UI библиотека
- **TypeScript** - типизация
- **Vite** - сборщик и dev-сервер
- **React Router** - маршрутизация
- **React Hook Form** - работа с формами
- **Zod** - валидация схем
- **Axios** - HTTP клиент
- **React Query** - управление состоянием сервера
- **Framer Motion** - анимации

### Инфраструктура
- **Docker** - контейнеризация (готовность)
- **CORS** - кросс-доменные запросы
- **Helmet** - безопасность
- **Rate Limiting** - ограничение запросов

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ ([скачать](https://nodejs.org/))
- MongoDB 5.0+ ([установка](https://docs.mongodb.com/manual/installation/))
- pnpm ([установка](https://pnpm.io/installation))

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd festival-management-system
```

### 2. Настройка Backend

```bash
cd backend-node.js

# Установка зависимостей
npm install

# Создание файла окружения
cp .env.example .env

# Редактирование переменных окружения
nano .env
```

**Пример .env файла:**
```env
NODE_ENV=development
PORT=3001
MONGO_URI=mongodb://localhost:27017/festival-app
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

```bash
# Запуск MongoDB (если не запущена)
# macOS с Homebrew:
brew services start mongodb-community

# Ubuntu/Debian:
sudo systemctl start mongod

# Или через Docker:
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Запуск сервера разработки
npm run dev
```

### 3. Настройка Frontend

```bash
cd ../frontend-react.js

# Установка зависимостей
pnpm install

# Создание файла окружения
cp .env.example .env

# Редактирование переменных окружения
nano .env
```

**Пример .env файла:**
```env
VITE_API_URL=http://localhost:3001/api
```

```bash
# Запуск сервера разработки
pnpm run dev
```

### 4. Создание первого администратора

```bash
# В директории backend-node.js
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@festival.com",
    "password": "admin123",
    "name": "Festival Admin"
  }'
```

### 5. Доступ к приложению

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Admin Panel:** http://localhost:5173/admin-login
- **Health Check:** http://localhost:3001/health

## 🏗 Архитектура

### Backend архитектура (MVC + Services)

```
backend-node.js/
├── src/
│   ├── config/          # Конфигурация (БД, API)
│   ├── controllers/     # Контроллеры (HTTP обработчики)
│   ├── middleware/      # Middleware (auth, validation, errors)
│   ├── models/          # Модели данных (Mongoose)
│   ├── routes/          # Маршруты API
│   ├── services/        # Бизнес-логика
│   ├── types/           # TypeScript типы
│   ├── utils/           # Утилиты и хелперы
│   ├── app.ts           # Express приложение
│   └── server.ts        # Точка входа
├── scripts/             # Скрипты разработки
├── uploads/             # Загруженные файлы
└── swagger.yaml         # API документация
```

### Frontend архитектура (Feature-Sliced Design)

```
frontend-react.js/
├── src/
│   ├── app/             # Конфигурация приложения
│   ├── entities/        # Бизнес-сущности
│   ├── features/        # Функциональности
│   │   ├── auth/        # Аутентификация
│   │   ├── dashboard/   # Дашборд
│   │   └── ...          # Другие фичи
│   ├── pages/           # Страницы
│   │   ├── admin/       # Админ страницы
│   │   ├── home/        # Главная страница
│   │   └── ...          # Другие страницы
│   ├── shared/          # Переиспользуемое
│   │   ├── api/         # API клиент
│   │   ├── components/  # UI компоненты
│   │   ├── hooks/       # React хуки
│   │   ├── layouts/     # Макеты
│   │   └── ui/          # Базовые UI элементы
│   └── widgets/         # Составные компоненты
```

## 📚 API документация

### Базовая информация
- **Base URL:** `http://localhost:3001/api`
- **Формат:** JSON
- **Аутентификация:** Bearer JWT
- **Документация:** OpenAPI 3.0.3 (swagger.yaml)

### Основные эндпоинты

#### 🔐 Аутентификация
```http
POST /api/auth/register    # Регистрация администратора
POST /api/auth/login       # Вход в систему
GET  /api/auth/profile     # Профиль пользователя
GET  /api/auth/validate    # Валидация токена
```

#### 📝 Заявки на участие
```http
GET  /api/applications     # Список заявок (admin)
POST /api/applications     # Создание заявки (public)
GET  /api/applications/:id # Детали заявки (admin)
PUT  /api/applications/:id/status # Изменение статуса (admin)
```

#### 🎵 Группы
```http
GET    /api/groups         # Список групп
POST   /api/groups         # Создание группы (admin)
GET    /api/groups/:id     # Детали группы
PUT    /api/groups/:id     # Обновление группы (admin)
DELETE /api/groups/:id     # Удаление группы (admin)
```

#### 📅 Мероприятия
```http
GET    /api/events         # Список мероприятий
POST   /api/events         # Создание мероприятия (admin)
GET    /api/events/:id     # Детали мероприятия
PUT    /api/events/:id     # Обновление мероприятия (admin)
DELETE /api/events/:id     # Удаление мероприятия (admin)
```

#### 🎪 Фестивали
```http
GET    /api/festivals      # Список фестивалей
POST   /api/festivals      # Создание фестиваля (admin)
GET    /api/festivals/:id  # Детали фестиваля
PUT    /api/festivals/:id  # Обновление фестиваля (admin)
DELETE /api/festivals/:id  # Удаление фестиваля (admin)
```

#### 🛍️ Мерчендайз
```http
GET    /api/merch          # Каталог товаров
POST   /api/merch          # Добавление товара (admin)
GET    /api/merch/:id      # Детали товара
PUT    /api/merch/:id      # Обновление товара (admin)
PATCH  /api/merch/:id/stock # Обновление остатков (admin)
DELETE /api/merch/:id      # Удаление товара (admin)
```

#### 🎴 Карточки
```http
GET    /api/cards          # Наборы карточек
POST   /api/cards          # Создание набора (admin)
GET    /api/cards/:id      # Детали набора
PUT    /api/cards/:id      # Обновление набора (admin)
DELETE /api/cards/:id      # Удаление набора (admin)
```

#### 🎭 Карточки участников
```http
GET    /api/participant-cards     # Карточки участников
POST   /api/participant-cards     # Создание карточек (admin)
GET    /api/participant-cards/:id # Детали карточек
PUT    /api/participant-cards/:id # Обновление карточек (admin)
DELETE /api/participant-cards/:id # Удаление карточек (admin)
```

#### 📋 Постеры
```http
GET    /api/posters        # Список постеров
POST   /api/posters        # Загрузка постера (admin)
GET    /api/posters/:id    # Детали постера
PUT    /api/posters/:id    # Обновление постера (admin)
DELETE /api/posters/:id    # Удаление постера (admin)
```

#### 📄 Контент
```http
GET    /api/content        # Весь контент
POST   /api/content        # Создание контента (admin)
GET    /api/content/:id    # Контент по ID
PUT    /api/content/:id    # Обновление контента (admin)
DELETE /api/content/:id    # Удаление контента (admin)
```

#### 📊 Статистика
```http
GET /api/stats             # Общая статистика (admin)
GET /api/stats/activity    # Активность пользователей (admin)
```

### Примеры использования

#### Создание группы
```bash
curl -X POST http://localhost:3001/api/groups \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "The Rock Band",
    "genre": "Rock",
    "description": "Amazing rock band from Moscow",
    "members": ["John Doe", "Jane Smith", "Bob Wilson"]
  }'
```

#### Подача заявки (публичная)
```bash
curl -X POST http://localhost:3001/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "groupName": "New Band",
    "contactTelegram": "@newband",
    "contactPhone": "+7900123456",
    "genre": "Pop",
    "description": "We are a new pop band"
  }'
```

## 🚢 Развертывание

### Продакшн развертывание

#### 1. Подготовка сервера
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Установка PM2
sudo npm install -g pm2
```

#### 2. Настройка Backend
```bash
cd backend-node.js

# Установка зависимостей
npm ci --only=production

# Сборка проекта
npm run build

# Настройка переменных окружения
cp .env.example .env.production
nano .env.production
```

**Продакшн .env:**
```env
NODE_ENV=production
PORT=3001
MONGO_URI=mongodb://localhost:27017/festival-app-prod
JWT_SECRET=your_very_secure_jwt_secret_for_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-domain.com
```

```bash
# Запуск с PM2
pm2 start dist/server.js --name "festival-backend"
pm2 startup
pm2 save
```

#### 3. Настройка Frontend
```bash
cd frontend-react.js

# Установка зависимостей
pnpm install

# Настройка переменных окружения
cp .env.example .env.production
nano .env.production
```

**Продакшн .env:**
```env
VITE_API_URL=https://api.your-domain.com/api
```

```bash
# Сборка для продакшна
pnpm run build

# Настройка веб-сервера (nginx)
sudo cp -r dist/* /var/www/html/
```

#### 4. Настройка Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Статические файлы (uploads)
    location /uploads {
        proxy_pass http://localhost:3001;
    }
}
```

### Docker развертывание

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
```

#### Docker Compose
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: festival-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend-node.js
    container_name: festival-backend
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongodb:27017/festival-app
    depends_on:
      - mongodb
    volumes:
      - ./uploads:/app/uploads

  frontend:
    build: ./frontend-react.js
    container_name: festival-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

## 💻 Разработка

### Настройка среды разработки

#### 1. Установка зависимостей разработки
```bash
# Backend
cd backend-node.js
npm install

# Frontend
cd ../frontend-react.js
pnpm install
```

#### 2. Настройка IDE (VS Code)

**Рекомендуемые расширения:**
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- MongoDB for VS Code
- Thunder Client (для тестирования API)

**Настройки VS Code (.vscode/settings.json):**
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "css"
  }
}
```

#### 3. Git hooks (опционально)
```bash
# Установка husky для pre-commit hooks
npm install -g husky
npx husky install

# Добавление pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

### Структура проекта

#### Backend структура
```
src/
├── config/
│   ├── api.ts           # API конфигурация
│   └── database.ts      # Подключение к БД
├── controllers/         # HTTP контроллеры
├── middleware/
│   ├── auth.ts          # JWT аутентификация
│   ├── errorHandler.ts  # Обработка ошибок
│   ├── upload.ts        # Загрузка файлов
│   └── validator.ts     # Валидация данных
├── models/              # Mongoose модели
├── routes/              # Express маршруты
├── services/            # Бизнес-логика
├── types/
│   └── index.ts         # TypeScript типы
├── utils/
│   ├── errors.ts        # Кастомные ошибки
│   └── httpClient.ts    # HTTP клиент
├── app.ts               # Express приложение
└── server.ts            # Точка входа
```

#### Frontend структура
```
src/
├── app/                 # Конфигурация приложения
│   ├── App.tsx          # Главный компонент
│   ├── main.tsx         # Точка входа
│   └── styles/          # Глобальные стили
├── entities/            # Бизнес-сущности
│   ├── festival/
│   ├── group/
│   ├── merch/
│   └── user/
├── features/            # Функциональности
│   ├── auth/            # Аутентификация
│   ├── dashboard/       # Дашборд
│   └── ...
├── pages/               # Страницы
│   ├── admin/           # Админ панель
│   ├── home/            # Главная
│   └── ...
├── shared/              # Переиспользуемое
│   ├── api/             # API клиент
│   ├── components/      # UI компоненты
│   ├── hooks/           # React хуки
│   ├── layouts/         # Макеты страниц
│   └── ui/              # Базовые UI
└── widgets/             # Составные компоненты
```

### Команды разработки

#### Backend команды
```bash
npm run dev              # Запуск в режиме разработки
npm run build            # Сборка проекта
npm run start            # Запуск продакшн версии
npm run lint             # Проверка кода ESLint
npm run type-check       # Проверка типов TypeScript
npm run test:api         # Тестирование API
npm run create-test-user # Создание тестового пользователя
npm run create-test-data # Создание тестовых данных
```

#### Frontend команды
```bash
pnpm run dev             # Запуск в режиме разработки
pnpm run build           # Сборка для продакшна
pnpm run preview         # Предварительный просмотр сборки
pnpm run lint            # Проверка кода ESLint
```

### Соглашения по коду

#### TypeScript
- Использование строгого режима TypeScript
- Явное указание типов для публичных API
- Использование интерфейсов для объектов
- Избегание `any` типа

#### React
- Функциональные компоненты с хуками
- Кастомные хуки для переиспользуемой логики
- Мемоизация с `useMemo` и `useCallback` при необходимости
- Использование TypeScript для пропсов компонентов

#### Стилизация
- CSS Modules для компонентов
- Семантические имена классов
- Адаптивный дизайн (mobile-first)
- Использование CSS переменных для цветов и размеров

## 🧪 Тестирование

### Backend тестирование

#### Unit тесты
```bash
# Установка зависимостей для тестирования
npm install --save-dev jest @types/jest supertest

# Запуск тестов
npm run test

# Тестирование с покрытием
npm run test:coverage
```

#### API тестирование
```bash
# Тестирование всех эндпоинтов
npm run test:api

# Простое тестирование API
npm run test:api:simple

# Тестирование карточек участников
npm run test:participant-cards
```

#### Пример теста контроллера
```typescript
import request from 'supertest';
import app from '../src/app';

describe('Groups API', () => {
  it('should get all groups', async () => {
    const response = await request(app)
      .get('/api/groups')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should create a new group', async () => {
    const groupData = {
      name: 'Test Group',
      genre: 'Rock',
      description: 'Test description'
    };

    const response = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${authToken}`)
      .send(groupData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(groupData.name);
  });
});
```

### Frontend тестирование

#### Настройка тестирования
```bash
# Установка зависимостей
pnpm add -D @testing-library/react @testing-library/jest-dom vitest jsdom

# Запуск тестов
pnpm run test

# Тестирование в watch режиме
pnpm run test:watch
```

#### Пример теста компонента
```typescript
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /войти/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email обязателен/i)).toBeInTheDocument();
    });
  });
});
```

### E2E тестирование

#### Настройка Playwright
```bash
# Установка Playwright
pnpm add -D @playwright/test

# Установка браузеров
npx playwright install

# Запуск E2E тестов
pnpm run test:e2e
```

#### Пример E2E теста
```typescript
import { test, expect } from '@playwright/test';

test('admin login flow', async ({ page }) => {
  await page.goto('http://localhost:5173/admin-login');

  await page.fill('[data-testid="email"]', 'admin@test.com');
  await page.fill('[data-testid="password"]', 'admin123');
  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL('http://localhost:5173/admin/dashboard');
  await expect(page.locator('h1')).toContainText('Дашборд');
});
```

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Вот как вы можете помочь:

### Процесс разработки

1. **Fork репозитория**
2. **Создайте ветку для фичи**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Внесите изменения и добавьте тесты**
4. **Убедитесь, что все тесты проходят**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```
5. **Создайте коммит с описательным сообщением**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Отправьте изменения в ваш fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Создайте Pull Request**

### Соглашения по коммитам

Мы используем [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - новая функциональность
- `fix:` - исправление бага
- `docs:` - изменения в документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг кода
- `test:` - добавление тестов
- `chore:` - обновление зависимостей, конфигурации

### Отчеты об ошибках

При создании issue включите:
- Описание проблемы
- Шаги для воспроизведения
- Ожидаемое поведение
- Фактическое поведение
- Версию браузера/Node.js
- Скриншоты (если применимо)

### Предложения по улучшению

- Опишите предлагаемую функциональность
- Объясните, почему это будет полезно
- Приведите примеры использования
- Рассмотрите альтернативные решения

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для подробностей.

## 🙏 Благодарности

- [Express.js](https://expressjs.com/) - веб-фреймворк для Node.js
- [React](https://reactjs.org/) - библиотека для создания пользовательских интерфейсов
- [MongoDB](https://www.mongodb.com/) - NoSQL база данных
- [TypeScript](https://www.typescriptlang.org/) - типизированный JavaScript
- [Vite](https://vitejs.dev/) - быстрый сборщик для фронтенда

## 📞 Поддержка

Если у вас есть вопросы или нужна помощь:

- 📧 Email: support@festival-system.com
- 💬 Telegram: @festival_support
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/your-repo/wiki)

---

**🎵 Создано с ❤️ для музыкального сообщества**