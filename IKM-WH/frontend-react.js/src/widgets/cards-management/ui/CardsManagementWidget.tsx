import React from 'react';
import { LoadingState, ErrorState } from "@shared/ui";
import { useAdminCards } from '@shared/hooks/useAdminCards';
import { useCardsManagementData } from '../hooks/useCardsManagementData';
import { CardsManagementContent } from '../components/CardsManagementContent';
import style from './CardsManagementWidget.module.css';

interface CardsManagementWidgetProps {
  className?: string;
}

export const CardsManagementWidget: React.FC<CardsManagementWidgetProps> = ({ 
  className = '' 
}) => {
  const data = useCardsManagementData();
  const { refetch: refetchCards } = useAdminCards();

  if (data.loading) {
    return <LoadingState message="Загрузка данных карточек..." />;
  }

  if (data.error) {
    return <ErrorState message={data.error} title="Ошибка загрузки данных" />;
  }

  return (
    <div className={`${style.cardsManagementWidget} ${className}`}>
      <CardsManagementContent data={data} refetchCards={refetchCards} />
    </div>
  );
};