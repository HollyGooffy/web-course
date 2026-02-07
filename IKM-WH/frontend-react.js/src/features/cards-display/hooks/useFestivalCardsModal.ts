import { useEffect } from 'react';
import { ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';

export const useFestivalCardsModal = (isOpen: boolean) => {
    // Блокируем скролл body при открытии модального окна
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBuySet = (_cardSet: ExtendedCardSet) => {
        // Здесь будет логика покупки
    };

    return {
        handleBuySet
    };
};