/**
 * API Configuration
 * Централизованная конфигурация для API endpoints
 */

export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com/api'
    : 'http://localhost:3001/api',
  
  TIMEOUT: 10000, // 10 seconds
  
  ENDPOINTS: {
    // Authentication
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
    
    // Applications
    APPLICATIONS: {
      BASE: '/applications',
      BY_ID: (id: string) => `/applications/${id}`,
    },
    
    // Groups
    GROUPS: {
      BASE: '/groups',
      BY_ID: (id: string) => `/groups/${id}`,
    },
    
    // Merchandise
    MERCH: {
      BASE: '/merch',
      BY_ID: (id: string) => `/merch/${id}`,
    },
    
    // Cards
    CARDS: {
      BASE: '/cards',
      BY_ID: (id: string) => `/cards/${id}`,
    },
    
    // Posters
    POSTERS: {
      BASE: '/posters',
      BY_ID: (id: string) => `/posters/${id}`,
    },
    
    // Events
    EVENTS: {
      BASE: '/events',
      BY_ID: (id: string) => `/events/${id}`,
    },
    
    // Content
    CONTENT: {
      BASE: '/content',
      BY_ID: (id: string) => `/content/${id}`,
    },
    
    // Statistics
    STATS: {
      BASE: '/stats',
      DASHBOARD: '/stats/dashboard',
    },
    
    // Utility
    HEALTH: '/health',
    UPLOADS: (filename: string) => `/uploads/${filename}`,
  }
};

/**
 * Helper function to build full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Common headers for API requests
 */
export const getApiHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};