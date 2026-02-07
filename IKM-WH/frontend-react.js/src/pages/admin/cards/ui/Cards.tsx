import { AdminHeader } from "@shared/ui";
import { CardsManagementWidget } from '@widgets/cards-management';
import style from './Cards.module.css';
import '@shared/styles/animations.css';

export const Cards = () => {
  return (
    <AdminHeader
      title="Управление карточками"
      description="Создание и управление коллекционными карточками фестивалей"
    >
      <div className={`${style.cardsContent} fadeIn`}>
        <CardsManagementWidget />
      </div>
    </AdminHeader>
  );
};