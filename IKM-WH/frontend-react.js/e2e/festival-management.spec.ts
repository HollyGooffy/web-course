import { test, expect } from '@playwright/test'

test.describe('Festival Management', () => {
  test.beforeEach(async ({ page }) => {
    // Создаем тестового пользователя и логинимся
    await page.request.post('http://localhost:3001/api/auth/register', {
      data: {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123'
      }
    })

    await page.goto('/admin-login')
    await page.fill('[data-testid="email"]', 'admin@test.com')
    await page.fill('[data-testid="password"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await expect(page).toHaveURL('/admin/dashboard')
  })

  test('should create new festival', async ({ page }) => {
    // Переходим на страницу фестивалей
    await page.click('[data-testid="nav-festivals"]')
    await expect(page).toHaveURL('/admin/festivals')

    // Открываем модальное окно создания
    await page.click('[data-testid="create-festival-button"]')
    await expect(page.locator('[data-testid="festival-modal"]')).toBeVisible()

    // Заполняем форму
    await page.fill('[data-testid="festival-name"]', 'Test Festival 2024')
    await page.fill('[data-testid="festival-venue"]', 'Central Park')
    await page.fill('[data-testid="festival-date"]', '2024-06-15')
    await page.fill('[data-testid="festival-description"]', 'Amazing music festival')

    // Сохраняем
    await page.click('[data-testid="save-festival-button"]')

    // Проверяем, что фестиваль появился в списке
    await expect(page.locator('[data-testid="festival-item"]')).toContainText('Test Festival 2024')
    await expect(page.locator('[data-testid="festival-item"]')).toContainText('Central Park')
  })

  test('should edit existing festival', async ({ page }) => {
    // Создаем фестиваль через API
    const response = await page.request.post('http://localhost:3001/api/festivals', {
      headers: {
        'Authorization': `Bearer ${await page.evaluate(() => localStorage.getItem('token'))}`
      },
      data: {
        name: 'Original Festival',
        venue: 'Original Venue',
        date: '2024-06-15',
        description: 'Original description'
      }
    })
    const festival = await response.json()

    await page.goto('/admin/festivals')

    // Кликаем на кнопку редактирования
    await page.click(`[data-testid="edit-festival-${festival.data._id}"]`)
    await expect(page.locator('[data-testid="festival-modal"]')).toBeVisible()

    // Изменяем данные
    await page.fill('[data-testid="festival-name"]', 'Updated Festival')
    await page.fill('[data-testid="festival-venue"]', 'Updated Venue')

    // Сохраняем
    await page.click('[data-testid="save-festival-button"]')

    // Проверяем изменения
    await expect(page.locator('[data-testid="festival-item"]')).toContainText('Updated Festival')
    await expect(page.locator('[data-testid="festival-item"]')).toContainText('Updated Venue')
  })

  test('should delete festival', async ({ page }) => {
    // Создаем фестиваль через API
    const response = await page.request.post('http://localhost:3001/api/festivals', {
      headers: {
        'Authorization': `Bearer ${await page.evaluate(() => localStorage.getItem('token'))}`
      },
      data: {
        name: 'Festival to Delete',
        venue: 'Test Venue',
        date: '2024-06-15'
      }
    })
    const festival = await response.json()

    await page.goto('/admin/festivals')

    // Проверяем, что фестиваль есть в списке
    await expect(page.locator('[data-testid="festival-item"]')).toContainText('Festival to Delete')

    // Удаляем фестиваль
    await page.click(`[data-testid="delete-festival-${festival.data._id}"]`)
    
    // Подтверждаем удаление
    await page.click('[data-testid="confirm-delete"]')

    // Проверяем, что фестиваль исчез из списка
    await expect(page.locator('[data-testid="festival-item"]')).not.toContainText('Festival to Delete')
  })

  test('should validate festival form', async ({ page }) => {
    await page.goto('/admin/festivals')
    await page.click('[data-testid="create-festival-button"]')

    // Пытаемся сохранить пустую форму
    await page.click('[data-testid="save-festival-button"]')

    // Проверяем ошибки валидации
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Название обязательно')
    await expect(page.locator('[data-testid="venue-error"]')).toContainText('Место проведения обязательно')
    await expect(page.locator('[data-testid="date-error"]')).toContainText('Дата обязательна')
  })
})