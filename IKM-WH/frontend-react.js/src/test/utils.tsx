import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

// Создаем провайдер для тестов
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock данные для тестов
export const mockUser = {
  id: '1',
  name: 'Test Admin',
  email: 'admin@test.com',
  role: 'admin' as const,
}

export const mockFestival = {
  _id: '1',
  name: 'Test Festival',
  date: new Date('2024-06-15'),
  venue: 'Test Venue',
  description: 'Test Description',
  status: 'upcoming' as const,
}

export const mockGroup = {
  _id: '1',
  name: 'Test Band',
  genre: 'Rock',
  description: 'Test band description',
  members: ['John Doe', 'Jane Smith'],
}

export const mockEvent = {
  _id: '1',
  title: 'Test Event',
  description: 'Test event description',
  date: new Date('2024-06-15'),
  time: '20:00',
  venue: 'Main Stage',
  address: 'Test Address',
  performers: ['Test Band'],
  status: 'upcoming' as const,
}

export const mockApplication = {
  _id: '1',
  groupName: 'Test Application Band',
  contactTelegram: '@testband',
  contactPhone: '+1234567890',
  description: 'Test application',
  status: 'pending' as const,
  submittedAt: new Date('2024-01-15'),
}

export const mockMerchItem = {
  _id: '1',
  title: 'Test T-Shirt',
  description: 'Cool festival t-shirt',
  price: 25,
  stock: 100,
  category: 'clothing',
}

export const mockCardSet = {
  _id: '1',
  title: 'Test Card Set',
  festivalId: '1',
  cardsInSet: 10,
  setsAvailable: 50,
  price: 15,
}

// Утилиты для мокирования API
export const createMockApiResponse = <T>(data: T) => ({
  success: true,
  data,
  message: 'Success',
})

export const createMockApiError = (message: string) => ({
  success: false,
  error: message,
})