import { ChevronLeft } from 'lucide-react';
import { AdminBtn } from "@shared/ui";
import { FestivalDetails, CardSetsList, AllCardTypes } from '@features/cards-display';
import { Festival } from '@shared/api/endpoints/festivals.endpoints';
import style from '../ui/CardsManagementWidget.module.css';

interface FestivalDetailsViewProps {
    festival: Festival;
    allFestivalCards: AllCardTypes[];
    onBack: () => void;
    onEditCard: (card: AllCardTypes) => void;
    onDeleteCard: (card: AllCardTypes) => void;
}

export const FestivalDetailsView = ({
    festival,
    allFestivalCards,
    onBack,
    onEditCard,
    onDeleteCard
}: FestivalDetailsViewProps) => {
    return (
        <div className={style.festivalDetailsView}>
            <div className={style.backButton}>
                <AdminBtn 
                    variant="black-outline"
                    onClick={onBack}
                >
                    <ChevronLeft size={16} />
                    Назад к фестивалям
                </AdminBtn>
            </div>

            <FestivalDetails festival={festival} />

            <div className={style.cardSetsSection}>
                <div className={style.sectionHeader}>
                    <h3>Наборы карточек</h3>
                </div>

                <CardSetsList
                    cards={allFestivalCards}
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                />
            </div>
        </div>
    );
};