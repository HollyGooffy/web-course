# Изменения синхронизации карточек между админкой и пользователями

## Проблема
Данные карточек между админской частью (admin/cards) и пользовательской частью (home/merch) не были синхронизированы. Пользователи видели отфильтрованные данные, а админы - все данные.

## Решение

### 1. Создание отдельных API endpoints

**Бэкенд изменения:**
- `backend-node.js/src/routes/cardRoutes.ts` - добавлены публичные роуты:
  - `GET /api/cards/public` - все карточки для пользователей
  - `GET /api/cards/public/festival/:festivalId` - карточки фестиваля для пользователей
  - `GET /api/cards/public/:id` - конкретная карточка для пользователей

- `backend-node.js/src/routes/festivalRoutes.ts` - добавлены публичные роуты:
  - `GET /api/festivals/public` - все фестивали для пользователей
  - `GET /api/festivals/public/:id` - конкретный фестиваль для пользователей

- `backend-node.js/src/services/cardService.ts` - добавлены методы:
  - `getPublicCardSets()` - возвращает все карточки
  - `getPublicCardSetsByFestival()` - возвращает карточки фестиваля

### 2. Разделение хуков на фронтенде

**Публичные хуки (для пользователей):**
- `frontend-react.js/src/shared/hooks/useFestivals.ts` - обновлен для использования публичных API
- `frontend-react.js/src/shared/hooks/usePublicCards.ts` - обновлен для использования публичных API

**Админские хуки (для администраторов):**
- `frontend-react.js/src/shared/hooks/useAdminFestivals.ts` - новый хук для админов
- `frontend-react.js/src/shared/hooks/useAdminCards.ts` - использует защищенные API

### 3. Обновление API endpoints

**Фронтенд изменения:**
- `frontend-react.js/src/shared/api/endpoints/cards.endpoints.ts` - разделены методы:
  - Публичные: `getPublic()`, `getPublicByFestival()`, `getPublicById()`
  - Админские: `getAll()`, `getByFestival()`, `getById()`

- `frontend-react.js/src/shared/api/endpoints/festivals.endpoints.ts` - разделены методы:
  - Публичные: `getAll()`, `getById()` (используют `/public` endpoints)
  - Админские: `getAllAdmin()`, `getByIdAdmin()` (используют защищенные endpoints)

### 4. Обновление компонентов

**Админские компоненты:**
- `frontend-react.js/src/pages/admin/poster/ui/Poster.tsx` - использует `useAdminFestivals`
- `frontend-react.js/src/widgets/cards-management/hooks/useCardsManagementData.ts` - использует `useAdminFestivals`

**Пользовательские компоненты:**
- Остались без изменений, используют публичные хуки

### 5. Логика создания карточек

**Важно:** Карточки создаются ТОЛЬКО с привязкой к фестивалю:
- `frontend-react.js/src/features/card-management/hooks/useCardForm.ts` - обязательное поле `festivalId`
- `frontend-react.js/src/widgets/cards-management/components/FestivalDetailsView.tsx` - добавлена кнопка "Создать набор карточек"
- Карточки создаются только при выборе конкретного фестиваля в админке

### 6. Очистка базы данных

- `backend-node.js/scripts/clear-all-cards.js` - скрипт для очистки всех карточек
- База данных карточек очищена для нового наполнения

## Результат

✅ **Синхронизация данных:** Пользователи и админы теперь видят одинаковые данные карточек
✅ **Безопасность:** Публичные endpoints не требуют авторизации
✅ **Логика создания:** Карточки создаются только с привязкой к фестивалю
✅ **Чистая база:** Удалены все старые карточки без привязки к фестивалям

## Тестирование

Созданы скрипты для тестирования:
- `backend-node.js/scripts/test-public-endpoints.js` - тест публичных API
- `backend-node.js/scripts/test-final-sync.js` - тест синхронизации данных
- `backend-node.js/scripts/clear-all-cards.js` - очистка карточек

## Следующие шаги

1. Создать карточки через админку (admin/cards → выбрать фестиваль → "Создать набор карточек")
2. Проверить отображение в пользовательской части (home/merch)
3. Убедиться, что карточки с нулевым количеством наборов показываются как недоступные для покупки