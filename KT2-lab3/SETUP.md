# Быстрый старт

## Установка

```bash
pnpm install
```

## Запуск

```bash
pnpm dev
```

Откройте http://localhost:5173

## Что реализовано

✅ Таблица с данными о криптовалютах (6 столбцов)
✅ Минимум 20 строк (настраивается: 20/50/100)
✅ Получение данных через CoinGecko API
✅ Поиск по названию/символу
✅ Сортировка по 5 параметрам
✅ Пагинация
✅ Детальная информация о монете

## Структура

```
src/
├── contexts/CoinsContext.tsx  # Управление состоянием
├── pages/
│   ├── HomeTable.tsx          # Главная страница с таблицей
│   ├── CoinDetails.tsx        # Детали монеты
│   └── NotFound.tsx           # 404
├── components/
│   ├── CoinChart/             # График цены
│   └── ui/                    # UI компоненты
└── lib/api/                   # API клиент

server.js                      # Прокси-сервер для API
```

## Технологии

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Context API
- CoinGecko API
