import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminHeader } from "@shared/ui";
import { LoadingState, ErrorState } from '@shared/ui';
import { useAdminFestivals } from '@shared/hooks/useAdminFestivals';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import { CardsSettingsContent } from '../components/CardsSettingsContent';
import style from './CardsSettings.module.css';
import '@shared/styles/animations.css';

export const CardsSettings = () => {
  const { festivalId } = useParams<{ festivalId: string }>();
  const navigate = useNavigate();
  const { festivals, loading, error } = useAdminFestivals();
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

  useEffect(() => {
    if (!loading && festivals.length > 0 && festivalId) {
      const festival = festivals.find(f => f.id === festivalId);
      if (festival) {
        setSelectedFestival(festival);
      } else {
        // Фестиваль не найден, перенаправляем обратно
        navigate('/admin/cards');
      }
    }
  }, [festivals, loading, festivalId, navigate]);

  if (loading) {
    return <LoadingState message="Загрузка данных фестиваля..." />;
  }

  if (error) {
    return <ErrorState message={error} title="Ошибка загрузки данных" />;
  }

  if (!selectedFestival) {
    return <LoadingState message="Поиск фестиваля..." />;
  }

  return (
    <AdminHeader
      title={`Управление карточками: ${selectedFestival.name}`}
      description="Создание и редактирование наборов карточек фестиваля"
    >
      <div className={`${style.cardsSettingsContent} fadeIn`}>
        <CardsSettingsContent festival={selectedFestival} />
      </div>
    </AdminHeader>
  );
};