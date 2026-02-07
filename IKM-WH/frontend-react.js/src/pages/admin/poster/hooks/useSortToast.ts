import { useState, useEffect } from 'react';

export const useSortToast = () => {
    const [showSortToast, setShowSortToast] = useState(false);

    const showToast = () => {
        setShowSortToast(true);
    };

    useEffect(() => {
        if (showSortToast) {
            const timer = setTimeout(() => {
                setShowSortToast(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSortToast]);

    return {
        showSortToast,
        showToast
    };
};