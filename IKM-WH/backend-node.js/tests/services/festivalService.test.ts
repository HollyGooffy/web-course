import { describe, it, expect, beforeEach } from '@jest/globals'
import { FestivalService } from '../../src/services/festivalService'
import { Festival } from '../../src/models/Festival'
import { createTestFestival } from '../utils/testHelpers'

describe('FestivalService', () => {
  let festivalService: FestivalService

  beforeEach(() => {
    festivalService = new FestivalService()
  })

  describe('create', () => {
    it('should create a new festival', async () => {
      const festivalData = {
        name: 'Test Festival',
        date: new Date('2024-06-15'),
        venue: 'Test Venue',
        description: 'Test Description'
      }

      const result = await festivalService.create(festivalData)

      expect(result.success).toBe(true)
      expect(result.data.name).toBe(festivalData.name)
      expect(result.data.venue).toBe(festivalData.venue)
      expect(result.data.status).toBe('upcoming')
    })

    it('should not create festival with duplicate name and date', async () => {
      const festivalData = {
        name: 'Duplicate Festival',
        date: new Date('2024-06-15'),
        venue: 'Test Venue'
      }

      await createTestFestival(festivalData)

      const result = await festivalService.create(festivalData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('уже существует')
    })
  })

  describe('getAll', () => {
    it('should return all festivals', async () => {
      await createTestFestival({ name: 'Festival 1' })
      await createTestFestival({ name: 'Festival 2' })

      const result = await festivalService.getAll()

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(2)
      expect(result.data[0].name).toBe('Festival 1')
      expect(result.data[1].name).toBe('Festival 2')
    })

    it('should return empty array when no festivals', async () => {
      const result = await festivalService.getAll()

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(0)
    })
  })

  describe('getById', () => {
    it('should return festival by id', async () => {
      const festival = await createTestFestival({ name: 'Test Festival' })

      const result = await festivalService.getById(festival.id)

      expect(result.success).toBe(true)
      expect(result.data.name).toBe('Test Festival')
    })

    it('should return error for non-existent festival', async () => {
      const result = await festivalService.getById('507f1f77bcf86cd799439011')

      expect(result.success).toBe(false)
      expect(result.error).toContain('не найден')
    })
  })

  describe('update', () => {
    it('should update festival', async () => {
      const festival = await createTestFestival({ name: 'Original Name' })

      const updateData = {
        name: 'Updated Name',
        description: 'Updated Description'
      }

      const result = await festivalService.update(festival.id, updateData)

      expect(result.success).toBe(true)
      expect(result.data.name).toBe('Updated Name')
      expect(result.data.description).toBe('Updated Description')
    })

    it('should return error when updating non-existent festival', async () => {
      const result = await festivalService.update('507f1f77bcf86cd799439011', {
        name: 'Updated Name'
      })

      expect(result.success).toBe(false)
      expect(result.error).toContain('не найден')
    })
  })

  describe('delete', () => {
    it('should delete festival', async () => {
      const festival = await createTestFestival()

      const result = await festivalService.delete(festival.id)

      expect(result.success).toBe(true)

      const deletedFestival = await Festival.findById(festival.id)
      expect(deletedFestival).toBeNull()
    })

    it('should return error when deleting non-existent festival', async () => {
      const result = await festivalService.delete('507f1f77bcf86cd799439011')

      expect(result.success).toBe(false)
      expect(result.error).toContain('не найден')
    })
  })
})