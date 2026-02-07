import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/utils'
import { Dashboard } from '../dashboard/ui/Dashboard'
import { mockFestival, mockGroup, mockEvent, createMockApiResponse } from '@/test/utils'

// Mock API
vi.mock('@/shared/api', () => ({
  statsApi: {
    getDashboardStats: vi.fn(),
  },
  festivalApi: {
    getAll: vi.fn(),
  },
  groupApi: {
    getAll: vi.fn(),
  },
  eventApi: {
    getAll: vi.fn(),
  },
}))

describe('Dashboard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders dashboard with all data', async () => {
    const mockStats = {
      totalApplications: 25,
      totalGroups: 12,
      totalEvents: 8,
      totalFestivals: 3,
    }

    const { statsApi, festivalApi, groupApi, eventApi } = await import('@/shared/api')
    
    vi.mocked(statsApi.getDashboardStats).mockResolvedValue(
      createMockApiResponse(mockStats)
    )
    vi.mocked(festivalApi.getAll).mockResolvedValue(
      createMockApiResponse([mockFestival])
    )
    vi.mocked(groupApi.getAll).mockResolvedValue(
      createMockApiResponse([mockGroup])
    )
    vi.mocked(eventApi.getAll).mockResolvedValue(
      createMockApiResponse([mockEvent])
    )

    render(<Dashboard />)

    // Проверяем загрузку
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument()

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText(/дашборд/i)).toBeInTheDocument()
      expect(screen.getByText('25')).toBeInTheDocument() // totalApplications
      expect(screen.getByText('12')).toBeInTheDocument() // totalGroups
      expect(screen.getByText('8')).toBeInTheDocument()  // totalEvents
      expect(screen.getByText('3')).toBeInTheDocument()  // totalFestivals
    })

    // Проверяем отображение данных
    expect(screen.getByText(mockFestival.name)).toBeInTheDocument()
    expect(screen.getByText(mockGroup.name)).toBeInTheDocument()
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    const { statsApi } = await import('@/shared/api')
    vi.mocked(statsApi.getDashboardStats).mockRejectedValue(
      new Error('Failed to fetch stats')
    )

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/ошибка загрузки/i)).toBeInTheDocument()
    })
  })

  it('shows empty state when no data', async () => {
    const mockEmptyStats = {
      totalApplications: 0,
      totalGroups: 0,
      totalEvents: 0,
      totalFestivals: 0,
    }

    const { statsApi, festivalApi, groupApi, eventApi } = await import('@/shared/api')
    
    vi.mocked(statsApi.getDashboardStats).mockResolvedValue(
      createMockApiResponse(mockEmptyStats)
    )
    vi.mocked(festivalApi.getAll).mockResolvedValue(
      createMockApiResponse([])
    )
    vi.mocked(groupApi.getAll).mockResolvedValue(
      createMockApiResponse([])
    )
    vi.mocked(eventApi.getAll).mockResolvedValue(
      createMockApiResponse([])
    )

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/нет данных/i)).toBeInTheDocument()
    })
  })
})