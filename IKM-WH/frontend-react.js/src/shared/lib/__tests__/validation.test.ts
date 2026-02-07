import { describe, it, expect } from 'vitest'
import { 
  validateEmail, 
  validatePhone, 
  validateRequired,
  formatDate,
  formatPrice 
} from '../validation'

describe('Validation utilities', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true)
      expect(validateEmail('admin@festival.org')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('validates correct phone numbers', () => {
      expect(validatePhone('+1234567890')).toBe(true)
      expect(validatePhone('+7 (900) 123-45-67')).toBe(true)
      expect(validatePhone('89001234567')).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc123')).toBe(false)
      expect(validatePhone('')).toBe(false)
    })
  })

  describe('validateRequired', () => {
    it('validates non-empty values', () => {
      expect(validateRequired('test')).toBe(true)
      expect(validateRequired('0')).toBe(true)
      expect(validateRequired(0)).toBe(true)
    })

    it('rejects empty values', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired(null)).toBe(false)
      expect(validateRequired(undefined)).toBe(false)
      expect(validateRequired('   ')).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-06-15T10:30:00Z')
      expect(formatDate(date)).toBe('15.06.2024')
      expect(formatDate(date, 'full')).toBe('15 июня 2024')
    })

    it('handles invalid dates', () => {
      expect(formatDate(null)).toBe('')
      expect(formatDate(undefined)).toBe('')
    })
  })

  describe('formatPrice', () => {
    it('formats prices correctly', () => {
      expect(formatPrice(1000)).toBe('1 000 ₽')
      expect(formatPrice(25.5)).toBe('25,50 ₽')
      expect(formatPrice(0)).toBe('0 ₽')
    })

    it('handles invalid prices', () => {
      expect(formatPrice(null)).toBe('0 ₽')
      expect(formatPrice(undefined)).toBe('0 ₽')
    })
  })
})