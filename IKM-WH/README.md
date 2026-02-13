# IKM-WH - Проект управления мероприятиями


## 🏗 Архитектура

Проект состоит из двух частей:

### Backend (Node.js)
- RESTful API
- База данных
- Аутентификация
- Управление файлами

### Frontend (React.js)
- Административная панель
- Публичный сайт
- Управление карточками участников
- Статистика и аналитика

## 🛠 Технологии

### Backend
- Node.js
- Express.js
- TypeScript
- База данных (PostgreSQL/MySQL)

### Frontend
- React 18
- TypeScript
- Vite
- CSS Modules
- React Router

## 📂 Структура

```
IKM-WH/
├── backend-node.js/        # Backend API
│   ├── src/
│   │   ├── controllers/    # Контроллеры
│   │   ├── services/       # Бизнес-логика
│   │   └── routes/         # Маршруты
│   └── package.json
│
└── frontend-react.js/      # Frontend приложение
    ├── src/
    │   ├── pages/          # Страницы
    │   ├── features/       # Фичи
    │   ├── widgets/        # Виджеты
    │   ├── shared/         # Общие компоненты
    │   └── app/            # Конфигурация
    └── package.json
```

## 🚀 Запуск

### Backend
```bash
cd backend-node.js
npm install
npm run dev
```

### Frontend
```bash
cd frontend-react.js
npm install
npm run dev
```

## 📱 Функционал

### Административная панель
- Управление фестивалями
- Управление группами
- Управление мерчем
- Управление карточками участников
- Просмотр заявок
- Статистика

### Публичный сайт
- Афиша мероприятий
- Каталог групп
- Магазин мерча
- Форма подачи заявки
- Карточки участников
