import { apiClient } from '../client';

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  performers: string[];
  image?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  performers: string[];
  status?: 'upcoming' | 'completed' | 'cancelled';
}

export type UpdateEventData = Partial<CreateEventData>;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const eventsApi = {
  getAll: async (): Promise<ApiResponse<Event[]>> => {
    return apiClient.getPublic<ApiResponse<Event[]>>('/events/public');
  },

  getUpcoming: async (): Promise<ApiResponse<Event[]>> => {
    return apiClient.get<ApiResponse<Event[]>>('/events/upcoming');
  },

  getById: async (id: string): Promise<ApiResponse<Event>> => {
    return apiClient.get<ApiResponse<Event>>(`/events/${id}`);
  },

  create: async (data: CreateEventData, imageFile?: File): Promise<ApiResponse<Event>> => {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('time', data.time);
    formData.append('venue', data.venue);
    formData.append('address', data.address);
    formData.append('performers', JSON.stringify(data.performers));
    if (data.status) formData.append('status', data.status);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.post<ApiResponse<Event>>('/events', formData);
  },

  update: async (id: string, data: UpdateEventData, imageFile?: File): Promise<ApiResponse<Event>> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.date) formData.append('date', data.date);
    if (data.time) formData.append('time', data.time);
    if (data.venue) formData.append('venue', data.venue);
    if (data.address) formData.append('address', data.address);
    if (data.performers) formData.append('performers', JSON.stringify(data.performers));
    if (data.status) formData.append('status', data.status);
    if (imageFile) formData.append('image', imageFile);

    return apiClient.put<ApiResponse<Event>>(`/events/${id}`, formData);
  },

  delete: async (id: string): Promise<ApiResponse<Event>> => {
    return apiClient.delete<ApiResponse<Event>>(`/events/${id}`);
  },
};
