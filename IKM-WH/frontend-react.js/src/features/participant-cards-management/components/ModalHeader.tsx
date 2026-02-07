import { X, Calendar, MapPin, Users } from 'lucide-react';
import { ModalHeaderProps } from '../model/types';
import { formatDate, formatFileSize, calculateGroupStats } from '../lib/utils';
import style from '../ui/ParticipantCardsModal.module.css';

export const ModalHeader = ({ festival, groupsWithCards, onClose }: ModalHeaderProps) => {
    const { totalCards, totalSize, totalAvailableSlots } = calculateGroupStats(groupsWithCards);

    return (
        <div className={style.modalHeader}>
            <div className={style.festivalInfo}>
                <h2>Карточки участников - {festival.name}</h2>
                <div className={style.festivalMeta}>
                    <div className={style.metaItem}>
                        <Calendar size={16} />
                        <span>{formatDate(festival.date)}</span>
                    </div>
                    <div className={style.metaItem}>
                        <MapPin size={16} />
                        <span>{festival.venue}</span>
                    </div>
                    <div className={style.metaItem}>
                        <Users size={16} />
                        <span>{groupsWithCards.length} групп</span>
                    </div>
                </div>
                <div className={style.stats}>
                    <span>Всего карточек: {totalCards}</span>
                    <span>Общий размер: {formatFileSize(totalSize)}</span>
                    <span>Свободных слотов: {totalAvailableSlots}</span>
                </div>
            </div>
            <button className={style.closeButton} onClick={onClose}>
                <X size={24} />
            </button>
        </div>
    );
};