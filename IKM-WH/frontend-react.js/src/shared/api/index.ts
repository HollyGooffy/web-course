// Экспорт всех API модулей
export { apiClient } from './client';
export { authApi } from './auth';
export { API_CONFIG, API_ENDPOINTS } from './config';

// Дополнительные API модули для других сущностей
import { apiClient } from './client';
import { API_ENDPOINTS } from './config';

// Applications API
export const applicationsApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.APPLICATIONS.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.APPLICATIONS.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.APPLICATIONS.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.APPLICATIONS.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.APPLICATIONS.DELETE(id)),
};

// Groups API
export const groupsApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.GROUPS.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.GROUPS.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.GROUPS.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.GROUPS.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.GROUPS.DELETE(id)),
};

// Merchandise API
export const merchApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.MERCH.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.MERCH.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.MERCH.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.MERCH.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.MERCH.DELETE(id)),
};

// Cards API
export const cardsApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.CARDS.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.CARDS.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.CARDS.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.CARDS.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.CARDS.DELETE(id)),
};

// Posters API
export const postersApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.POSTERS.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.POSTERS.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.POSTERS.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.POSTERS.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.POSTERS.DELETE(id)),
};

// Events API
export const eventsApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.EVENTS.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.EVENTS.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.EVENTS.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.EVENTS.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.EVENTS.DELETE(id)),
};

// Content API
export const contentApi = {
  getAll: () => apiClient.get(API_ENDPOINTS.CONTENT.LIST),
  getById: (id: string) => apiClient.get(API_ENDPOINTS.CONTENT.GET_BY_ID(id)),
  create: (data: any) => apiClient.post(API_ENDPOINTS.CONTENT.CREATE, data),
  update: (id: string, data: any) => apiClient.put(API_ENDPOINTS.CONTENT.UPDATE(id), data),
  delete: (id: string) => apiClient.delete(API_ENDPOINTS.CONTENT.DELETE(id)),
};

// Statistics API
export const statsApi = {
  getGeneral: () => apiClient.get(API_ENDPOINTS.STATS.GENERAL),
  getDashboard: () => apiClient.get(API_ENDPOINTS.STATS.DASHBOARD),
};

// Utility API
export const utilityApi = {
  checkHealth: () => apiClient.get(API_ENDPOINTS.HEALTH),
  getUploadedFile: (filename: string) => `${API_ENDPOINTS.UPLOADS(filename)}`,
};