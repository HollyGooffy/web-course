import React, { useMemo, useCallback } from 'react';
import { Package } from 'lucide-react';
import { Portal } from '@shared/ui';
import { FestivalCardsModalProps } from '../model/types';
import { useFestivalCardsModal } from '../hooks/useFestivalCardsModal';
import { useParticipantCardsData } from '../hooks/useParticipantCardsData';
import { ModalHeader } from '../components/ModalHeader';
import { FestivalInfo } from '../components/FestivalInfo';
import { RegularCardSets } from '../components/RegularCardSets';
import { ParticipantCardSets } from '../components/ParticipantCardSets';
import style from './FestivalCardsModal.module.css';

export const FestivalCardsModal = React.memo<FestivalCardsModalProps>(({
    isOpen,
    onClose,
    festival,
    cardSets,
    events
}) => {
    const { handleBuySet } = useFestivalCardsModal(isOpen);
    const participantCardsData = useParticipantCardsData(isOpen, cardSets, festival.id);
    
    // Мемоизируем проверку пустого состояния
    const isEmpty = useMemo(() => cardSets.length === 0, [cardSets.length]);

    // Мемоизируем обработчик клика по оверлею
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Мемоизируем обработчик предотвращения всплытия
    const handleContentClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);
    
    if (!isOpen) return null;

    return (
        <Portal>
            <div className={style.modalOverlay} onClick={handleOverlayClick}>
                <div className={style.modalContent} onClick={handleContentClick}>
                    <ModalHeader festival={festival} onClose={onClose} />

                    <div className={style.modalBody}>
                        <FestivalInfo festival={festival} events={events} />
                        
                        {isEmpty ? (
                            <div className={style.emptyState}>
                                <Package size={48} />
                                <p>Для этого фестиваля пока нет доступных наборов карточек</p>
                                <p>Следите за обновлениями!</p>
                            </div>
                        ) : (
                            <>
                                <RegularCardSets cardSets={cardSets} onBuySet={handleBuySet} />
                                <ParticipantCardSets 
                                    cardSets={cardSets} 
                                    participantCardsData={participantCardsData}
                                    onBuySet={handleBuySet} 
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Portal>
    );
}, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen &&
           prevProps.festival.id === nextProps.festival.id &&
           prevProps.cardSets === nextProps.cardSets &&
           prevProps.events === nextProps.events &&
           prevProps.onClose === nextProps.onClose;
});