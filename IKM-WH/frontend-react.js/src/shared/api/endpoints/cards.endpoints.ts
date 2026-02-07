import { apiClient } from '../client';

export interface CardSet {
  id: string;
  title: string;
  festivalId: string | {
    id: string;
    name: string;
    date: string;
    venue: string;
    description?: string;
    status: string;
  };
  festival?: {
    id: string;
    name: string;
    date: string;
    venue: string;
  };
  cardsInSet: number;
  setsAvailable: number;
  price: number;
  image?: string;
  cards?: Array<{
    name: string;
    image?: string;
    description?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardSetData {
  title: string;
  festivalId: string;
  cardsInSet: number;
  setsAvailable: number;
  price: number;
  cards?: Array<{
    name: string;
    image?: string;
    description?: string;
  }>;
}

export type UpdateCardSetData = Partial<CreateCardSetData>;

export const cardsApi = {
  // Публичные методы (для пользователей)
  getPublic: async (): Promise<{ success: boolean; data: CardSet[] }> => {
    const response = await apiClient.getPublic('/cards/public');
    
    return response as { success: boolean; data: CardSet[] };
  },

  getPublicByFestival: async (festivalId: string): Promise<{ success: boolean; data: CardSet[] }> => {
    return apiClient.getPublic(`/cards/public/festival/${festivalId}`);
  },

  getPublicById: async (id: string): Promise<{ success: boolean; data: CardSet }> => {
    return apiClient.getPublic(`/cards/public/${id}`);
  },

  // Метод для получения всех карточек через публичный клиент (для синхронизации данных)
  getAllPublic: async (): Promise<{ success: boolean; data: CardSet[] }> => {
    return apiClient.getPublic('/cards');
  },

  // Админские методы (для администраторов)
  getAll: async (): Promise<{ success: boolean; data: CardSet[] }> => {
    const response = await apiClient.get('/cards');
    
    return response as { success: boolean; data: CardSet[] };
  },

  getByFestival: async (festivalId: string): Promise<{ success: boolean; data: CardSet[] }> => {
    const response = await apiClient.get(`/cards/festival/${festivalId}`);
    return response as { success: boolean; data: CardSet[] };
  },

  getById: async (id: string): Promise<{ success: boolean; data: CardSet }> => {
    return apiClient.get(`/cards/${id}`);
  },

  create: async (data: CreateCardSetData, imageFile?: File): Promise<{ success: boolean; data: CardSet }> => {

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('festivalId', data.festivalId);
    formData.append('cardsInSet', data.cardsInSet.toString());
    formData.append('setsAvailable', data.setsAvailable.toString());
    formData.append('price', data.price.toString());
    if (data.cards) formData.append('cards', JSON.stringify(data.cards));
    if (imageFile) formData.append('image', imageFile);

    const response = await apiClient.post('/cards', formData);
    
    return response as { success: boolean; data: CardSet };
  },

  update: async (id: string, data: UpdateCardSetData, imageFile?: File): Promise<{ success: boolean; data: CardSet }> => {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.festivalId) formData.append('festivalId', data.festivalId);
    if (data.cardsInSet !== undefined) formData.append('cardsInSet', data.cardsInSet.toString());
    if (data.setsAvailable !== undefined) formData.append('setsAvailable', data.setsAvailable.toString());
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.cards) formData.append('cards', JSON.stringify(data.cards));
    if (imageFile) formData.append('image', imageFile);

    return apiClient.put(`/cards/${id}`, formData);
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    return apiClient.delete(`/cards/${id}`);
  },
};
