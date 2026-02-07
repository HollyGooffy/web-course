import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../useAuth'
import { mockUser } from '@/test/utils'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

// Mock API
vi.mock('@/shared/api', () => ({
  authApi: {
    login: vi.fn(),
    validateToken: vi.fn(),
  },
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
  })

  it('initializes with no user when no token in localStorage', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('initializes with loading state when token exists', () => {
    mockLocalStorage.getItem.mockReturnValue('test-token')
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isLoading).toBe(true)
  })

  it('logs in user successfully', async () => {
    const { authApi } = await import('@/shared/api')
    vi.mocked(authApi.login).mockResolvedValue({
      success: true,
      data: { token: 'test-token', user: mockUser }
    })

    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.login('admin@test.com', 'password123')
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'test-token')
  })

  it('handles login error', async () => {
    const { authApi } = await import('@/shared/api')
    vi.mocked(authApi.login).mockRejectedValue(new Error('Invalid credentials'))

    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      try {
        await result.current.login('admin@test.com', 'wrongpassword')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('logs out user', () => {
    mockLocalStorage.getItem.mockReturnValue('test-token')
    
    const { result } = renderHook(() => useAuth())
    
    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
  })
})