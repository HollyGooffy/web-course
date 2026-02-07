import { describe, it, expect, beforeEach } from '@jest/globals'
import request from 'supertest'
import app from '../../src/app'
import { createTestUser, createTestFestival, generateAuthToken } from '../utils/testHelpers'

describe('Festivals API Integration', () => {
  let authToken: string

  beforeEach(async () => {
    const user = await createTestUser()
    authToken = generateAuthToken(user.id)
  })

  describe('GET /api/festivals', () => {
    it('should return all festivals', async () => {
      await createTestFestival({ name: 'Festival 1' })
      await createTestFestival({ name: 'Festival 2' })

      const response = await request(app)
        .get('/api/festivals')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveLength(2)
      expect(response.body.data[0].name).toBe('Festival 1')
      expect(response.body.data[1].name).toBe('Festival 2')
    })

    it('should return empty array when no festivals', async () => {
      const response = await request(app)
        .get('/api/festivals')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveLength(0)
    })
  })

  describe('POST /api/festivals', () => {
    it('should create new festival with valid data', async () => {
      const festivalData = {
        name: 'New Festival',
        date: '2024-06-15',
        venue: 'Test Venue',
        description: 'Test Description'
      }

      const response = await request(app)
        .post('/api/festivals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(festivalData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe(festivalData.name)
      expect(response.body.data.venue).toBe(festivalData.venue)
      expect(response.body.data.status).toBe('upcoming')
    })

    it('should require authentication', async () => {
      const festivalData = {
        name: 'New Festival',
        date: '2024-06-15',
        venue: 'Test Venue'
      }

      const response = await request(app)
        .post('/api/festivals')
        .send(festivalData)
        .expect(401)

      expect(response.body.success).toBe(false)
    })

    it('should validate required fields', async () => {
      const invalidData = {
        name: '', // пустое название
        venue: 'Test Venue'
      }

      const response = await request(app)
        .post('/api/festivals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.errors).toBeDefined()
    })
  })

  describe('GET /api/festivals/:id', () => {
    it('should return festival by id', async () => {
      const festival = await createTestFestival({ name: 'Test Festival' })

      const response = await request(app)
        .get(`/api/festivals/${festival.id}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe('Test Festival')
    })

    it('should return 404 for non-existent festival', async () => {
      const response = await request(app)
        .get('/api/festivals/507f1f77bcf86cd799439011')
        .expect(404)

      expect(response.body.success).toBe(false)
    })

    it('should return 400 for invalid id format', async () => {
      const response = await request(app)
        .get('/api/festivals/invalid-id')
        .expect(400)

      expect(response.body.success).toBe(false)
    })
  })

  describe('PUT /api/festivals/:id', () => {
    it('should update festival with valid data', async () => {
      const festival = await createTestFestival({ name: 'Original Name' })

      const updateData = {
        name: 'Updated Name',
        description: 'Updated Description'
      }

      const response = await request(app)
        .put(`/api/festivals/${festival.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe('Updated Name')
      expect(response.body.data.description).toBe('Updated Description')
    })

    it('should require authentication', async () => {
      const festival = await createTestFestival()

      const response = await request(app)
        .put(`/api/festivals/${festival.id}`)
        .send({ name: 'Updated Name' })
        .expect(401)

      expect(response.body.success).toBe(false)
    })
  })

  describe('DELETE /api/festivals/:id', () => {
    it('should delete festival', async () => {
      const festival = await createTestFestival()

      const response = await request(app)
        .delete(`/api/festivals/${festival.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)

      // Проверяем, что фестиваль удален
      const getResponse = await request(app)
        .get(`/api/festivals/${festival.id}`)
        .expect(404)
    })

    it('should require authentication', async () => {
      const festival = await createTestFestival()

      const response = await request(app)
        .delete(`/api/festivals/${festival.id}`)
        .expect(401)

      expect(response.body.success).toBe(false)
    })
  })
})