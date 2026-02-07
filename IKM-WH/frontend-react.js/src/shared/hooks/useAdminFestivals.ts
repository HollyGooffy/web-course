import { useState, useEffect } from 'react';
import { festivalsApi, Festival, CreateFestivalData, UpdateFestivalData } from '@shared/api/endpoints/festivals.endpoints';

export const useAdminFestivals = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFestivals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await festivalsApi.getAllAdmin();
      if (response.success) {
        setFestivals(response.data);
      } else {
        setError('Ошибка загрузки фестивалей');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки фестивалей');
      console.error('Error fetching admin festivals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const createFestival = async (data: CreateFestivalData, imageFile?: File) => {
    try {
      const response = await festivalsApi.create(data, imageFile);
      if (response.success) {
        setFestivals(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error('Ошибка создания фестиваля');
    } catch (err: any) {
      setError(err.message || 'Ошибка создания фестиваля');
      throw err;
    }
  };

  const updateFestival = async (id: string, data: UpdateFestivalData, imageFile?: File) => {
    try {
      const response = await festivalsApi.update(id, data, imageFile);
      if (response.success) {
        setFestivals(prev => prev.map(festival => 
          festival.id === id ? response.data : festival
        ));
        return response.data;
      }
      throw new Error('Ошибка обновления фестиваля');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления фестиваля');
      throw err;
    }
  };

  const deleteFestival = async (id: string) => {
    try {
      setError(null);
      const response = await festivalsApi.delete(id);
      if (response.success) {
        setFestivals(prev => prev.filter(festival => festival.id !== id));
        return true;
      } else {
        throw new Error('Ошибка удаления фестиваля');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Ошибка удаления фестиваля';
      setError(errorMessage);
      console.error('Error deleting festival:', err);
      throw err;
    }
  };

  const syncWithEvents = async () => {
    try {
      setError(null);
      const response = await festivalsApi.syncWithEvents();
      if (response.success) {
        setFestivals(response.data);
        return { success: true, message: response.message };
      }
      throw new Error('Ошибка синхронизации с афишей');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Ошибка синхронизации с афишей';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    festivals,
    loading,
    error,
    refetch: fetchFestivals,
    createFestival,
    updateFestival,
    deleteFestival,
    syncWithEvents,
  };
};