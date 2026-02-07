# API Endpoints Documentation

## Base Configuration

- **Backend URL**: `http://localhost:3001`
- **Frontend URL**: `http://localhost:5173`
- **API Base Path**: `/api`

## Available Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Регистрация пользователя
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/logout` - Выход из системы
- `GET /api/auth/profile` - Получить профиль пользователя
- `PUT /api/auth/profile` - Обновить профиль пользователя

### Applications (`/api/applications`)
- `GET /api/applications` - Получить все заявки
- `POST /api/applications` - Создать новую заявку
- `GET /api/applications/:id` - Получить заявку по ID
- `PUT /api/applications/:id` - Обновить заявку
- `DELETE /api/applications/:id` - Удалить заявку

### Groups (`/api/groups`)
- `GET /api/groups` - Получить все группы
- `POST /api/groups` - Создать новую группу
- `GET /api/groups/:id` - Получить группу по ID
- `PUT /api/groups/:id` - Обновить группу
- `DELETE /api/groups/:id` - Удалить группу

### Merchandise (`/api/merch`)
- `GET /api/merch` - Получить все товары
- `POST /api/merch` - Создать новый товар
- `GET /api/merch/:id` - Получить товар по ID
- `PUT /api/merch/:id` - Обновить товар
- `DELETE /api/merch/:id` - Удалить товар

### Cards (`/api/cards`)
- `GET /api/cards` - Получить все карточки
- `POST /api/cards` - Создать новую карточку
- `GET /api/cards/:id` - Получить карточку по ID
- `PUT /api/cards/:id` - Обновить карточку
- `DELETE /api/cards/:id` - Удалить карточку

### Posters (`/api/posters`)
- `GET /api/posters` - Получить все постеры
- `POST /api/posters` - Создать новый постер
- `GET /api/posters/:id` - Получить постер по ID
- `PUT /api/posters/:id` - Обновить постер
- `DELETE /api/posters/:id` - Удалить постер

### Events (`/api/events`)
- `GET /api/events` - Получить все события
- `POST /api/events` - Создать новое событие
- `GET /api/events/:id` - Получить событие по ID
- `PUT /api/events/:id` - Обновить событие
- `DELETE /api/events/:id` - Удалить событие

### Content (`/api/content`)
- `GET /api/content` - Получить весь контент
- `POST /api/content` - Создать новый контент
- `GET /api/content/:id` - Получить контент по ID
- `PUT /api/content/:id` - Обновить контент
- `DELETE /api/content/:id` - Удалить контент

### Statistics (`/api/stats`)
- `GET /api/stats` - Получить статистику
- `GET /api/stats/dashboard` - Получить данные для дашборда

### Utility Endpoints
- `GET /health` - Проверка состояния сервера
- `GET /uploads/:filename` - Доступ к загруженным файлам

## Environment Variables

```env
NODE_ENV=development
PORT=3001
MONGO_URI=mongodb://localhost:27017/festival-app
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

## Frontend Integration

Для использования в React/Vue/Angular приложении:

```javascript
const API_BASE_URL = 'http://localhost:3001/api';

// Пример запроса
const fetchEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  return response.json();
};
```

## CORS Configuration

Backend настроен для работы с фронтендом на `http://localhost:5173` (Vite default port).
Для изменения разрешенного origin, обновите переменную `CORS_ORIGIN` в `.env` файле.