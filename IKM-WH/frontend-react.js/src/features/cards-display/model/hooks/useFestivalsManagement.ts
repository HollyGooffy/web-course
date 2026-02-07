import { useCallback } from 'react';
import { useFestivals } from '@shared/hooks/useFestivals';

export const useFestivalsManagement = () => {
  const { festivals, loading, error, refetch } = useFestivals();

  const handleDeleteFestival = useCallback(async (_id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот фестиваль? Все связанные карточки также будут удалены.')) {
      try {
        // API вызов для удаления
        await new Promise(resolve => setTimeout(resolve, 500));
        await refetch();
      } catch (error) {
        console.error('Error deleting festival:', error);
      }
    }
  }, [refetch]);

  const handleSyncWithEvents = useCallback(async () => {
    try {
      // API вызов для синхронизации
      await new Promise(resolve => setTimeout(resolve, 500));
      await refetch();
      alert('Синхронизация завершена успешно');
    } catch (error: any) {
      console.error('Error syncing with events:', error);
      alert(`Ошибка синхронизации с афишей: ${error.message || error}`);
    }
  }, [refetch]);

  return {
    festivals,
    loading,
    error,
    handleDeleteFestival,
    handleSyncWithEvents,
    refetch
  };
};