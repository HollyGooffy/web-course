import { useState, useEffect } from 'react';
import { useMerch } from '@shared/hooks/useMerch';
import { usePublicCardsWithParticipants, ExtendedCardSet } from '@shared/hooks/usePublicCardsWithParticipants';
import { transformMerchData } from '../lib/transformMerchData';
import { MerchItem } from '../model/types';

export type CarouselItem = 
    | { type: 'cards'; data: ExtendedCardSet[] }
    | { type: 'merch'; data: MerchItem };

export const useMerchData = () => {
    const { items: apiItems, loading: merchLoading, error: merchError } = useMerch();
    const { cardSets, loading: cardsLoading, error: cardsError } = usePublicCardsWithParticipants();
    const [displayItems, setDisplayItems] = useState<MerchItem[]>([]);

    useEffect(() => {
        const transformedItems = transformMerchData(apiItems);
        setDisplayItems(transformedItems);
    }, [apiItems]);

    const hasAnyCards = cardSets.length > 0;
    const allItems: CarouselItem[] = [
        ...(hasAnyCards ? [{ type: 'cards' as const, data: cardSets }] : []),
        ...displayItems.map(item => ({ type: 'merch' as const, data: item }))
    ];

    return {
        allItems,
        displayItems,
        cardSets,
        loading: merchLoading || cardsLoading,
        error: merchError || cardsError,
        hasItems: displayItems.length > 0,
        hasCards: hasAnyCards
    };
};