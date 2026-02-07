export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  API_BASE_PATH: '/api',
  TIMEOUT: 10000,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  
  APPLICATIONS: {
    LIST: '/applications',
    CREATE: '/applications',
    GET_BY_ID: (id: string) => `/applications/${id}`,
    UPDATE: (id: string) => `/applications/${id}`,
    DELETE: (id: string) => `/applications/${id}`,
  },
  
  GROUPS: {
    LIST: '/groups',
    CREATE: '/groups',
    GET_BY_ID: (id: string) => `/groups/${id}`,
    UPDATE: (id: string) => `/groups/${id}`,
    DELETE: (id: string) => `/groups/${id}`,
  },
  
  MERCH: {
    LIST: '/merch',
    CREATE: '/merch',
    GET_BY_ID: (id: string) => `/merch/${id}`,
    UPDATE: (id: string) => `/merch/${id}`,
    DELETE: (id: string) => `/merch/${id}`,
  },
  
  CARDS: {
    LIST: '/cards',
    CREATE: '/cards',
    GET_BY_ID: (id: string) => `/cards/${id}`,
    UPDATE: (id: string) => `/cards/${id}`,
    DELETE: (id: string) => `/cards/${id}`,
  },
  
  POSTERS: {
    LIST: '/posters',
    CREATE: '/posters',
    GET_BY_ID: (id: string) => `/posters/${id}`,
    UPDATE: (id: string) => `/posters/${id}`,
    DELETE: (id: string) => `/posters/${id}`,
  },
  
  EVENTS: {
    LIST: '/events',
    UPCOMING: '/events/upcoming',
    CREATE: '/events',
    GET_BY_ID: (id: string) => `/events/${id}`,
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
  },
  
  CONTENT: {
    LIST: '/content',
    CREATE: '/content',
    GET_BY_ID: (id: string) => `/content/${id}`,
    UPDATE: (id: string) => `/content/${id}`,
    DELETE: (id: string) => `/content/${id}`,
  },
  
  STATS: {
    GENERAL: '/stats',
    DASHBOARD: '/stats/dashboard',
  },
  
  HEALTH: '/health',
  UPLOADS: (filename: string) => `/uploads/${filename}`,
} as const;