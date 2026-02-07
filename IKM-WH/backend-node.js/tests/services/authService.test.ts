import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthService } from '../../src/services/authService'
import { User } from '../../src/models/User'
import { createTestUser } from '../utils/testHelpers'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
  })

  describe('register', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }

      const result = await authService.register(userData)

      expect(result.success).toBe(true)
      expect(result.data.user.email).toBe(userData.email)
      expect(result.data.user.name).toBe(userData.name)
      expect(result.data.token).toBeDefined()

      // Проверяем, что пароль захеширован
      const user = await User.findById(result.data.user.id)
      expect(user?.passwordHash).not.toBe(userData.password)
      expect(await bcrypt.compare(userData.password, user!.passwordHash)).toBe(true)
    })

    it('should not create user with existing email', async () => {
      await createTestUser({ email: 'existing@example.com' })

      const userData = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123'
      }

      const result = await authService.register(userData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('уже существует')
    })
  })

  describe('login', () => {
    it('should login user with correct credentials', async () => {
      const password = 'password123'
      const user = await createTestUser({ 
        email: 'test@example.com',
        password 
      })

      const result = await authService.login('test@example.com', password)

      expect(result.success).toBe(true)
      expect(result.data.user.id).toBe(user.id)
      expect(result.data.token).toBeDefined()

      // Проверяем валидность токена
      const decoded = jwt.verify(result.data.token, process.env.JWT_SECRET || 'test-secret') as any
      expect(decoded.userId).toBe(user.id)
    })

    it('should not login with incorrect password', async () => {
      await createTestUser({ 
        email: 'test@example.com',
        password: 'password123' 
      })

      const result = await authService.login('test@example.com', 'wrongpassword')

      expect(result.success).toBe(false)
      expect(result.error).toContain('Неверные учетные данные')
    })

    it('should not login with non-existent email', async () => {
      const result = await authService.login('nonexistent@example.com', 'password123')

      expect(result.success).toBe(false)
      expect(result.error).toContain('Неверные учетные данные')
    })
  })

  describe('validateToken', () => {
    it('should validate correct token', async () => {
      const user = await createTestUser()
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '1h' }
      )

      const result = await authService.validateToken(token)

      expect(result.success).toBe(true)
      expect(result.data.user.id).toBe(user.id)
    })

    it('should not validate invalid token', async () => {
      const result = await authService.validateToken('invalid-token')

      expect(result.success).toBe(false)
      expect(result.error).toContain('Недействительный токен')
    })

    it('should not validate expired token', async () => {
      const user = await createTestUser()
      const expiredToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '-1h' }
      )

      const result = await authService.validateToken(expiredToken)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Недействительный токен')
    })
  })
})