import { apiClient } from '../client';

export interface ParticipantCardFile {
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  compressedSize: number;
  compressionRatio: number;
  uploadedAt: string;
}

export interface ParticipantCardSettings {
  price: number;
  setsAvailable: number;
  isActive: boolean;
}

export interface ParticipantCard {
  _id: string;
  festivalId: string;
  groupName: string;
  eventId: string;
  cards: ParticipantCardFile[];
  settings: ParticipantCardSettings;
  createdAt: string;
  updatedAt: string;
}

export interface SaveParticipantCardsRequest {
  festivalId: string;
  groupName: string;
  eventId: string;
  settings?: Partial<ParticipantCardSettings>;
}

export interface SaveParticipantCardsResponse {
  message: string;
  participantCard: ParticipantCard;
  cardsCount: number;
  totalSize: number;
}

// Получить все карточки участников для фестиваля
export const getParticipantCardsByFestival = async (festivalId: string): Promise<ParticipantCard[]> => {
  const response = await apiClient.get(`/participant-cards/festival/${festivalId}`);
  return response as ParticipantCard[];
};

// Получить карточки участников для конкретной группы
export const getParticipantCardsByGroup = async (
  festivalId: string, 
  groupName: string, 
  eventId: string
): Promise<ParticipantCard> => {
  const response = await apiClient.get(
    `/participant-cards/festival/${festivalId}/group/${encodeURIComponent(groupName)}/event/${eventId}`
  );
  return response as ParticipantCard;
};

// Сохранить карточки участников для группы
export const saveParticipantCardsForGroup = async (
  festivalId: string,
  groupName: string,
  eventId: string,
  files: File[],
  settings?: Partial<ParticipantCardSettings>
): Promise<SaveParticipantCardsResponse> => {
  const formData = new FormData();
  
  // Добавляем файлы
  files.forEach(file => {
    formData.append('cards', file);
  });
  
  // Добавляем метаданные
  formData.append('festivalId', festivalId);
  formData.append('groupName', groupName);
  formData.append('eventId', eventId);
  
  if (settings) {
    formData.append('settings', JSON.stringify(settings));
  }

  const response = await apiClient.post(
    `/participant-cards/festival/${festivalId}/group/${encodeURIComponent(groupName)}/event/${eventId}`,
    formData
  );
  
  return response as SaveParticipantCardsResponse;
};

// Обновить настройки карточек участников
export const updateParticipantCardSettings = async (
  festivalId: string,
  groupName: string,
  eventId: string,
  settings: Partial<ParticipantCardSettings>
): Promise<ParticipantCard> => {
  const response = await apiClient.put(
    `/participant-cards/festival/${festivalId}/group/${encodeURIComponent(groupName)}/event/${eventId}/settings`,
    { settings }
  ) as any;
  return response.participantCard;
};

// Удалить карточки участников группы
export const deleteParticipantCardsForGroup = async (
  festivalId: string,
  groupName: string,
  eventId: string
): Promise<{ message: string; deletedCount: number }> => {
  const response = await apiClient.delete(
    `/participant-cards/festival/${festivalId}/group/${encodeURIComponent(groupName)}/event/${eventId}`
  );
  return response as { message: string; deletedCount: number };
};

export const deleteAllParticipantCardsForFestival = async (
  festivalId: string
): Promise<{ message: string; deletedGroups: number; deletedFiles: number }> => {
  const response = await apiClient.delete(`/participant-cards/festival/${festivalId}`);
  return response as { message: string; deletedGroups: number; deletedFiles: number };
};

export const getParticipantCardImageUrl = (filename: string): string => {
  const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001';
  return `${baseUrl}/uploads/participant-cards/${filename}`;
};