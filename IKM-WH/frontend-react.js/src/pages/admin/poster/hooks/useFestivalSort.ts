import { useState, useMemo } from 'react';

type SortOrder = 'desc' | 'asc';

export const useFestivalSort = (festivals: any[]) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
        const saved = localStorage.getItem('poster-sort-order');
        return (saved as SortOrder) || 'desc';
    });

    const sortedFestivals = useMemo(() => {
        return [...festivals].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            if (sortOrder === 'desc') {
                return dateB.getTime() - dateA.getTime(); // От новых к старым
            } else {
                return dateA.getTime() - dateB.getTime(); // От старых к новым
            }
        });
    }, [festivals, sortOrder]);

    const toggleSortOrder = () => {
        setSortOrder(prev => {
            const newOrder = prev === 'desc' ? 'asc' : 'desc';
            localStorage.setItem('poster-sort-order', newOrder);
            return newOrder;
        });
    };

    const getSortOrderText = () => {
        return sortOrder === 'desc' ? 'от новых к старым' : 'от старых к новым';
    };

    return {
        sortOrder,
        sortedFestivals,
        toggleSortOrder,
        getSortOrderText
    };
};