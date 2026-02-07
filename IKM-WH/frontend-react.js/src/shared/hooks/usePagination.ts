import { useState } from 'react';

interface UsePaginationProps {
    totalItems: number;
    initialCount: number;
    loadMoreCount: number;
}

export const usePagination = ({ totalItems, initialCount, loadMoreCount }: UsePaginationProps) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const hasMoreItems = visibleCount < totalItems;
    const remainingItems = totalItems - visibleCount;
    const nextLoadCount = Math.min(loadMoreCount, remainingItems);

    const loadMore = async () => {
        setIsLoadingMore(true);
        
        // Имитируем небольшую задержку для плавности
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setVisibleCount(prev => Math.min(prev + loadMoreCount, totalItems));
        setIsLoadingMore(false);
    };

    return {
        visibleCount,
        isLoadingMore,
        hasMoreItems,
        nextLoadCount,
        loadMore
    };
};