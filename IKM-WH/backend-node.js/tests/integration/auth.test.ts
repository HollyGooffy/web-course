import { describe, it, expect, beforeEach } from '@jest/globals'
import request from 'supertest'
import app from '../../src/app'
import { User } from '../../src/models/User'
import { createTestUser, generateAuthToken } from '../utils/testHelpers'

describe('Auth API Integration', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new admin user', async () => {
      const userData = {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe(userData.email)
      expect(response.body.data.user.name).toBe(userData.name)
      expect(response.body.data.token).toBeDefined()

      // Проверяем, что пользователь создан в БД
      const user = await User.findOne({ email: userData.email })
      expect(user).toBeTruthy()
      expect(user?.role).toBe('admin')
    })

    it('should not register user with invalid email', async () => {
      const userData = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.errors).toBeDefined()
    })

    it('should not register user with short password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.errors).toBeDefined()
    })
  })

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await createTestUser({
        email: 'admin@test.com',
        password: 'password123'
      })
    })

    it('should login with correct credentials', async () => {
      const loginData = {
        email: 'admin@test.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.user.email).toBe(loginData.email)
      expect(response.body.data.token).toBeDefined()
    })

    it('should not login with incorrect password', async () => {
      const loginData = {
        email: 'admin@test.com',
        password: 'wrongpassword'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Неверные учетные данные')
    })

    it('should not login with non-existent email', async () => {
      const loginData = {
        email: 'nonexistent@test.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401)

      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /api/auth/profile', () => {
    it('should return user profile with valid token', async () => {
      const user = await createTestUser()
      const token = generateAuthToken(user.id)

      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.user.id).toBe(user.id)
      expect(response.body.data.user.email).toBe(user.email)
    })

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Токен не предоставлен')
    })

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toContain('Недействительный токен')
    })
  })

  describe('GET /api/auth/validate', () => {
    it('should validate correct token', async () => {
      const user = await createTestUser()
      const token = generateAuthToken(user.id)

      const response = await request(app)
        .get('/api/auth/validate')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.valid).toBe(true)
      expect(response.body.data.user.id).toBe(user.id)
    })

    it('should not validate invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/validate')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401)

      expect(response.body.success).toBe(false)
    })
  })
})