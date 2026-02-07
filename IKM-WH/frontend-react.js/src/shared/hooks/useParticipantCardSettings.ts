import { useState, useEffect, useCallback } from 'react';

export interface ParticipantCardSettings {
  id: string;
  festivalId: string;
  groupName: string;
  eventId: string;
  price: number;
  setsAvailable: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'participant_card_settings';

export const useParticipantCardSettings = () => {
  const [settings, setSettings] = useState<ParticipantCardSettings[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка настроек из localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
      }
    } catch (err) {
      console.error('Error loading participant card settings:', err);
      setError('Ошибка загрузки настроек карточек участников');
    }
  }, []);

  // Сохранение в localStorage
  const saveToStorage = useCallback((newSettings: ParticipantCardSettings[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (err) {
      console.error('Error saving participant card settings:', err);
      setError('Ошибка сохранения настроек карточек участников');
    }
  }, []);

  // Получение настроек для конкретной группы
  const getSettingsForGroup = useCallback((
    festivalId: string,
    groupName: string,
    eventId: string
  ): ParticipantCardSettings | null => {
    return settings.find(
      setting => setting.festivalId === festivalId &&
                 setting.groupName === groupName &&
                 setting.eventId === eventId
    ) || null;
  }, [settings]);

  // Сохранение настроек для группы
  const saveSettingsForGroup = useCallback(async (
    festivalId: string,
    groupName: string,
    eventId: string,
    price: number,
    setsAvailable: number,
    isActive: boolean = true
  ): Promise<void> => {

    setLoading(true);
    setError(null);

    try {
      const now = new Date().toISOString();
      const existingIndex = settings.findIndex(
        setting => setting.festivalId === festivalId &&
                   setting.groupName === groupName &&
                   setting.eventId === eventId
      );

      let updatedSettings: ParticipantCardSettings[];

      if (existingIndex >= 0) {
        // Обновляем существующие настройки

        updatedSettings = [...settings];
        updatedSettings[existingIndex] = {
          ...updatedSettings[existingIndex],
          price,
          setsAvailable,
          isActive,
          updatedAt: now
        };

      } else {
        // Создаем новые настройки

        const newSetting: ParticipantCardSettings = {
          id: `${festivalId}-${eventId}-${groupName}-${Date.now()}`,
          festivalId,
          groupName,
          eventId,
          price,
          setsAvailable,
          isActive,
          createdAt: now,
          updatedAt: now
        };

        updatedSettings = [...settings, newSetting];
      }

      setSettings(updatedSettings);
      saveToStorage(updatedSettings);

      // Имитация API вызова
      
      await new Promise(resolve => setTimeout(resolve, 300));

    } catch (err) {
      
      console.error('Error saving participant card settings:', err);
      setError('Ошибка сохранения настроек карточек участников');
      throw err;
    } finally {
      setLoading(false);
      
    }
  }, [settings, saveToStorage]);

  // Удаление настроек для группы
  const deleteSettingsForGroup = useCallback(async (
    festivalId: string,
    groupName: string,
    eventId: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const updatedSettings = settings.filter(
        setting => !(setting.festivalId === festivalId &&
                    setting.groupName === groupName &&
                    setting.eventId === eventId)
      );

      setSettings(updatedSettings);
      saveToStorage(updatedSettings);

      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (err) {
      console.error('Error deleting participant card settings:', err);
      setError('Ошибка удаления настроек карточек участников');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [settings, saveToStorage]);

  // Получение всех настроек для фестиваля
  const getSettingsForFestival = useCallback((festivalId: string): ParticipantCardSettings[] => {
    return settings.filter(setting => setting.festivalId === festivalId);
  }, [settings]);

  return {
    settings,
    loading,
    error,
    getSettingsForGroup,
    saveSettingsForGroup,
    deleteSettingsForGroup,
    getSettingsForFestival
  };
};
