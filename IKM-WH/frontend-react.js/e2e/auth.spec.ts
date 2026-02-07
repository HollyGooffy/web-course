import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Создаем тестового пользователя через API
    await page.request.post('http://localhost:3001/api/auth/register', {
      data: {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123'
      }
    })
  })

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/admin-login')

    // Заполняем форму входа
    await page.fill('[data-testid="email"]', 'admin@test.com')
    await page.fill('[data-testid="password"]', 'password123')
    await page.click('[data-testid="login-button"]')

    // Проверяем редирект на дашборд
    await expect(page).toHaveURL('/admin/dashboard')
    await expect(page.locator('h1')).toContainText('Дашборд')
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/admin-login')

    await page.fill('[data-testid="email"]', 'admin@test.com')
    await page.fill('[data-testid="password"]', 'wrongpassword')
    await page.click('[data-testid="login-button"]')

    // Проверяем сообщение об ошибке
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Неверные учетные данные')
  })

  test('should logout successfully', async ({ page }) => {
    // Логинимся
    await page.goto('/admin-login')
    await page.fill('[data-testid="email"]', 'admin@test.com')
    await page.fill('[data-testid="password"]', 'password123')
    await page.click('[data-testid="login-button"]')

    await expect(page).toHaveURL('/admin/dashboard')

    // Выходим
    await page.click('[data-testid="logout-button"]')

    // Проверяем редирект на страницу входа
    await expect(page).toHaveURL('/admin-login')
  })

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    await page.goto('/admin/dashboard')

    // Должен редиректить на страницу входа
    await expect(page).toHaveURL('/admin-login')
  })
})