import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useFestivals } from '../useFestivals'
import { mockFestival, createMockApiResponse } from '@/test/utils'

// Mock API
vi.mock('@/shared/api', () => ({
  festivalApi: {
    getAll: vi.fn(),
  },
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0 },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useFestivals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches festivals successfully', async () => {
    const { festivalApi } = await import('@/shared/api')
    vi.mocked(festivalApi.getAll).mockResolvedValue(
      createMockApiResponse([mockFestival])
    )

    const { result } = renderHook(() => useFestivals(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toEqual([mockFestival])
      expect(result.current.error).toBe(null)
    })
  })

  it('handles fetch error', async () => {
    const { festivalApi } = await import('@/shared/api')
    const errorMessage = 'Failed to fetch festivals'
    vi.mocked(festivalApi.getAll).mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useFestivals(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeTruthy()
      expect(result.current.data).toBeUndefined()
    })
  })

  it('refetches data when refetch is called', async () => {
    const { festivalApi } = await import('@/shared/api')
    vi.mocked(festivalApi.getAll).mockResolvedValue(
      createMockApiResponse([mockFestival])
    )

    const { result } = renderHook(() => useFestivals(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(festivalApi.getAll).toHaveBeenCalledTimes(1)

    result.current.refetch()

    await waitFor(() => {
      expect(festivalApi.getAll).toHaveBeenCalledTimes(2)
    })
  })
})