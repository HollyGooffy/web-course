import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import { FestivalModal } from '../FestivalModal'
import { mockFestival } from '@/test/utils'

// Mock API
vi.mock('@/shared/api', () => ({
  festivalApi: {
    create: vi.fn(),
    update: vi.fn(),
  },
}))

describe('FestivalModal', () => {
  const mockOnClose = vi.fn()
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders create festival modal', () => {
    render(
      <FestivalModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    )
    
    expect(screen.getByText(/создать фестиваль/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/название/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/дата/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/место проведения/i)).toBeInTheDocument()
  })

  it('renders edit festival modal with data', () => {
    render(
      <FestivalModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        festival={mockFestival}
      />
    )
    
    expect(screen.getByText(/редактировать фестиваль/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockFestival.name)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockFestival.venue)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(
      <FestivalModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    )
    
    fireEvent.click(screen.getByRole('button', { name: /создать/i }))

    await waitFor(() => {
      expect(screen.getByText(/название обязательно/i)).toBeInTheDocument()
      expect(screen.getByText(/дата обязательна/i)).toBeInTheDocument()
      expect(screen.getByText(/место проведения обязательно/i)).toBeInTheDocument()
    })
  })

  it('creates new festival successfully', async () => {
    const { festivalApi } = await import('@/shared/api')
    vi.mocked(festivalApi.create).mockResolvedValue({
      success: true,
      data: mockFestival
    })

    render(
      <FestivalModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    )
    
    fireEvent.change(screen.getByLabelText(/название/i), {
      target: { value: 'New Festival' }
    })
    fireEvent.change(screen.getByLabelText(/место проведения/i), {
      target: { value: 'New Venue' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /создать/i }))

    await waitFor(() => {
      expect(festivalApi.create).toHaveBeenCalled()
      expect(mockOnSuccess).toHaveBeenCalled()
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it('closes modal on cancel', () => {
    render(
      <FestivalModal
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    )
    
    fireEvent.click(screen.getByRole('button', { name: /отмена/i }))
    expect(mockOnClose).toHaveBeenCalled()
  })
})