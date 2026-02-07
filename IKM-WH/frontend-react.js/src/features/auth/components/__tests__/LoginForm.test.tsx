import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@/test/utils'
import { LoginForm } from '../LoginForm'

// Mock API
vi.mock('@/shared/api', () => ({
  authApi: {
    login: vi.fn(),
  },
}))

describe('LoginForm', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form fields', () => {
    render(<LoginForm onSuccess={mockOnSuccess} />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm onSuccess={mockOnSuccess} />)
    
    const submitButton = screen.getByRole('button', { name: /войти/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email обязателен/i)).toBeInTheDocument()
      expect(screen.getByText(/пароль обязателен/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    render(<LoginForm onSuccess={mockOnSuccess} />)
    
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText(/некорректный email/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const { authApi } = await import('@/shared/api')
    vi.mocked(authApi.login).mockResolvedValue({
      success: true,
      data: { token: 'test-token', user: { id: '1', name: 'Test User' } }
    })

    render(<LoginForm onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /войти/i }))

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        email: 'admin@test.com',
        password: 'password123'
      })
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  it('shows error message on login failure', async () => {
    const { authApi } = await import('@/shared/api')
    vi.mocked(authApi.login).mockRejectedValue(new Error('Invalid credentials'))

    render(<LoginForm onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'wrongpassword' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /войти/i }))

    await waitFor(() => {
      expect(screen.getByText(/ошибка входа/i)).toBeInTheDocument()
    })
  })
})