import { X, Calendar, MapPin } from 'lucide-react';
import { ModalHeaderProps } from '../model/types';
import { formatDate, getStatusText } from '../lib/formatters';
import style from '../ui/FestivalCardsModal.module.css';

export const ModalHeader = ({ festival, onClose }: ModalHeaderProps) => {
    return (
        <div className={style.modalHeader}>
            <div className={style.festivalInfo}>
                <div className={style.festivalTitleRow}>
                    <h2>{festival.name}</h2>
                    <span className={`${style.statusBadge} ${style[festival.status]}`}>
                        {getStatusText(festival.status)}
                    </span>
                </div>
                <div className={style.festivalMeta}>
                    <div className={style.metaItem}>
                        <Calendar size={16} />
                        <span>{formatDate(festival.date)}</span>
                    </div>
                    <div className={style.metaItem}>
                        <MapPin size={16} />
                        <span>{festival.venue}</span>
                    </div>
                </div>
            </div>
            <button className={style.closeButton} onClick={onClose}>
                <X size={24} />
            </button>
        </div>
    );
};