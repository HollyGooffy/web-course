import { useState, useEffect, useCallback } from 'react';
import { groupsApi, Group, CreateGroupData, UpdateGroupData } from '@shared/api/endpoints/groups.endpoints';

// Кэш для групп
let cachedGroups: Group[] = [];
let cacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 минут

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Проверяем кэш
      const now = Date.now();
      if (cachedGroups.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
        setGroups(cachedGroups);
        setLoading(false);
        return;
      }

      const response = await groupsApi.getAll();
      if (response.success) {
        // Кэшируем результат
        cachedGroups = response.data;
        cacheTimestamp = now;
        
        setGroups(response.data);
      } else {
        setError('Ошибка загрузки групп');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки групп');
      console.error('Error fetching groups:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const createGroup = async (data: CreateGroupData, imageFile?: File) => {
    try {
      const response = await groupsApi.create(data, imageFile);
      if (response.success) {
        // Обновляем кэш
        cachedGroups = [...cachedGroups, response.data];
        cacheTimestamp = Date.now();
        
        setGroups(prev => [...prev, response.data]);
        return response.data;
      }
      throw new Error('Ошибка создания группы');
    } catch (err: any) {
      setError(err.message || 'Ошибка создания группы');
      throw err;
    }
  };

  const updateGroup = async (id: string, data: UpdateGroupData, imageFile?: File) => {
    try {
      const response = await groupsApi.update(id, data, imageFile);
      if (response.success) {
        // Обновляем кэш
        cachedGroups = cachedGroups.map(group => 
          group.id === id ? response.data : group
        );
        cacheTimestamp = Date.now();
        
        setGroups(prev => prev.map(group => 
          group.id === id ? response.data : group
        ));
        return response.data;
      }
      throw new Error('Ошибка обновления группы');
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления группы');
      throw err;
    }
  };

  const deleteGroup = async (id: string) => {
    try {
      setError(null);
      const response = await groupsApi.delete(id);
      if (response.success) {
        // Обновляем кэш
        cachedGroups = cachedGroups.filter(group => group.id !== id);
        cacheTimestamp = Date.now();
        
        setGroups(prev => prev.filter(group => group.id !== id));
        return true;
      } else {
        throw new Error('Ошибка удаления группы');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Ошибка удаления группы';
      setError(errorMessage);
      console.error('Error deleting group:', err);
      throw err;
    }
  };

  // Функция для принудительного обновления (сбрасывает кэш)
  const forceRefetch = useCallback(async () => {
    cacheTimestamp = 0; // Сбрасываем кэш
    await fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    loading,
    error,
    refetch: fetchGroups,
    forceRefetch,
    createGroup,
    updateGroup,
    deleteGroup,
  };
};